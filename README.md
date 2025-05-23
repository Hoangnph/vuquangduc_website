# Architect Portfolio Website

A professional portfolio website for architects to showcase projects, share blog posts, and connect with partners. Built with Vue.js and Strapi CMS.

## 🚀 Features

- **Project Showcase**: Display architectural projects with detailed information
- **Blog System**: Share insights and updates with a powerful blog system
- **Partner Portal**: Connect and share projects with partners
- **Responsive Design**: Optimized for all devices
- **Modern UI**: Clean and professional design
- **SEO Optimized**: Built-in SEO features
- **Performance**: Fast loading and optimized assets

## 🛠 Tech Stack

### Frontend
- Vue.js 3 (Composition API)
- TypeScript
- Pinia (State Management)
- Vue Router
- TailwindCSS
- Vite

### Backend
- Strapi CMS
- PostgreSQL
- Docker
- Redis (Caching)

## 📦 Project Structure

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

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later)
- Docker and Docker Compose
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Hoangnph/vuquangduc_website.git
   cd vuquangduc_website
   ```

2. Set up environment variables:
   ```bash
   # Copy example env files
   cp fe/.env.example fe/.env
   cp be/.env.example be/.env
   ```

3. Start the development environment:
   ```bash
   # Start Docker containers
   docker-compose up -d
   
   # Install frontend dependencies
   cd fe
   npm install
   
   # Start frontend development server
   npm run dev
   ```

4. Access the applications:
   - Frontend: http://localhost:3000
   - Strapi Admin: http://localhost:1337/admin
   - API: http://localhost:1337/api

## 📚 Documentation

Detailed documentation is available in the `docs` directory:
- [Software Architecture](docs/software_architecture.md)
- API Documentation (coming soon)
- Development Guidelines (coming soon)

## 🔧 Development

### Frontend Development
```bash
cd fe
npm install
npm run dev
```

### Backend Development
```bash
# Using Docker
docker-compose up -d

# Or local development
cd be
npm install
npm run develop
```

### Database Management
```bash
# Access PostgreSQL
docker-compose exec postgres psql -U strapi architect_portfolio

# Create backup
docker-compose exec postgres pg_dump -U strapi architect_portfolio > backup.sql
```

## 🧪 Testing

```bash
# Frontend tests
cd fe
npm run test

# Backend tests
cd be
npm run test
```

## 📦 Deployment

1. Build the frontend:
   ```bash
   cd fe
   npm run build
   ```

2. Deploy using Docker:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Vu Quang Duc** - *Initial work* - [GitHub](https://github.com/Hoangnph)

## 🙏 Acknowledgments

- [Vue.js](https://vuejs.org/)
- [Strapi](https://strapi.io/)
- [TailwindCSS](https://tailwindcss.com/)
- [Docker](https://www.docker.com/) 