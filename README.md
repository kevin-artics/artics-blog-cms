# Artics Blog CMS

A modern, feature-rich Content Management System (CMS) built specifically for ArtICS Lab, designed to provide a powerful and flexible platform for content management, blogging, and website administration.

## 🚀 Overview

Artics Blog CMS is a comprehensive content management solution that combines the power of [Payload CMS](https://payloadcms.com/) with the modern web framework [Next.js](https://nextjs.org/). This project provides a complete ecosystem for managing digital content, from blog posts and pages to media assets and user management.

## ✨ Features

### 🎯 Core Features

- **Modern Admin Panel**: Intuitive and responsive admin interface built with Payload CMS
- **Content Management**: Full CRUD operations for posts, pages, categories, and media
- **User Authentication**: Secure user management with role-based access control
- **Rich Text Editor**: Advanced content editing with Lexical editor
- **Media Management**: Comprehensive media library with image optimization
- **SEO Optimization**: Built-in SEO tools and meta tag management
- **Search Functionality**: Full-text search across all content
- **Redirect Management**: URL redirect handling for site migrations
- **Scheduled Publishing**: Content scheduling and automated publishing

### 🎨 Frontend Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode**: Toggle between light and dark themes
- **Layout Builder**: Drag-and-drop layout creation with customizable blocks
- **Live Preview**: Real-time preview of content changes
- **Draft System**: Preview unpublished content before going live
- **Performance Optimized**: Static generation and on-demand revalidation
- **Accessibility**: WCAG compliant design patterns

### 🔧 Technical Features

- **TypeScript**: Full type safety throughout the application
- **PostgreSQL**: Robust database with Vercel Postgres integration
- **Vercel Blob Storage**: Scalable file storage solution
- **GraphQL API**: Flexible data querying capabilities
- **REST API**: Standard REST endpoints for content management
- **Docker Support**: Containerized development environment
- **Migration System**: Database schema versioning and migrations

## 🛠️ Tech Stack

### Backend

- **[Payload CMS](https://payloadcms.com/)** - Headless CMS framework
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[PostgreSQL](https://www.postgresql.org/)** - Primary database
- **[Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)** - Cloud database
- **[Vercel Blob Storage](https://vercel.com/docs/storage/vercel-blob)** - File storage

### Frontend

- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Component library
- **[Lucide React](https://lucide.dev/)** - Icon library

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Docker](https://www.docker.com/)** - Containerization
- **[pnpm](https://pnpm.io/)** - Package manager

## 📦 Installation

### Prerequisites

- Node.js 18.20.2 or >=20.9.0
- pnpm 10.7.1 or higher
- PostgreSQL database (local or cloud)

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/artics-blog-cms.git
   cd artics-blog-cms
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Configure the following variables in your `.env` file:

   ```env
   POSTGRES_URL=your_postgres_connection_string
   BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
   PAYLOAD_SECRET=your_payload_secret
   CRON_SECRET=your_cron_secret
   PREVIEW_SECRET=your_preview_secret
   ```

4. **Run database migrations**

   ```bash
   pnpm payload migrate
   ```

5. **Start the development server**

   ```bash
   pnpm dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

## 🐳 Docker Setup

For containerized development:

1. **Modify the database URL in `.env`**

   ```env
   POSTGRES_URL=postgres://postgres@localhost:54320/artics_cms
   ```

2. **Update the database name in `docker-compose.yml`**

   ```yaml
   POSTGRES_DB: artics_cms
   ```

3. **Start the containers**
   ```bash
   docker-compose up -d
   ```

## 🚀 Deployment

### Vercel Deployment

1. **Connect your repository to Vercel**
2. **Add the required environment variables**
3. **Deploy with one click**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/artics-blog-cms)

### Manual Deployment

1. **Build the application**

   ```bash
   pnpm build
   ```

2. **Run migrations**

   ```bash
   pnpm payload migrate
   ```

3. **Start the production server**
   ```bash
   pnpm start
   ```

## 📚 Documentation

### User Documentation

- **[Manual de Usuario Final](MANUAL_USUARIO_FINAL_ADMIN.md)** - Complete guide for content editors and administrators
- **[Manual Completo](MANUAL_COMPLETO_ARTICS_BLOG_CMS.md)** - Comprehensive system documentation

### Technical Documentation

- **[API Documentation](docs/api.md)** - REST and GraphQL API reference
- **[Database Schema](docs/database.md)** - Database structure and relationships
- **[Deployment Guide](docs/deployment.md)** - Production deployment instructions

## 🏗️ Project Structure

```
artics-blog-cms/
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── collections/            # Payload CMS collections
│   ├── blocks/                 # Layout builder blocks
│   ├── components/             # React components
│   ├── fields/                 # Custom form fields
│   ├── globals/                # Global configurations
│   ├── hooks/                  # Custom React hooks
│   ├── utilities/              # Utility functions
│   └── payload.config.ts       # Payload CMS configuration
├── public/                     # Static assets
├── docs/                       # Documentation files
├── migrations/                 # Database migrations
└── docker-compose.yml          # Docker configuration
```

## 🔧 Configuration

### Collections

- **Users**: Authentication and user management
- **Posts**: Blog posts and articles
- **Pages**: Static pages with layout builder
- **Categories**: Content categorization
- **Media**: File uploads and management

### Globals

- **Header**: Navigation and site header configuration
- **Footer**: Site footer configuration

### Plugins

- **SEO Plugin**: Search engine optimization
- **Search Plugin**: Full-text search functionality
- **Redirects Plugin**: URL redirect management
- **Form Builder**: Contact forms and surveys
- **Nested Docs**: Hierarchical content structure

## 🧪 Development

### Available Scripts

```bash
# Development
pnpm dev                    # Start development server
pnpm dev:prod              # Build and start production server

# Building
pnpm build                 # Build for production
pnpm ci                    # Run migrations and build

# Database
pnpm payload migrate       # Run database migrations
pnpm payload migrate:create # Create new migration

# Code Quality
pnpm lint                  # Run ESLint
pnpm lint:fix             # Fix linting issues

# Type Generation
pnpm generate:types       # Generate TypeScript types
pnpm generate:importmap   # Generate import map
```

### Database Migrations

When making schema changes:

1. **Create a migration**

   ```bash
   pnpm payload migrate:create
   ```

2. **Run migrations**
   ```bash
   pnpm payload migrate
   ```

### Seeding Data

To populate the database with sample data:

1. **Access the admin panel**
2. **Click "Seed Database"**
3. **Confirm the operation**

> ⚠️ **Warning**: Seeding will clear existing data and replace it with sample content.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages using conventional commits
- Ensure all tests pass before submitting PRs
- Update documentation for new features
- Follow the existing code style and patterns

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Artics Blog CMS** was developed entirely by **[gsmkev](https://github.com/gsmkev)**.

- **GitHub**: [github.com/gsmkev](https://github.com/gsmkev)
- **Email**: Contact through GitHub

## 🙏 Acknowledgments

- [Payload CMS](https://payloadcms.com/) team for the excellent headless CMS framework
- [Vercel](https://vercel.com/) for the hosting and deployment platform
- [Next.js](https://nextjs.org/) team for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library

## 📞 Support

If you encounter any issues or have questions:

1. Check the [documentation](docs/)
2. Search existing [issues](https://github.com/your-username/artics-blog-cms/issues)
3. Create a new issue with detailed information
4. Contact the developer through GitHub

## 🔄 Changelog

### Version 1.0.0

- Initial release
- Complete CMS functionality
- Admin panel with full CRUD operations
- Responsive frontend design
- SEO optimization features
- Search functionality
- User authentication system
- Media management
- Layout builder
- Dark mode support

---

**Made with ❤️ by [gsmkev](https://github.com/gsmkev)**
