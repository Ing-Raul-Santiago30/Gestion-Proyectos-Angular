## 🚀 Instalación y Uso de la Aplicación Web

Sigue estos pasos para instalar y ejecutar la aplicación:

### 🔧 **Instalación**
1️⃣ `npm install` – Instala las dependencias necesarias.  
2️⃣ `ng s` – Inicia la aplicación Angular.  
3️⃣ `npm run start:server` – Arranca el servidor JSON para gestionar la base de datos.

### 🔗 **Accesos Rápidos**

- 📂 **Base de Datos (`db.json`)**: [http://localhost:3000/]
- 🔑 **Inicio de Sesión**: [http://localhost:4200/login]
- 👥 **Gestión de Usuarios**: [http://localhost:4200/user-management]
  
- 🧑‍💻 Usuario de Prueba
     Usuario: admin
     Contraseña: admin123

---

## 📌 Rutas de la Aplicación

A continuación, se describen las rutas principales de la aplicación junto con sus permisos de acceso:

### 🔑 **Autenticación**
- **`/login`** – Público. Permite a los usuarios autenticarse.

### 📂 **Gestión de Proyectos**
- **`/projects`** – Acceso: **Admin y Editor**. Lista de proyectos con permisos según el rol.
- **`/project/:id`** – Acceso: **Admin y Editor**. Detalles y tareas del proyecto.
- **`/project-form/0`** – Acceso: **Admin y Editor**. Crear un nuevo proyecto.
- **`/project-form/:id`** – Acceso: **Admin y Editor**. Editar un proyecto existente.

### 👥 **Gestión de Usuarios**
- **`/user-management`** – Acceso exclusivo para **Admin**. Permite la gestión de usuarios y roles.

---

📌 **Nota:** Asegúrate de contar con los permisos adecuados para acceder a cada sección.  
🚀 ¡Optimiza tu flujo de trabajo con esta plataforma de gestión de proyectos!

