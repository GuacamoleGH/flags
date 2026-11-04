const fs = require('fs');
const path = require('path');

const flagsDir = path.join(__dirname, '..', 'public', 'flags');
const files = fs.readdirSync(flagsDir).filter(f => f.endsWith('.svg'));

let updated = 0;
let errors = [];

for (const file of files) {
  const filePath = path.join(flagsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('viewBox')) {
    const widthMatch = content.match(/width=["']?([0-9.]+)(?:px)?["']/i);
    const heightMatch = content.match(/height=["']?([0-9.]+)(?:px)?["']/i);

    if (widthMatch && heightMatch) {
      const w = parseFloat(widthMatch[1]);
      const h = parseFloat(heightMatch[1]);
      const viewBoxAttr = ` viewBox="0 0 ${w} ${h}"`;
      
      // Inject viewBox right after <svg
      content = content.replace(/<svg\b([^>]*)>/i, `<svg$1${viewBoxAttr}>`);
      fs.writeFileSync(filePath, content, 'utf8');
      updated++;
    } else {
      errors.push(file);
    }
  }
}

console.log(`Updated ${updated} SVG flag files with missing viewBox.`);
if (errors.length > 0) {
  console.log(`Could not auto-detect width/height for:`, errors);
}
