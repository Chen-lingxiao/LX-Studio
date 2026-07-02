# 腾讯云宝塔面板部署指南

## 项目架构

```
├── dist/                 # 前端构建产物（部署后由后端托管）
├── server/               # 后端代码（Node.js + Express）
│   ├── routes/           # API路由
│   ├── middleware/       # 中间件
│   ├── db.js            # 数据库连接（SQLite）
│   └── index.js         # 入口文件
├── data/                # 数据库目录（data.db）
├── uploads/             # 文件上传目录
├── .env                # 环境变量配置
└── package.json        # 依赖配置
```

## 方式一：Docker部署（推荐）

### 1. 宝塔面板安装Docker管理器
- 登录宝塔面板 → 软件商店 → 搜索 Docker管理器 → 安装

### 2. 准备部署文件
将以下文件上传到服务器（如 `/www/wwwroot/lx-studio/`）：
```
server/          # 后端代码
dist/            # 前端构建产物
data/            # 数据库目录（包含 data.db）
uploads/         # 上传文件目录
.env             # 环境配置文件
package.json     # 依赖配置
Dockerfile       # Docker构建文件
docker-compose.yml # Docker编排文件
```

### 3. 配置环境变量
创建 `.env` 文件：
```bash
# 管理员账号（必须设置）
ADMIN_USERNAME=admin
ADMIN_PASSWORD=你的安全密码
JWT_SECRET=随机字符串（用于生成token）

# 聚合API密钥（可选）
VITE_JUHE_API_KEY_CALENDAR=
VITE_JUHE_API_KEY_HISTORY=
```

### 4. 启动服务
```bash
cd /www/wwwroot/lx-studio
docker-compose up -d
```

### 5. 验证服务
- 访问 http://你的服务器IP:3000
- 管理后台：http://你的服务器IP:3000/admin

## 方式二：PM2部署

### 1. 宝塔面板安装环境
- 软件商店 → 安装 Node.js（推荐 20.x）
- 软件商店 → 安装 PM2管理器

### 2. 准备部署文件
上传文件到 `/www/wwwroot/lx-studio/`：
```
server/
dist/
data/
uploads/
.env
package.json
```

### 3. 安装依赖
```bash
cd /www/wwwroot/lx-studio
pnpm install --production
```

### 4. PM2启动服务
- 宝塔面板 → PM2管理器 → 添加项目
- **项目名称**：lx-studio
- **启动文件**：server/index.js
- **运行目录**：/www/wwwroot/lx-studio
- **端口**：3000

### 5. 配置Nginx反向代理
- 宝塔面板 → 网站 → 添加站点
- **域名**：你的域名（如 www.example.com）
- **根目录**：/www/wwwroot/lx-studio/dist
- **配置文件**添加反向代理：

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}

location /uploads/ {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
}

location / {
    try_files $uri $uri/ /index.html;
    root /www/wwwroot/lx-studio/dist;
}
```

## 数据迁移

### 本地数据备份
```bash
# Windows
copy data\data.db data\data.db.backup

# Linux
cp data/data.db data/data.db.backup
```

### 迁移到服务器
将以下文件完整上传到服务器对应目录：
1. **data/** - 数据库目录（包含 data.db）
2. **uploads/** - 所有上传的图片文件

## 环境变量说明

| 变量名 | 必填 | 说明 |
|--------|------|------|
| ADMIN_USERNAME | 是 | 管理员用户名 |
| ADMIN_PASSWORD | 是 | 管理员密码 |
| JWT_SECRET | 是 | JWT密钥（随机字符串） |
| PORT | 否 | 服务端口，默认3000 |

## 安全建议

1. **设置强密码**：不要使用默认密码，使用复杂密码
2. **配置SSL证书**：宝塔面板 → 网站 → 设置 → SSL → 申请Let's Encrypt证书
3. **限制管理后台访问**：通过Nginx配置IP白名单
4. **定期备份数据**：定期备份 data/ 和 uploads/ 目录

## 常见问题

### Q: 数据库连接失败？
A: 确保 data/ 目录有读写权限：
```bash
chmod -R 755 /www/wwwroot/lx-studio/data
chmod -R 755 /www/wwwroot/lx-studio/uploads
```

### Q: PM2启动后进程自动退出？
A: 查看PM2日志：
```bash
pm2 logs lx-studio
```
检查 .env 文件是否配置正确，确保 ADMIN_USERNAME 和 ADMIN_PASSWORD 已设置。

### Q: 前端页面404？
A: 确保已运行 `pnpm run build` 生成 dist 目录，且 Nginx 配置正确指向 dist 目录。

### Q: 上传图片失败？
A: 检查 uploads/ 目录权限，确保 Node.js 进程有写入权限。

## 停止/重启服务

### Docker方式
```bash
# 停止
docker-compose down

# 重启
docker-compose restart

# 查看日志
docker-compose logs -f
```

### PM2方式
```bash
# 停止
pm2 stop lx-studio

# 重启
pm2 restart lx-studio

# 查看日志
pm2 logs lx-studio
```