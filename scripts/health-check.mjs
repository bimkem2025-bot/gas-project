const port = process.env.PORT || 3000;
const url = `http://127.0.0.1:${port}/api/health`;

const response = await fetch(url);
if (!response.ok) {
  console.error(`Health check failed: ${response.status}`);
  process.exit(1);
}

const body = await response.json();
if (!body.ok) {
  console.error('Health check payload invalid:', body);
  process.exit(1);
}

console.log('Health check OK:', body);
