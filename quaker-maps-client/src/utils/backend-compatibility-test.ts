/**
 * Backend compatibility testing utilities for React 18 upgrade
 */

interface BackendTestResult {
  endpoint: string;
  status: 'success' | 'error';
  responseTime: number;
  error?: string;
}

/**
 * Test Firebase Functions endpoints for compatibility
 */
export const testBackendCompatibility = async (): Promise<BackendTestResult[]> => {
  const endpoints = [
    'https://quaker-maps.s3-us-west-1.amazonaws.com/meetings.json',
    // Add other Firebase Function endpoints here when available
  ];

  const results: BackendTestResult[] = [];

  for (const endpoint of endpoints) {
    const startTime = performance.now();
    
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const endTime = performance.now();
      const responseTime = endTime - startTime;

      if (response.ok) {
        results.push({
          endpoint,
          status: 'success',
          responseTime,
        });
      } else {
        results.push({
          endpoint,
          status: 'error',
          responseTime,
          error: `HTTP ${response.status}: ${response.statusText}`,
        });
      }
    } catch (error) {
      const endTime = performance.now();
      const responseTime = endTime - startTime;
      
      results.push({
        endpoint,
        status: 'error',
        responseTime,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  return results;
};

/**
 * Log backend compatibility test results
 */
export const logBackendTestResults = (results: BackendTestResult[]): void => {
  console.group('🔗 Backend Compatibility Test Results');
  
  results.forEach(result => {
    const status = result.status === 'success' ? '✅' : '❌';
    console.log(`${status} ${result.endpoint}`);
    console.log(`   Response Time: ${result.responseTime.toFixed(2)}ms`);
    
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
  });
  
  const successCount = results.filter(r => r.status === 'success').length;
  const totalCount = results.length;
  
  console.log(`\n📊 Summary: ${successCount}/${totalCount} endpoints working`);
  console.groupEnd();
};

/**
 * Test meeting data structure compatibility
 */
export const testMeetingDataStructure = (meetings: any[]): boolean => {
  if (!Array.isArray(meetings) || meetings.length === 0) {
    console.warn('⚠️ No meetings data available for structure test');
    return false;
  }

  const sampleMeeting = meetings[0];
  const requiredFields = ['title', 'latitude', 'longitude', 'slug'];
  
  const missingFields = requiredFields.filter(field => !(field in sampleMeeting));
  
  if (missingFields.length > 0) {
    console.error(`❌ Missing required fields in meeting data: ${missingFields.join(', ')}`);
    return false;
  }

  console.log('✅ Meeting data structure is compatible');
  return true;
};