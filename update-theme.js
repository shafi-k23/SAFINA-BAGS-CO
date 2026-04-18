const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove .light class from html
html = html.replace('<html class="light" lang="en">', '<html lang="en">');

// 2. Add Theme Init Script to head
const scriptTag = `
    <script>
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>
`;
html = html.replace('</head>', scriptTag + '\n</head>');

// 3. Add smooth transition to body
html = html.replace('<body class="', '<body class="transition-colors duration-300 ');

// 4. Update semantic backgrounds
html = html.replace(/bg-surface-container-low(?![a-z\-])/g, 'bg-surface-container-low dark:bg-[#111318]');
html = html.replace(/bg-surface-container-lowest(?![a-z\-])/g, 'bg-surface-container-lowest dark:bg-[#0b0d10]');
html = html.replace(/bg-surface-container(?![a-z\-])/g, 'bg-surface-container dark:bg-[#15181e]');
html = html.replace(/bg-surface(?![a-z\-])/g, 'bg-surface dark:bg-[#0b0d10]');

// 5. Update text colors
html = html.replace(/text-on-surface-variant(?![a-z\-])/g, 'text-on-surface-variant dark:text-[#a0a5ab]');
html = html.replace(/text-on-surface(?![a-z\-])/g, 'text-on-surface dark:text-[#f8f9fa]');

// 6. Update hardcoded colors
html = html.replace(/text-\[#2f3331\]/g, 'text-[#2f3331] dark:text-[#f1f3f5]');
html = html.replace(/text-\[#5c5f5b\]/g, 'text-[#5c5f5b] dark:text-[#a1a5a2]');
html = html.replace(/text-\[#2d3435\]/g, 'text-[#2d3435] dark:text-[#f1f3f5]');

// backgrounds
html = html.replace(/bg-\[#faf9f7\]/g, 'bg-[#faf9f7] dark:bg-[#0b0d10]');
html = html.replace(/bg-\[#0d0e0e\]/g, 'bg-[#0b0d10]'); // ensure dark navbar bg is pure dark charcoal
html = html.replace(/bg-\[#1E293B\]/g, 'bg-[#1E293B] dark:bg-[#000000]');
html = html.replace(/bg-\[#f2f4f4\]/g, 'bg-[#f2f4f4] dark:bg-[#111318]');
html = html.replace(/bg-white/g, 'bg-white dark:bg-[#1a1d24]');

// borders
html = html.replace(/border-outline-variant\/20/g, 'border-outline-variant/20 dark:border-white/10');
html = html.replace(/border-outline-variant\/40/g, 'border-outline-variant/40 dark:border-white/20');
html = html.replace(/border-outline\/30/g, 'border-outline/30 dark:border-white/20');
html = html.replace(/border-\[#5c5f5b\]/g, 'border-[#5c5f5b] dark:border-[#a1a5a2]');
html = html.replace(/border-\[#2f3331\]/g, 'border-[#2f3331] dark:border-[#f1f3f5]');

// Drop shadows
html = html.replace(/shadow-2xl/g, 'shadow-2xl dark:shadow-none');
html = html.replace(/shadow-xl/g, 'shadow-xl dark:shadow-none');

// Images (Logos)
html = html.replace(/<img src="images\/logo\.png"/g, '<img src="images/logo.png" class="dark:invert"');

fs.writeFileSync('index.html', html);
console.log('index.html processed.');
