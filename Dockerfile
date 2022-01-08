# pull official base image
FROM python:3.9.6-alpine

# create directory for the app user
RUN mkdir -p /home/fastams

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# create the app user
RUN addgroup -S fastams && adduser -S fastams -G fastams

# create the appropriate directories
ENV HOME=/home/fastams
ENV APP_HOME=/home/fastams/app
RUN mkdir $APP_HOME
RUN mkdir $APP_HOME/static
RUN mkdir $APP_HOME/assets
RUN mkdir $APP_HOME/logs
WORKDIR $APP_HOME


# install dependencies
RUN apk update \
    && apk add gcc python3-dev musl-dev \
    && apk add g++ \
    && apk add postgresql \
    && apk add postgresql-dev \
    && apk add openssl-dev libffi-dev \
    && apk add jpeg-dev zlib-dev libjpeg

RUN pip install --upgrade pip

COPY ./app/requirements.txt $APP_HOME
RUN pip --default-timeout=1000 install -r requirements.txt

# Delet temp build dir.
# RUN apk del build-deps

COPY ./entrypoint.prod.sh $APP_HOME
RUN sed -i 's/\r$//g'  $APP_HOME/entrypoint.prod.sh
RUN chmod +x  $APP_HOME/entrypoint.prod.sh

# copy project
COPY ./app $APP_HOME

# run entrypoint.prod.sh
ENTRYPOINT ["/home/fastams/app/entrypoint.prod.sh"]

# chown all the files to the app user
RUN chown -R fastams:fastams $APP_HOME

# change to the app user
USER fastams
