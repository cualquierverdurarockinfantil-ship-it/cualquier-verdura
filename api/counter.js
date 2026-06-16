// Vercel Serverless Function — contador compartido global
// Usa Upstash Redis (REST API) para persistir el conteo entre todos los visitantes.
// Variables de entorno necesarias (configurar en Vercel → Settings → Environment Variables):
//   KV_REST_API_URL
//   KV_REST_API_TOKEN
// Estas se generan automáticamente al conectar una base de datos Upstash desde el
// marketplace de integraciones de Vercel (Storage → Browse Marketplace → Upstash).

const COUNTER_KEY = 'cualquier_verdura_waiting_count';

async function redisCommand(command) {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    throw new Error('Faltan las variables de entorno KV_REST_API_URL / KV_REST_API_TOKEN');
  }

  const res = await fetch(`${url}/${command.join('/')}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error(`Redis error: ${res.status}`);
  }

  const data = await res.json();
  return data.result;
}

export default async function handler(req, res) {
  // CORS básico (mismo dominio, pero por si se llama desde preview deployments)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      // Leer el valor actual (si no existe, arranca en 0)
      const value = await redisCommand(['get', COUNTER_KEY]);
      const count = value ? parseInt(value, 10) : 0;
      return res.status(200).json({ count });
    }

    if (req.method === 'POST') {
      // Incrementar en 1 de forma atómica y devolver el nuevo valor
      const newValue = await redisCommand(['incr', COUNTER_KEY]);
      return res.status(200).json({ count: newValue });
    }

    return res.status(405).json({ error: 'Método no permitido' });
  } catch (err) {
    console.error('Error en /api/counter:', err);
    return res.status(500).json({ error: 'Error interno', detail: err.message });
  }
}
