# Software Architecture Document - Architect Portfolio Website

## 1. Project Overview

### 1.1 Purpose
A professional portfolio website for an architect to showcase projects, share blog posts, and connect with partners. The platform enables project uploads, blog creation, and partner sharing capabilities.

### 1.2 Technology Stack
- **Frontend**: Vue.js 3 (Composition API)
- **Backend**: Strapi CMS
- **Database**: PostgreSQL (default with Strapi)
- **File Storage**: Local storage (configurable to cloud storage)
- **Deployment**: Docker containers

## 2. System Architecture

### 2.1 High-Level Architecture
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Vue.js    │     │   Strapi    │     │ PostgreSQL  │
│  Frontend   │◄───►│  Backend    │◄───►│  Database   │
└─────────────┘     └─────────────┘     └─────────────┘
```

### 2.2 Directory Structure
```
vuquangduc_web/
├── fe/                    # Frontend (Vue.js)
│   ├── src/
│   │   ├── assets/       # Static assets
│   │   ├── components/   # Reusable components
│   │   ├── layouts/      # Page layouts
│   │   ├── pages/        # Route pages
│   │   ├── stores/       # Pinia stores
│   │   ├── types/        # TypeScript types
│   │   └── utils/        # Utility functions
│   └── public/           # Public assets
│
├── be/                    # Backend (Strapi)
│   ├── config/           # Strapi configuration
│   ├── src/
│   │   ├── api/         # API endpoints
│   │   ├── components/  # Reusable components
│   │   └── extensions/  # Strapi extensions
│   └── database/        # Database migrations
│
└── docs/                 # Documentation
    └── software_architecture.md
```

## 3. Frontend Architecture (Vue.js)

### 3.1 Core Technologies
- Vue.js 3 with Composition API
- TypeScript
- Pinia for state management
- Vue Router for routing
- TailwindCSS for styling
- Vite as build tool

### 3.2 Component Structure
```
components/
├── common/              # Shared components
│   ├── BaseButton.vue
│   ├── BaseInput.vue
│   └── BaseCard.vue
├── layout/             # Layout components
│   ├── TheHeader.vue
│   ├── TheFooter.vue
│   └── TheNavigation.vue
└── sections/           # Page sections
    ├── HeroSection.vue
    ├── QuoteSection.vue
    ├── ServicesSection.vue
    ├── PartnersSection.vue
    └── TestimonialSection.vue
```

### 3.3 Page Structure
```
pages/
├── Home.vue            # Landing page
├── Projects.vue        # Projects listing
├── ProjectDetail.vue   # Individual project view
├── About.vue           # About page
└── Contact.vue         # Contact page
```

### 3.4 State Management
- Pinia stores for:
  - Project management
  - User authentication
  - UI state
  - Partner data

## 4. Backend Architecture (Strapi)

### 4.1 Content Types
```typescript
// Project
interface Project {
  title: string;
  description: string;
  images: Media[];
  category: string;
  location: string;
  date: Date;
  content: RichText;
  partners: Partner[];
  status: 'draft' | 'published';
  publishedAt: DateTime;
  updatedAt: DateTime;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage: Media;
  };
}

// Partner
interface Partner {
  name: string;
  logo: Media;
  website: string;
  description: string;
}

// Testimonial
interface Testimonial {
  author: string;
  role: string;
  content: string;
  project: Project;
  rating: number;
}

// Blog Post
interface BlogPost {
  title: string;
  slug: string;
  content: RichText;
  excerpt: string;
  featuredImage: Media;
  author: AdminUser;
  categories: BlogCategory[];
  tags: BlogTag[];
  status: 'draft' | 'published';
  publishedAt: DateTime;
  updatedAt: DateTime;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage: Media;
  };
  readingTime: number;
  viewCount: number;
  relatedPosts: BlogPost[];
}

// Blog Category
interface BlogCategory {
  name: string;
  slug: string;
  description: string;
  parent: BlogCategory | null;
  posts: BlogPost[];
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
}

// Blog Tag
interface BlogTag {
  name: string;
  slug: string;
  description: string;
  posts: BlogPost[];
}

// Blog Comment
interface BlogComment {
  content: string;
  authorName: string;
  authorEmail: string;
  authorWebsite?: string;
  post: BlogPost;
  parent: BlogComment | null;
  status: 'pending' | 'approved' | 'spam';
  createdAt: DateTime;
  ipAddress: string;
}
```

### 4.2 API Endpoints

#### 4.2.1 Public Endpoints (No Authentication Required)
```typescript
// Blog Posts
GET /api/blog-posts
  Query Parameters:
    - page: number (default: 1)
    - limit: number (default: 10)
    - sort: string (e.g., "publishedAt:desc")
    - category: string (slug)
    - tag: string (slug)
    - search: string
    - status: "published"

