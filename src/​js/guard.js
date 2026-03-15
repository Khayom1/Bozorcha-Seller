// src/js/guard.js
import { supabase, getCurrentUser } from './supabase.js'

// Нигоҳ доштани макони аслии корбар
export const saveReturnUrl = (url) => {
    sessionStorage.setItem('returnUrl', url)
}

// Гирифтани макони бозгашт
export const getReturnUrl = () => {
    return sessionStorage.getItem('returnUrl') || '/'
}

// Тоза кардани макони бозгашт
export const clearReturnUrl = () => {
    sessionStorage.removeItem('returnUrl')
}

// Санҷидани воридшавӣ ва бозгардонидан ба макони аслӣ
export const requireAuth = async (returnToOnFail = true) => {
    const { data: { user } } = await getCurrentUser()
    
    if (!user && returnToOnFail) {
        // Нигоҳ доштани URL-и ҷорӣ
        const currentUrl = window.location.pathname + window.location.search
        saveReturnUrl(currentUrl)
        
        // Ба саҳифаи интихоби нақш равон кун
        window.location.href = '/src/pages/auth/method.html'
        return false
    }
    
    return user
}

// Санҷидани нақш ва бозгардонидан
export const requireRole = async (allowedRoles, redirectTo = '/src/pages/auth/method.html') => {
    const { data: { user } } = await getCurrentUser()
    
    if (!user) {
        const currentUrl = window.location.pathname + window.location.search
        saveReturnUrl(currentUrl)
        window.location.href = redirectTo
        return false
    }
    
    const { data: profile, error } = await supabase
        .from('profiles')
        .select('roles')
        .eq('id', user.id)
        .single()
    
    if (error || !profile) {
        console.error('Profile not found:', error)
        window.location.href = '/src/pages/auth/method.html'
        return false
    }
    
    // Санҷидани нақш (агар profile.roles массив бошад)
    const userRoles = profile.roles || []
    const hasAllowedRole = allowedRoles.some(role => userRoles.includes(role))
    
    if (!hasAllowedRole) {
        // Агар нақш мувофиқ набошад, ба дашборди мувофиқ равон кун
        if (userRoles.includes('seller')) {
            window.location.href = '/src/pages/dashboard/s/dashboard.html'
        } else if (userRoles.includes('buyer')) {
            window.location.href = '/src/pages/dashboard/b/dashboard.html'
        } else {
            window.location.href = '/'
        }
        return false
    }
    
    return profile
}

// Функсия барои пас аз воридшавӣ
export const handlePostAuth = (userRole) => {
    const returnUrl = getReturnUrl()
    clearReturnUrl()
    
    if (returnUrl && returnUrl !== '/') {
        window.location.href = returnUrl
    } else {
        // Ба дашборди мувофиқ равон кун
        if (userRole === 'seller') {
            window.location.href = '/src/pages/dashboard/s/dashboard.html'
        } else if (userRole === 'buyer') {
            window.location.href = '/src/pages/dashboard/b/dashboard.html'
        } else {
            window.location.href = '/'
        }
    }
}
