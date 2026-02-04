FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy Angular build output (replace identity with your project name)
COPY --from=build /app/dist/identity /usr/share/nginx/html

EXPOSE 8080

# Simple CMD, works with Cloud Run
CMD ["nginx", "-g", "daemon off;"]
