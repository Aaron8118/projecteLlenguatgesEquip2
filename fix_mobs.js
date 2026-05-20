const fs = require('fs');
const path = 'html/mobs.html';
let h = fs.readFileSync(path, 'utf-8');

const pattern = /onclick="document\.getElementById\('([^']+)'\)\.play\(\)"/g;
h = h.replace(pattern, 'data-sonido="$1"');

// Add sonido_animal.js script in head after mobs.js if not already there
if (!h.includes('sonido_animal.js')) {
  h = h.replace('<script src="../js/mobs.js"></script>', '<script src="../js/mobs.js"></script>\n   <script src="../js/sonido_animal.js"></script>');
}

fs.writeFileSync(path, h);
console.log('Done. Total replacements:', (h.match(/data-sonido="/g) || []).length);
