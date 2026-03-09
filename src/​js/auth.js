// src/js/auth.js
import { supabase } from './supabase.js'
import { showError, showSuccess } from './utils.js'

export async function sendOTP(phone, email) {
    let result
    
    if (phone) {
        result = await supabase.auth.signInWithOtp({
            phone: phone.startsWith('+992') ? phone : '+992' + phone.replace(/\D/g, ''),
            options: { shouldCreateUser: true }
        })
    } else if (email) {
        result = await supabase.auth.signInWithOtp({
            email: email,
            options: { shouldCreateUser: true }
        })
    }
    
    return result
}

export async function verifyOTP(phone, email, token) {
    let result
    
    if (phone) {
        result = await supabase.auth.verifyOtp({
            phone,
            token,
            type: 'sms'
        })
    } else if (email) {
        result = await supabase.auth.verifyOtp({
            email,
            token,
            type: 'email'
        })
    }
    
    return result
}

export async function saveUserProfile(userId, profileData) {
    const { error } = await supabase
        .from('profiles')
        .upsert({
            id: userId,
            ...profileData,
            updated_at: new Date()
        })
    
    return { error }
}

export function setupAuthListener(callback) {
    return supabase.auth.onAuthStateChange((event, session) => {
        callback(event, session)
    })
}
