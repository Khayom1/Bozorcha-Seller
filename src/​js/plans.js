// src/js/plans.js
import { supabase } from './supabase.js'

class PlanManager {
    constructor() {
        this.currentUser = null
        this.currentPlan = null
        this.plans = []
    }

    // Инициализатсия
    async init() {
        const { data: { user } } = await supabase.auth.getUser()
        this.currentUser = user
        await this.loadPlans()
        if (user) {
            await this.loadUserSubscription()
        }
    }

    // Бор кардани ҳамаи планҳо
    async loadPlans() {
        try {
            const { data, error } = await supabase.functions.invoke('get-plans')
            if (error) throw error
            this.plans = data.plans || []
            return this.plans
        } catch (error) {
            console.error('Error loading plans:', error)
            return []
        }
    }

    // Бор кардани обунаи корбар
    async loadUserSubscription() {
        if (!this.currentUser) return null
        
        try {
            const { data, error } = await supabase.functions.invoke('get-my-subscription')
            if (error) throw error
            this.currentPlan = data.subscription
            return this.currentPlan
        } catch (error) {
            console.error('Error loading subscription:', error)
            return null
        }
    }

    // Гирифтани план бо id
    getPlanById(planId) {
        return this.plans.find(p => p.id === planId) || null
    }

    // Гирифтани план бо ном
    getPlanByName(planName) {
        return this.plans.find(p => p.name === planName) || null
    }

    // Эҷоди дархости пардохт барои хариди план
    async createPaymentRequest(planId, paymentMethod = 'card') {
        if (!this.currentUser) {
            alert('Лутфан аввал ворид шавед')
            return null
        }

        try {
            const { data, error } = await supabase.functions.invoke('create-payment-request', {
                body: { 
                    plan_id: planId,
                    payment_method: paymentMethod
                }
            })

            if (error) throw error
            
            return data
        } catch (error) {
            console.error('Error creating payment request:', error)
            alert('Хатогӣ: ' + error.message)
            return null
        }
    }

    // Санҷиши статуси обуна
    async checkSubscriptionStatus() {
        if (!this.currentUser) return null

        try {
            const { data, error } = await supabase.functions.invoke('check-subscription-status')
            if (error) throw error
            return data
        } catch (error) {
            console.error('Error checking subscription:', error)
            return null
        }
    }

    // Қатъ кардани обуна
    async cancelSubscription() {
        if (!this.currentUser) return false

        try {
            const { data, error } = await supabase.functions.invoke('manage-subscription', {
                body: { action: 'cancel' }
            })

            if (error) throw error
            
            if (data.success) {
                this.currentPlan = null
                return true
            }
            return false
        } catch (error) {
            console.error('Error cancelling subscription:', error)
            alert('Хатогӣ: ' + error.message)
            return false
        }
    }

    // Оё корбар метавонад маҳсулоти нав илова кунад?
    canAddProduct(currentProductCount) {
        if (!this.currentPlan) return false
        const plan = this.getPlanById(this.currentPlan.plan_id)
        if (!plan) return false
        
        if (plan.max_cards === null) return true
        return currentProductCount < plan.max_cards
    }

    // Гирифтани маҳдудияти маҳсулот
    getProductLimit() {
        if (!this.currentPlan) return 0
        const plan = this.getPlanById(this.currentPlan.plan_id)
        if (!plan) return 0
        return plan.max_cards === null ? Infinity : plan.max_cards
    }

    // Гирифтани multiplier барои намоёниёт
    getVisibilityMultiplier(productRating = 1.0) {
        if (!this.currentPlan) return 1.0
        const plan = this.getPlanById(this.currentPlan.plan_id)
        if (!plan) return 1.0
        
        const ratingMultiplier = 0.5 + (productRating * 1.5)
        return plan.visibility_multiplier * ratingMultiplier
    }

    // Гирифтани комиссия
    getCommissionRate() {
        if (!this.currentPlan) return 8.0
        const plan = this.getPlanById(this.currentPlan.plan_id)
        return plan ? plan.commission_rate : 8.0
    }

    // Оё метавонад реклама харад?
    canBuyAds() {
        if (!this.currentPlan) return false
        const plan = this.getPlanById(this.currentPlan.plan_id)
        return plan ? plan.can_buy_ads : false
    }

    // Оё бозӣ дорад?
    hasGame() {
        if (!this.currentPlan) return false
        const plan = this.getPlanById(this.currentPlan.plan_id)
        return plan ? plan.has_game : false
    }

    // Оё бозӣ маҳдуд аст?
    isGameLimited() {
        if (!this.currentPlan) return false
        const plan = this.getPlanById(this.currentPlan.plan_id)
        return plan ? plan.game_limited : false
    }

    // Оё ҳимоя дорад?
    hasProtection() {
        if (!this.currentPlan) return false
        const plan = this.getPlanById(this.currentPlan.plan_id)
        return plan ? plan.has_protection : false
    }

    // Оё бонус дорад?
    hasBonus() {
        if (!this.currentPlan) return false
        const plan = this.getPlanById(this.currentPlan.plan_id)
        return plan ? plan.has_bonus : false
    }

