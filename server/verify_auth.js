async function testAuth() {
  const baseURL = 'http://localhost:5000/api/auth';
  const credentials = {
    name: 'Test Warrior',
    email: 'test' + Date.now() + '@example.com',
    password: 'password123',
    role: 'USER',
    location: 'Mumbai'
  };

  let cookie = '';

  try {
    console.log('--- Testing Signup ---');
    const signupRes = await fetch(`${baseURL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    const signupData = await signupRes.json();
    console.log('Signup Status:', signupRes.status);
    console.log('Signup Data:', signupData);
    
    const setCookie = signupRes.headers.get('set-cookie');
    console.log('Set-Cookie Header:', setCookie);

    if (!setCookie || !setCookie.includes('token=')) {
      throw new Error('Token cookie NOT found in signup response');
    }
    cookie = setCookie.split(';')[0];
    console.log('Signup SUCCESS');

    console.log('\n--- Testing Me endpoint (Session Restoration) ---');
    const meRes = await fetch(`${baseURL}/me`, {
      headers: { 'Cookie': cookie }
    });
    const meData = await meRes.json();
    console.log('Me Status:', meRes.status);
    console.log('Me Data:', meData);
    if (meData.email !== credentials.email) {
      throw new Error('Me endpoint returned incorrect user data');
    }
    console.log('Me endpoint SUCCESS');

    console.log('\n--- Testing Logout ---');
    const logoutRes = await fetch(`${baseURL}/logout`, {
      method: 'POST',
      headers: { 'Cookie': cookie }
    });
    const logoutData = await logoutRes.json();
    console.log('Logout Status:', logoutRes.status);
    console.log('Logout Data:', logoutData);
    
    const clearedCookie = logoutRes.headers.get('set-cookie');
    console.log('Cleared-Cookie Header:', clearedCookie);

    console.log('\n--- Testing Me endpoint after Logout ---');
    const meResPostLogout = await fetch(`${baseURL}/me`, {
      headers: { 'Cookie': cookie } // Still trying with old cookie
    });
    console.log('Me Post-Logout Status:', meResPostLogout.status);
    if (meResPostLogout.status === 401) {
      console.log('Me endpoint failed as expected (401)');
    } else {
      throw new Error('Me endpoint should have failed after logout');
    }

    console.log('\n--- ALL BACKEND AUTH TESTS PASSED ---');
    process.exit(0);
  } catch (err) {
    console.error('TEST FAILED:', err.message);
    process.exit(1);
  }
}

// Give server time to start
setTimeout(testAuth, 2000);
