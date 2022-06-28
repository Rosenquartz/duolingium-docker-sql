FROM node:12.2.0
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN apt-get update && apt-get install -y netcat
COPY . .
EXPOSE 3000
CMD ["npm", "start"]