# Sonia & Conrado — Invitación de boda

Proyecto React + Vite + Tailwind + Framer Motion con una experiencia mobile-first, pantalla de apertura, cuenta regresiva, RSVP y panel admin.

## Qué incluye
- Portada de apertura con botón "Abrir invitación"
- Hero principal
- Cuenta regresiva al 20/06/2026 17:00 (-03:00)
- Secciones de ceremonia y recepción con enlaces a Google Maps
- Dress code
- Formulario RSVP con lógica condicional
- Mensaje de éxito
- Panel admin en `/admin`
- Persistencia a `lista_invitados_boda_sonia_conrado.xlsx`

## Instalar
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Editar contenido
Toda la información principal está centralizada en `src/lib/content.js`.

## Admin
Ruta: `/admin`
- usuario: `admin`
- contraseña: `admin123`

Nota: estas credenciales están hardcodeadas solo para MVP. En producción deben moverse a variables de entorno y autenticación real.

## API
Este repositorio incluye handlers estilo Vercel en `/api`. Para producción en Vercel, puedes desplegarlos como funciones serverless. En entornos serverless reales, escribir directamente un archivo `.xlsx` en disco puede no ser persistente. Para despliegue estable, conviene cambiar el backend a almacenamiento persistente (Blob, S3, Supabase Storage o similar).

Endpoints:
- `POST /api/rsvp`
- `GET /api/admin-rsvps`
- `GET /api/export-xlsx`

## Estructura Excel
Archivo: `lista_invitados_boda_sonia_conrado.xlsx`
Columnas:
- FechaRegistro
- Titular
- Asiste
- TieneAcompanantes
- CantidadAcompanantes
- CantidadMenores
- Acompanante1
- Acompanante2
- Acompanante3
- Telefono
- Mensaje
- TotalAsistentes

## Siguiente mejora recomendada
- sustituir auth MVP por auth segura
- usar storage persistente para el XLSX
- añadir tests y sanitización adicional
