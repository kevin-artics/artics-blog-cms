# Manual de Usuario - Panel de Administración Artics Blog CMS

## Índice

1. [Introducción](#introducción)
2. [Acceso al Panel de Administración](#acceso-al-panel-de-administración)
3. [Interfaz del Panel](#interfaz-del-panel)
4. [Gestión de Usuarios](#gestión-de-usuarios)
5. [Gestión de Categorías](#gestión-de-categorías)
6. [Gestión de Posts](#gestión-de-posts)
7. [Gestión de Páginas](#gestión-de-páginas)
8. [Gestión de Media](#gestión-de-media)
9. [Configuración del Sitio](#configuración-del-sitio)
10. [Formularios](#formularios)
11. [Redirecciones](#redirecciones)
12. [Búsqueda](#búsqueda)
13. [Vista Previa y Publicación](#vista-previa-y-publicación)
14. [SEO y Metadatos](#seo-y-metadatos)
15. [Consejos y Mejores Prácticas](#consejos-y-mejores-prácticas)
16. [Solución de Problemas](#solución-de-problemas)

---

## 1. Introducción

Bienvenido al **Panel de Administración del Artics Blog CMS**. Este manual te guiará a través de todas las funcionalidades disponibles para gestionar el contenido de tu sitio web.

### ¿Qué puedes hacer con este panel?

- ✅ Crear y gestionar artículos de blog
- ✅ Organizar contenido en categorías
- ✅ Crear páginas estáticas
- ✅ Gestionar usuarios y autores
- ✅ Subir y organizar imágenes/videos
- ✅ Configurar la navegación del sitio
- ✅ Optimizar el SEO de cada página
- ✅ Crear formularios de contacto
- ✅ Programar publicaciones
- ✅ Ver vista previa de contenido

### Navegación Rápida

- **Dashboard**: Vista general del sistema
- **Posts**: Artículos de blog
- **Pages**: Páginas estáticas
- **Categories**: Categorías de contenido
- **Media**: Archivos multimedia
- **Users**: Usuarios del sistema
- **Forms**: Formularios
- **Redirects**: Redirecciones
- **Search**: Configuración de búsqueda

---

## 2. Acceso al Panel de Administración

### 2.1 Acceso Inicial

1. **URL del Panel**: `https://tu-dominio.com/admin`
2. **Credenciales**: Usuario y contraseña proporcionados por el administrador
3. **Seguridad**: Sesión con JWT (se mantiene activa)

### 2.2 Primer Acceso

Si es tu primera vez accediendo:

1. **Crear Usuario Administrador**:
   - Navega a `/admin`
   - Haz clic en "Create your first user"
   - Completa los campos:
     - **Name**: Tu nombre completo
     - **Email**: Tu correo electrónico
     - **Password**: Contraseña segura (mínimo 8 caracteres)
   - Haz clic en "Create user"

2. **Iniciar Sesión**:
   - Usa las credenciales que acabas de crear
   - Marca "Remember me" si es tu computadora personal

### 2.3 Recuperar Contraseña

Si olvidaste tu contraseña:

1. Ve a `/admin`
2. Haz clic en "Forgot password?"
3. Ingresa tu email
4. Revisa tu bandeja de entrada
5. Sigue el enlace para restablecer la contraseña

---

## 3. Interfaz del Panel

### 3.1 Barra Superior

**Elementos principales**:

- **Logo**: Enlace al dashboard
- **Navegación**: Menú principal
- **Usuario**: Tu perfil y opciones
- **Vista previa**: Enlace al sitio público

### 3.2 Menú Lateral

**Secciones principales**:

- **Dashboard**: Vista general
- **Content**: Posts, Pages, Categories
- **Media**: Archivos multimedia
- **Users**: Gestión de usuarios
- **Settings**: Configuraciones

### 3.3 Área de Trabajo

**Características**:

- **Responsive**: Se adapta al tamaño de pantalla
- **Tabs**: Organización por pestañas
- **Sidebar**: Campos adicionales
- **Preview**: Vista previa en tiempo real

### 3.4 Barra de Herramientas

**Acciones rápidas**:

- **Save**: Guardar cambios
- **Save & Publish**: Guardar y publicar
- **Preview**: Ver vista previa
- **Delete**: Eliminar elemento

---

## 4. Gestión de Usuarios

### 4.1 Crear un Nuevo Usuario

**Paso a paso**:

1. **Acceder a Users**:
   - Menú lateral → Users
   - Clic en "Create New"

2. **Completar Información Básica**:
   - **Name**: Nombre completo (requerido)
   - **Email**: Correo electrónico (requerido)
   - **Password**: Contraseña segura (requerido)

3. **Información Adicional**:
   - **Position**: Cargo o posición
   - **Avatar**: Foto de perfil
   - **Description**: Descripción breve
   - **About**: Información detallada

4. **Configuración de Slug**:
   - Se genera automáticamente del nombre
   - Puedes editarlo manualmente
   - Formato: `nombre-apellido`

### 4.2 Editar Usuario Existente

1. **Buscar Usuario**:
   - Lista de usuarios → Buscar por nombre/email
   - Clic en el usuario deseado

2. **Modificar Campos**:
   - Todos los campos son editables
   - Los cambios se guardan automáticamente

3. **Cambiar Contraseña**:
   - Sección "Password"
   - Ingresa nueva contraseña
   - Confirma la contraseña

### 4.3 Perfil de Usuario

**Campos disponibles**:

**Información Personal**:

- **Name**: Nombre completo
- **Email**: Correo electrónico
- **Position**: Cargo o posición

**Imagen**:

- **Avatar**: Foto de perfil
- Formatos: JPG, PNG, WebP
- Tamaño recomendado: 400x400px

**Descripción**:

- **Description**: Texto breve (máximo 200 caracteres)
- **About**: Información detallada con editor rico

**URL Personal**:

- **Slug**: URL del perfil público
- Formato: `/users/nombre-apellido`

### 4.4 Eliminar Usuario

**Consideraciones**:

- ✅ Verificar que no tenga posts asociados
- ✅ Hacer backup de información importante
- ✅ Notificar al usuario

**Proceso**:

1. Seleccionar usuario
2. Clic en "Delete"
3. Confirmar eliminación
4. Revisar posts huérfanos

---

## 5. Gestión de Categorías

### 5.1 Crear una Nueva Categoría

**Paso a paso**:

1. **Acceder a Categories**:
   - Menú lateral → Categories
   - Clic en "Create New"

2. **Información Básica**:
   - **Title**: Título de la categoría (requerido)
   - **Description**: Descripción breve
   - **Image**: Imagen representativa

3. **Investigadores Asociados**:
   - **Researchers**: Seleccionar usuarios investigadores
   - Puedes agregar múltiples investigadores
   - Útil para mostrar quién trabaja en esa área

4. **Contenido Detallado**:
   - **About**: Información completa con editor rico
   - Puedes incluir enlaces, imágenes, listas

5. **URL de la Categoría**:
   - **Slug**: Se genera automáticamente
   - Formato: `/categories/nombre-categoria`

### 5.2 Categorías Anidadas

**Crear Subcategorías**:

1. **Categoría Padre**:
   - Crear categoría principal
   - Ejemplo: "Inteligencia Artificial"

2. **Subcategorías**:
   - Crear nueva categoría
   - En "Parent", seleccionar categoría padre
   - Ejemplo: "Machine Learning" bajo "Inteligencia Artificial"

3. **URLs Automáticas**:
   - Padre: `/inteligencia-artificial`
   - Hijo: `/inteligencia-artificial/machine-learning`

### 5.3 Editar Categoría

**Campos Editables**:

- ✅ Título
- ✅ Descripción
- ✅ Imagen
- ✅ Investigadores
- ✅ Contenido detallado
- ✅ Slug (URL)

**Consideraciones**:

- Los cambios se reflejan inmediatamente
- Revisar posts asociados
- Verificar enlaces internos

### 5.4 Organizar Categorías

**Estrategias de Organización**:

**Por Área de Investigación**:

- Inteligencia Artificial
- Machine Learning
- Computer Vision
- Natural Language Processing

**Por Tipo de Contenido**:

- Investigación
- Publicaciones
- Proyectos
- Noticias

**Por Tecnología**:

- Python
- JavaScript
- React
- TensorFlow

### 5.5 Eliminar Categoría

**Verificaciones Previas**:

- ✅ Revisar posts asociados
- ✅ Considerar reasignar posts
- ✅ Verificar enlaces internos

**Proceso**:

1. Seleccionar categoría
2. Revisar posts asociados
3. Reasignar posts si es necesario
4. Clic en "Delete"
5. Confirmar eliminación

---

## 6. Gestión de Posts

### 6.1 Crear un Nuevo Post

**Paso a paso**:

1. **Acceder a Posts**:
   - Menú lateral → Posts
   - Clic en "Create New"

2. **Información Básica**:
   - **Title**: Título del post (requerido)
   - **Hero Image**: Imagen destacada (opcional)

3. **Contenido Principal**:
   - **Content**: Editor rico Lexical
   - Herramientas disponibles:
     - Formato de texto (negrita, cursiva, subrayado)
     - Encabezados (H1, H2, H3, H4)
     - Enlaces internos y externos
     - Listas numeradas y con viñetas
     - Bloques especiales (código, media, banners)

4. **Metadatos** (pestaña Meta):
   - **Related Posts**: Posts relacionados
   - **Categories**: Categorías del post
   - Seleccionar múltiples categorías

5. **Autores**:
   - **Authors**: Seleccionar autores
   - Puedes agregar múltiples autores
   - Aparecerán en el post publicado

6. **SEO** (pestaña SEO):
   - **Meta Title**: Título para buscadores
   - **Meta Description**: Descripción para buscadores
   - **Meta Image**: Imagen para redes sociales

### 6.2 Editor Lexical - Guía Completa

**Barra de Herramientas**:

**Formato de Texto**:

- **Bold** (Ctrl+B): Texto en negrita
- **Italic** (Ctrl+I): Texto en cursiva
- **Underline** (Ctrl+U): Texto subrayado

**Encabezados**:

- **H1**: Título principal
- **H2**: Subtítulo importante
- **H3**: Subtítulo secundario
- **H4**: Subtítulo menor

**Enlaces**:

- **Insert Link**: Agregar enlace
- Tipos disponibles:
  - **Internal**: Enlace a página/post interno
  - **Custom URL**: Enlace externo
- Opciones:
  - **New Tab**: Abrir en nueva pestaña
  - **Label**: Texto del enlace

**Bloques Especiales**:

**Banner Block**:

- Título llamativo
- Descripción
- Enlaces de acción
- Apariencia personalizable

**Code Block**:

- Código con sintaxis highlighting
- Seleccionar lenguaje
- Botón de copiar automático
- Tema claro/oscuro

**Media Block**:

- Imágenes y videos
- Pie de foto
- Alineación (izquierda, centro, derecha)
- Tamaño personalizable

### 6.3 Gestión de Posts

**Lista de Posts**:

**Columnas Visibles**:

- **Title**: Título del post
- **Slug**: URL del post
- **Updated At**: Última modificación

**Filtros Disponibles**:

- **Status**: Draft, Published
- **Categories**: Filtrar por categoría
- **Authors**: Filtrar por autor
- **Date Range**: Rango de fechas

**Acciones Rápidas**:

- **Edit**: Editar post
- **Preview**: Ver vista previa
- **Duplicate**: Duplicar post
- **Delete**: Eliminar post

### 6.4 Estados del Post

**Draft (Borrador)**:

- ✅ Solo visible para editores
- ✅ Puede ser editado
- ✅ No aparece en el sitio público
- ✅ Vista previa disponible

**Published (Publicado)**:

- ✅ Visible públicamente
- ✅ Aparece en el sitio
- ✅ Indexado por buscadores
- ✅ Puede ser editado (nueva versión)

### 6.5 Programar Publicación

**Configuración**:

1. **Fecha de Publicación**:
   - Campo "Published At"
   - Seleccionar fecha y hora
   - Formato: DD/MM/YYYY HH:MM

2. **Programación**:
   - El post se publicará automáticamente
   - Se puede cancelar antes de la fecha
   - Notificaciones automáticas

3. **Consideraciones**:
   - Verificar zona horaria
   - Revisar contenido antes de publicar
   - Tener backup del contenido

### 6.6 Posts Relacionados

**Configuración**:

1. **Seleccionar Posts**:
   - Pestaña "Meta"
   - Campo "Related Posts"
   - Buscar y seleccionar posts

2. **Criterios de Selección**:
   - Misma categoría
   - Tema similar
   - Mismo autor
   - Fecha reciente

3. **Visualización**:
   - Aparecen al final del post
   - Enlaces automáticos
   - Imágenes destacadas

---

## 7. Gestión de Páginas

### 7.1 Crear una Nueva Página

**Paso a paso**:

1. **Acceder a Pages**:
   - Menú lateral → Pages
   - Clic en "Create New"

2. **Información Básica**:
   - **Title**: Título de la página (requerido)

3. **Configurar Hero** (pestaña Hero):
   - **Type**: Tipo de hero
     - **High Impact**: Hero grande y llamativo
     - **Medium Impact**: Hero mediano
     - **Low Impact**: Hero pequeño
   - **Content**: Título, descripción, enlaces
   - **Media**: Imagen de fondo

4. **Contenido Principal** (pestaña Content):
   - **Layout**: Constructor de bloques
   - Agregar bloques según necesites

5. **SEO** (pestaña SEO):
   - **Meta Title**: Título para buscadores
   - **Meta Description**: Descripción
   - **Meta Image**: Imagen para redes sociales

### 7.2 Tipos de Hero

**High Impact Hero**:

- **Uso**: Páginas principales, landing pages
- **Características**: Imagen grande, texto prominente
- **Elementos**: Título, descripción, botones de acción

**Medium Impact Hero**:

- **Uso**: Páginas de sección
- **Características**: Tamaño mediano, balanceado
- **Elementos**: Título, descripción, enlaces

**Low Impact Hero**:

- **Uso**: Páginas internas, formularios
- **Características**: Tamaño pequeño, minimalista
- **Elementos**: Título, descripción breve

### 7.3 Constructor de Bloques

**Agregar Bloques**:

1. **Clic en "Add Block"**
2. **Seleccionar tipo de bloque**:
   - **Content**: Contenido rico
   - **Media**: Imágenes/videos
   - **Call to Action**: Llamadas a la acción
   - **Archive**: Lista de contenido
   - **Form**: Formularios

3. **Configurar cada bloque**:
   - Contenido específico
   - Opciones de visualización
   - Enlaces y acciones

**Organizar Bloques**:

- **Drag & Drop**: Arrastrar para reordenar
- **Collapse/Expand**: Contraer/expandir bloques
- **Delete**: Eliminar bloques no deseados

### 7.4 Tipos de Bloques

**Content Block**:

- **Uso**: Texto principal, artículos
- **Características**: Editor rico completo
- **Herramientas**: Formato, enlaces, bloques anidados

**Media Block**:

- **Uso**: Imágenes, videos, galerías
- **Características**: Media responsive
- **Opciones**: Alineación, tamaño, pie de foto

**Call to Action Block**:

- **Uso**: Botones de acción, formularios
- **Características**: Enlaces prominentes
- **Opciones**: Estilo, enlaces, apariencia

**Archive Block**:

- **Uso**: Lista de posts, categorías
- **Características**: Contenido dinámico
- **Opciones**: Filtros, ordenamiento, límites

**Form Block**:

- **Uso**: Formularios de contacto, suscripción
- **Características**: Formularios dinámicos
- **Opciones**: Campos, validación, envío

### 7.5 Páginas Especiales

**Página de Inicio**:

- **Slug**: `home` (automático)
- **Hero**: High Impact recomendado
- **Contenido**: Información principal del sitio

**Página Acerca de**:

- **Slug**: `about`
- **Contenido**: Información del laboratorio
- **Equipo**: Lista de investigadores

**Página de Contacto**:

- **Slug**: `contact`
- **Formulario**: Formulario de contacto
- **Información**: Datos de contacto

**Página 404**:

- **Slug**: `404`
- **Contenido**: Mensaje de error amigable
- **Navegación**: Enlaces útiles

---

## 8. Gestión de Media

### 8.1 Subir Archivos

**Métodos de Subida**:

1. **Drag & Drop**:
   - Arrastrar archivos al área de subida
   - Múltiples archivos simultáneos
   - Progreso visual de subida

2. **Selección Manual**:
   - Clic en "Choose Files"
   - Navegar y seleccionar archivos
   - Selección múltiple con Ctrl/Cmd

3. **Desde URL**:
   - Pegar URL de imagen
   - Descarga automática
   - Optimización automática

**Formatos Soportados**:

- **Imágenes**: JPG, PNG, WebP, GIF, SVG
- **Videos**: MP4, WebM, MOV
- **Documentos**: PDF, DOC, DOCX

### 8.2 Configurar Media

**Información Básica**:

- **Alt Text**: Texto alternativo (importante para SEO)
- **Caption**: Pie de foto con editor rico

**Optimización Automática**:

- **Tamaños**: Generación automática de múltiples tamaños
- **Compresión**: Optimización de calidad/tamaño
- **Formato**: Conversión a WebP cuando es posible

**Tamaños Disponibles**:

- **Thumbnail**: 300px (miniaturas)
- **Square**: 500x500px (cuadradas)
- **Small**: 600px (pequeñas)
- **Medium**: 900px (medianas)
- **Large**: 1400px (grandes)
- **XLarge**: 1920px (extra grandes)
- **OG**: 1200x630px (redes sociales)

### 8.3 Organizar Media

**Estrategias de Organización**:

**Por Tipo**:

- Imágenes de posts
- Imágenes de páginas
- Avatares de usuarios
- Logos y branding

**Por Fecha**:

- Archivos recientes
- Archivos históricos
- Archivos temporales

**Por Proyecto**:

- Proyecto A
- Proyecto B
- Investigación X

### 8.4 Editar Media

**Herramientas Disponibles**:

**Punto Focal**:

- Clic en la imagen
- Arrastrar punto focal
- Importante para recortes automáticos

**Recortar**:

- Seleccionar área
- Mantener proporción
- Aplicar recorte

**Redimensionar**:

- Especificar dimensiones
- Mantener proporción
- Aplicar cambios

### 8.5 Usar Media en Contenido

**En Posts y Páginas**:

1. **Insertar Imagen**:
   - Editor → Media Block
   - Seleccionar imagen
   - Configurar opciones

2. **Opciones de Visualización**:
   - **Alineación**: Izquierda, centro, derecha
   - **Tamaño**: Pequeño, mediano, grande
   - **Pie de foto**: Texto descriptivo

3. **Enlaces**:
   - Enlace a imagen completa
   - Enlace externo
   - Sin enlace

**En Perfiles de Usuario**:

- **Avatar**: Imagen de perfil
- Tamaño recomendado: 400x400px
- Formato: JPG o PNG

**En Categorías**:

- **Imagen Representativa**: Imagen de la categoría
- Tamaño recomendado: 800x600px
- Formato: JPG o WebP

---

## 9. Configuración del Sitio

### 9.1 Configurar Header

**Acceso**:

- Menú lateral → Globals → Header

**Elementos Configurables**:

**Navegación Principal**:

- **Nav Items**: Elementos del menú
- **Type**: Tipo de enlace
  - **Internal**: Enlace a página/post interno
  - **Custom URL**: Enlace externo
- **Label**: Texto del enlace
- **New Tab**: Abrir en nueva pestaña

**Estructura Recomendada**:

1. **Home**: Página principal
2. **About**: Acerca de
3. **Research**: Investigación
4. **Publications**: Publicaciones
5. **Team**: Equipo
6. **Contact**: Contacto

### 9.2 Configurar Footer

**Acceso**:

- Menú lateral → Globals → Footer

**Configuración Similar al Header**:

- **Nav Items**: Enlaces del pie de página
- **Enlaces Útiles**: Políticas, términos, redes sociales

**Estructura Recomendada**:

1. **Privacy Policy**: Política de privacidad
2. **Terms of Service**: Términos de servicio
3. **GitHub**: Repositorio
4. **LinkedIn**: Perfil profesional
5. **Twitter**: Red social

### 9.3 Personalización Visual

**Temas Disponibles**:

- **Light**: Tema claro (por defecto)
- **Dark**: Tema oscuro
- **Auto**: Detección automática

**Cambiar Tema**:

1. Selector de tema en la barra superior
2. Seleccionar preferencia
3. Cambio automático
4. Persistencia en localStorage

---

## 10. Formularios

### 10.1 Crear Formulario

**Acceso**:

- Menú lateral → Forms
- Clic en "Create New"

**Configuración Básica**:

- **Title**: Nombre del formulario
- **Description**: Descripción del propósito

**Campos Disponibles**:

**Campos de Texto**:

- **Text**: Texto simple
- **Email**: Correo electrónico
- **Number**: Número
- **Textarea**: Área de texto

**Campos de Selección**:

- **Select**: Lista desplegable
- **Checkbox**: Casilla de verificación
- **Country**: País
- **State**: Estado/Provincia

**Configuración de Campos**:

- **Label**: Etiqueta del campo
- **Required**: Campo obligatorio
- **Placeholder**: Texto de ejemplo
- **Validation**: Validación personalizada

### 10.2 Configurar Envío

**Opciones de Envío**:

- **Email**: Enviar por correo
- **Webhook**: Enviar a URL externa
- **Database**: Guardar en base de datos

**Configuración de Email**:

- **To**: Destinatario
- **From**: Remitente
- **Subject**: Asunto del email
- **Message**: Plantilla del mensaje

**Confirmación**:

- **Success Message**: Mensaje de éxito
- **Redirect URL**: Redirección después del envío

### 10.3 Usar Formularios

**En Páginas**:

1. Agregar Form Block
2. Seleccionar formulario
3. Configurar apariencia
4. Probar funcionamiento

**Tipos de Formularios Comunes**:

- **Contacto**: Información de contacto
- **Suscripción**: Newsletter
- **Registro**: Eventos, talleres
- **Feedback**: Comentarios, sugerencias

---

## 11. Redirecciones

### 11.1 Crear Redirección

**Acceso**:

- Menú lateral → Redirects
- Clic en "Create New"

**Configuración**:

- **From**: URL de origen
- **To**: URL de destino
- **Type**: Tipo de redirección
  - **301**: Permanente
  - **302**: Temporal

**Tipos de Destino**:

- **Internal**: Página/post interno
- **Custom URL**: URL externa

### 11.2 Casos de Uso

**Migración de Contenido**:

- Cambiar URL de posts
- Reorganizar estructura
- Actualizar enlaces rotos

**URLs Amigables**:

- Acortar URLs largas
- Mejorar SEO
- Facilitar navegación

**Mantenimiento**:

- Páginas temporales
- Contenido en desarrollo
- Redirecciones temporales

---

## 12. Búsqueda

### 12.1 Configuración de Búsqueda

**Acceso**:

- Menú lateral → Search
- Configuración automática

**Campos Indexados**:

- Título de posts
- Descripción
- Contenido
- Categorías
- Metadatos

**Funcionalidades**:

- Búsqueda en tiempo real
- Filtrado por categorías
- Resultados paginados
- Búsqueda fuzzy

### 12.2 Usar Búsqueda

**En el Sitio**:

- Barra de búsqueda en header
- Resultados instantáneos
- Filtros disponibles
- Navegación fácil

**En el Admin**:

- Búsqueda en listas
- Filtros avanzados
- Ordenamiento
- Exportación

---

## 13. Vista Previa y Publicación

### 13.1 Vista Previa de Borradores

**Acceso**:

- Botón "Preview" en editor
- Nueva pestaña/ventana
- Vista exacta del sitio

**Características**:

- ✅ Contenido actual
- ✅ Estilos completos
- ✅ Navegación funcional
- ✅ Responsive design

### 13.2 Live Preview

**Configuración**:

- Editor en tiempo real
- Múltiples breakpoints
- Sincronización automática

**Breakpoints Disponibles**:

- **Mobile**: 375x667px
- **Tablet**: 768x1024px
- **Desktop**: 1440x900px

### 13.3 Publicar Contenido

**Proceso de Publicación**:

1. **Revisar Contenido**:
   - Ortografía y gramática
   - Enlaces funcionando
   - Imágenes optimizadas
   - SEO configurado

2. **Guardar Borrador**:
   - Clic en "Save"
   - Verificar guardado
   - Revisar cambios

3. **Publicar**:
   - Clic en "Save & Publish"
   - Confirmar publicación
   - Verificar en el sitio

4. **Verificar**:
   - Visitar URL del contenido
   - Revisar en listas
   - Verificar SEO

### 13.4 Programar Publicación

**Configuración**:

- Campo "Published At"
- Seleccionar fecha/hora
- Publicación automática

**Consideraciones**:

- Zona horaria correcta
- Contenido listo
- Notificaciones configuradas

---

## 14. SEO y Metadatos

### 14.1 Configurar SEO

**Campos SEO**:

**Meta Title**:

- Título para buscadores
- Máximo 60 caracteres
- Incluir palabras clave
- Único por página

**Meta Description**:

- Descripción para buscadores
- Máximo 160 caracteres
- Resumen atractivo
- Incluir call-to-action

**Meta Image**:

- Imagen para redes sociales
- Tamaño: 1200x630px
- Formato: JPG o PNG
- Relevante al contenido

### 14.2 Optimización de Contenido

**Títulos**:

- Usar H1 para título principal
- H2-H4 para subtítulos
- Incluir palabras clave
- Estructura jerárquica

**Contenido**:

- Texto descriptivo
- Palabras clave naturales
- Enlaces internos
- Imágenes con alt text

**URLs**:

- URLs descriptivas
- Incluir palabras clave
- Evitar caracteres especiales
- Estructura lógica

### 14.3 Redes Sociales

**Open Graph**:

- Título optimizado
- Descripción atractiva
- Imagen representativa
- URL canónica

**Twitter Cards**:

- Configuración automática
- Imagen optimizada
- Texto descriptivo
- Enlaces funcionales

---

## 15. Consejos y Mejores Prácticas

### 15.1 Organización de Contenido

**Estructura de Categorías**:

- Jerarquía lógica
- Nombres descriptivos
- Evitar categorías vacías
- Revisar regularmente

**Nomenclatura**:

- Títulos claros y descriptivos
- URLs amigables
- Consistencia en naming
- Evitar caracteres especiales

**Contenido**:

- Calidad sobre cantidad
- Actualización regular
- Revisión de enlaces
- Optimización continua

### 15.2 Gestión de Media

**Optimización**:

- Comprimir imágenes
- Usar formatos apropiados
- Alt text descriptivo
- Tamaños adecuados

**Organización**:

- Nombres descriptivos
- Estructura de carpetas
- Eliminar archivos no usados
- Backup regular

### 15.3 SEO

**Palabras Clave**:

- Investigación de keywords
- Uso natural en contenido
- Densidad apropiada
- Variaciones relevantes

**Contenido**:

- Títulos atractivos
- Descripciones claras
- Enlaces internos
- Imágenes optimizadas

**Técnico**:

- URLs amigables
- Meta tags completos
- Sitemap actualizado
- Velocidad de carga

### 15.4 Colaboración

**Roles y Permisos**:

- Administradores: Acceso completo
- Editores: Crear/editar contenido
- Autores: Posts propios
- Revisores: Aprobar contenido

**Flujo de Trabajo**:

- Borrador → Revisión → Publicación
- Comunicación clara
- Responsabilidades definidas
- Feedback constructivo

---

## 16. Solución de Problemas

### 16.1 Problemas Comunes

**No puedo acceder al admin**:

- ✅ Verificar URL correcta
- ✅ Revisar credenciales
- ✅ Limpiar cache del navegador
- ✅ Contactar administrador

**No se guardan los cambios**:

- ✅ Verificar conexión a internet
- ✅ Revisar campos requeridos
- ✅ Recargar página
- ✅ Verificar permisos

**Imágenes no se suben**:

- ✅ Verificar formato de archivo
- ✅ Revisar tamaño máximo
- ✅ Comprobar permisos
- ✅ Limpiar cache

**Vista previa no funciona**:

- ✅ Verificar contenido guardado
- ✅ Revisar configuración
- ✅ Limpiar cache
- ✅ Contactar soporte

### 16.2 Errores Específicos

**Error 404**:

- Verificar URL correcta
- Revisar redirecciones
- Comprobar contenido publicado
- Verificar configuración

**Error 500**:

- Recargar página
- Verificar datos ingresados
- Contactar administrador
- Revisar logs del sistema

**Problemas de SEO**:

- Verificar meta tags
- Revisar URLs
- Comprobar contenido
- Optimizar imágenes

### 16.3 Contacto de Soporte

**Información Necesaria**:

- Descripción del problema
- Pasos para reproducir
- Capturas de pantalla
- Información del navegador

**Canales de Soporte**:

- Email: soporte@artics-lab.com
- Documentación: /docs
- GitHub: Issues del repositorio
- Slack: Canal de soporte

---

## Conclusión

Este manual cubre todas las funcionalidades del panel de administración del Artics Blog CMS. Recuerda que:

- **La práctica hace al maestro**: Usa regularmente todas las funciones
- **Mantén el contenido actualizado**: Revisa y actualiza contenido regularmente
- **Optimiza para SEO**: Aplica las mejores prácticas de SEO
- **Colabora efectivamente**: Comunica cambios y actualizaciones
- **Haz backup**: Guarda copias importantes del contenido

### Recursos Adicionales

- **Documentación técnica**: Para desarrolladores
- **Videos tutoriales**: Canal de YouTube
- **Comunidad**: Foro de usuarios
- **Soporte**: Equipo de desarrollo

---

_Este manual está diseñado para usuarios finales del panel de administración. Para consultas técnicas o personalizaciones avanzadas, contacta al equipo de desarrollo._
