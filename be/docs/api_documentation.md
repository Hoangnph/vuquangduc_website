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
            formats?: object;
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

#### 1. Get All Partners
```typescript
GET /api/partners
Query Parameters:
- sort: string (default: "order:asc")
- isActive: boolean (default: true)

Response: {
  data: Partner[]
}
```

#### 2. Get Single Partner
```typescript
GET /api/partners/:id
Response: {
  data: Partner
}
```

#### Example Usage
```typescript
// app/_lib/api.ts
export async function fetchPartners() {
  const res = await fetch('http://localhost:1337/api/partners?sort=order:asc&isActive=true');
  if (!res.ok) throw new Error('Failed to fetch partners');
  return res.json();
}
```

```tsx
// app/components/partners-section.tsx
import Image from 'next/image';
import { fetchPartners } from '../_lib/api';

export default async function PartnersSection() {
  const { data: partners } = await fetchPartners();
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {partners.map((partner) => (
            <div key={partner.id} className="flex flex-col items-center">
              <Image
                src={`http://localhost:1337${partner.logo.url}`}
                alt={partner.name}
                width={200}
                height={100}
                className="object-contain"
              />
              <h3 className="mt-4 text-lg font-semibold">{partner.name}</h3>
              {partner.website && (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-2"
                >
                  Visit Website
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
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

- Images are automatically processed by Strapi (WebP format recommended)
- Use Next.js Image component for optimized image loading
- Ensure proper contrast ratios and alt text for accessibility
- Use semantic HTML and proper heading hierarchy for SEO
- Public access for GET requests, admin-only for POST/PUT/DELETE
- Keep content types and API documentation in sync
- Implement proper error logging and monitor API performance
- Regular content backups 