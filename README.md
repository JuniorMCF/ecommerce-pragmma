# PRAGMMA E-Commerce API

Este proyecto es una API desarrollada en **Node.js** utilizando **TypeScript** para un sistema de e-commerce.

## Descripción del Proyecto 📋

La **PRAGMMA E-Commerce API** es una solución robusta diseñada para gestionar un sistema de comercio electrónico. Utilizando **Node.js** con **Express** y **MongoDB** como base de datos NoSQL, la API proporciona una interfaz para que los usuarios seleccionen productos, gestionen su carrito de compras, se autentiquen y realicen pedidos. Además, incluye **Socket.IO** para notificaciones en tiempo real, mejorando la interactividad y la experiencia del usuario.

## Funcionalidades 📦

1. **Gestión de Categorías**
   - Crear, actualizar, eliminar y listar categorías para organizar los productos de manera eficiente.

2. **Gestión de Productos**
   - Crear, actualizar, eliminar y listar productos, incluyendo capacidades de filtrado y búsqueda avanzada.

3. **Gestión de Usuarios**
   - Registro de nuevos usuarios, autenticación mediante JWT, gestión de perfiles y recuperación de contraseñas.

4. **Gestión de Órdenes**
   - Crear órdenes de compra, actualizar su estado, visualizar el historial de órdenes y cancelar pedidos.

5. **Gestión de Carrito de Compras**
   - Agregar, actualizar, visualizar y vaciar el carrito de compras, proporcionando una experiencia de compra intuitiva.

## 🚀 Instrucciones para Ejecutar el Proyecto

1. **Clonar el Repositorio**
   - Clona el proyecto desde GitHub:
     ```bash
     git clone https://github.com/JuniorMCF/ecommerce-pragmma.git
     ```

2. **Abrir el Proyecto en tu IDE Favorito**
   - Navega al directorio del proyecto y ábrelo en tu IDE preferido.

3. **Crear una Instancia de MongoDB en Atlas**
   - Visita [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) y crea una cuenta o inicia sesión.
   - Crea un nuevo **Cluster** gratuito y configura tu base de datos.
   - Añade tu dirección IP actual a la lista de IP permitidas y crea un usuario de base de datos con permisos de lectura y escritura.
   - Copia la URI de conexión. Debería verse similar a:
     ```
     mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/ecommerce?retryWrites=true&w=majority
     ```

4. **Configurar Variables de Entorno**
   - Crea un archivo `.env` en la raíz del proyecto y define las variables necesarias:
     ```env
     NODE_ENV=development
     SERVER_PORT=3000
     MONGODB_CONNECT_URI=<tu_uri_mongodb_atlas>
     NAME_DATABASE='pragmma-ecommerce-db'
     JWT_ACCESS_SECRET=<tu_secreto_jwt>
     JWT_EXPIRATION=1h

     STORAGE_DISK=local
     LOCAL_STORAGE_PATH=./uploads
     MAX_FILE_SIZE_MB=5

     AWS_BUCKET_NAME=
     AWS_REGION=us-east-1
     AWS_ACCESS_KEY_ID=
     AWS_SECRET_ACCESS_KEY=
     ```

5. **Instalar Dependencias**
   - Instala las dependencias del proyecto:
     ```bash
     npm install
     ```
   - O si usas Yarn:
     ```bash
     yarn install
     ```

6. **Ejecutar el Proyecto en Desarrollo**
   - Inicia el servidor en modo desarrollo:
     ```bash
     npm run dev
     ```

7. **Compilar y Ejecutar en Producción**
   - Para compilar el proyecto y ejecutarlo en producción:
     ```bash
     npm run build
     npm start
     ```

Tu API debería estar funcionando en `http://localhost:3000`.

## 📘 Conceptos Aplicados

El proyecto implementa los siguientes conceptos clave:

1. **Endpoints CRUD**
   - CRUD (Crear, Leer, Actualizar, Eliminar) para *Categories*, *Products*, *Users*, y *Orders*.

2. **Autenticación y Autorización**
   - Uso de **JSON Web Tokens (JWT)** para autenticar y autorizar usuarios.

3. **Hashing de Contraseña**
   - Hashing seguro de contraseñas para proteger la información del usuario.

4. **Validación de Datos**
   - Validación de datos con **Express Validator**.

5. **Inyección de Dependencias**
   - Uso de **Inversify** para gestionar dependencias y mejorar la modularidad.

6. **WebSockets**
   - Integración de WebSockets para notificaciones en tiempo real.

7. **DTOs y Entidades**
   - Uso de **DTOs y entidades** para un flujo de datos organizado.

8. **Contracts**
   - Definición de interfaces para servicios y repositorios.

9. **Repositorios**
   - Capa de repositorios para manejar la lógica de acceso a datos.

10. **Middlewares**
    - Middleware para autenticación y manejo de errores.

11. **Servicios de Token**
    - Servicios dedicados para la gestión de tokens JWT.

12. **Documentación con Swagger**
    - Configuración de **Swagger** para documentar la API.

## 👩🏻‍💻 Autores

- Junior Manuel Castillo Flores
- Paulo Antonio Ugarte Mendoza
