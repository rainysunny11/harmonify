# --- STAGE 1: Build the React app ---

FROM node:18 AS frontend-builder

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build

# --- STAGE 2: Serve the React frontend using Nginx ---

FROM nginx:alpine AS frontend

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=frontend-builder /frontend/build . 

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]