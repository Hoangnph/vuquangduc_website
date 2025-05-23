# Hướng dẫn tạo Hero Section API (Strapi v4)

## 1. Cấu trúc thư mục
```
be/src/api/hero/
├── content-types/
│   └── hero/
│       └── schema.json
├── controllers/
│   └── hero.js
├── routes/
│   └── hero.js
└── index.js
```

## 2. File schema.json (Single Type)
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
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "title": { "type": "string", "required": true, "maxLength": 100 },
    "subtitle": { "type": "string", "required": true, "maxLength": 200 },
    "description": { "type": "richtext", "required": true },
    "bannerImage": { "type": "media", "multiple": false, "required": true, "allowedTypes": ["images"] }
  }
}
```

## 3. File controller hero.js
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

## 4. File route hero.js
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

## 5. Docker Compose: Mount volume mã nguồn
Trong `be/docker-compose.yml`:
```yaml
    volumes:
      - ./src:/srv/app/src
      - strapi_uploads:/srv/app/public/uploads
      - strapi_node_modules:/srv/app/node_modules
```

## 6. Khởi động lại Strapi
```bash
docker-compose down
docker-compose up -d strapi
```

## 7. Lưu ý
- Nếu sửa schema hoặc thêm content-type, luôn đảm bảo volume đã mount đúng và khởi động lại Strapi.
- Nếu không thấy content-type mới, hãy xóa cache `.cache` và `build` trong container rồi khởi động lại.
- Đảm bảo file route dùng export CommonJS, không dùng TypeScript cho file route/controller.

---
**Sau khi làm đúng các bước trên, mục Hero sẽ xuất hiện trong Single Types của Strapi Admin.** 