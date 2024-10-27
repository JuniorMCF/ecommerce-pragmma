import swaggerUi from 'swagger-ui-express';
import * as yaml from 'js-yaml';
import { Express } from 'express';
import path from 'path';
import fs from 'fs';

// Obtener la ruta absoluta del archivo swagger.yaml en la raíz del proyecto
const swaggerFilePath = path.join(__dirname, '../../swagger.yaml');

// Leer el archivo swagger.yaml
const swaggerYaml = fs.readFileSync(swaggerFilePath, 'utf8');

// Crear la especificación Swagger
const swaggerDocument = yaml.load(swaggerYaml) as Record<string, unknown>;

// Función para configurar Swagger en tu aplicación Express
const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Asegúrate de pasar swaggerDocument aquí
};

export default setupSwagger;
