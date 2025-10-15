# 🔐 Configuración de Autenticación con Google

Este proyecto utiliza **NextAuth.js** con **Google OAuth** para autenticar usuarios. Solo las cuentas de Google que estén en la lista de autorizados podrán acceder a la aplicación.

---

## 📋 Pasos para Configurar

### **1. Crear Credenciales de Google OAuth**

#### 1.1. Accede a Google Cloud Console
- Ve a [Google Cloud Console](https://console.cloud.google.com/)
- Inicia sesión con tu cuenta de Google

#### 1.2. Crea o Selecciona un Proyecto
- Click en el selector de proyectos en la parte superior
- Click en **"Nuevo Proyecto"**
- Nombre del proyecto: `Research AI App` (o el nombre que prefieras)
- Click en **"Crear"**

#### 1.3. Habilita la API de Google+
- En el menú lateral, ve a **"APIs y servicios"** > **"Biblioteca"**
- Busca: `Google+ API`
- Click en **"Google+ API"**
- Click en **"Habilitar"**

#### 1.4. Configura la Pantalla de Consentimiento
- En el menú lateral, ve a **"APIs y servicios"** > **"Pantalla de consentimiento de OAuth"**
- Selecciona **"Externo"** (si es para uso personal/demo)
- Click en **"Crear"**
- Completa la información requerida:
  - **Nombre de la aplicación**: `Research AI App`
  - **Correo de asistencia del usuario**: Tu email
  - **Dominios autorizados**: (déjalo vacío por ahora)
  - **Correo de contacto del desarrollador**: Tu email
- Click en **"Guardar y continuar"**
- En "Ámbitos", click en **"Guardar y continuar"** (sin agregar nada)
- En "Usuarios de prueba", agrega los emails que quieres autorizar:
  - Click en **"+ Add Users"**
  - Agrega tu email y cualquier otro email autorizado
  - Click en **"Guardar y continuar"**

#### 1.5. Crea las Credenciales OAuth 2.0
- En el menú lateral, ve a **"APIs y servicios"** > **"Credenciales"**
- Click en **"+ Crear credenciales"**
- Selecciona **"ID de cliente de OAuth"**
- Tipo de aplicación: **"Aplicación web"**
- Nombre: `Research AI App Client`
- **URIs de redireccionamiento autorizados** (muy importante):
  ```
  http://localhost:3000/api/auth/callback/google
  ```
  
  Si vas a desplegar en Vercel, también agrega:
  ```
  https://tu-proyecto.vercel.app/api/auth/callback/google
  ```
  
- Click en **"Crear"**
- **¡IMPORTANTE!** Copia el **Client ID** y el **Client Secret** que aparecen

---

### **2. Configurar Variables de Entorno**

#### 2.1. Genera un NEXTAUTH_SECRET
Ejecuta en PowerShell:
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

Copia el resultado generado.

#### 2.2. Edita el archivo `.env.local`
Abre el archivo `.env.local` en la raíz del proyecto y agrega:

```env
# NEXTAUTH
NEXTAUTH_SECRET=el-secret-generado-en-paso-anterior
NEXTAUTH_URL=http://localhost:3000

# GOOGLE OAUTH
GOOGLE_CLIENT_ID=tu-client-id-copiado-de-google.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu-client-secret-copiado-de-google
```

---

### **3. Configurar Usuarios Autorizados**

#### 3.1. Edita el archivo de autenticación
Abre el archivo: `src/app/api/auth/[...nextauth]/route.ts`

#### 3.2. Modifica la lista de emails autorizados
Busca esta sección:

```typescript
// Lista de emails autorizados - Solo estos usuarios podrán acceder
const AUTHORIZED_EMAILS = [
  "tu-email@gmail.com", // Reemplaza con tu email de Google
  // Agrega más emails autorizados aquí
];
```

Reemplaza `"tu-email@gmail.com"` con tu email real de Google.

Para autorizar más usuarios, simplemente agrega más emails:

```typescript
const AUTHORIZED_EMAILS = [
  "usuario1@gmail.com",
  "usuario2@gmail.com",
  "jefe@empresa.com",
  // Agrega todos los emails que necesites
];
```

---

### **4. Configurar en Vercel (para despliegue)**

#### 4.1. Accede a tu proyecto en Vercel
- Ve a [Vercel Dashboard](https://vercel.com/dashboard)
- Selecciona tu proyecto

#### 4.2. Configura las Variables de Entorno
- Ve a **Settings** > **Environment Variables**
- Agrega las siguientes variables:

| Variable | Valor |
|----------|-------|
| `OPENAI_API_KEY` | Tu API key de OpenAI |
| `EXA_API_KEY` | Tu API key de Exa (opcional) |
| `EXA_API_URL` | `https://api.exa.ai` |
| `NEXTAUTH_SECRET` | El secret generado anteriormente |
| `NEXTAUTH_URL` | `https://tu-proyecto.vercel.app` |
| `GOOGLE_CLIENT_ID` | Tu Google Client ID |
| `GOOGLE_CLIENT_SECRET` | Tu Google Client Secret |

#### 4.3. Actualiza las URIs de Redirección en Google
- Vuelve a [Google Cloud Console](https://console.cloud.google.com/)
- Ve a **"APIs y servicios"** > **"Credenciales"**
- Click en tu OAuth 2.0 Client ID
- En **"URIs de redireccionamiento autorizados"**, agrega:
  ```
  https://tu-proyecto.vercel.app/api/auth/callback/google
  ```
- Click en **"Guardar"**

#### 4.4. Redespliega el Proyecto
- En Vercel, ve a **Deployments**
- Click en el menú (3 puntos) del último deployment
- Click en **"Redeploy"**

---

## 🧪 Probar la Autenticación

### En Desarrollo (localhost:3000)
1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Abre tu navegador en: `http://localhost:3000`

3. Serás redirigido a `/login`

4. Click en **"Continuar con Google"**

5. Selecciona tu cuenta de Google

6. **Si tu email está en la lista de autorizados**: Accederás a la aplicación ✅

7. **Si tu email NO está autorizado**: Verás un mensaje de error ❌

### En Producción (Vercel)
1. Accede a tu URL de Vercel: `https://tu-proyecto.vercel.app`

2. Sigue los mismos pasos que en desarrollo

---

## 🔒 Cómo Funciona la Seguridad

1. **Lista Blanca de Emails**:
   - Solo los emails en `AUTHORIZED_EMAILS` pueden acceder
   - Los demás usuarios serán rechazados automáticamente

2. **Middleware de Protección**:
   - Todas las rutas principales están protegidas
   - Los usuarios no autenticados son redirigidos a `/login`

3. **API Keys Protegidas**:
   - Las API keys están en variables de entorno
   - Nunca se exponen al cliente
   - Solo se usan en Server Actions y API Routes

4. **Sesión con JWT**:
   - NextAuth usa JSON Web Tokens para las sesiones
   - Las sesiones están firmadas con `NEXTAUTH_SECRET`

---

## 🚨 Solución de Problemas

### Error: "Configuration not found"
- **Causa**: Las variables de entorno no están configuradas
- **Solución**: Verifica que `.env.local` tenga todas las variables necesarias

### Error: "Redirect URI mismatch"
- **Causa**: La URI de redirección en Google no coincide
- **Solución**: 
  1. Verifica que en Google Cloud Console tengas agregado: `http://localhost:3000/api/auth/callback/google`
  2. Si estás en Vercel, verifica que también tengas: `https://tu-proyecto.vercel.app/api/auth/callback/google`

### Error: "Access Denied" después de iniciar sesión
- **Causa**: Tu email no está en la lista de autorizados
- **Solución**: Agrega tu email a `AUTHORIZED_EMAILS` en `src/app/api/auth/[...nextauth]/route.ts`

### No puedo agregar usuarios de prueba en Google
- **Causa**: Tu proyecto está en modo "Externo" sin verificación
- **Solución**: 
  - En modo "Externo" sin publicar, puedes tener hasta 100 usuarios de prueba
  - Asegúrate de agregarlos en "Pantalla de consentimiento de OAuth" > "Usuarios de prueba"

---

## 📝 Agregar Más Usuarios Autorizados

Para autorizar a más personas:

1. Abre: `src/app/api/auth/[...nextauth]/route.ts`

2. Agrega sus emails:
```typescript
const AUTHORIZED_EMAILS = [
  "usuario1@gmail.com",
  "usuario2@gmail.com",
  "nuevo-usuario@gmail.com", // ← Nuevo usuario
];
```

3. Guarda el archivo

4. Si estás en desarrollo:
   - Simplemente guarda y el servidor se recargará automáticamente

5. Si estás en producción (Vercel):
   - Haz commit y push de los cambios:
     ```bash
     git add src/app/api/auth/[...nextauth]/route.ts
     git commit -m "Agrega nuevo usuario autorizado"
     git push
     ```
   - Vercel redesplegará automáticamente

---

## ✅ Checklist de Configuración

- [ ] Proyecto creado en Google Cloud Console
- [ ] Google+ API habilitada
- [ ] Pantalla de consentimiento configurada
- [ ] Credenciales OAuth 2.0 creadas
- [ ] URIs de redirección configuradas
- [ ] `NEXTAUTH_SECRET` generado
- [ ] Variables de entorno configuradas en `.env.local`
- [ ] Emails autorizados agregados en `AUTHORIZED_EMAILS`
- [ ] Variables de entorno configuradas en Vercel (si aplica)
- [ ] URIs de redirección de Vercel agregadas en Google (si aplica)
- [ ] Probado el login en desarrollo
- [ ] Probado el login en producción (si aplica)

---

## 🎯 ¡Listo!

Tu aplicación ahora tiene autenticación segura con Google. Solo los usuarios que tú autorices podrán acceder y utilizar las API keys.

**Recuerda**: Cada vez que quieras autorizar a un nuevo usuario, simplemente agrega su email de Google a la lista `AUTHORIZED_EMAILS` y redespliega la aplicación.
