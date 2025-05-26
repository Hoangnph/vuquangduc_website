# Hướng dẫn đầy đủ tạo và tích hợp Hero Section API với Strapi v4

## 1. Tạo schema Hero (Single Type)
- Tạo file: `be/src/api/hero/content-types/hero/schema.json`
```json
{
  "kind": "singleType",
  "collectionName": "heroes",
  "info": {
    "singularName": "hero",
    "pluralName": "heroes",
    "displayName": "Hero",
    "description": "Hero section content for the home page"
  },
  "options": { "draftAndPublish": true },
  "attributes": {
    "title": { "type": "string", "required": true, "maxLength": 100 },
    "subtitle": { "type": "string", "required": true, "maxLength": 200 },
    "description": { "type": "richtext", "required": true },
    "bannerImage": { "type": "media", "multiple": false, "required": true, "allowedTypes": ["images"] }
  }
}
```

## 2. Tạo controller và route cho Hero
- Controller: `be/src/api/hero/controllers/hero.js`
```js
module.exports = {
  async find(ctx) {
    try {
      const entity = await strapi.entityService.findMany('api::hero.hero', {
        populate: ['bannerImage'],
      });
      return entity;
    } catch (err) {
      ctx.body = err;
    }
  },
  async update(ctx) {
    try {
      const { id } = ctx.params;
      const { data } = ctx.request.body;
      const entity = await strapi.entityService.update('api::hero.hero', id, {
        data,
        populate: ['bannerImage'],
      });
      return entity;
    } catch (err) {
      ctx.body = err;
    }
  },
};
```
- Route: `be/src/api/hero/routes/hero.js`
```js
module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/hero',
      handler: 'hero.find',
      config: { policies: [] },
    },
    {
      method: 'PUT',
      path: '/hero',
      handler: 'hero.update',
      config: { policies: [] },
    },
  ],
};
```
- File rỗng: `be/src/api/hero/index.js`

## 3. Kiểm tra tích hợp Docker
- Đảm bảo trong `be/docker-compose.yml` có mount volume mã nguồn:
```yaml
    volumes:
      - ./src:/srv/app/src
      - strapi_uploads:/srv/app/public/uploads
      - strapi_node_modules:/srv/app/node_modules
```
- Khởi động lại Strapi:
```bash
docker-compose down
docker-compose up -d strapi
```
- Kiểm tra file schema trong container:
```bash
docker exec architect_portfolio_strapi ls -l /srv/app/src/api/hero/content-types/hero/
```

## 4. Tạo dữ liệu Hero trên Strapi
1. Truy cập Strapi Admin: http://localhost:1337/admin
2. Vào Content Manager → Single Types → Hero
3. Nhập các trường: title, subtitle, description, bannerImage
4. Nhấn **Publish** để lưu dữ liệu

## 5. Khai báo quyền public cho API Hero
1. Vào Settings → Users & Permissions Plugin → Roles → Public
2. Tìm mục Hero, bật quyền **find** (GET)
3. Nhấn **Save**

## 6. Fetch API Hero từ FE
- Endpoint: `GET http://localhost:1337/api/hero`
- Ví dụ fetch trong Next.js:
```ts
export async function fetchHero() {
  const res = await fetch('http://localhost:1337/api/hero');
  if (!res.ok) throw new Error('Failed to fetch hero');
  return res.json();
}
```
- Render trong React:
```tsx
export default async function HeroSection() {
  const { title, subtitle, description, bannerImage } = await fetchHero();
  return (
    <section>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <div dangerouslySetInnerHTML={{ __html: description }} />
      <img src={`http://localhost:1337${bannerImage.url}`} alt={title} />
    </section>
  );
}
```

## 7. Lưu ý
- Nếu không thấy Hero trong Content Manager, kiểm tra lại volume Docker và xóa cache `.cache`, `build` trong container.
- Đảm bảo quyền public đã bật cho API Hero.
- Nếu deploy production, thay `localhost` bằng domain thực tế.

---
**Sau khi làm đúng các bước trên, bạn sẽ có thể tạo, quản lý và fetch Hero Section từ Strapi cho frontend.** 