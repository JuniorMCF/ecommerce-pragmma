import { Router } from 'express';
import { asyncHandler } from './error.handler'; // El asyncHandler que captura errores

export const wrapRouter = (router: Router): Router => {
  // Iterar sobre cada ruta del router y envolver las funciones asíncronas
  router.stack.forEach((layer) => {
    const route = layer.route;
    if (route) {
      route.stack.forEach((stackLayer: any) => {
        if (stackLayer.method) {
          stackLayer.handle = asyncHandler(stackLayer.handle);
        }
      });
    }
  });
  return router;
};