    // Оё аломати қайд дорад?
    hasNote() {
        if (!this.currentPlan) return false
        const plan = this.getPlanById(this.currentPlan.plan_id)
        return plan ? plan.has_note : false
    }

    // Оё менеҷери ИИ дорад?
    hasAIManager() {
        if (!this.currentPlan) return false
        const plan = this.getPlanById(this.currentPlan.plan_id)
        return plan ? plan.has_ai_manager : false
    }

    // Нишон додани планҳо дар HTML
    renderPlans(containerId, onPlanSelect = null) {
        const container = document.getElementById(containerId)
        if (!container) return

        let html = '<div class="plans-grid">'
        
        this.plans.forEach(plan => {
            const isCurrent = this.currentPlan?.plan_id === plan.id
            const isPending = this.currentPlan?.payment_status === 'pending' && this.currentPlan?.plan_id === plan.id
            const priceText = plan.price === 0 ? 'Ройгон' : plan.price + ' с/моҳ'
            
            let statusText = ''
            let buttonDisabled = false
            let buttonText = 'Интихоб кардан'
            
            if (isCurrent) {
                statusText = '<div class="current-badge">Обунаи фаъол</div>'
                buttonDisabled = true
                buttonText = 'Фаъол аст'
            } else if (isPending) {
                statusText = '<div class="pending-badge">Дар интизори пардохт</div>'
                buttonDisabled = true
                buttonText = 'Дар интизорӣ'
            }
            
            html += `
                <div class="plan-card ${isCurrent ? 'current-plan' : ''} ${isPending ? 'pending-plan' : ''}" data-plan-id="${plan.id}">
                    ${statusText}
                    <h3>${plan.name === 'start' ? 'Start' : 
                              plan.name === 'plus' ? 'Plus' : 
                              plan.name === 'pro' ? 'Pro' : 'Premium'}</h3>
                    <div class="plan-price">${priceText}</div>
                    <ul class="plan-features">
                        <li>📦 Маҳсулот: ${plan.max_cards === null ? 'Бемаҳдуд' : plan.max_cards}</li>
                        <li>👁️ Намоёниёт: x${plan.visibility_multiplier}</li>
                        <li>📊 Статистика: ${plan.stats_retention_days} рӯз</li>
                        <li>💰 Комиссия: ${plan.commission_rate}%</li>
                        <li>📢 Реклама: ${plan.can_buy_ads ? '✅' : '❌'}</li>
                        <li>🎮 Бозӣ: ${plan.has_game ? (plan.game_limited ? '⚠️ Маҳдуд' : '✅') : '❌'}</li>
                        <li>🛡️ Ҳимоя: ${plan.has_protection ? '✅' : '❌'}</li>
                        <li>🎁 Бонус: ${plan.has_bonus ? '✅' : '❌'}</li>
                        <li>⭐ Аломати қайд: ${plan.has_note ? '✅' : '❌'}</li>
                        <li>🤖 Менеҷери ИИ: ${plan.has_ai_manager ? '✅' : '❌'}</li>
                    </ul>
                    <button class="select-plan-btn" data-plan-id="${plan.id}" ${buttonDisabled ? 'disabled' : ''}>
                        ${buttonText}
                    </button>
                </div>
            `
        })
        
        html += '</div>'
        container.innerHTML = html

        // Илова кардани event listener ба тугмаҳо
        container.querySelectorAll('.select-plan-btn:not([disabled])').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const planId = e.target.dataset.planId
                
                if (onPlanSelect) {
                    onPlanSelect(planId)
                } else {
                    await this.handlePlanSelection(planId)
                }
            })
        })
    }

    // Коркарди интихоби план
    async handlePlanSelection(planId) {
        const plan = this.getPlanById(planId)
        if (!plan) return

        // Агар план ройгон бошад, бевосита обуна кун
        if (plan.price === 0) {
            const confirmed = confirm('Оё шумо боварӣ доред, ки ин планро интихоб кардан мехоҳед?')
            if (confirmed) {
                const { data, error } = await supabase.functions.invoke('manage-subscription', {
                    body: { action: 'subscribe', plan_id: planId }
                })
                if (data?.success) {
                    alert('Обуна бомуваффақият фаъол карда шуд!')
                    location.reload()
                }
            }
            return
        }

        // Барои планҳои пулакӣ, усули пардохтро интихоб кун
        const paymentMethod = await this.showPaymentMethodDialog()
        if (!paymentMethod) return

        const result = await this.createPaymentRequest(planId, paymentMethod)
        if (result?.success) {
            // Ба саҳифаи интизории пардохт гузар
            window.location.href = `payment-waiting.html?tx=${result.transaction_id}`
        }
    }

    // Нишон додани диалоги интихоби усули пардохт
    showPaymentMethodDialog() {
        return new Promise((resolve) => {
            // Инро метавонед бо модали худ иваз кунед
            const method = prompt('Усули пардохтро интихоб кунед (card, balance, crypto):', 'card')
            resolve(method || null)
        })
    }
}

