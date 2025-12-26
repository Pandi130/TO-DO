
// Theme Logic
const themeConfig = {
    dark: 'dark',
    light: 'light',
    storageKey: 'app-theme'
};

function initTheme() {
    const savedTheme = localStorage.getItem(themeConfig.storageKey);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === themeConfig.dark || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add(themeConfig.dark);
    } else {
        document.documentElement.classList.remove(themeConfig.dark);
    }
}

function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains(themeConfig.dark);
    
    if (isDark) {
        html.classList.remove(themeConfig.dark);
        localStorage.setItem(themeConfig.storageKey, themeConfig.light);
    } else {
        html.classList.add(themeConfig.dark);
        localStorage.setItem(themeConfig.storageKey, themeConfig.dark);
    }
    return !isDark; // return new state
}

// Run immediately
initTheme();