GET /api/blog-posts/:slug
  Response includes:
    - Post content
    - Author details
    - Categories and tags
    - Related posts
    - Approved comments
    - Reading time
    - View count

// Projects
GET /api/projects
  Query Parameters:
    - page: number
    - limit: number
    - category: string
    - search: string
    - status: "published"

GET /api/projects/:slug
  Response includes:
    - Project details
    - Images
    - Categories
    - Partners

// Comments
POST /api/blog-comments
  Body:
    - content: string
    - post: string (id)
    - authorName: string
    - authorEmail: string
    - authorWebsite?: string
    - parent?: string (comment id)
  Security:
    - Rate limiting
    - Spam protection
    - CAPTCHA (optional)
```

#### 4.2.2 Admin Endpoints (Authentication Required)
```typescript
// Admin Authentication
POST /api/auth/login
POST /api/auth/forgot-password
POST /api/auth/reset-password

// Content Management (Admin Only)
POST /api/blog-posts
PUT /api/blog-posts/:id
DELETE /api/blog-posts/:id
PATCH /api/blog-posts/:id/publish
PATCH /api/blog-posts/:id/unpublish

// Comment Management (Admin Only)
GET /api/blog-comments
PUT /api/blog-comments/:id
DELETE /api/blog-comments/:id
PATCH /api/blog-comments/:id/approve
PATCH /api/blog-comments/:id/reject

// ... rest of admin endpoints ...
```

### 4.3 Authentication & Authorization

#### 4.3.1 Frontend (Public Access)
- Không yêu cầu authentication cho người dùng
- Tất cả nội dung đều public và có thể truy cập tự do
- Không có user accounts hay user management ở frontend
- Không có user-specific features

#### 4.3.2 Backend (Admin Only)
- JWT-based authentication chỉ cho Strapi Admin Panel
- Role-based access control cho admin:
  - Super Admin: Toàn quyền quản lý hệ thống
  - Editor: Quản lý nội dung (bài viết, dự án)
  - Author: Tạo và quản lý bài viết của mình
- API endpoints được bảo vệ:
  - Public endpoints: Không yêu cầu authentication
  - Admin endpoints: Yêu cầu JWT token hợp lệ
- Rate limiting cho API endpoints:
  - Public endpoints: 100 requests/minute
  - Admin endpoints: 1000 requests/minute

#### 4.3.3 Security Measures
1. **API Security**:
   - CORS configuration cho phép truy cập từ domain frontend
   - Rate limiting để ngăn chặn DDoS
   - Input validation và sanitization
   - XSS protection

2. **Admin Panel Security**:
   - Strong password policy
   - Two-factor authentication (optional)
   - Session management
   - IP whitelisting (optional)
   - Audit logging

3. **Content Security**:
   - Media file validation
   - File size limits
   - Allowed file types restriction
   - Secure file storage

### 4.4 Blog API Endpoints

#### 4.4.1 Public Endpoints
```typescript
// Blog Posts
GET /api/blog-posts
  Query Parameters:
    - page: number (default: 1)
    - limit: number (default: 10)
    - sort: string (e.g., "publishedAt:desc")
    - category: string (slug)
    - tag: string (slug)
    - search: string
    - author: string (id)
    - status: "published"
    - year: number
    - month: number

GET /api/blog-posts/:slug
  Response includes:
    - Post content
    - Author details
    - Categories and tags
    - Related posts
    - Comments (approved only)
    - Reading time
    - View count

// Categories
GET /api/blog-categories
  Query Parameters:
    - sort: string
    - populate: string (e.g., "posts")

GET /api/blog-categories/:slug
  Response includes:
    - Category details
    - Posts (paginated)
    - Subcategories

// Tags
GET /api/blog-tags
  Query Parameters:
    - sort: string
    - populate: string

// Comments
POST /api/blog-comments
  Body:
    - content: string
    - post: string (id)
    - author: {
        name: string
        email: string
        website?: string
      }
    - parent?: string (comment id)
```

#### 4.4.2 Admin Endpoints
```typescript
// Blog Posts Management
POST /api/blog-posts
PUT /api/blog-posts/:id
DELETE /api/blog-posts/:id
PATCH /api/blog-posts/:id/publish
PATCH /api/blog-posts/:id/unpublish

