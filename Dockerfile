FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --omit=dev
COPY server ./server
COPY shared ./shared
COPY dist ./dist
ENV PORT=3001
EXPOSE 3001
CMD ["node", "server/index.js"]
