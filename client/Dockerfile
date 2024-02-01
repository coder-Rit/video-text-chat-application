FROM node:16.15.0-alpine as alpine16

WORKDIR /chatt_app_frontend
COPY package.json .

RUN npm install

COPY . .

RUN npm run build




# nginx

FROM nginx:1.13-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=alpine16 /chatt_app_frontend/build .
ENTRYPOINT [ "nginx","-g","daemon off;" ]

