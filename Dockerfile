# Utilise l'image de base Node.js
FROM node:latest

# Crée le dossier de travail
WORKDIR /app

# Copie le package.json et le package-lock.json dans le dossier de travail
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste des fichiers dans le dossier de travail
COPY . .

# Expose le port 1825
EXPOSE 1825

# Lance l'application
CMD [ "npm", "start" ]