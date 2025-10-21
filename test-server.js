import fetch from 'node-fetch';

async function testEmailServer() {
  try {
    console.log('Testing email server...');
    
    // Test server connection
    const response = await fetch('http://localhost:3001/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'confirmation',
        order: {
          id: 'TEST-123',
          name: 'Test Customer',
          email: 'rhemal43@gmail.com',
          phone: '+880 1234567890',
          product: 'enta100 Elevator',
          quantity: 1,
          created_at: new Date().toISOString()
        }
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Email server is working!');
      console.log('Response:', result);
      console.log('Test email sent to rhemal43@gmail.com');
    } else {
      console.log('❌ Server responded with error:', response.status);
      const error = await response.text();
      console.log('Error details:', error);
    }
    
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('❌ Email server is not running on port 3001');
      console.log('Start it with: npm run email-server');
    } else {
      console.log('❌ Test failed:', error.message);
    }
  }
}

testEmailServer();