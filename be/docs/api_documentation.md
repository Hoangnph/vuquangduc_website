# API Documentation - Home Page

## Overview
This document outlines the API endpoints required for the home page of the architect portfolio website. Each section's API structure and requirements are detailed below.

## Hero Section API

### Content Type: Hero
```typescript
interface Hero {
  title: string;          // Main heading text
  subtitle: string;       // Subheading text
  description: string;    // Detailed description
  bannerImage: Media;     // Hero banner image
}
```

### Endpoint
```typescript
GET /api/hero
Response: Hero
```

### Example Usage
```typescript
const getHeroContent = async () => {
  const response = await fetch('/api/hero?populate=bannerImage');
  return response.json();
};
```

---

## About Section API

### Content Type: About (singleType)
```typescript
interface About {
  title: string;
  description: string; // Richtext
  avatar: Media;       // Main avatar image
  images: Media[];     // Gallery images
  highlight: string;   // Short highlight
  video: Media;        // Video file (optional)
}
```

### Endpoint
```typescript
GET /api/about
Response: About
```

### Example Usage
```typescript
const getAboutContent = async () => {
  const response = await fetch('/api/about?populate=avatar,images,video');
  return response.json();
};
```

---

## Partners Section API

### Content Type: Partner
```typescript
interface Partner {
  id: number;
  name: string;          // Partner company name
  description: string;   // Partner description (optional)
  logo: Media;           // Partner logo image
  website: string;       // Partner website URL (optional)
  order: number;         // Display order
  isActive: boolean;     // Partner status
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
```

### Endpoints
```typescript
GET /api/partners
Query Parameters:
- sort: string (default: "order:asc")
- isActive: boolean (default: true)
Response: Partner[]

GET /api/partners/:id
Response: Partner
```

---

## Testimonials Section API

### Content Type: Testimonial
```typescript
interface Testimonial {
  id: number;
  author: string;
  content: string;      // Richtext
  rating: number;       // 1-5
  avatar: Media;        // Author avatar
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
```

### Endpoints
```typescript
GET /api/testimonials
Query Parameters:
- sort: string (default: "order:asc")
- isActive: boolean (default: true)
- limit: number (default: 3)
Response: Testimonial[]

GET /api/testimonials/:id
Response: Testimonial
```

---

## Other Home Page Sections

### Projects Section
```typescript
GET /api/projects
Query Parameters:
- page: number (default: 1)
- limit: number (default: 6)
- sort: string (default: "publishedAt:desc")
- status: "published"
- featured: boolean (true)
```

---

## Implementation Notes
- All media fields (avatar, images, logo, video) are Strapi Media type, support multiple formats.
- Use Next.js Image component for optimized image loading.
- Use WebP format for images where possible.
- Public access for GET requests, admin-only for POST/PUT/DELETE.
- Keep content types and API documentation in sync.
- Implement proper error logging and monitor API performance.
- Regular content backups. 