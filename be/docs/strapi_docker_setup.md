# Hướng dẫn triển khai Strapi với Docker và PostgreSQL

## 1. Khởi tạo & Cấu hình

- Toàn bộ cấu hình backend nằm trong thư mục `be`.
- Các file cấu hình Strapi (`config/*.js`) phải là file `.js` (không dùng `.ts`).
- Biến môi trường cấu hình DB, admin, JWT... được đặt trong `.env` hoặc truyền trực tiếp khi chạy Docker Compose.

## 2. Chạy Strapi với Docker

```bash
# Khởi động toàn bộ stack (Strapi + Postgres)
DB_PASSWORD=ArchitectPortfolio2024! STRAPI_ADMIN_EMAIL=admin@vuquangduc.com STRAPI_ADMIN_PASSWORD=Admin@2024! docker-compose up --build -d
```

- Truy cập Strapi Admin: http://localhost:1337/admin

## 3. Kiểm tra kết nối Database
- Nếu Strapi khởi động thành công, log không có lỗi "Cannot connect to database" hoặc "Cannot destructure property 'client'".
- Có thể kiểm tra log bằng:
```bash
docker logs architect_portfolio_strapi --tail 100
```
- Nếu endpoint `/admin` trả về HTTP 200 OK là Strapi đã kết nối DB thành công.

## 4. Khắc phục lỗi favicon.ico
- Nếu log báo lỗi `ENOENT: no such file or directory, open '/srv/app/favicon.ico'`:
  - Đã tắt middleware favicon trong `config/middlewares.js`.
  - Đã tạo file rỗng `public/favicon.ico` để tránh lỗi.

## 5. Một số lưu ý
- Không để lại file cấu hình `.ts` trong thư mục `config`.
- Nếu thay đổi cấu hình, nên chạy lại:
```bash
docker-compose down -v
DB_PASSWORD=... STRAPI_ADMIN_EMAIL=... STRAPI_ADMIN_PASSWORD=... docker-compose up --build -d
```
- Nếu cần kiểm tra trạng thái container:
```bash
docker ps
```

## 6. Cập nhật & merge lên main
```bash
git add .
git commit -m "docs: add Strapi Docker setup and troubleshooting guide"
git push origin <your-branch>
git checkout main
git merge <your-branch>
git push origin main
```

---
**Mọi thắc mắc hoặc lỗi phát sinh, kiểm tra lại log container Strapi và cấu hình DB.** 