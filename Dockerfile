FROM node:16-alpine as build
WORKDIR /opt/app
COPY package* .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.21.6-alpine as runner
COPY --from=build /opt/app/dist/ulv2.0 /usr/share/nginx/html
COPY --from=build /opt/app/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
