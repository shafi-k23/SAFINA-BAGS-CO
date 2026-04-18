const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix the overlap bug visually on medium tablets/small-desktops
// Changing it from `md:-mt-20` (which triggers at ~768px width leading to overlapping titles)
// To `xl:-mt-20 md:mt-0` tracking it only when the screen breaks above 1280px or removing it.
// Let's just remove the negative margin completely or push it to `lg` breakpoints where space is safe.
html = html.replace(/class="flex flex-col md:-mt-20"/g, 'class="flex flex-col lg:-mt-20"');


// 2. Add Dark Mode Toggle to Mobile Navbar directly
// I need to find the Mobile Quote button area to safely swap it alongside with reduced sizes.
const searchStr = `        <button class="px-4 py-2 text-xs tracking-widest uppercase transition-opacity bg-primary text-on-primary font-label hover:opacity-90 rounded-md" onclick="document.getElementById('contact').scrollIntoView({behavior: 'smooth'})">Quote</button>`;
const mobileNavReplacement = `        <button id="theme-toggle-mobile-nav" type="button" class="text-[#2f3331] dark:text-[#f1f3f5] pr-1 flex items-center justify-center transition-colors" aria-label="Toggle Dark Mode">
            <span id="theme-toggle-dark-icon-nav" class="hidden material-symbols-outlined text-[24px]">light_mode</span>
            <span id="theme-toggle-light-icon-nav" class="hidden material-symbols-outlined text-[24px]">dark_mode</span>
        </button>
        <button class="px-3 py-2 text-[10px] sm:text-xs tracking-widest uppercase transition-opacity bg-primary text-on-primary font-label hover:opacity-90 rounded-md" onclick="document.getElementById('contact').scrollIntoView({behavior: 'smooth'})">Quote</button>`;

html = html.replace(searchStr, mobileNavReplacement);
html = html.replace(/<div class="flex md:hidden items-center gap-2">/g, '<div class="flex md:hidden items-center gap-3">');

// We also need to add the new button's ID into script.js logic so it actually toggles
let js = fs.readFileSync('script.js', 'utf8');
if (!js.includes('themeToggleDarkIconNav')) {
    // Add selectors
    js = js.replace("const themeToggleLightIconMobile = document.getElementById('theme-toggle-light-icon-mobile');", 
`const themeToggleLightIconMobile = document.getElementById('theme-toggle-light-icon-mobile');
    const themeToggleBtnMobileNav = document.getElementById('theme-toggle-mobile-nav');
    const themeToggleDarkIconNav = document.getElementById('theme-toggle-dark-icon-nav');
    const themeToggleLightIconNav = document.getElementById('theme-toggle-light-icon-nav');`);

    // Add Icon UI switch logic
    let updateIconsLogic = `if(themeToggleDarkIconMobile) themeToggleDarkIconMobile.classList.remove('hidden');
            if(themeToggleLightIconMobile) themeToggleLightIconMobile.classList.add('hidden');`;
    
    js = js.replace(updateIconsLogic, updateIconsLogic + `
            if(themeToggleDarkIconNav) themeToggleDarkIconNav.classList.remove('hidden');
            if(themeToggleLightIconNav) themeToggleLightIconNav.classList.add('hidden');`);

    let updateIconsLogic2 = `if(themeToggleDarkIconMobile) themeToggleDarkIconMobile.classList.add('hidden');
            if(themeToggleLightIconMobile) themeToggleLightIconMobile.classList.remove('hidden');`;

    js = js.replace(updateIconsLogic2, updateIconsLogic2 + `
            if(themeToggleDarkIconNav) themeToggleDarkIconNav.classList.add('hidden');
            if(themeToggleLightIconNav) themeToggleLightIconNav.classList.remove('hidden');`);

    // Add event listener
    js = js.replace("if (themeToggleBtnMobile) themeToggleBtnMobile.addEventListener('click', toggleTheme);",
`if (themeToggleBtnMobile) themeToggleBtnMobile.addEventListener('click', toggleTheme);
    if (themeToggleBtnMobileNav) themeToggleBtnMobileNav.addEventListener('click', toggleTheme);`);
    
    fs.writeFileSync('script.js', js);
}

fs.writeFileSync('index.html', html);
console.log("Fixes applied successfully.");
