FROM node:12 as builder
WORKDIR /app
COPY ./app/ /app/
RUN npm install 

#una vez que se compila se crea el contenedor definitivo
#FROM node:alpine
#WORKDIR /app
#COPY --from=builder /app .
CMD [ "npm", "start" ]