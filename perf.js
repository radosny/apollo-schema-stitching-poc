const autocannon = require('autocannon');

autocannon({
    url: 'http://localhost:3000/',
    duration: 10,
    connections: 1000,
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    body:
        '{"operationName":null,"variables":{},"query":"{\\n  beers(limit: 30) {\\n    description\\n    id\\n  }\\n}\\n"}'
});

autocannon({
    url: 'http://localhost:3001/',
    duration: 10,
    connections: 1000,
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    body:
        '{"operationName":null,"variables":{},"query":"{\\n  beers(limit: 30) {\\n    description\\n    id\\n  }\\n}\\n"}'
});
