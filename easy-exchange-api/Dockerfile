FROM node:10-alpine as build-stage
WORKDIR /api-app
COPY . /api-app/
ENV TZ=America/Sao_Paulo
RUN apk add tzdata
RUN cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime && echo "America/Sao_Paulo" >  /etc/timezone
RUN npm install
ENV LANG pt_BR.UTF-8 \
  LANGUAGE pt_BR.UTF-8 \
  LC_ALL pt_BR.UTF-8
CMD [ "npm", "run", "start" ]