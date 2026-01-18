FROM node:24-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:24-alpine AS deps

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev

FROM node:24-alpine

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules

CMD ["node", "./dist/main.js"]