export default new PlanManager()    // Оё бозӣ дорад?
    hasGame() {
        if (!this.currentPlan) return false
        const plan = this.getPlanById(this.currentPlan.plan_id)
        return plan ? plan.has_game : false
    }

    // Оё бозӣ маҳдуд аст?
    isGameLimited() {
        if (!this.currentPlan) return false
        const plan = this.getPlanById(this.currentPlan.plan_id)
        return plan ? plan.game_limited : false
    }

    // Оё ҳимоя дорад?
    hasProtection() {
        if (!this.currentPlan) return false
        const plan = this.getPlanById(this.currentPlan.plan_id)
        return plan ? plan.has_protection : false
    }

    // Оё бонус дорад?
    hasBonus() {
        if (!this.currentPlan) return false
        const plan = this.getPlanById(this.currentPlan.plan_id)
        return plan ? plan.has_bonus : false
    }

    // Оё аломати қайд дорад?
    hasNote() {
        if (!this.currentPlan) return false
        const plan = this.getPlanById(this.currentPlan.plan_id)
        return plan ? plan.has_note : false
    }

    // Оё менеҷери ИИ дорад?
    hasAIManager() {
        if (!this.currentPlan) return false
        const plan = this.getPlanById(this.currentPlan.plan_id)
        return plan ? plan.has_ai_manager : false
    }

    // Обуна шудан ба план
    async subscribe(planId) {
        if (!this.currentUser) {
            alert('Лутфан аввал ворид шавед')
            return false
        }

        try {
            const { data, error } = await supabase.functions.invoke('manage-subscription', {
                body: { 
                    action: 'subscribe',
                    plan_id: planId
                }
            })

            if (error) throw error
            
            if (data.success) {
                await this.loadUserSubscription()
                return true
            }
            return false
        } catch (error) {
            console.error('Error subscribing:', error)
            alert('Хатогӣ: ' + error.message)
            return false
        }
    }

    // Қатъ кардани обуна
    async cancelSubscription() {
        if (!this.currentUser) return false

        try {
            const { data, error } = await supabase.functions.invoke('manage-subscription', {
                body: { action: 'cancel' }
            })

            if (error) throw error
            
            if (data.success) {
                this.currentPlan = null
                return true
            }
            return false
        } catch (error) {
            console.error('Error cancelling subscription:', error)
            alert('Хатогӣ: ' + error.message)
            return false
        }
    }

    // Нишон додани планҳо дар HTML
    renderPlans(containerId, selectedCallback = null) {
        const container = document.getElementById(containerId)
        if (!container) return

        let html = '<div class="plans-grid">'
        
        this.plans.forEach(plan => {
            const isCurrent = this.currentPlan?.plan_id === plan.id
            const priceText = plan.price === 0 ? 'Ройгон' : plan.price + ' с/моҳ'
            
            html += `
                <div class="plan-card ${isCurrent ? 'current-plan' : ''}" data-plan-id="${plan.id}">
                    <h3>${plan.name === 'start' ? 'Start' : 
                              plan.name === 'plus' ? 'Plus' : 
                              plan.name === 'pro' ? 'Pro' : 'Premium'}</h3>
                    <div class="plan-price">${priceText}</div>
                    <ul class="plan-features">
                        <li>📦 Маҳсулот: ${plan.max_cards === null ? 'Бемаҳдуд' : plan.max_cards}</li>
                        <li>👁️ Намоёниёт: x${plan.visibility_multiplier}</li>
                        <li>📊 Статистика: ${plan.stats_retention_days} рӯз</li>
                        <li>💰 Комиссия: ${plan.commission_rate}%</li>
                        <li>📢 Реклама: ${plan.can_buy_ads ? '✅' : '❌'}</li>
                        <li>🎮 Бозӣ: ${plan.has_game ? (plan.game_limited ? '⚠️ Маҳдуд' : '✅') : '❌'}</li>
                        <li>🛡️ Ҳимоя: ${plan.has_protection ? '✅' : '❌'}</li>
                        <li>🎁 Бонус: ${plan.has_bonus ? '✅' : '❌'}</li>
                        <li>⭐ Аломати қайд: ${plan.has_note ? '✅' : '❌'}</li>
                        <li>🤖 Менеҷери ИИ: ${plan.has_ai_manager ? '✅' : '❌'}</li>
                    </ul>
                    ${isCurrent ? 
                        '<button class="current-btn" disabled>Обунаи фаъол</button>' : 
                        '<button class="select-plan-btn">Интихоб кардан</button>'}
                </div>
            `
        })
        
        html += '</div>'
        container.innerHTML = html

        // Илова кардани event listener ба тугмаҳо
        container.querySelectorAll('.select-plan-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const card = e.target.closest('.plan-card')
                const planId = card.dataset.planId
                
                if (selectedCallback) {
                    selectedCallback(planId)
                } else {
                    const confirmed = confirm('Оё шумо боварӣ доред, ки ин планро интихоб кардан мехоҳед?')
                    if (confirmed) {
                        const success = await this.subscribe(planId)
                        if (success) {
                            alert('Обуна бомуваффақият фаъол карда шуд!')
                            this.renderPlans(containerId, selectedCallback)
                        }
                    }
                }
            })
        })
    }
}

export default new PlanManager()
