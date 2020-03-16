git pull

npm run build

#删除容器
docker rm -f brps_web &> /dev/null

#启动容器
docker run -d --restart=on-failure:5\
    -p 8081:80 \
    -v $PWD/dist:/usr/share/nginx/html \
    --name brps_web_NGINX