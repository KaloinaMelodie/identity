FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .

# Build
RUN npm run build -- --configuration=production

# Inject build timestamp into index.html
RUN BUILD_TIME=$(date -u +"%Y-%m-%d %H:%M:%S UTC") && \
    sed -i "s/BUILD_TIMESTAMP_PLACEHOLDER/$BUILD_TIME/" dist/identity/browser/index.html

# Verification
RUN echo "=== Checking for HTTP (should be none) ===" && \
    if grep -r "http://back-identity" dist/; then \
        echo "❌ ERROR: Found HTTP URLs in build!" && exit 1; \
    else \
        echo "✅ No HTTP URLs found"; \
    fi && \
    echo "=== Checking for HTTPS (should exist) ===" && \
    if grep -r "https://back-identity" dist/; then \
        echo "✅ Found HTTPS URLs in build"; \
    else \
        echo "❌ ERROR: No HTTPS URLs found in build!" && exit 1; \
    fi

# Show a sample file to verify
RUN echo "=== Sample from main JS file ===" && \
    find dist -name "main*.js" -exec head -c 1000 {} \;

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
RUN rm -f /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/identity/browser /usr/share/nginx/html

COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8080

CMD ["/start.sh"]