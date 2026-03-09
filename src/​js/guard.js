// src/js/guard.js
import { supabase, getCurrentUser } from './supabase.js'

export const USER_TYPES = {
    SELLER: 'seller',
    BUYER: 'buyer',
    ADMIN: 'admin',
    UNKNOWN: 'unknown'
}

export async function getUserType() {
    const user = await getCurrentUser()
    if (!user) return USER_TYPES.UNKNOWN

    // Санҷиши админ
    const { data: admin } = await supabase
        .from('admins')
        .select('id')
        .eq('id', user.id)
        .maybeSingle()
    
    if (admin) return USER_TYPES.ADMIN

    // Санҷиши фурӯшанда (бо shops)
    const { data: seller } = await supabase
        .from('shops')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle()
    
    if (seller) return USER_TYPES.SELLER

    return USER_TYPES.BUYER
}

export async function protectPage(allowedTypes) {
    const type = await getUserType()
    const currentPath = window.location.pathname

    if (!allowedTypes.includes(type)) {
        if (type === USER_TYPES.UNKNOWN) {
            window.location.href = '/index.html'
        } else if (type === USER_TYPES.SELLER) {
            window.location.href = '/src/pages/dashboard/s/dashboard.html'
        } else if (type === USER_TYPES.BUYER) {
            window.location.href = '/src/pages/dashboard/b/dashboard.html'
        } else if (type === USER_TYPES.ADMIN) {
            window.location.href = '/src/pages/admin/s/admin-panel.html'
        }
        return false
    }
    return true
}

export function getBackPath() {
    const path = window.location.pathname
    
    if (path.includes('/auth/s/')) {
        return '/src/pages/auth/s/method.html'
    }
    if (path.includes('/auth/b/')) {
        return '/src/pages/auth/b/method.html'
    }
    if (path.includes('/dashboard/s/')) {
        return '/src/pages/dashboard/s/dashboard.html'
    }
    if (path.includes('/dashboard/b/')) {
        return '/src/pages/dashboard/b/dashboard.html'
    }
    return '/index.html'
}}

export {
    USER_TYPES,
    getUserType,
    redirectToDashboard,
    redirectToMethod,
    redirectToLogin,
    protectPage,
    getBackPath
}
