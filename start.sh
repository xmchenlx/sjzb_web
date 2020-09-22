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
docker run -d -p 80:80 -p 443:443 --name brps_nginx -v /home/brpsProject/nginx/conf.d:/etc/nginx/conf.d:rw -v /home/brpsProject/brps_web/brps_web/dist:/home/brpsProject/nginx/html  nginx
docker run -d -p 81:81 --name www_nginx -v /home/brpsProject/nginx/conf.d:/etc/nginx/conf.d:rw -v /home/brpsProject/www_page:/home/brpsProject/nginx/html  nginx
# docker run --name brps_web_nginx -d -p 8081:80 -p 443:443 -v $PWD/dist:/usr/share/nginx/html nginx -v /root/nginx-1.8.1/conf/nginx.conf:/usr/share/nginx.conf



#其他指令 未整理
docker stop brps_web_nginx
docker rm -f brps_web_nginx &> /dev/null
sudo systemctl stop docker
sudo systemctl start docker
docker run --name brps_web_nginx -d -p 8081:80 -p 443:443 -v $PWD/dist:/usr/share/nginx/html -v /root/nginx-1.8.1/conf/nginx.conf:/usr/share/nginx/nginx.conf/:rw nginx


mkdir -p nginx/aliyun www/aliyun ssl/aliyun

docker run -di --name mynginx \
        -p 443:443\
        -p 80:80 \
        --privileged=true \
        -v /opt/nginx/data:/usr/share/nginx/html:rw\
        -v /opt/nginx/config/nginx.conf:/etc/nginx/nginx.conf/:rw\
        -v /opt/nginx/config/conf.d/default.conf:/etc/nginx/conf.d/default.conf:rw\
        -v /opt/nginx/logs:/var/log/nginx/:rw\
        -v /opt/nginx/ssl:/ssl \
        -d nginx
-v /home/brpsProject/nginx/conf.d/cert:/etc/nginx/conf.d/cert

docker run -d -p 80:80 -p 443:443 --name brps_nginx -v /home/brpsProject/nginx/conf.d:/etc/nginx/conf.d:rw -v /home/brpsProject/brps_web/brps_web/dist:/home/brpsProject/nginx/html  nginx

docker run -d -p 80:80 -p:443:443 --name brps_nginx -v /home/brpsProject/nginx/conf.d:/root/nginx-1.8.1/conf:rw -v /home/brpsProject/brps_web/brps_web/dist:/home/brpsProject/nginx/html nginx
docker run -d -p 81:80 --name www_nginx -v /home/brpsProject/nginx/conf.d:/root/nginx-1.8.1/conf:rw -v /home/brpsProject/www_page:/home/brpsProject/nginx/html  nginx



#tomcat地址：./usr/local/tomcat


\最新运行nginx代码
docker run -d -p 80:80 -p 443:443 --name bbrps -v /home/brpsProject/nginx/conf.d:/etc/nginx/conf.d:rw -v /home/brpsProject/brps_web/brps_web/dist:/home/brpsProject/nginx/html -v /home/blogProject/lxblog_web/dist:/home/blogProject/nginx/html  -v /home/houserentProject/houserent_web/dist:/home/houserentProject/houserent_web/dist -v /home/brpsProject/www_page:/home/brpsProject/www_page nginx