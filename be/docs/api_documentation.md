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
Response: {
  data: {
    attributes: {
      title: string;
      subtitle: string;
      description: string;
      bannerImage: {
        data: {
          attributes: {
            url: string;
            alternativeText: string;
          }
        }
      }
    }
  }
}
```

### Example Usage
```typescript
// Frontend API call
const getHeroContent = async () => {
  const response = await fetch('/api/hero?populate=bannerImage');
  return response.json();
};
```

## Other Home Page Sections

### Projects Section
```typescript
GET /api/projects
Query Parameters:
- page: number (default: 1)
- limit: number (default: 6) // Show 6 featured projects
- sort: string (default: "publishedAt:desc")
- status: "published"
- featured: boolean (true) // Only get featured projects
```

### Partners Section
```typescript
GET /api/partners
Query Parameters:
- sort: string (default: "order:asc")
- populate: ["logo"]
- isActive: boolean (true)
```

### Testimonials Section
```typescript
GET /api/testimonials
Query Parameters:
- sort: string (default: "createdAt:desc")
- limit: number (default: 3)
- populate: ["project", "author"]
- isActive: boolean (true)
```

## Implementation Notes

### 1. Hero Section Implementation
- The hero section is a singleton content type in Strapi
- Banner image should be optimized for web (recommended size: 1920x1080px)

### 2. Image Optimization
- Images are automatically processed by Strapi
- Use WebP format with fallback

## Strapi Configuration

### 1. Content Type Builder
```javascript
// Hero Content Type Configuration
{
  kind: 'singleType',
  collectionName: 'heroes',
  info: {
    singularName: 'hero',
    pluralName: 'heroes',
    displayName: 'Hero'
  },
  attributes: {
    title: {
      type: 'string',
      required: true
    },
    subtitle: {
      type: 'string',
      required: true
    },
    description: {
      type: 'richtext',
      required: true
    },
    bannerImage: {
      type: 'media',
      multiple: false,
      required: true,
      allowedTypes: ['images']
    }
  }
}
```

### 2. Permissions
- Public access for GET requests
- Admin-only access for POST, PUT, DELETE requests

## Frontend Integration

### 1. Component Implementation
```typescript
// components/HeroSection.tsx
import Image from 'next/image';

export const HeroSection = async () => {
  const response = await fetch('/api/hero?populate=bannerImage');
  const { data } = await response.json();
  const { title, subtitle, description, bannerImage } = data.attributes;
  
  return (
    <section className="relative h-screen">
      <Image
        src={bannerImage.data.attributes.url}
        alt={bannerImage.data.attributes.alternativeText}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/50">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {title}
          </h1>
          <h2 className="text-xl md:text-2xl text-white mb-6">
            {subtitle}
          </h2>
          <p className="text-lg text-white/90 max-w-2xl">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};
```

## Best Practices

1. **Performance**
   - Use Next.js Image component for optimized image loading
   - Implement proper image sizing

2. **Accessibility**
   - Ensure proper contrast ratios for text
   - Provide meaningful alt text for images

3. **SEO**
   - Use semantic HTML
   - Implement proper heading hierarchy

4. **Maintenance**
   - Keep content types and API documentation in sync
   - Implement proper error logging
   - Monitor API performance
   - Regular content backups 