# 📰 Research AI App - Plataforma de Investigación y Generación de Contenido Periodístico

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000?style=flat-square&logo=vercel)](https://research-ai-app.vercel.app/)

[![Next.js](https://img.shields.io/badge/Next.js-15.5.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vercel AI SDK](https://img.shields.io/badge/Vercel_AI_SDK-5.0.71-black?style=flat-square)](https://sdk.vercel.ai/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.14-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

> **Plataforma completa de investigación y generación de contenido periodístico potenciada por Inteligencia Artificial.**  
> Integra la API de Exa para investigación y el Vercel AI SDK con OpenAI para generación de contenido en tiempo real.

---

## 📑 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Demo y Capturas](#-demo-y-capturas)
- [Stack Tecnológico](#️-stack-tecnológico)
- [Arquitectura](#️-arquitectura)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Guía de Uso](#-guía-de-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Consideraciones Especiales](#-consideraciones-especiales)
- [Mejoras Futuras](#-mejoras-futuras)
- [Troubleshooting](#-troubleshooting)
- [Licencia](#-licencia)

---

## ✨ Características Principales

### 🔍 **Investigación Inteligente con Exa API**
- **Búsqueda avanzada**: Realiza investigaciones sobre cualquier tema usando la API de Exa
- **Categorización automática**: Los resultados se clasifican inteligentemente en:
  - ✅ **Vale la pena expandir**: Contenido rico y detallado (>100 caracteres de resumen)
  - ⏭️ **No vale la pena expandir**: Contenido breve o superficial
- **Información completa**: Accede a títulos, URLs, resúmenes y autores de cada resultado
- **Integración fluida**: Genera artículos directamente desde los resultados de investigación

### ✍️ **Generación de Artículos con IA**
- **Múltiples fuentes de entrada**:
  - 📝 **Tema**: Genera artículos desde cero sobre cualquier tema
  - 🔗 **URL**: Analiza y crea contenido basado en una URL
  - 🖼️ **Imagen**: Analiza imágenes y genera artículos descriptivos (GPT-4 Vision)
- **Streaming en tiempo real**: Observa cómo se genera el artículo palabra por palabra
- **Contenido profesional**: Artículos estructurados listos para publicación periodística
- **Powered by GPT-4 Turbo**: Utiliza el modelo más avanzado de OpenAI

### 🎯 **Generación de Títulos Dinámicos**
- **Títulos personalizados**: Genera entre 1-10 títulos diferentes para un mismo artículo
- **Powered by `generateObject()`**: Utiliza el hook de Vercel AI SDK con esquemas Zod
- **Selección interactiva**: Elige el título que más te guste con un clic
- **Integración automática**: El título se incorpora al artículo en el editor

### ✏️ **Editor Integrado**
- **Edición en vivo**: Modifica el contenido generado en tiempo real
- **Integración de títulos**: El título seleccionado se integra automáticamente
- **Interfaz intuitiva**: Editor de texto simple y efectivo
- **Sincronización automática**: Los cambios se reflejan instantáneamente

---

## 🎬 Demo y Capturas

### Flujo Completo de la Aplicación

#### 1. **Panel de Investigación con Exa**
```
┌─────────────────────────────────────────────────────────┐
│  🔍 Investigación con Exa API                           │
│                                                          │
│  Tema de Investigación                                  │
│  ┌────────────────────────────────┐  ┌──────────────┐  │
│  │ Inteligencia Artificial        │  │  Investigar  │  │
│  └────────────────────────────────┘  └──────────────┘  │
│                                                          │
│  ✅ Vale la pena expandir (5)                           │
│  ┌────────────────────────────────────────────────────┐ │
│  │ 📄 El impacto de la IA en el periodismo            │ │
│  │ 🔗 https://ejemplo.com/ia-periodismo               │ │
│  │ 📝 Análisis profundo sobre cómo la inteligencia... │ │
│  │ [Generar Artículo desde este Resultado]            │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

#### 2. **Generador de Artículos con Streaming**
```
┌─────────────────────────────────────────────────────────┐
│  ✨ Generador de Artículos con IA                       │
│                                                          │
│  Tipo de Entrada:  [Tema] [URL] [Imagen]               │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Inteligencia Artificial en el periodismo           │ │
│  └────────────────────────────────────────────────────┘ │
│  [Generar Artículo]                                     │
│                                                          │
│  Artículo Generado:                                     │
│  ┌────────────────────────────────────────────────────┐ │
│  │ La inteligencia artificial está transformando     │ │
│  │ radicalmente la forma en que se produce           │ │
│  │ contenido periodístico. Desde la automatización   │ │
│  │ de noticias hasta el análisis de datos... ▋       │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

#### 3. **Generador de Títulos Dinámicos**
```
┌─────────────────────────────────────────────────────────┐
│  🎯 Generador de Títulos Dinámicos                      │
│                                                          │
│  ¿Cuántos títulos? [3] [Generar Títulos]               │
│                                                          │
│  Títulos Generados (3):                                 │
│  ┌────────────────────────────────────────────────────┐ │
│  │ ✓ La IA Revoluciona el Periodismo Moderno         │ │
│  └────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Inteligencia Artificial: El Nuevo Periodista       │ │
│  └────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Cómo la IA Está Transformando las Redacciones     │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Características Visuales
- ✨ **Interfaz moderna** con TailwindCSS
- 🎨 **Código de colores** para diferentes estados
- 📱 **Diseño responsive** que se adapta a cualquier dispositivo
- ⚡ **Animaciones fluidas** y transiciones CSS
- 🔄 **Feedback visual** en tiempo real durante la generación

---

## 🛠️ Stack Tecnológico

### **Frontend**
- **[Next.js 15.5.5](https://nextjs.org/)** - Framework React con App Router y Server Components
- **[React 19.1.0](https://react.dev/)** - Biblioteca de interfaz de usuario
- **[TypeScript 5.9.3](https://www.typescriptlang.org/)** - Tipado estático para JavaScript
- **[TailwindCSS 4.1.14](https://tailwindcss.com/)** - Framework CSS utility-first

### **AI & Machine Learning**
- **[Vercel AI SDK 5.0.71](https://sdk.vercel.ai/)** - SDK para integración de IA
- **[@ai-sdk/openai 2.0.52](https://sdk.vercel.ai/providers/ai-sdk-providers/openai)** - Provider de OpenAI para el AI SDK
- **[Zod 4.1.12](https://zod.dev/)** - Validación de esquemas TypeScript-first
- **OpenAI GPT-4 Turbo** - Modelo de lenguaje para generación de contenido
- **OpenAI GPT-4o-mini** - Modelo optimizado para tareas específicas

### **APIs Externas**
- **[Exa API](https://exa.ai/)** - API de búsqueda e investigación inteligente
- **[OpenAI API](https://platform.openai.com/)** - API de modelos de lenguaje

### **Utilidades**
- **[Axios 1.12.2](https://axios-http.com/)** - Cliente HTTP para peticiones
- **[Lucide React 0.545.0](https://lucide.dev/)** - Iconos React (opcional)
- **[clsx](https://github.com/lukeed/clsx)** & **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Utilidades para clases CSS

### **Desarrollo**
- **ESLint 9** - Linter para código JavaScript/TypeScript
- **Turbopack** - Bundler de nueva generación incluido en Next.js
- **PostCSS** - Procesador de CSS

---

## 🏗️ Arquitectura

### **Patrón de Arquitectura: Next.js App Router**

Este proyecto implementa las mejores prácticas de Next.js 15 con una clara separación entre:

#### **🖥️ Server Components**
- Renderizado en el servidor para mejor rendimiento y SEO
- Acceso directo a bases de datos y APIs sin exponer credenciales
- Reducción del JavaScript enviado al cliente
- Ubicación: `src/app/page.tsx`, `src/app/layout.tsx`

#### **💻 Client Components**
- Interactividad en el navegador (useState, useEffect, etc.)
- Eventos del usuario y actualizaciones en tiempo real
- Marcados con la directiva `'use client'`
- Ubicación: `src/components/*.tsx`

#### **⚡ Server Actions**
- Funciones del servidor invocables desde el cliente
- Lógica de negocio sensible ejecutada de forma segura
- Marcados con la directiva `'use server'`
- Ubicación: `src/app/actions/*.ts`

#### **🌐 API Routes**
- Endpoints HTTP tradicionales (GET, POST, etc.)
- Actúan como wrappers para Server Actions (compatibilidad)
- Ubicación: `src/app/api/*/route.ts`

### **Flujo de Datos**

```
┌──────────────┐
│   Usuario    │
└──────┬───────┘
       │
       │ Interactúa con
       ▼
┌─────────────────────────────────────────┐
│   Client Component (Navegador)         │
│   - ArticleGenerator.tsx                │
│   - TitleGenerator.tsx                  │
│   - ResearchPanel.tsx                   │
└─────────────┬───────────────────────────┘
              │
              │ Llama a
              ▼
┌─────────────────────────────────────────┐
│   API Route (Servidor)                  │
│   - /api/generate-article               │
│   - /api/generate-titles                │
│   - /api/research                       │
└─────────────┬───────────────────────────┘
              │
              │ Delega a
              ▼
┌─────────────────────────────────────────┐
│   Server Action (Servidor)              │
│   - generateArticle()                   │
│   - generateTitles()                    │
└─────────────┬───────────────────────────┘
              │
              │ Usa
              ▼
┌─────────────────────────────────────────┐
│   Servicios Centralizados               │
│   - openaiService.ts                    │
│   - exaApi.ts                           │
│   - validationService.ts                │
└─────────────┬───────────────────────────┘
              │
              │ Llama a
              ▼
┌─────────────────────────────────────────┐
│   APIs Externas                         │
│   - OpenAI API                          │
│   - Exa API                             │
└─────────────────────────────────────────┘
```

### **Características de la Arquitectura**

✅ **Streaming de Respuestas**
- Utiliza `streamText()` para generar contenido en tiempo real
- El usuario ve el progreso palabra por palabra
- Mejor percepción de velocidad y engagement

✅ **Generación Estructurada**
- Utiliza `generateObject()` con esquemas Zod
- Garantiza que las respuestas tengan el formato correcto
- Validación automática de tipos

✅ **Servicios Centralizados**
- `openaiService`: Configuración única de OpenAI con modelos predefinidos
- `exaApi`: Lógica de búsqueda e investigación centralizada
- `validationService`: Validaciones reutilizables en toda la app

✅ **Seguridad**
- API Keys nunca expuestas al cliente
- Validación de entradas en el servidor
- Sanitización de datos antes de usar

---

## 🚀 Instalación y Configuración

### **Prerrequisitos**

Asegúrate de tener instalado:

- **Node.js 18.0 o superior** - [Descargar aquí](https://nodejs.org/)
- **npm** (incluido con Node.js) o **pnpm** - [Instalar pnpm](https://pnpm.io/)
- **Git** - [Descargar aquí](https://git-scm.com/)

### **API Keys Necesarias**

1. **OpenAI API Key** (REQUERIDA)
   - Regístrate en [platform.openai.com](https://platform.openai.com/)
   - Ve a [API Keys](https://platform.openai.com/api-keys)
   - Crea una nueva API key
   - ⚠️ **Importante**: Asegúrate de tener créditos en tu cuenta

2. **Exa API Key** (Opcional - solo para investigación)
   - Regístrate en [exa.ai](https://exa.ai/)
   - Obtén tu API key desde el dashboard
   - Sin esta key, la funcionalidad de investigación no estará disponible

### **Pasos de Instalación**

#### **1. Clonar el Repositorio**

```bash
git clone https://github.com/tu-usuario/research-ai-app.git
cd research-ai-app
```

#### **2. Instalar Dependencias**

```bash
npm install
# o si usas pnpm
pnpm install
```

#### **3. Configurar Variables de Entorno**

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
# En Windows (PowerShell)
Copy-Item .env.example .env.local

# En Linux/Mac
cp .env.example .env.local
```

Edita `.env.local` y completa con tus API keys:

```env
# OpenAI API (REQUERIDA)
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Exa API (Opcional - para investigación)
EXA_API_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
EXA_API_URL=https://api.exa.ai
```

> ⚠️ **IMPORTANTE**: 
> - Nunca compartas tus API keys públicamente
> - No subas el archivo `.env.local` a Git (ya está en `.gitignore`)
> - Usa `.env.example` como referencia, no como archivo de producción

#### **4. Ejecutar el Servidor de Desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en:
```
http://localhost:3000
```

#### **5. Compilar para Producción (Opcional)**

```bash
# Compilar
npm run build

# Ejecutar en modo producción
npm run start
```

---

## 📖 Guía de Uso

### **1. Investigación con Exa API**

#### Paso a Paso:

1. **Abrir la aplicación** en `http://localhost:3000`
2. **Ir a la pestaña** "🔍 Investigación con Exa"
3. **Ingresar un tema** de investigación en el campo de texto
   - Ejemplo: "Inteligencia Artificial", "Cambio Climático", "Criptomonedas"
4. **Click en "Investigar"**
5. **Esperar los resultados** - Se mostrarán en dos categorías:
   - ✅ Vale la pena expandir (contenido rico)
   - ⏭️ No vale la pena expandir (contenido breve)
6. **Revisar cada resultado** - Verás título, URL, resumen y autor
7. **Generar artículo** - Click en el botón "Generar Artículo desde este Resultado"

#### Resultado:
- Automáticamente cambiará a la pestaña de generación
- El artículo comenzará a generarse usando el resultado seleccionado como contexto

---

### **2. Generación de Artículos**

#### Opción A: Desde un Tema

1. **Ir a la pestaña** "✨ Generar Artículo"
2. **Seleccionar** el botón "Tema"
3. **Escribir un tema** específico
   - Ejemplo: "El futuro de la energía renovable"
4. **Click en "Generar Artículo"**
5. **Observar el streaming** - El artículo se escribe en tiempo real

#### Opción B: Desde una URL

1. **Seleccionar** el botón "URL"
2. **Pegar una URL** de un artículo o recurso
   - Ejemplo: "https://ejemplo.com/articulo-interesante"
3. **Click en "Generar Artículo"**
4. **El artículo se generará** basándose en el contenido de la URL

#### Opción C: Desde una Imagen

1. **Seleccionar** el botón "Imagen"
2. **Click en "Selecciona una imagen"**
3. **Elegir un archivo** de imagen de tu dispositivo
4. **Ver la vista previa** de la imagen
5. **Click en "Generar Artículo"**
6. **El artículo se generará** describiendo y analizando la imagen

#### Resultado:
- Artículo periodístico profesional de 500-800 palabras
- Estructura completa: introducción, desarrollo, análisis y conclusión
- Formato listo para publicación

---

### **3. Generación de Títulos Dinámicos**

#### Paso a Paso:

1. **Primero genera un artículo** (usando cualquiera de los métodos anteriores)
2. **Desplazarse** al "Generador de Títulos Dinámicos"
3. **Seleccionar la cantidad** de títulos deseados (1-10)
4. **Click en "Generar Títulos"**
5. **Revisar los títulos** generados
6. **Click en el título favorito** para seleccionarlo

#### Resultado:
- El título seleccionado se marca con ✓
- Aparece en un panel verde con el texto "Título Seleccionado"
- Se integra automáticamente en el editor

---

### **4. Edición del Contenido**

#### Funcionalidades:

1. **Editor automático** - Aparece automáticamente después de generar un artículo
2. **Edición en vivo** - Escribe o modifica el contenido directamente
3. **Integración de título** - Si seleccionaste un título, aparece en la parte superior
4. **Actualización en tiempo real** - Los cambios se reflejan instantáneamente

#### Uso:

```
┌─────────────────────────────────────────────┐
│  ✏️ Editor de Artículo                      │
│                                              │
│  Título seleccionado:                       │
│  La IA Revoluciona el Periodismo Moderno    │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ # La IA Revoluciona el Periodismo    │  │
│  │                                       │  │
│  │ La inteligencia artificial está      │  │
│  │ transformando radicalmente...         │  │
│  │ [Editable]                            │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

---

## 📁 Estructura del Proyecto

```
research-ai-app/
├── src/
│   ├── app/                          # App Router de Next.js
│   │   ├── actions/                  # Server Actions
│   │   │   ├── generateArticle.ts    # Generación de artículos con streaming
│   │   │   └── generateTitles.ts     # Generación de títulos con generateObject()
│   │   ├── api/                      # API Routes (wrappers)
│   │   │   ├── generate-article/
│   │   │   │   └── route.ts          # Endpoint POST para artículos
│   │   │   ├── generate-titles/
│   │   │   │   └── route.ts          # Endpoint POST para títulos
│   │   │   └── research/
│   │   │       └── route.ts          # Endpoint POST para investigación
│   │   ├── globals.css               # Estilos globales de la aplicación
│   │   ├── layout.tsx                # Layout raíz (Server Component)
│   │   └── page.tsx                  # Página principal (Server Component)
│   │
│   ├── components/                   # Componentes de React (Client Components)
│   │   ├── ArticleGenerator.tsx      # Generador de artículos (refactorizado)
│   │   ├── TitleGenerator.tsx        # Generador de títulos dinámicos
│   │   ├── ResearchPanel.tsx         # Panel de investigación con Exa
│   │   ├── TextEditor.tsx            # Editor de texto integrado
│   │   └── MainPageClient.tsx        # Componente cliente principal
│   │
│   └── services/                     # Servicios centralizados
│       ├── exaApi.ts                 # Integración con Exa API
│       ├── openaiService.ts          # Configuración de OpenAI
│       └── validationService.ts      # Validaciones reutilizables
│
├── public/                           # Archivos estáticos
│   └── (imágenes, iconos, etc.)
│
├── .env.example                      # Plantilla de variables de entorno
├── .env.local                        # Variables de entorno 
├── .gitignore                        # Archivos ignorados por Git
├── next.config.ts                    # Configuración de Next.js
├── tailwind.config.ts                # Configuración de TailwindCSS
├── tsconfig.json                     # Configuración de TypeScript
├── package.json                      # Dependencias y scripts
├── postcss.config.mjs                # Configuración de PostCSS
├── eslint.config.mjs                 # Configuración de ESLint
├── components.json                   # Configuración de shadcn/ui 
└── README.md                         # Este archivo
```

### **Descripción de Carpetas Clave**

#### **`src/app/`** - Next.js App Router
- **`actions/`**: Server Actions para lógica del servidor
  - `generateArticle.ts`: Streaming con `streamText()`
  - `generateTitles.ts`: Generación estructurada con `generateObject()`
- **`api/`**: API Routes como wrappers para compatibilidad
- **`layout.tsx`**: Layout principal con configuración global
- **`page.tsx`**: Página principal (Server Component que renderiza MainPageClient)

#### **`src/components/`** - Componentes de React
Todos son Client Components ('use client') para interactividad:
- **`ArticleGenerator.tsx`**: 
  - Hook personalizado `useContentStream`
  - Manejo de múltiples tipos de entrada (tema, URL, imagen)
  - Streaming en tiempo real
- **`TitleGenerator.tsx`**: 
  - Generación de 1-10 títulos
  - Selección interactiva
  - Manejo de errores robusto
- **`ResearchPanel.tsx`**: 
  - Integración con Exa API
  - Categorización de resultados
  - Generación desde resultados
- **`TextEditor.tsx`**: 
  - Editor simple con estado local
  - Sincronización con props

#### **`src/services/`** - Servicios Centralizados
- **`exaApi.ts`**: 
  - Búsqueda con Exa
  - Categorización de resultados
  - Validación de API Key
- **`openaiService.ts`**: 
  - Cliente de OpenAI configurado
  - Modelos predefinidos (GPT-4 Turbo, GPT-4o-mini)
  - Configuraciones por tarea
- **`validationService.ts`**: 
  - Validación de texto, números, URLs
  - Sanitización de entrada
  - Validaciones específicas (artículos, títulos)

---

## 🔍 Consideraciones Especiales

### **1. Arquitectura y Decisiones de Diseño**

#### **¿Por qué Server Actions en lugar de API Routes tradicionales?**
- **Server Actions** son el enfoque moderno de Next.js 15
- Permiten invocar funciones del servidor directamente desde componentes
- Reducen el boilerplate y mejoran el type-safety
- Los API Routes actuales son wrappers para mantener compatibilidad

#### **¿Por qué Client Components separados?**
- Next.js 15 favorece Server Components por defecto
- Solo usamos Client Components donde necesitamos interactividad (useState, useEffect)
- Reduce el JavaScript enviado al navegador
- Mejor rendimiento y SEO

#### **¿Por qué servicios centralizados?**
- **DRY (Don't Repeat Yourself)**: Evita código duplicado
- **Single Source of Truth**: Una sola configuración para OpenAI
- **Fácil de mantener**: Cambios en un solo lugar
- **Testeable**: Funciones puras y desacopladas

### **2. Manejo de Streaming**

#### **¿Cómo funciona el streaming?**

```typescript
// Server Action (generateArticle.ts)
const result = await streamText({
  model: openaiClient('gpt-4-turbo'),
  prompt: '...',
});

return result.toTextStreamResponse(); // ← Retorna un stream

// Client Component (ArticleGenerator.tsx)
const response = await fetch('/api/generate-article', { ... });
const reader = response.body?.getReader();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  
  const chunk = decoder.decode(value);
  fullContent += chunk;
  setStreamedContent(fullContent); // ← Actualiza UI en tiempo real
}
```

**Ventajas**:
- El usuario ve progreso inmediato
- Mejor percepción de velocidad
- Mayor engagement
- No espera a que termine completamente

### **3. Generación Estructurada con Zod**

#### **¿Por qué usar `generateObject()`?**

```typescript
// Esquema Zod define la estructura esperada
const titleSchema = z.object({
  titles: z.array(z.string()).describe('Array of article titles'),
});

// generateObject() garantiza que la respuesta cumpla el esquema
const { object } = await generateObject({
  model: openaiClient('gpt-4o-mini'),
  schema: titleSchema,
  prompt: '...',
});

// Resultado: { titles: ['Título 1', 'Título 2', 'Título 3'] }
```

**Ventajas**:
- Respuestas siempre con el formato correcto
- No hay parsing manual de JSON
- Validación automática de tipos
- Manejo de errores más robusto

### **4. Seguridad**

#### **Variables de Entorno**
- ✅ Todas las API Keys en `.env.local`
- ✅ Nunca expuestas al cliente
- ✅ `.env.local` en `.gitignore`
- ✅ `.env.example` como plantilla segura

#### **Validación y Sanitización**
```typescript
// Validación en el servidor antes de usar
const validation = validateArticleInput('topic', inputValue);
if (!validation.isValid) {
  throw new Error(validation.error);
}

// Sanitización de entrada
const sanitizedInput = sanitizeText(inputValue);
```

#### **Manejo de Errores**
- No se exponen detalles sensibles al cliente
- Mensajes de error genéricos pero útiles
- Logging en servidor para debugging

### **5. Optimizaciones de Performance**

#### **Code Splitting Automático**
- Next.js divide el código automáticamente
- Solo se carga JavaScript necesario por ruta
- Dynamic imports para componentes pesados

#### **Streaming de Respuestas**
- Reduce el Time to First Byte (TTFB)
- Mejora la percepción de velocidad
- Permite empezar a renderizar antes de tener todo

#### **Server Components**
- Reducen el JavaScript del cliente
- Mejor SEO y rendimiento inicial
- Acceso directo a datos sin round-trips

### **6. Limitaciones Conocidas**

#### **Costo de API**
- OpenAI cobra por tokens usados
- GPT-4 Turbo es el modelo más caro pero mejor calidad
- Recomendación: Monitorear uso en [platform.openai.com/usage](https://platform.openai.com/usage)

#### **Rate Limits**
- OpenAI tiene límites por minuto/día
- Exa API también tiene límites según el plan
- Implementar manejo de rate limit en producción

#### **Dependencia de APIs Externas**
- Si OpenAI cae, la generación no funciona
- Si Exa cae, la investigación no funciona
- Considerar fallbacks en producción

### **7. Buenas Prácticas Implementadas**

✅ **TypeScript Estricto**: Tipado en todo el código  
✅ **ESLint Configurado**: Linter para mantener calidad  
✅ **Componentes Pequeños**: Single Responsibility Principle  
✅ **Servicios Desacoplados**: Fácil de testear y mantener  
✅ **Documentación JSDoc**: Funciones documentadas  
✅ **Manejo de Errores**: Try-catch en todas las operaciones async  
✅ **Loading States**: Feedback visual durante operaciones  
✅ **Accesibilidad**: ARIA labels, roles, y navegación por teclado  

---

## 🚀 Mejoras Futuras

### **Alta Prioridad**

#### 1. **Autenticación de Usuarios**
- Implementar NextAuth.js o Clerk (Realizado)
- Perfiles de usuario
- Historial de artículos generados por usuario

#### 2. **Base de Datos**
- PostgreSQL o MongoDB
- Guardar artículos generados
- Sistema de favoritos
- Compartir artículos con URL única

#### 3. **Exportación de Contenido**
- Exportar a PDF con formato profesional
- Exportar a Markdown
- Exportar a Word (.docx)
- Copiar al portapapeles con formato

#### 4. **Tests Automatizados**
- Tests unitarios con Jest
- Tests de integración
- Tests E2E con Playwright
- Tests de componentes con React Testing Library

### **Media Prioridad**

#### 5. **Plantillas de Artículos**
- Plantillas predefinidas (noticia, entrevista, opinión, etc.)
- Personalización de estructura
- Guardar plantillas personalizadas

#### 6. **Análisis de Sentimiento**
- Analizar el tono de los resultados de investigación
- Clasificar como positivo/negativo/neutral
- Filtrar resultados por sentimiento

#### 7. **Multiidioma (i18n)**
- Soporte para español, inglés, portugués, etc.
- Generación de artículos en diferentes idiomas
- Traducción automática

#### 8. **Imágenes y Multimedia**
- Generación de imágenes con DALL-E
- Búsqueda de imágenes relevantes
- Sugerencias de multimedia

### **Baja Prioridad**

#### 9. **Colaboración en Tiempo Real**
- Edición colaborativa (como Google Docs)
- Comentarios y sugerencias
- Control de versiones

#### 10. **Analytics y Métricas**
- Dashboard de uso
- Estadísticas de generación
- Análisis de rendimiento

#### 11. **Integración con CMS**
- WordPress, Contentful, Strapi, etc.
- Publicación directa desde la app
- Sincronización bidireccional

#### 12. **Modo Offline**
- Service Workers
- Caché de contenido generado
- Sincronización cuando vuelve la conexión

### **Mejoras Técnicas**

#### 13. **Optimización de Rendimiento**
- Implementar Redis para caché
- CDN para assets estáticos
- Image optimization automática
- Lazy loading de componentes

#### 14. **Monitoring y Logging**
- Sentry para error tracking
- LogRocket para session replay
- Posthog para analytics
- Uptime monitoring

#### 15. **CI/CD**
- GitHub Actions para tests automáticos
- Deploy automático a Vercel/Netlify (Realizado)
- Checks de calidad de código
- Semantic versioning

---

## 🐛 Troubleshooting

### **Problema: "La API Key de OpenAI no está configurada"**

**Síntomas**: Error al intentar generar artículos o títulos.

**Solución**:
1. Verifica que el archivo `.env.local` existe en la raíz del proyecto
2. Confirma que la variable se llama exactamente `OPENAI_API_KEY`
3. Asegúrate de que la key empieza con `sk-`
4. Reinicia el servidor de desarrollo:
   ```bash
   # Detener servidor (Ctrl+C)
   npm run dev
   ```

---

### **Problema: "Error 429 - Rate Limit Exceeded"**

**Síntomas**: Mensaje de error después de varias generaciones.

**Solución**:
1. Has alcanzado el límite de requests de OpenAI
2. Espera unos minutos antes de intentar de nuevo
3. Revisa tu plan en [platform.openai.com/account/billing](https://platform.openai.com/account/billing)
4. Considera actualizar tu plan si lo usas frecuentemente

---

### **Problema: "Error 401 - Invalid API Key"**

**Síntomas**: Error al hacer la primera request.

**Solución**:
1. Verifica que tu API key es correcta
2. Comprueba que la key está activa en [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
3. Regenera la key si es necesario
4. Actualiza el archivo `.env.local` con la nueva key

---

### **Problema: "El streaming no funciona / No veo el artículo generándose"**

**Síntomas**: El artículo aparece todo de golpe en lugar de palabra por palabra.

**Solución**:
1. Verifica que estás usando un navegador moderno (Chrome, Edge, Firefox actualizados)
2. Comprueba la consola del navegador (F12) para errores
3. El streaming podría estar bloqueado por extensiones del navegador
4. Intenta en modo incógnito

---

### **Problema: "Cannot find module 'ai' o '@ai-sdk/openai'"**

**Síntomas**: Error al iniciar el servidor o compilar.

**Solución**:
```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules
npm install

# O con pnpm
rm -rf node_modules
pnpm install
```

---

### **Problema: "Error al realizar la investigación con Exa"**

**Síntomas**: La búsqueda no funciona o devuelve error.

**Solución**:
1. Verifica que `EXA_API_KEY` está en `.env.local`
2. Confirma que la key es válida en [exa.ai](https://exa.ai)
3. Verifica que `EXA_API_URL` es `https://api.exa.ai`
4. Si no tienes Exa API key, esta funcionalidad no estará disponible (es opcional)

---

### **Problema: "Port 3000 is already in use"**

**Síntomas**: El servidor no inicia porque el puerto está ocupado.

**Solución**:
```bash
# Opción 1: Usar otro puerto
npm run dev -- -p 3001

# Opción 2: Matar el proceso en el puerto 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Opción 3: Matar el proceso en el puerto 3000 (Linux/Mac)
lsof -ti:3000 | xargs kill -9
```

---

### **Problema: "Module not found: Can't resolve 'components/...'  "**

**Síntomas**: Error de importación de componentes.

**Solución**:
```typescript
// ❌ Incorrecto
import ArticleGenerator from 'components/ArticleGenerator';

// ✅ Correcto
import ArticleGenerator from '@/components/ArticleGenerator';
```

Verifica que `tsconfig.json` tiene configurado el alias `@`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

### **Problema: "Error: insufficient_quota - You exceeded your current quota"**

**Síntomas**: No puedes generar contenido después de varias requests.

**Solución**:
1. Has agotado los créditos de OpenAI
2. Ve a [platform.openai.com/account/billing](https://platform.openai.com/account/billing)
3. Añade créditos o actualiza tu método de pago
4. Revisa tu uso en el dashboard de OpenAI

---

### **Problema: "Hydration Error" en Next.js**

**Síntomas**: Error en consola sobre "hydration mismatch".

**Solución**:
1. Asegúrate de que no hay diferencias entre SSR y cliente
2. Evita usar `Date.now()` o contenido aleatorio en el primer render
3. Usa `useEffect` para contenido que solo debe renderizarse en el cliente
4. Verifica que no hay HTML inválido (ej: `<p>` dentro de `<p>`)

---

### **Problema: "CORS Error al llamar a la API"**

**Síntomas**: Error de CORS en la consola del navegador.

**Solución**:
- En desarrollo, Next.js maneja CORS automáticamente
- Si persiste, verifica que estás usando rutas relativas:
  ```typescript
  // ✅ Correcto
  fetch('/api/generate-article', { ... })
  
  // ❌ Incorrecto
  fetch('http://localhost:3000/api/generate-article', { ... })
  ```

---

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**.

```
MIT License

Copyright (c) 2025 Ian Gorski

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📬 Contacto

**Desarrollador**: [Ian Gorski]  
**Email**: gorskiandev@gmail.com  
**GitHub**: https://github.com/IanGorski
**LinkedIn**: https://www.linkedin.com/in/ian-gorski/