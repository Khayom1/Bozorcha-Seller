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

// Муайян кардани нақш аз URL
export const getRoleFromPath = () => {
    const path = window.location.pathname
    if (path.includes('/s/')) return 'seller'
    if (path.includes('/b/')) return 'buyer'
    if (path.includes('/admin/')) return 'admin'
    return null
}

// Санҷидани воридшавӣ ва бозгардонидан ба макони аслӣ
export const requireAuth = async (returnToOnFail = true) => {
    const { data: { user } } = await getCurrentUser()
    const role = getRoleFromPath()
    
    if (!user && returnToOnFail && role) {
        // Нигоҳ доштани URL-и ҷорӣ
        const currentUrl = window.location.pathname + window.location.search
        saveReturnUrl(currentUrl)
        
        // Ба саҳифаи воридшавии мувофиқи нақш равон кун
        window.location.href = `/src/pages/auth/${role}/login/email.html`
        return false
    }
    
    return user
}

// Санҷидани нақш ва бозгардонидан
export const requireRole = async (allowedRoles) => {
    const { data: { user } } = await getCurrentUser()
    const currentRole = getRoleFromPath()
    
    if (!user) {
        const currentUrl = window.location.pathname + window.location.search
        saveReturnUrl(currentUrl)
        
        // Ба саҳифаи воридшавии мувофиқ равон кун
        if (currentRole) {
            window.location.href = `/src/pages/auth/${currentRole}/login/email.html`
        } else {
            window.location.href = '/'
        }
        return false
    }
    
    const { data: profile, error } = await supabase
        .from('profiles')
        .select('roles')
        .eq('id', user.id)
        .single()
    
    if (error || !profile) {
        console.error('Profile not found:', error)
        if (currentRole) {
            window.location.href = `/src/pages/auth/${currentRole}/register/form.html`
        } else {
            window.location.href = '/'
        }
        return false
    }
    
    // Санҷидани нақш
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
export const handlePostAuth = async () => {
    const { data: { user } } = await getCurrentUser()
    if (!user) return
    
    const { data: profile } = await supabase
        .from('profiles')
        .select('roles')
        .eq('id', user.id)
        .single()
    
    const returnUrl = getReturnUrl()
    clearReturnUrl()
    
    if (returnUrl && returnUrl !== '/') {
        window.location.href = returnUrl
    } else if (profile) {
        const userRoles = profile.roles || []
        if (userRoles.includes('seller')) {
            window.location.href = '/src/pages/dashboard/s/dashboard.html'
        } else if (userRoles.includes('buyer')) {
            window.location.href = '/src/pages/dashboard/b/dashboard.html'
        } else if (userRoles.includes('admin')) {
            window.location.href = '/src/pages/admin/dashboard.html'
        } else {
            window.location.href = '/'
        }
    } else {
        window.location.href = '/'
    }
}
