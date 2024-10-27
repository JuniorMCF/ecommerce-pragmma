# PRAGMMA E-Commerce API

Este proyecto es una API desarrollada en **Node.js** utilizando **TypeScript** para un sistema de e-commerce

## Descripción del Proyecto 📋

El proyecto consiste en desarrollar una API utilizando NodeJS con Express y MongoDB como base de datos NoSQL. Esta aplicación permite a los usuarios seleccionar productos para su carrito de compras, autenticarse y enviar una orden al administrador el cual puede gestionar los productos que el cliente podra ver en la web.

## 📚 Funcionalidades

1. **Gestión de Categorías**

   - Crear, actualizar, eliminar y listar categorías para organizar productos.

2. **Gestión de Productos**

   - Crear, actualizar, eliminar y listar productos, con filtros y búsqueda avanzada.

3. **Gestión de Usuarios**

   - Registro de usuarios, autenticación JWT, gestión de perfil y recuperación de contraseñas.

4. **Gestión de Órdenes**

   - Crear órdenes de compra, actualizar estado, ver historial y cancelar órdenes.

5. **Gestión de Carrito de Compras**
   - Agregar, actualizar, visualizar y vaciar el carrito de compras.


## 🚀 Instrucciones para Ejecutar el Proyecto

1. **Clonar el Repositorio**
   - Clona el proyecto desde GitHub usando el siguiente comando:
     ```bash
     git clone https://github.com/JuniorMCF/ecommerce-pragmma.git
     ```

2. **Abrir el Proyecto en tu IDE Favorito**
   - Navega al directorio del proyecto y ábrelo con el IDE de tu preferencia.

3. **Crear una Instancia de MongoDB en Atlas**
   - Dirígete a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) y crea una cuenta o inicia sesión.
   - Crea un nuevo **Cluster** gratuito.
   - Configura tu base de datos y luego haz clic en **Connect** para obtener la URI de conexión.
   - Añade tu dirección IP actual a la lista de IP permitidas y crea un usuario de base de datos con permisos de lectura y escritura.
   - Copia la URI de conexión. Debería verse similar a:
     ```
     mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/ecommerce?retryWrites=true&w=majority
     ```

4. **Configurar Variables de Entorno**
   - Crea un archivo `.env` en la raíz del proyecto y define las variables de entorno requeridas:
     ```env
     NODE_ENV=development
     SERVER_PORT=3000
     MONGODB_CONNECT_URI=<tu_uri_mongodb_atlas>
     NAME_DATABASE='pragmma-ecommerce-db'
     JWT_ACCESS_SECRET=<tu_secreto_jwt>
     JWT_EXPIRATION=1h
     ```

5. **Instalar Dependencias**
   - Instala las dependencias listadas en `package.json` con el siguiente comando:
     ```bash
     npm install
     ```
   - Si estás utilizando Yarn, puedes instalar las dependencias con:
     ```bash
     yarn install
     ```

6. **Ejecutar el Proyecto en Desarrollo**
   - Inicia el servidor en modo desarrollo con TypeScript:
     ```bash
     npm run dev
     ```

7. **Compilar y Ejecutar en Producción**
   - Para compilar el proyecto a JavaScript y ejecutarlo en producción:
     ```bash
     npm run build
     npm start
     ```

¡Listo! Ahora tu API debería estar funcionando en el puerto especificado (por defecto, `http://localhost:3000`).


## 📘 Conceptos Aplicados

En el proyecto se implementaron los siguientes conceptos clave:

1. **Endpoints CRUD**
   - Definición de endpoints para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las entidades principales, como *Categories*, *Products*, *Users* y *Orders*, que permiten gestionar las operaciones básicas del e-commerce.

2. **Autenticación y Autorización**
   - Implementación de autenticación y autorización mediante **JSON Web Tokens (JWT)**. Los servicios especializados gestionan la creación y verificación de tokens, proporcionando acceso seguro y controlado a los recursos de la API.

3. **Hashing de Contraseña**
   - Uso de hashing seguro para almacenar contraseñas en la base de datos, protegiendo la información del usuario contra accesos no autorizados mediante algoritmos de hash que garantizan la integridad y seguridad de las contraseñas.

4. **Validación de Datos**
   - Validación de datos realizada con **Express Validator**, establecida como middleware en cada ruta respectiva. Esta librería permite validar y sanitizar datos de entrada de manera flexible, asegurando que las solicitudes cumplen con los requisitos establecidos.

5. **Inyección de Dependencias**
   - Uso de **Inversify** para gestionar la inyección de dependencias en la aplicación, facilitando la modularidad y escalabilidad del proyecto.

6. **WebSockets**
   - Integración de WebSockets para emitir eventos en tiempo real, como la creación de una orden, permitiendo actualizaciones en vivo y una mejor experiencia de usuario.

7. **DTO (Data Transfer Objects) y Entidades**
   - Uso de **DTOs y entidades** para estructurar y organizar las solicitudes y respuestas de manera clara, permitiendo un flujo de datos consistente entre las diferentes capas del sistema.

8. **Contracts**
   - Definición de interfaces en la capa de **Contracts** para los servicios y repositorios, promoviendo el desacoplamiento de la lógica del negocio y facilitando la testabilidad del código.

9. **Repositorios**
   - Implementación de una capa de repositorios que maneja la lógica de acceso a datos, permitiendo que la interacción con la base de datos esté desacoplada de la lógica de negocio.

10. **Middlewares**
    - **Middleware de Autenticación**: Controla el acceso a los endpoints según los permisos de cada usuario.
    - **Middleware para Manejo de Errores**: Proporciona una gestión centralizada de errores, mejorando la experiencia del usuario y facilitando el manejo de excepciones.

11. **Servicios de Token**
    - Servicios dedicados para la creación y verificación de **tokens JWT**, asegurando la autenticidad y validez de cada sesión y permitiendo un acceso seguro a la API.

12. **Documentación con Swagger**
    - Configuración de **Swagger** para documentar la API, facilitando a otros desarrolladores la comprensión y uso de los endpoints disponibles en el sistema.



## 👩🏻‍💻 Autores

- Junior Manuel Castillo Flores
- Paulo Antonio Ugarte Mendoza
