#!/bin/bash

if [[ ! `which docker` ]];then
    curl https://get.docker.com | bash
    wget https://github.com/docker/compose/releases/download/v2.29.2/docker-compose-linux-x86_64 -O docker-compose &&
        chmod +x ./docker-compose
fi


curl https://v2.magic-cat.world/compose.yml > compose.yml
curl https://v2.magic-cat.world/nginx.conf > nginx.conf

if [[ ! `cat /etc/sysctl.conf |  grep 'vm.overcommit_memory=1'`  ]];then 
    echo 'vm.overcommit_memory=1' >> /etc/sysctl.conf;
fi
sysctl vm.overcommit_memory=1
systemctl start docker
ufw disable


./docker-compose pull
./docker-compose run --rm api npx prisma db push
./docker-compose run -d --rm watchtower --run-once -c web api
./docker-compose up -d