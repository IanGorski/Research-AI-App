# 🚀 INSTRUCCIONES RÁPIDAS - Autenticación con Google

## ✅ Lo que YA está configurado:

1. ✅ NextAuth.js instalado
2. ✅ Página de login con botón de Google
3. ✅ Sistema de lista blanca de emails
4. ✅ Middleware de protección de rutas
5. ✅ `NEXTAUTH_SECRET` generado: `KOId1RFvZ3lK57GV4rtF/bhFZwy7iqc0P0AuUC/X884=`

---

## ⚠️ Lo que DEBES hacer:

### **PASO 1: Obtener Credenciales de Google** (15 minutos)

1. Ve a: https://console.cloud.google.com/
2. Crea un nuevo proyecto o selecciona uno
3. Habilita "Google+ API"
4. Ve a "Pantalla de consentimiento de OAuth" → Configura como "Externo"
5. Ve a "Credenciales" → "Crear credenciales" → "ID de cliente de OAuth"
6. Tipo: "Aplicación web"
7. URIs de redirección: `http://localhost:3000/api/auth/callback/google`
8. **Copia el Client ID y Client Secret**

### **PASO 2: Configurar Variables de Entorno**

Edita el archivo `.env.local` y reemplaza:

```env
# Reemplaza con tu API key de OpenAI
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxx

# Reemplaza con tus credenciales de Google
GOOGLE_CLIENT_ID=xxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxxxxxxxxxxxxxxx
```

### **PASO 3: Agregar tu Email a la Lista de Autorizados**

Edita el archivo: `src/app/api/auth/[...nextauth]/route.ts`

Cambia:
```typescript
const AUTHORIZED_EMAILS = [
  "tu-email@gmail.com", // ← Reemplaza con tu email real
];
```

Por:
```typescript
const AUTHORIZED_EMAILS = [
  "tu-email-real@gmail.com", // ← Tu email de Google
];
```

### **PASO 4: Probar**

```bash
npm run dev
```

Abre: http://localhost:3000

---

## 📝 Para Agregar Más Usuarios

Edita `src/app/api/auth/[...nextauth]/route.ts`:

```typescript
const AUTHORIZED_EMAILS = [
  "usuario1@gmail.com",
  "usuario2@gmail.com",
  "jefe@empresa.com",
];
```

---

## 🚀 Para Desplegar en Vercel

1. **En Google Cloud Console**:
   - Agrega: `https://tu-proyecto.vercel.app/api/auth/callback/google`

2. **En Vercel → Settings → Environment Variables**:
   - `OPENAI_API_KEY`
   - `EXA_API_KEY` (opcional)
   - `EXA_API_URL` = `https://api.exa.ai`
   - `NEXTAUTH_SECRET` = `KOId1RFvZ3lK57GV4rtF/bhFZwy7iqc0P0AuUC/X884=`
   - `NEXTAUTH_URL` = `https://tu-proyecto.vercel.app`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`

3. Redespliega el proyecto

---

## 📚 Documentación Completa

Para más detalles, lee: `CONFIGURACION_GOOGLE_AUTH.md`

---

## ✅ Checklist

- [ ] Credenciales de Google creadas
- [ ] `OPENAI_API_KEY` configurada en `.env.local`
- [ ] `GOOGLE_CLIENT_ID` configurada en `.env.local`
- [ ] `GOOGLE_CLIENT_SECRET` configurada en `.env.local`
- [ ] Tu email agregado a `AUTHORIZED_EMAILS`
- [ ] Probado en desarrollo (`npm run dev`)
- [ ] Variables configuradas en Vercel (si aplica)
- [ ] URI de Vercel agregada en Google (si aplica)

---

**Tiempo estimado**: 15-20 minutos ⏱️
