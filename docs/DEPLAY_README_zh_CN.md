## 部署说明

部署时，可以使用 `.env` 和 `.env[环境名]` 来进行控制环境变量  
默认部署配置设定 vue-cli 的 `publicPath` 为 `/`  
如果当前部署目录为子目录，需要修改 `.env[环境]` 等文件中的相关 `publicPath` 来修改子目录。  
在使用 `history` 模式路由时，还需要在 nginx 配置文件中配置如下内容：

```nginx
    server {
        listen 443 ssl;
        server_name 你的域名;
        index index.html index.htm index.php;
        root /wwwroot/项目路径;

        # preview
        location /preview/ {
                alias /wwwroot/项目路径/preview/;
                index index.html;
                try_files $uri $uri/ /index.html =404;
        }
        # 测试演示子目录
        location /test/ {
                alias /wwwroot/项目路径/test/;
                index index.html;
                try_files $uri $uri/ /index.html =404;
        }
        # 根目录项目
        location / {
                try_files $uri $uri/ /index.html =404;
        }
        # 请求的后端 API 地址
        location /api/ {
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_pass       http://127.0.0.1:8080/api/;
        }
    }
```
