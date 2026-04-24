const http = require('http');

const rides = [];
const drivers = [{ id: 1, name: 'Zacharis Fredrick', rating: 5.0, car: 'Silver Toyota Camry', plate: 'ABC 3244' }];

function json(res, data, status = 200) {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS' });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}); } catch { resolve({}); }
    });
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return json(res, { ok: true });
  if (req.url === '/api/health') return json(res, { ok: true, app: 'MOVO mock API' });
  if (req.url === '/api/rides/estimate' && req.method === 'POST') return json(res, { currency: 'GEL', options: [
    { type: 'movo_plus', title: 'MOVO Plus', price: 6.5, eta: '12 min' },
    { type: 'movo_cargo', title: 'MOVO Cargo', price: 9.5, eta: '12 min' },
    { type: 'movo_air', title: 'MOVO Air', price: 256, eta: '45 min' }
  ]});
  if (req.url === '/api/rides/request' && req.method === 'POST') {
    const body = await readBody(req);
    const ride = { id: rides.length + 1, status: 'driver_assigned', driver: drivers[0], ...body };
    rides.push(ride);
    return json(res, ride, 201);
  }
  if (req.url === '/api/driver/requests') return json(res, { requests: rides.filter(r => r.status !== 'completed') });
  return json(res, { message: 'Not found' }, 404);
});

server.listen(8000, () => console.log('MOVO mock API running on http://localhost:8000'));
