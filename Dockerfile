#FROM node:19
FROM node:12

WORKDIR /app

#COPY package.json ./

#COPY . .

#RUN npm install

EXPOSE 3000

#CMD [ "npm", "start" ]
CMD [ "bash" ]
