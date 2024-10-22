# PRAGMMA E-Commerce API

## Descripción del Proyecto 📋
Este proyecto es una API desarrollada en **Node.js** utilizando **TypeScript** para un sistema de e-commerce. Está diseñado con los principios de **Clean Architecture**, lo que garantiza un código modular, mantenible y escalable.

El sistema incluye funcionalidades clave como la autenticación de usuarios (roles de administrador y cliente), gestión de productos, procesamiento de órdenes de venta, y manejo de métodos de pago.

## 📚 Tecnologías Utilizadas
- **Node.js**: Plataforma para el desarrollo del backend.
- **TypeScript**: Añade tipado estático, lo que mejora la calidad del código y ayuda a evitar errores.
- **Express**: Framework para manejar las solicitudes HTTP de la API.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar usuarios, productos, órdenes, etc.
- **Mongoose**: ORM para MongoDB que facilita la interacción con la base de datos.
- **Migrate-Mongo**: Herramienta de migraciones para la base de datos MongoDB.
- **Dotenv**: Para gestionar variables de entorno de forma segura.
- **Nodemon**: Facilita el desarrollo reiniciando automáticamente el servidor cuando hay cambios en el código.
- **BCrypt**: Para el hashing de contraseñas de los usuarios.
- **JWT (jsonwebtoken)**: Para la autenticación basada en tokens.

## 🗂 Estructura de Carpetas
El proyecto sigue una estructura basada en los principios de **Clean Architecture**:

```bash
src/
├── application/           # Casos de uso y lógica de la aplicación
├── config/                # Configuración del servidor, base de datos, etc.
├── domain/                # Entidades y lógica de negocio
│   └── entities/          # Entidades del dominio (User, Product, etc.)
├── infrastructure/        # Interacción con la infraestructura (ORM, DB, etc.)
│   ├── database/          # Configuración de base de datos y migraciones
│   └── repositories/      # Repositorios que interactúan con la base de datos
├── presentation/          # Rutas y controladores de la API
├── shared/                # Utilidades compartidas
├── app.ts                 # Archivo principal de configuración de Express
├── server.ts              # Punto de entrada de la aplicación
└── migrations/            # Migraciones de MongoDB con migrate-mongo
```

## 🚀 Requisitos Previos
- **Node.js** (v14.x o superior)
- **MongoDB** (local o MongoDB Atlas)
- **NPM** o **Yarn**

## 🔧 Configuración Inicial

1. **Clonar el repositorio:**

    ```bash
    git clone https://github.com/JuniorMCF/ecommerce-pragmma.git
    ```

2. **Entrar en el directorio del proyecto:**

    ```bash
    cd ecommerce-pragmma
    ```

3. **Instalar las dependencias:**

    Con **npm**:

    ```bash
    npm install
    ```

    O con **Yarn**:

    ```bash
    yarn install
    ```

4. **Configurar las Variables de Entorno:**

    Crear un archivo `.env` con el siguiente contenido:

    ```bash
    NODE_ENV=development
    SERVER_PORT=3000
    MONGO_URL=mongodb://localhost:27017/ecommerce
    JWT_SECRET=
    ```

## 🛠 Scripts Disponibles

- **Iniciar el servidor en modo desarrollo con Nodemon:**

    ```bash
    npm run dev
    ```

- **Compilar el código TypeScript a JavaScript:**

    ```bash
    npm run build
    ```

- **Ejecutar el servidor en producción:**

    ```bash
    npm start
    ```

## 👩🏻‍💻 Autores
- Junior Manuel Castillo Flores
- Paulo Antonio Ugarte Mendoza