// Categories Management
POST /api/blog-categories
PUT /api/blog-categories/:id
DELETE /api/blog-categories/:id

// Tags Management
POST /api/blog-tags
PUT /api/blog-tags/:id
DELETE /api/blog-tags/:id

// Comments Management
GET /api/blog-comments
  Query Parameters:
    - status: string
    - post: string (id)
    - page: number
    - limit: number
PUT /api/blog-comments/:id
DELETE /api/blog-comments/:id
PATCH /api/blog-comments/:id/approve
PATCH /api/blog-comments/:id/reject
```

### 4.5 Blog Features Implementation

#### 4.5.1 Search and Filtering
```typescript
// Search Implementation
interface SearchOptions {
  query: string;
  fields: string[];
  filters?: {
    category?: string;
    tag?: string;
    author?: string;
    dateRange?: {
      start: Date;
      end: Date;
    };
  };
  sort?: {
    field: string;
    order: 'asc' | 'desc';
  };
  pagination?: {
    page: number;
    limit: number;
  };
}

// Search Service
class BlogSearchService {
  async searchPosts(options: SearchOptions): Promise<{
    posts: BlogPost[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    // Implementation using Strapi's query engine
    // Supports full-text search, filtering, and pagination
  }
}
```

#### 4.5.2 Caching Strategy
```typescript
// Cache Configuration
interface CacheConfig {
  // Redis cache settings
  redis: {
    host: string;
    port: number;
    ttl: number; // Time to live in seconds
  };
  
  // Cache keys
  keys: {
    post: (slug: string) => `post:${slug}`;
    category: (slug: string) => `category:${slug}`;
    tag: (slug: string) => `tag:${slug}`;
    search: (query: string) => `search:${query}`;
  };
}

// Cache Implementation
class BlogCacheService {
  async getCachedPost(slug: string): Promise<BlogPost | null> {
    // Implementation using Redis
  }
  
  async invalidatePostCache(slug: string): Promise<void> {
    // Clear post and related caches
  }
}
```

#### 4.5.3 Content Management Features
1. **Draft System**:
   - Auto-save drafts
   - Version history
   - Scheduled publishing
   - Content preview

2. **Media Management**:
   - Image optimization
   - Responsive images
   - Media library
   - Alt text and metadata

3. **SEO Management**:
   - Meta tags
   - Open Graph
   - Sitemap generation
   - Canonical URLs

4. **Analytics Integration**:
   - View tracking
   - Reading time calculation
   - Popular posts
   - User engagement metrics

#### 4.5.4 Security and Moderation
1. **Comment System**:
   - Spam protection
   - Moderation queue
   - User verification
   - Rate limiting

2. **Content Protection**:
   - Role-based access
   - Content encryption
   - API rate limiting
   - Audit logging

### 4.6 Blog Performance Optimization

#### 4.6.1 Database Indexing
```sql
-- PostgreSQL Indexes
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX idx_blog_posts_search ON blog_posts USING gin(to_tsvector('english', title || ' ' || content));
```

#### 4.6.2 Query Optimization
```typescript
// Optimized Post Query
const getOptimizedPost = async (slug: string) => {
  return await strapi.db.query('api::blog-post.blog-post').findOne({
    where: { slug },
    select: [
      'id', 'title', 'slug', 'content', 'excerpt',
      'publishedAt', 'updatedAt', 'readingTime', 'viewCount'
    ],
    populate: {
      author: {
        select: ['id', 'username', 'email']
      },
      categories: {
        select: ['id', 'name', 'slug']
      },
      tags: {
        select: ['id', 'name', 'slug']
      },
      seo: true
    }
  });
};
```

## 5. Design System

### 5.1 Color Palette
- Primary: Black/Grey
- Text: White
- Accent: TBD
- Background: Dark theme

### 5.2 Typography
- Primary Font: SF Pro
- Font Weights: Regular, Medium, Bold
- Font Sizes:
  - Heading 1: 48px
  - Heading 2: 36px
  - Heading 3: 24px
  - Body: 16px
  - Small: 14px

### 5.3 Component Design
- Minimalist and modern design
- Focus on project showcase
- Responsive design for all devices
- Dark theme optimized for architectural content

## 6. Performance Considerations

### 6.1 Frontend Optimization
- Lazy loading for images and components
- Code splitting
- Asset optimization
- Caching strategies

### 6.2 Backend Optimization
- API response caching
- Image optimization
- Database indexing
- Rate limiting

## 7. Security Measures

### 7.1 Frontend Security
- CSRF protection
- XSS prevention
- Secure HTTP headers
- Input validation

### 7.2 Backend Security
- JWT token management
- API rate limiting
- File upload validation
- Data sanitization

## 8. Deployment Strategy

### 8.1 Docker Configuration

#### 8.1.1 Docker Compose Setup
```yaml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: architect_portfolio_db
    environment:
      POSTGRES_DB: architect_portfolio
      POSTGRES_USER: strapi
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    networks:
      - architect_network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U strapi"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Strapi Backend
  strapi:
    image: strapi/strapi:4
    container_name: architect_portfolio_strapi
    environment:
      DATABASE_CLIENT: postgres
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_NAME: architect_portfolio
      DATABASE_USERNAME: strapi
      DATABASE_PASSWORD: ${DB_PASSWORD}
      NODE_ENV: development
    volumes:
      - ./be:/srv/app
      - strapi_uploads:/srv/app/public/uploads
    ports:
      - "1337:1337"
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - architect_network

volumes:
  postgres_data:
  strapi_uploads:

networks:
  architect_network:
    driver: bridge
```

#### 8.1.2 Docker Environment Variables
Create a `.env` file in the root directory:
```env
# Database
DB_PASSWORD=your_secure_password_here

# Strapi
STRAPI_ADMIN_EMAIL=admin@example.com
STRAPI_ADMIN_PASSWORD=your_admin_password_here
```

#### 8.1.3 Docker Development Workflow
1. **Initial Setup**:
   ```bash
   # Build and start containers
   docker-compose up -d
   
