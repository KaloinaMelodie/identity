FROM node:20-alpine AS build
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build Angular 20 app
RUN npm run build -- --configuration production

# Debug: Show what was built
RUN echo "=== Build output ===" && \
    find dist -type f -name "index.html" && \
    echo "=== End build output ==="

FROM nginx:alpine

# Remove ALL default nginx content
RUN rm -rf /usr/share/nginx/html/*
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy Angular 20 build output (it's in browser subfolder)
COPY --from=build /app/dist/identity/browser /usr/share/nginx/html

# Verify the files are there
RUN echo "=== Nginx html contents ===" && \
    ls -la /usr/share/nginx/html/ && \
    echo "=== Checking index.html ===" && \
    cat /usr/share/nginx/html/index.html | head -20 && \
    echo "=== End verification ==="

# Copy startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8080

CMD ["/start.sh"]