#!/bin/sh

PORT=${PORT:-8080}

echo "Starting nginx on port $PORT"

cat > /etc/nginx/conf.d/default.conf <<EOF
server {
    listen $PORT;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Disable caching for index.html
    location = /index.html {
        add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
        add_header X-Content-Type-Options "nosniff";
        try_files \$uri =404;
    }

    # Cache static assets with versioning
    location ~* \\.(?:css|js)$ {
        add_header Cache-Control "public, max-age=31536000, immutable";
        try_files \$uri =404;
    }

    # Other assets
    location ~* \\.(?:jpg|jpeg|gif|png|ico|svg|woff|woff2|ttf|eot)$ {
        add_header Cache-Control "public, max-age=31536000, immutable";
        try_files \$uri =404;
    }

    # Angular routes
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
EOF

echo "=== Nginx config ==="
cat /etc/nginx/conf.d/default.conf

echo "=== Files in html directory ==="
ls -lah /usr/share/nginx/html/

echo "=== Checking for HTTP in deployed files ==="
grep -r "http://back-identity" /usr/share/nginx/html/ || echo "✅ No HTTP found in deployed files"

echo "=== Checking for HTTPS in deployed files ==="
grep -r "https://back-identity" /usr/share/nginx/html/ | head -5 || echo "❌ No HTTPS found"

exec nginx -g "daemon off;"