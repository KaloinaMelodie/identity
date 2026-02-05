#!/bin/sh

PORT=${PORT:-8080}

echo "Starting nginx on port $PORT"

cat > /etc/nginx/conf.d/default.conf <<EOF
server {
    listen $PORT;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # CRITICAL: Disable ALL caching for now to force fresh download
    add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
    add_header Pragma "no-cache";
    add_header Expires "0";

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

echo "=== Checking for HTTP in deployed files ==="
grep -r "http://back-identity" /usr/share/nginx/html/ || echo "✅ No HTTP found in deployed files"

echo "=== Checking for HTTPS in deployed files ==="
grep -r "https://back-identity" /usr/share/nginx/html/ | head -5 || echo "❌ No HTTPS found"

exec nginx -g "daemon off;"