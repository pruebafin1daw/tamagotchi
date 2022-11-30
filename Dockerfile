FROM ubuntu:20.04

RUN apt-get update
RUN apt-get upgrade -y

RUN apt-get install -y nodejs

#RUN ln -s /usr/bin/nodejs /usr/bin/node

RUN apt-get install -y npm
RUN npm config set strict-ssl false
RUN /usr/bin/npm install ws
ADD . ./root
EXPOSE 8023:8023

ENTRYPOINT ["/usr/bin/node", "/root/index.js"]
