// src/js/theme.js
export function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    document.body.setAttribute('data-theme', savedTheme)
    updateThemeButton(savedTheme)
}

export function toggleTheme() {
    const current = document.body.getAttribute('data-theme')
    const newTheme = current === 'dark' ? 'light' : 'dark'
    document.body.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
    updateThemeButton(newTheme)
}

function updateThemeButton(theme) {
    const btn = document.getElementById('themeBtn')
    if (btn) {
        btn.innerHTML = theme === 'dark' ? '☀️' : '🌙'
    }
}
