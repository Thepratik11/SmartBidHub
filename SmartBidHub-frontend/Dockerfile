# Stage 1: Build React App
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Pass the backend URL at build time so React knows where to send requests
# In Render, add this as a Build Setting environment variable: VITE_API_BASE_URL
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine
# Copy the build output to Nginx's serving directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom Nginx config if you have one, or use default
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]