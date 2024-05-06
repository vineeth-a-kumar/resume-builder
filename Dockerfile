# Dockerfile

FROM node:20.0.0-alpine

# COPY rollup.config.js ./
WORKDIR /app

COPY package*.json ./

RUN npm install

# COPY ./src ./src
# COPY ./public ./public

COPY . .

# RUN npm run build

EXPOSE 5173

# ENV HOST=0.0.0.0

CMD ["npm", "run", "dev"]
