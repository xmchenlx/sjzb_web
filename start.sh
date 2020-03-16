git pull

#删除容器
docker rm -f brps_web_nginx &> /dev/null

npm run build


#启动容器
docker run --name brps_web_nginx -d -p 8081:80 -v $PWD/dist:/usr/share/nginx/html nginx