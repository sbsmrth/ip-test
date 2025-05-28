const express = require('express');
const app = express();
const port = 3000;

app.set('trust proxy', true); // Necesario si estás detrás de un proxy (Heroku, Nginx, etc.)

app.get('/', (req, res) => {
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (ip.includes(',')) ip = ip.split(',')[0].trim();
  if (ip.includes('::ffff:')) ip = ip.split('::ffff:')[1];

  const visits = 1;

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Tu IP</title>
      <style>
        body {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #e0f7fa, #ffffff);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100dvh;
          margin: 0;
        }

        .card {
          background: #ffffff;
          padding: 2.5rem;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 400px;
          width: 100%;
          animation: fadeIn 0.8s ease-out;
        }

        h1 {
          color: #222;
          font-size: 1.8rem;
          margin-bottom: 1rem;
        }

        h2 {
          color: #444;
          font-size: 1.2rem;
          margin-top: 2rem;
          margin-bottom: 0.5rem;
        }

        p {
          font-size: 1.5rem;
          color: #0077cc;
          font-weight: bold;
          margin: 0;
          letter-spacing: 2px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>Tu dirección IP pública es:</h1>
        <p>${ip}</p>
        <h2>Número de visitas:</h2>
        <p>${visits}</p>
      </div>
    </body>
    </html>

  `;

  return res.send(html);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
