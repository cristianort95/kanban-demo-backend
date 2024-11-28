# Etapa 1: Construcción
FROM node:18.20.3-bullseye-slim AS build
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY .env .env
COPY . .

RUN npx prisma generate
RUN npm run build

# Etapa 2: Ejecución
FROM node:18.20.3-bullseye-slim
WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
EXPOSE ${port_expose}

CMD ["node", "build/index.js"]