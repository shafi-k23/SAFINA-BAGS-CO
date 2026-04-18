const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix overlapping text classes
html = html.replace(/text-on-surface dark:text-\[#f8f9fa\]-variant dark:text-\[#a0a5ab\]/g, 'text-on-surface-variant dark:text-[#a0a5ab]');

// Clean up background classes that overlapped
html = html.replace(/bg-surface dark:bg-\[#0b0d10\]-container dark:bg-\[#15181e\]-lowest dark:bg-\[#0b0d10\]/g, 'bg-surface-container-lowest dark:bg-[#0b0d10]');
html = html.replace(/bg-surface dark:bg-\[#0b0d10\]-container dark:bg-\[#15181e\]-low dark:bg-\[#111318\]/g, 'bg-surface-container-low dark:bg-[#111318]');
html = html.replace(/bg-surface dark:bg-\[#0b0d10\]-container dark:bg-\[#15181e\]/g, 'bg-surface-container dark:bg-[#15181e]');

// 2. Fix gradient classes in the contact section
// Currently: <div class="absolute inset-0 bg-gradient-to-br from-surface-container dark:bg-[#15181e] via-surface dark:bg-[#0b0d10] to-surface-container-low dark:bg-[#111318]"></div>
html = html.replace(/from-surface-container dark:bg-\[#15181e\] via-surface dark:bg-\[#0b0d10\] to-surface-container-low dark:bg-\[#111318\]/g, 'from-surface-container via-surface to-surface-container-low dark:from-[#15181e] dark:via-[#0b0d10] dark:to-[#111318]');
// Also check if any prefix missing dark backgrounds got added into the from/via/to incorrectly.
html = html.replace(/from-surface-container via-surface to-surface-container-low/, 'from-surface-container via-surface to-surface-container-low dark:from-[#15181e] dark:via-[#0b0d10] dark:to-[#111318]');


// 3. Fix the Logo bug
// Current Logo: <img src="images/logo.png" class="dark:invert" alt="Safina Bags Co. Logo" class="h-8 md:h-10 w-auto" width="120" height="40">
html = html.replace(/<img src="images\/logo\.png"\s+class="dark:invert"\s+alt="([^"]+)"\s+class="([^"]+)"/g, '<img src="images/logo.png" alt="$1" class="$2 dark:invert"');

// Fix 4: If any gradient got destroyed but the replace missed it, search specifically for the contact bg line
html = html.replace(/<div class="absolute inset-0 bg-gradient-to-br.*"><\/div>/, '<div class="absolute inset-0 bg-gradient-to-br from-surface-container via-surface to-surface-container-low dark:from-[#15181e] dark:via-[#0b0d10] dark:to-[#111318]"></div>');

fs.writeFileSync('index.html', html);
console.log('Fixed overlapping classes');
