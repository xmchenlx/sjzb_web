git pull

#停止Docker里的nginx（name）
docker stop brps_web_nginx

#删除容器
docker rm -f brps_nginx &> /dev/null

#关闭docker
sudo systemctl stop docker

#build依赖
npm config set registry http://registry.cnpmjs.org

npm run build

#打开docker
sudo systemctl start docker

#启动容器
docker run --name brps_web_nginx -d -p 8081:80 -p 443:443 -v $PWD/dist:/usr/share/nginx/html nginx -v /root/nginx-1.8.1/conf/nginx.conf:/usr/share/nginx.conf