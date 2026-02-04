FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

# Show which environment files exist
RUN echo "=== Environment files ===" && \
    ls -la src/environments/ && \
    echo "=== environment.prod.ts content ===" && \
    cat src/environments/environment.prod.ts

# Build with EXPLICIT production flag
RUN npm run build -- --configuration=production

# Verify the build uses HTTPS
RUN echo "=== Checking for HTTP (should be none) ===" && \
    (grep -r "http://back-identity" dist/ && echo "❌ ERROR: Found HTTP!" || echo "✅ No HTTP found") && \
    echo "=== Checking for HTTPS (should exist) ===" && \
    (grep -r "https://back-identity" dist/ && echo "✅ Found HTTPS!" || echo "❌ ERROR: No HTTPS found")

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
RUN rm -f /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/identity/browser /usr/share/nginx/html

COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8080

CMD ["/start.sh"]