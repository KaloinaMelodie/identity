import { HttpInterceptorFn } from '@angular/common/http';

export const httpsInterceptor: HttpInterceptorFn = (req, next) => {
  // Force HTTPS sur toutes les requêtes API
  if (req.url.includes('back-identity') && req.url.startsWith('http://')) {
    console.error('❌ BLOCKED HTTP REQUEST:', req.url);
    const secureReq = req.clone({
      url: req.url.replace('http://', 'https://')
    });
    console.log('✅ CONVERTED TO HTTPS:', secureReq.url);
    return next(secureReq);
  }
  
  return next(req);
};