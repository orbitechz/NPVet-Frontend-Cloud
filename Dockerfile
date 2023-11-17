#Use the official Node image as a base image for building
FROM node:18-alpine AS builder

#Set the working directory in the container
WORKDIR /app

#Copy package.json and package-lock.json to the container
COPY package*.json ./

#Install dependencies
RUN npm install

#Copy the rest of the application code
COPY . .

#Build the Angular app
RUN npm run build

#Use the official Nginx image as a base image for serving
FROM nginx:alpine

#Copy the built Angular app from the builder stage to the Nginx container
# COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar a configuração personalizada do NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

#Expose the port the Nginx server will run on
EXPOSE 80

#Command to run the Nginx server
CMD ["nginx", "-g", "daemon off;"]
