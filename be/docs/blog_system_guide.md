# Blog System Guide

## 1. Overview

Blog system được thiết kế cho website cá nhân của kiến trúc sư, tập trung vào việc chia sẻ các bài viết về kiến trúc, dự án và kinh nghiệm. Hệ thống được xây dựng trên Strapi CMS với cấu trúc đơn giản nhưng đầy đủ chức năng cần thiết.

## 2. Content Types

### 2.1 Blog Post
```json
{
  "kind": "collectionType",
  "collectionName": "blog_posts",
  "info": {
    "singularName": "blog-post",
    "pluralName": "blog-posts",
    "displayName": "Blog Post",
    "description": "Bài viết blog về kiến trúc và dự án"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true,
      "maxLength": 100
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    },
    "content": {
      "type": "richtext",
      "required": true
    },
    "excerpt": {
      "type": "text",
      "maxLength": 200
    },
    "featuredImage": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images"]
    },
    "viewCount": {
      "type": "integer",
      "default": 0,
      "min": 0
    },
    "category": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::blog-category.blog-category",
      "inversedBy": "posts"
    },
    "tags": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::blog-tag.blog-tag",
      "inversedBy": "posts"
    },
    "author": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "plugin::users-permissions.user"
    }
  }
}
```

### 2.2 Blog Category
```json
{
  "kind": "collectionType",
  "collectionName": "blog_categories",
  "info": {
    "singularName": "blog-category",
    "pluralName": "blog-categories",
    "displayName": "Blog Category",
    "description": "Danh mục bài viết"
  },
  "options": {
    "draftAndPublish": false
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "maxLength": 50
    },
    "slug": {
      "type": "uid",
      "targetField": "name",
      "required": true
    },
    "description": {
      "type": "text",
      "maxLength": 200
    },
    "order": {
      "type": "integer",
      "default": 0,
      "min": 0
    },
    "isActive": {
      "type": "boolean",
      "default": true
    },
    "posts": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::blog-post.blog-post",
      "mappedBy": "category"
    }
  }
}
```

### 2.3 Blog Tag
```json
{
  "kind": "collectionType",
  "collectionName": "blog_tags",
  "info": {
    "singularName": "blog-tag",
    "pluralName": "blog-tags",
    "displayName": "Blog Tag",
    "description": "Tags cho bài viết"
  },
  "options": {
    "draftAndPublish": false
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "maxLength": 50
    },
    "slug": {
      "type": "uid",
      "targetField": "name",
      "required": true
    },
    "isActive": {
      "type": "boolean",
      "default": true
    },
    "posts": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::blog-post.blog-post",
      "mappedBy": "tags"
    }
  }
}
```

## 3. API Endpoints

### 3.1 Blog Posts API

#### Public Endpoints

1. **Get All Posts**
   ```typescript
   GET /api/blog-posts
   
   Query Parameters:
   - page: number (default: 1)
   - limit: number (default: 10)
   - category: string (slug)
   - tag: string (slug)
   - search: string
   
   Response:
   {
     data: BlogPost[],
     meta: {
       pagination: {
         page: number,
         pageSize: number,
         total: number
       }
     }
   }
   ```

2. **Get Single Post**
   ```typescript
   GET /api/blog-posts/:slug
   
   Response:
   {
     data: BlogPost,
     relatedPosts: BlogPost[]
   }
   ```

#### Admin Endpoints

1. **Create Post**
   ```typescript
   POST /api/blog-posts
   
   Body:
   {
     data: {
       title: string,
       content: string,
       excerpt?: string,
       featuredImage: number, // Media ID
       category: number,      // Category ID
       tags: number[],        // Tag IDs
       status: 'draft' | 'published'
     }
   }
   ```

2. **Update Post**
   ```typescript
   PUT /api/blog-posts/:id
   
   Body: Same as Create Post
   ```

3. **Delete Post**
   ```typescript
   DELETE /api/blog-posts/:id
   ```

### 3.2 Categories API

#### Public Endpoints

1. **Get All Categories**
   ```typescript
   GET /api/blog-categories
   
   Response:
   {
     data: BlogCategory[]
   }
   ```

2. **Get Category with Posts**
   ```typescript
   GET /api/blog-categories/:slug
   
   Response:
   {
     data: BlogCategory,
     posts: BlogPost[]
   }
   ```

#### Admin Endpoints

1. **Create Category**
   ```typescript
   POST /api/blog-categories
   
   Body:
   {
     data: {
       name: string,
       description?: string,
       order?: number,
       isActive?: boolean
     }
   }
   ```

2. **Update Category**
   ```typescript
   PUT /api/blog-categories/:id
   
   Body: Same as Create Category
   ```

3. **Delete Category**
   ```typescript
   DELETE /api/blog-categories/:id
   ```

### 3.3 Tags API

#### Public Endpoints

1. **Get All Tags**
   ```typescript
   GET /api/blog-tags
   
   Response:
   {
     data: BlogTag[]
   }
   ```

2. **Get Tag with Posts**
   ```typescript
   GET /api/blog-tags/:slug
   
   Response:
   {
     data: BlogTag,
     posts: BlogPost[]
   }
   ```

#### Admin Endpoints

