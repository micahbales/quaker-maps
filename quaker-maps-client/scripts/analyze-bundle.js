/**
 * Bundle size analysis script for React 18 upgrade performance testing
 */

const fs = require('fs');
const path = require('path');

function getFileSizeInKB(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / 1024).toFixed(2);
}

function analyzeBundleSize() {
  const buildDir = path.join(__dirname, '../build/static');
  
  if (!fs.existsSync(buildDir)) {
    console.error('❌ Build directory not found. Run "npm run build" first.');
    return;
  }

  console.log('📦 Bundle Size Analysis');
  console.log('========================');

  // Analyze JavaScript files
  const jsDir = path.join(buildDir, 'js');
  if (fs.existsSync(jsDir)) {
    const jsFiles = fs.readdirSync(jsDir).filter(file => file.endsWith('.js'));
    let totalJSSize = 0;
    
    console.log('\n📄 JavaScript Files:');
    jsFiles.forEach(file => {
      const filePath = path.join(jsDir, file);
      const size = getFileSizeInKB(filePath);
      totalJSSize += parseFloat(size);
      console.log(`  ${file}: ${size} KB`);
    });
    console.log(`  Total JS: ${totalJSSize.toFixed(2)} KB`);
  }

  // Analyze CSS files
  const cssDir = path.join(buildDir, 'css');
  if (fs.existsSync(cssDir)) {
    const cssFiles = fs.readdirSync(cssDir).filter(file => file.endsWith('.css'));
    let totalCSSSize = 0;
    
    console.log('\n🎨 CSS Files:');
    cssFiles.forEach(file => {
      const filePath = path.join(cssDir, file);
      const size = getFileSizeInKB(filePath);
      totalCSSSize += parseFloat(size);
      console.log(`  ${file}: ${size} KB`);
    });
    console.log(`  Total CSS: ${totalCSSSize.toFixed(2)} KB`);
  }

  // Check for source maps (should be excluded in production)
  const hasSourceMaps = fs.readdirSync(buildDir, { recursive: true })
    .some(file => file.toString().endsWith('.map'));
  
  if (hasSourceMaps) {
    console.log('\n⚠️  Source maps detected in build (consider excluding for production)');
  } else {
    console.log('\n✅ No source maps in production build');
  }

  console.log('\n📊 Bundle Size Recommendations:');
  console.log('  - Main JS bundle should be < 500 KB');
  console.log('  - CSS bundle should be < 100 KB');
  console.log('  - Consider code splitting for bundles > 1 MB');
}

if (require.main === module) {
  analyzeBundleSize();
}

module.exports = { analyzeBundleSize };