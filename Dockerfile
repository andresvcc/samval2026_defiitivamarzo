FROM node:22-alpine AS build
WORKDIR /app

ARG VITE_GA_MEASUREMENT_ID=G-EDTLN44LBG
ARG VITE_SAMVAL_API_BASE_URL=/api
ENV VITE_GA_MEASUREMENT_ID=$VITE_GA_MEASUREMENT_ID
ENV VITE_SAMVAL_API_BASE_URL=$VITE_SAMVAL_API_BASE_URL

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV SAMVAL_PORT=80
ENV SAMVAL_STATIC_DIR=/app/dist
ENV SAMVAL_DATA_DIR=/app/data

COPY --from=build /app/dist ./dist
COPY --from=build /app/server ./server
COPY package.json ./

RUN mkdir -p /app/data

VOLUME ["/app/data"]
EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:${SAMVAL_PORT}/api/health || exit 1

CMD ["node", "server/server.mjs"]
