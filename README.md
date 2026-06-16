# Cualquier Verdura Rock — Landing

Landing exportada originalmente desde Base44 y adaptada para deploy independiente en Vercel.

## Stack

- React 18 + Vite 6 (JSX)
- TailwindCSS + shadcn/ui + Radix
- framer-motion (animaciones)
- react-router-dom
- @tanstack/react-query
- Vercel Serverless Function + Upstash Redis (contador compartido)

## Estructura

```
src/
  pages/Home.jsx              ← landing principal
  components/landing/         ← las 6 secciones de la página
  hooks/useWaitingCounter.js  ← lectura/incremento del contador compartido
api/
  counter.js                  ← función serverless (Vercel) que habla con Redis
public/
  assets/                     ← acá van phone.png, phone-ring.mp3, logo-sticker.png, video.mp4
```

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
# salida en /dist
```

## Deploy en Vercel

1. Push a GitHub
2. Importar el repo en vercel.com
3. Framework Preset: Vite (autodetectado)
4. Root Directory: `./`
5. Build Command: `npm run build`
6. Output Directory: `dist`

### Conectar el contador compartido (Upstash Redis)

El contador de "personas esperando" necesita una base de datos para ser
realmente compartido entre todos los visitantes. Pasos en Vercel:

1. En el proyecto → pestaña **Storage** → **Browse Marketplace** → buscar **Upstash**
2. Crear una base Redis (plan gratis)
3. Conectarla al proyecto — Vercel agrega automáticamente las variables
   `KV_REST_API_URL` y `KV_REST_API_TOKEN`
4. Redeploy

Sin esas variables configuradas, `/api/counter` responde error 500 (el
contador no va a funcionar, pero el resto de la página sí).

## Notas de la migración desde Base44

- Se quitó `@base44/vite-plugin` y `@base44/sdk` del proyecto.
- Se quitó el sistema de autenticación de Base44 (`AuthContext`, `ProtectedRoute`,
  páginas de Login/Register) ya que esta es una landing pública sin login.
  Ese código no se borró, está en `_unused-base44-auth/` por si se necesita
  en el futuro.
- El contador y el botón de "Yo también estoy esperando" antes escribían en
  `base44.entities.WaitingCount`. Ahora usan `/api/counter` (función serverless
  propia) respaldada por Upstash Redis, arrancando en 0.
- Los assets (imagen del teléfono, audio, logo, video) estaban alojados en
  `media.base44.com`. Ahora se referencian desde `/public/assets/` — ver
  `public/assets/LEEME.md` para las URLs originales a descargar.
