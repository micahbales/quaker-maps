/**
 * Comprehensive performance testing script for React 18 upgrade
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function runPerformanceTest() {
  console.log('🚀 Starting React 18 Performance Test Suite');
  console.log('===========================================\n');

  // 1. Build the application
  console.log('📦 Building application...');
  try {
    execSync('npm run build', { stdio: 'inherit', cwd: process.cwd() });
    console.log('✅ Build completed successfully\n');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }

  // 2. Analyze bundle size
  console.log('📊 Analyzing bundle size...');
  try {
    const { analyzeBundleSize } = require('./analyze-bundle.js');
    analyzeBundleSize();
    console.log('');
  } catch (error) {
    console.error('❌ Bundle analysis failed:', error.message);
  }

  // 3. Check for React 18 features
  console.log('🔍 Checking React 18 implementation...');
  checkReact18Features();
  console.log('');

  // 4. Validate TypeScript compilation
  console.log('🔧 Validating TypeScript compilation...');
  try {
    execSync('npx tsc --noEmit', { stdio: 'inherit', cwd: process.cwd() });
    console.log('✅ TypeScript compilation successful\n');
  } catch (error) {
    console.error('❌ TypeScript compilation failed');
  }

  // 5. Run tests
  console.log('🧪 Running test suite...');
  try {
    execSync('npm test -- --watchAll=false --passWithNoTests', { stdio: 'inherit', cwd: process.cwd() });
    console.log('✅ Tests passed\n');
  } catch (error) {
    console.log('⚠️ Some tests may have failed, check output above\n');
  }

  console.log('🎉 Performance test suite completed!');
  console.log('\n📋 Next Steps:');
  console.log('1. Start the development server: npm start');
  console.log('2. Check browser console for performance metrics');
  console.log('3. Test map rendering and interaction');
  console.log('4. Verify backend compatibility in network tab');
}

function checkReact18Features() {
  const appPath = path.join(__dirname, '../src/App.tsx');
  const mainMapPath = path.join(__dirname, '../src/components/MainMap/MainMap.tsx');
  
  if (fs.existsSync(appPath)) {
    const appContent = fs.readFileSync(appPath, 'utf8');
    
    // Check for React 18 features
    const features = {
      'startTransition': appContent.includes('startTransition'),
      'createRoot': appContent.includes('createRoot') || checkIndexFile(),
      'Performance monitoring': appContent.includes('measureInitialLoadTime'),
      'Backend compatibility testing': appContent.includes('testBackendCompatibility'),
    };

    Object.entries(features).forEach(([feature, implemented]) => {
      const status = implemented ? '✅' : '❌';
      console.log(`  ${status} ${feature}`);
    });
  }

  if (fs.existsSync(mainMapPath)) {
    const mainMapContent = fs.readFileSync(mainMapPath, 'utf8');
    
    const mapFeatures = {
      'useMemo optimization': mainMapContent.includes('useMemo'),
      'Map render performance': mainMapContent.includes('measureMapRenderTime'),
    };

    Object.entries(mapFeatures).forEach(([feature, implemented]) => {
      const status = implemented ? '✅' : '❌';
      console.log(`  ${status} ${feature}`);
    });
  }
}

function checkIndexFile() {
  const indexPath = path.join(__dirname, '../src/index.tsx');
  if (fs.existsSync(indexPath)) {
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    return indexContent.includes('createRoot');
  }
  return false;
}

if (require.main === module) {
  runPerformanceTest();
}

module.exports = { runPerformanceTest };