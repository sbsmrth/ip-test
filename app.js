const express = require('express');
const app = express();
const port = 3000;

app.set('trust proxy', true); // Necesario si estás detrás de un proxy (Heroku, Nginx, etc.)

app.get('/', (req, res) => {
  let ips = (
    req.headers['cf-connecting-ip'] ||
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    ''
  ).split(',');

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Tu IP</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #f2f2f2;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .card {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        h1 {
          color: #333;
        }
        p {
          font-size: 1.5rem;
          color: #0077cc;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>Tu dirección IP pública es:</h1>
        <p>${ips[0].trim()}</p>
      </div>
    </body>
    </html>
  `;

  return res.send(html);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
