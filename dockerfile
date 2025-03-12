# 🌍 Stage 1: Build the Three.js portfolio using Node.js
FROM node:18 AS builder
WORKDIR /app

# 🏗️ Install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
RUN npm install gsap

# 📂 Copy source code
COPY . .

# 🏗️ Build the Three.js portfolio
RUN npm run build

# 🌍 Stage 2: Serve with Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# 🗑️ Remove default Nginx static files
RUN rm -rf ./*

# ✅ Copy built files
COPY --from=builder /app/dist .

# ✅ Copy assets (HDRI, models, textures, fonts, etc.)
COPY --from=builder /app/assets /usr/share/nginx/html/assets

# ✅ Ensure correct permissions
RUN chmod -R 755 /usr/share/nginx/html/assets

# 🛠️ Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# 📌 Expose port 80
EXPOSE 80

# 🚀 Start Nginx
CMD ["nginx", "-g", "daemon off;"]
