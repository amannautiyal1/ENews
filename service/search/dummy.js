const { Client } = require('@opensearch-project/opensearch');
const https = require('https');

const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: 'admin',
    password: 'YhgicrijpBG1uvk@1'
  },
  ssl: {
    rejectUnauthorized: false // This disables SSL cert checking
  },
  agent: new https.Agent({
    rejectUnauthorized: false
  })
});

// Test the connection
(async () => {
  try {
    const response = await client.info();
    console.log('✅ Connected to OpenSearch');
    console.dir(response.body, { depth: null });
  } catch (error) {
    console.error('❌ Connection failed:', error);
  }
})();
