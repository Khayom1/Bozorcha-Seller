// src/js/guard.js
import { supabase, getCurrentUser } from './supabase.js'

// Санҷидани воридшавӣ
export const requireAuth = async () => {
    const { data: { user } } = await getCurrentUser()
    
    if (!user) {
        // Агар корбар ворид нашуда бошад, ба саҳифаи аутентификатсия равон кун
        window.location.href = '/src/pages/auth/s/method.html'
        return false
    }
    
    return user
}

// Санҷидани нақш (seller, buyer, admin)
export const requireRole = async (allowedRoles) => {
    const user = await requireAuth()
    if (!user) return false
    
    const { data: profile } = await supabase
        .from('profiles')
        .select('roles')
        .eq('id', user.id)
        .single()
    
    if (!profile || !profile.roles.some(role => allowedRoles.includes(role))) {
        window.location.href = '/'
        return false
    }
    
    return true
}

// Санҷидани он ки корбар фурӯшанда аст
export const requireSeller = () => requireRole(['seller'])

// Санҷидани он ки корбар харидор аст
export const requireBuyer = () => requireRole(['buyer'])

// Санҷидани он ки корбар мудир аст
export const requireAdmin = () => requireRole(['admin'])
