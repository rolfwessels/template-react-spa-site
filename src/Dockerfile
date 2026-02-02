FROM node:23.11.1-alpine AS base
WORKDIR /app
RUN apk add --no-cache curl make git
RUN npm install -g pnpm@10.12.1
COPY package.json pnpm-lock.yaml Makefile ./
RUN pnpm install --frozen-lockfile

##
# Build project
##
FROM base AS build
WORKDIR /app
COPY . .
RUN make build-release

##
# Copy build to production SPA from ./dist to nginx image
##
FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
ARG VERSION=1.0.1
LABEL version="${VERSION}"
LABEL description="Template React SPA Site"
ENTRYPOINT ["nginx", "-g", "daemon off;"]