// src/js/utils.js
export function formatPhoneNumber(input) {
    let digits = input.replace(/\D/g, '')
    if (digits.length > 9) digits = digits.slice(0, 9)
    let formatted = ''
    for (let i = 0; i < digits.length; i++) {
        if (i === 3 || i === 6) formatted += ' '
        formatted += digits[i]
    }
    return formatted
}

export function escapeHTML(str) {
    if (!str) return ''
    const div = document.createElement('div')
    div.textContent = str
    return div.innerHTML
}

export function showError(element, message) {
    if (!element) return
    element.textContent = message
    element.style.display = 'block'
    setTimeout(() => {
        element.style.display = 'none'
    }, 3000)
}

export function showSuccess(element, message) {
    if (!element) return
    element.textContent = message
    element.style.display = 'block'
    setTimeout(() => {
        element.style.display = 'none'
    }, 3000)
}

export function formatPrice(price) {
    return new Intl.NumberFormat('tg-TJ').format(price) + ' с'
}

export function getUrlParams() {
    const params = new URLSearchParams(window.location.search)
    return Object.fromEntries(params.entries())
}