1. **Create Tag**
   ```typescript
   POST /api/blog-tags
   
   Body:
   {
     data: {
       name: string,
       isActive?: boolean
     }
   }
   ```

2. **Update Tag**
   ```typescript
   PUT /api/blog-tags/:id
   
   Body: Same as Create Tag
   ```

3. **Delete Tag**
   ```typescript
   DELETE /api/blog-tags/:id
   ```

## 4. Implementation Steps

### Phase 1: Setup Content Types
1. Tạo BlogCategory content type
2. Tạo BlogTag content type
3. Tạo BlogPost content type với relations
4. Cấu hình permissions cho các content types

### Phase 2: Implement Controllers
1. BlogPost controller với các methods:
   - find (list posts)
   - findOne (single post)
   - create
   - update
   - delete
2. BlogCategory controller
3. BlogTag controller

### Phase 3: Customize Admin Panel
1. Cấu hình admin UI cho các content types
2. Thêm custom fields nếu cần
3. Cấu hình media library

### Phase 4: Testing
1. Test các API endpoints
2. Test relations giữa các content types
3. Test permissions
4. Test media upload

## 5. Best Practices

### Content Management
- Sử dụng draft/publish workflow cho bài viết
- Tự động generate slug từ title
- Validate content trước khi publish
- Giới hạn số lượng tags cho mỗi bài viết (tối đa 5)

### Performance
- Sử dụng populate có chọn lọc
- Implement pagination cho danh sách
- Cache các queries phổ biến
- Optimize images trước khi upload

### Security
- Validate input data
- Kiểm soát permissions
- Bảo vệ admin endpoints
- Rate limiting cho public APIs

## 6. Frontend Integration

### API Usage Examples

1. **Fetch Posts with Category and Tags**
   ```typescript
   const getPosts = async (params = {}) => {
     const query = new URLSearchParams({
       page: params.page || 1,
       limit: params.limit || 10,
       ...params
     }).toString();
     
     const response = await fetch(`/api/blog-posts?${query}`);
     return response.json();
   };
   ```

2. **Fetch Single Post with Relations**
   ```typescript
   const getPost = async (slug) => {
     const response = await fetch(`/api/blog-posts/${slug}`);
     return response.json();
   };
   ```

### Frontend Components Structure
```
components/
  blog/
    BlogList.vue
    BlogCard.vue
    BlogDetail.vue
    CategoryList.vue
    TagList.vue
    BlogSearch.vue
```

## 7. Maintenance

### Regular Tasks
- Backup content định kỳ
- Kiểm tra và dọn dẹp media files
- Cập nhật Strapi version
- Monitor API performance

### Monitoring
- Track API usage
- Monitor error rates
- Check media storage usage
- Review user activities

## 8. Future Enhancements

### Potential Features
- Comment system
- Social sharing
- Related posts algorithm
- Search optimization
- Analytics integration

### Search System Enhancement (Phase 2)
```typescript
// 1. Advanced Search API
GET /api/blog-posts/search
  Query Parameters:
    - q: string (search query)
    - type: "title" | "content" | "all"
    - category: string
    - tag: string
    - author: string
    - dateRange: string
  Response:
    - Results: BlogPost[]
    - Suggestions: string[]
    - Facets: {
        categories: Category[];
        tags: Tag[];
        authors: Author[];
        dates: DateRange[];
      }

// 2. Search Suggestions API
GET /api/blog-posts/suggestions
  Query Parameters:
    - q: string (search query)
    - limit: number (default: 5)
  Response:
    - Suggestions: {
        title: string;
        slug: string;
        type: "title" | "content";
      }[]
```

#### Search Features to Implement
1. **Basic Search**
   - Full-text search với PostgreSQL
   - Search trong title, content, excerpt
   - Hỗ trợ tiếng Việt
   - Kết hợp với filters (category, tag)

2. **Search Optimization**
   - Search index cho PostgreSQL
   - Caching kết quả tìm kiếm
   - Debounced search requests
   - Search result highlighting

3. **Search UX**
   - Search suggestions
   - Search facets
   - Search analytics
   - Search history

4. **Performance**
   - Implement caching layer
   - Optimize database queries
   - Add search indexes
   - Rate limiting

### Scalability Considerations
- CDN integration
- Database optimization
- Caching strategy
- Load balancing 

## 9. User Author Field (Alias) - Migration Note

### Lưu ý khi muốn thêm trường alias (tên hiển thị tác giả) cho user:
- **Không nên custom schema user trực tiếp trong extensions trên môi trường production** vì Strapi sẽ cố gắng drop/recreate bảng user, dễ gây lỗi và mất dữ liệu nếu có ràng buộc.
- Nếu cần thêm trường alias cho user:
  1. **Tạo migration SQL thủ công:**
     ```sql
     ALTER TABLE up_users ADD COLUMN IF NOT EXISTS alias VARCHAR(50);
     ```
  2. **Không tạo lại schema user trong extensions.**
  3. **Truy vấn và cập nhật trường alias qua backend/service hoặc custom API.**
- Nếu muốn hiển thị alias trên admin UI, cần custom plugin hoặc UI riêng (không khuyến khích nếu không thực sự cần).

### Khuyến nghị
- Chỉ custom user field ở backend/service hoặc API, không can thiệp schema user trên production.
- Luôn backup dữ liệu user trước khi thao tác. 