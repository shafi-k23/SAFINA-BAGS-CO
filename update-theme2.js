const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

let count = 0;

function repl(regex, replacer) {
    html = html.replace(regex, (match) => { 
        count++; 
        // return match + replacer side by side? No, the regex already includes the class name
        if (match.includes('dark:')) return match; // avoid double adding
        return match + ' ' + replacer; 
    });
}

// Backgrounds
repl(/bg-surface-container-lowest\b/g, 'dark:bg-[#0b0d10]');
repl(/bg-surface-container-low\b/g, 'dark:bg-[#111318]');
repl(/bg-surface-container\b/g, 'dark:bg-[#15181e]');
repl(/bg-surface\b/g, 'dark:bg-[#0b0d10]');

repl(/bg-\[#faf9f7\]/g, 'dark:bg-[#0b0d10]');
repl(/bg-\[#1E293B\]/g, 'dark:bg-[#000000]');
repl(/bg-\[#f2f4f4\]/g, 'dark:bg-[#111318]');
repl(/bg-white\b/g, 'dark:bg-[#1a1d24]');

// Text
repl(/text-on-surface-variant\b/g, 'dark:text-[#a0a5ab]');
repl(/text-on-surface\b/g, 'dark:text-[#f8f9fa]');

repl(/text-\[#2f3331\]/g, 'dark:text-[#f1f3f5]');
repl(/text-\[#5c5f5b\]/g, 'dark:text-[#a1a5a2]');
repl(/text-\[#2d3435\]/g, 'dark:text-[#f1f3f5]');

// Borders
repl(/border-outline-variant\/20/g, 'dark:border-white/10');
repl(/border-outline-variant\/40/g, 'dark:border-white/20');
repl(/border-outline\/30/g, 'dark:border-white/20');
repl(/border-\[#5c5f5b\]/g, 'dark:border-[#a1a5a2]');
repl(/border-\[#2f3331\]/g, 'dark:border-[#f1f3f5]');

fs.writeFileSync('index.html', html);
console.log('Replacements made:', count);
