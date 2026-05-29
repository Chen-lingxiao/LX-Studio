# Nginx 反代实战：一个域名跑多个服务

## 背景

在个人服务器上部署多个应用时，如何用一个域名管理多个服务？答案是使用 Nginx 反向代理。

## 配置示例

```nginx
server {
    listen 80;
    server_name kirameku.me;

    # 博客服务
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # API 服务
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
    }

    # 静态文件服务
    location /static/ {
        root /var/www/static;
        expires 30d;
    }
}
```

## SSL 配置

配合 Let's Encrypt 使用：

```bash
certbot --nginx -d kirameku.me
```

## 总结

Nginx 反向代理是管理多个服务的利器，配置灵活且性能优秀。