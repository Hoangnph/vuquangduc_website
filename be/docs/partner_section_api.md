# API Documentation - Partners Section

## Overview
This document outlines the API endpoints for managing partners in the architect portfolio website.

## Content Type: Partner
```typescript
interface Partner {
  id: number;
  name: string;          // Partner company name
  description: string;   // Partner description (optional)
  logo: Media;          // Partner logo image
  website: string;      // Partner website URL (optional)
  order: number;        // Display order
  isActive: boolean;    // Partner status
  createdAt: string;    // Creation timestamp
  updatedAt: string;    // Last update timestamp
  publishedAt: string;  // Publication timestamp
}
```

## API Endpoints

### 1. Get All Partners
```typescript
GET /api/partners
Query Parameters:
- sort: string (default: "order:asc")
- isActive: boolean (default: true)

Response: {
  data: Partner[]
}
```

### 2. Get Single Partner
```typescript
GET /api/partners/:id
Response: {
  data: Partner
}
```

### 3. Create Partner
```typescript
POST /api/partners
Body: {
  data: {
    name: string;
    description?: string;
    logo: number; // Media ID
    website?: string;
    order?: number;
    isActive?: boolean;
  }
}
Response: {
  data: Partner
}
```

### 4. Update Partner
```typescript
PUT /api/partners/:id
Body: {
  data: {
    name?: string;
    description?: string;
    logo?: number;
    website?: string;
    order?: number;
    isActive?: boolean;
  }
}
Response: {
  data: Partner
}
```

### 5. Delete Partner
```typescript
DELETE /api/partners/:id
Response: {
  data: Partner
}
```

## Frontend Integration Example

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

## Implementation Notes

1. **Image Optimization**
   - Partner logos should be optimized for web
   - Recommended size: 200x100px
   - Use WebP format with fallback

2. **Permissions**
   - Public access for GET requests
   - Admin-only access for POST, PUT, DELETE requests

3. **Best Practices**
   - Use proper image sizing and optimization
   - Implement proper error handling
   - Follow REST API conventions
   - Maintain consistent response format
   - Use proper validation for input data

## Strapi Configuration

1. **Content Type Builder**
   - Partner is a collection type
   - Draft & Publish enabled
   - Media field for logo with image type restriction
   - Order field for custom sorting
   - Active status for filtering

2. **Permissions**
   - Configure in Settings → Users & Permissions Plugin
   - Public role: Enable find and findOne
   - Authenticated role: Enable all operations

## Maintenance
- Regular content updates
- Image optimization
- Performance monitoring
- Security updates
- Regular backups 