FROM node:24.21.0-alpine AS base
RUN npm install --global pnpm@10.34.7

FROM base AS dev

# Base Development Packages
RUN apk update \
  && apk upgrade \
  && apk add ca-certificates wget && update-ca-certificates \
  && apk add --no-cache --update \
  git \
  curl \
  wget \
  bash \
  make \
  rsync \
  nano \
  zsh \
  zsh-vcs \
  docker-cli \
  docker-cli-compose \
  openssh \
  && git config --global --add safe.directory /template-react-spa-site


# zsh
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended && \
  git clone --depth 1 https://github.com/zsh-users/zsh-autosuggestions.git /root/.oh-my-zsh/custom/plugins/zsh-autosuggestions && \
  mkdir -p /cache
COPY zshrc /root/.zshrc

WORKDIR /template-react-spa-site
ENV TERM=xterm-256color
RUN printf 'export PS1="\[\e[0;34;0;33m\][DCKR]\[\e[0m\] \\t \[\e[40;38;5;28m\][\w]\[\e[0m\] \$ "' >> ~/.bashrc

FROM base AS build
WORKDIR /app
RUN apk add --no-cache curl make git
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN make build-release

FROM nginx:alpine AS runtime
# nginx:alpine can lag behind Alpine security fixes between image rebuilds.
RUN apk upgrade --no-cache
ARG VERSION=1.0.1
LABEL version="$VERSION"
LABEL description="Template React SPA Site"
COPY --from=build /app/dist /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]