   # Initialize Strapi (first time only)
   docker-compose exec strapi yarn strapi develop
   ```

2. **Database Management**:
   - Database data persists in Docker volume `postgres_data`
   - Backup strategy: Regular volume backups
   - Migration handling: Managed through Strapi's migration system

3. **Strapi Development**:
   - Hot-reloading enabled
   - Local development files mounted to container
   - Uploads stored in Docker volume `strapi_uploads`

4. **Container Health Monitoring**:
   - PostgreSQL health checks configured
   - Strapi container depends on healthy PostgreSQL
   - Automatic container restart on failure

### 8.2 Development Environment
- Local development with Docker Compose
- Hot reloading for both frontend and backend
- Environment-specific configurations
- Isolated development environment
- Consistent database state across team

### 8.3 Production Environment
- Containerized deployment
- CI/CD pipeline
- Automated testing
- Monitoring and logging

## 9. Future Considerations

### 9.1 Scalability
- Cloud storage integration
- CDN implementation
- Database scaling
- Microservices architecture (if needed)

### 9.2 Feature Roadmap
- Multi-language support
- Advanced search functionality
- Project analytics
- Partner portal
- Blog system enhancement

## 10. Development Guidelines

### 10.1 Code Standards
- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- Component naming conventions
- File structure conventions

### 10.2 Git Workflow
- Feature branch workflow
- Conventional commits
- Pull request reviews
- Automated testing

### 10.3 Documentation
- Component documentation
- API documentation
- Setup guides
- Deployment procedures

## 11. Database Architecture

### 11.1 PostgreSQL Configuration
- **Version**: PostgreSQL 15 (Alpine-based for smaller image size)
- **Performance Tuning**:
  ```conf
  # postgresql.conf optimizations
  max_connections = 100
  shared_buffers = 256MB
  effective_cache_size = 768MB
  maintenance_work_mem = 64MB
  checkpoint_completion_target = 0.9
  wal_buffers = 16MB
  default_statistics_target = 100
  random_page_cost = 1.1
  effective_io_concurrency = 200
  work_mem = 4MB
  min_wal_size = 1GB
  max_wal_size = 4GB
  ```

### 11.2 Database Backup Strategy
1. **Automated Backups**:
   - Daily full database dumps
   - Weekly compressed backups
   - Monthly archive backups

2. **Backup Retention**:
   - Daily backups: 7 days
   - Weekly backups: 4 weeks
   - Monthly backups: 12 months

3. **Backup Commands**:
   ```bash
   # Create backup
   docker-compose exec postgres pg_dump -U strapi architect_portfolio > backup.sql
   
   # Restore backup
   cat backup.sql | docker-compose exec -T postgres psql -U strapi architect_portfolio
   ```

### 11.3 Database Security
- Password authentication
- Network isolation through Docker network
- Regular security updates
- Connection encryption
- Access control through Strapi's role system 