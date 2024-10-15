# 🛒 PRAGMMA E-Commerce API

## Descripción del Proyecto

Este proyecto es una API para un sistema de **e-commerce** desarrollado en **Node.js** usando **TypeScript**. Está diseñado con principios de **Clean Architecture**, lo que permite que el código sea modular, mantenible y escalable. 

El sistema incluye autenticación de usuarios (con roles de administrador y cliente), gestión de productos, órdenes de venta, y manejo de métodos de pago.

## Tecnologías Utilizadas

- **Node.js**: Plataforma de desarrollo backend.
- **TypeScript**: Añade tipado estático para mejorar la calidad del código.
- **Express**: Framework de servidor HTTP para manejar las solicitudes de API.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar usuarios, productos, órdenes, etc.
- **Mongoose**: ORM para MongoDB que facilita la interacción con la base de datos.
- **Migrate-Mongo**: Herramienta de migraciones para MongoDB.
- **Dotenv**: Para gestionar variables de entorno.
- **Nodemon**: Reinicia automáticamente el servidor durante el desarrollo cuando hay cambios en el código.
- **BCrypt**: Para el hashing de contraseñas.
- **JWT (jsonwebtoken)**: Para la autenticación basada en tokens.

## Estructura de Carpetas

El proyecto sigue los principios de **Clean Architecture**:

```bash
src/
├── application/           # Casos de uso y lógica de aplicación
├── config/                # Configuración de base de datos, servidor, etc.
├── domain/                # Entidades y lógica de negocio
│   └── entities/          # Entidades del dominio (User, Product, etc.)
├── infrastructure/        # Interacción con la infraestructura (ORM, DB, etc.)
│   ├── database/          # Configuración de base de datos y migraciones
│   └── repositories/      # Repositorios que interactúan con la DB
├── presentation/          # Rutas y controladores de la API
├── shared/                # Utilidades compartidas
├── app.ts                 # Archivo principal de configuración de Express
├── server.ts              # Punto de entrada de la aplicación
└── migrations/            # Migraciones de MongoDB con migrate-mongo
```

## Estructura de Carpetas

- Node.js (v14.x o superior)
- MongoDB (local o MongoDB Atlas)
- NPM o Yarn


## Configuración Inicial

# Clonar el repositorio:
git clone https://github.com/JuniorMCF/ecommerce-pragmma.git

# Entrar en el directorio del proyecto:
cd ecommerce-pragmma

# Instalar las dependencias:
npm install
# O con Yarn:
yarn install

## Configurar Variables de Entorno
# .env
NODE_ENV=development
SERVER_PORT=3000
DB_HOST=localhost
DB_PORT=3000
DB_USER=root
DB_PASSWORD=
DB_NAME=ecommerce
MONGO_URL=mongodb://localhost:27017/ecommerce
JWT_SECRET=


## Scripts Disponibles

# Iniciar el servidor en modo desarrollo con Nodemon:
npm run dev

# Compilar el código TypeScript a JavaScript:
npm run build

# Ejecutar el servidor en producción:
npm start


