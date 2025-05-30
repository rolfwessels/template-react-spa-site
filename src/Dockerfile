FROM node:23.11.1-alpine AS base
WORKDIR /app
EXPOSE 80
RUN make install

##
# Build build project
##
FROM base AS build
WORKDIR /src
COPY . .
RUN make build

##
# Copy build to production SPA from ./dist to nginx image
##
FROM nginx:alpine AS production
COPY --from=build /src/dist /usr/share/nginx/html
COPY --from=build /src/nginx.conf /etc/nginx/conf.d/default.conf
ARG  VERSION=1.0.1
LABEL version="${VERSION}"
LABEL description="Template React SPA Site Codex"
ENTRYPOINT ["nginx", "-g", "daemon off;"]