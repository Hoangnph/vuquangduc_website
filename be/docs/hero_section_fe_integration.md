# Hướng dẫn tích hợp Hero Section API cho Frontend

## 1. Endpoint API
- Lấy dữ liệu Hero section:
  - `GET http://<your-domain>:1337/api/hero`

## 2. Cấu trúc dữ liệu trả về (ví dụ)
```json
{
  "id": 1,
  "title": "Vu Quang Đức",
  "subtitle": "Kiến trúc sư",
  "description": "Một kiến trúc sư tài ba",
  "bannerImage": {
    "url": "/uploads/rob_curran_s_UXXO_3x_PB_Yo_unsplash_2aee81d5d3.jpg",
    "formats": {
      "thumbnail": { "url": "/uploads/thumbnail_rob_curran...jpg" },
      "small": { "url": "/uploads/small_rob_curran...jpg" },
      "medium": { "url": "/uploads/medium_rob_curran...jpg" },
      "large": { "url": "/uploads/large_rob_curran...jpg" }
    }
  }
}
```

## 3. Ví dụ fetch dữ liệu Hero trong Next.js (React)
```ts
// app/_lib/api.ts
export async function fetchHero() {
  const res = await fetch('http://localhost:1337/api/hero');
  if (!res.ok) throw new Error('Failed to fetch hero');
  return res.json();
}
```

```tsx
// app/components/hero-section.tsx
import { fetchHero } from '../_lib/api';

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

## 4. Lưu ý
- Đảm bảo FE có quyền truy cập tới API Strapi (CORS, network).
- Nếu deploy production, thay `localhost` bằng domain thực tế của backend.
- Có thể dùng các format ảnh nhỏ hơn (`thumbnail`, `small`, `medium`, `large`) cho responsive.
- Nếu cần xác thực, hãy dùng JWT hoặc API token theo hướng dẫn Strapi.

---
**Sau khi làm đúng các bước trên, Hero Section sẽ hiển thị dữ liệu động từ Strapi trên frontend.** 