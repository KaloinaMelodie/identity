FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy Angular build output
COPY --from=build /app/dist/identity /usr/share/nginx/html

# Create a startup script to handle PORT env variable
RUN echo '#!/bin/sh' > /start.sh && \
    echo 'envsubst '\''$PORT'\'' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf.tmp' >> /start.sh && \
    echo 'mv /etc/nginx/conf.d/default.conf.tmp /etc/nginx/conf.d/default.conf' >> /start.sh && \
    echo 'nginx -g "daemon off;"' >> /start.sh && \
    chmod +x /start.sh

EXPOSE 8080

CMD ["/start.sh"]