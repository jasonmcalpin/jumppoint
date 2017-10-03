FROM ubuntu:16.04

MAINTAINER Chris Fidao

WORKDIR /opt

# ADD setup_5.x /tmp/setup_5.x
# RUN bash /tmp/setup_5.x

RUN apt-get update
RUN apt-get install -y build-essential
RUN apt-get install -y nodejs
RUN /usr/bin/npm install -g gulp
RUN /usr/bin/npm install -g bower

VOLUME ["/opt"]
CMD ["gulp", "watch"]