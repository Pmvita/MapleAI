# 🏗️ System Architecture

## Overview

MapleAI is built as a modern, scalable SaaS platform using Next.js 15 with the App Router, PostgreSQL for data persistence, and NextAuth.js for authentication. The architecture follows microservices principles while maintaining a monolithic structure for simplicity and rapid development.

## 🏛️ High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (API Routes)  │◄──►│   (PostgreSQL)  │
│                 │    │                 │    │                 │
│ • React 18      │    │ • NextAuth.js   │    │ • Prisma ORM    │
│ • TypeScript    │    │ • API Routes    │    │ • Migrations    │
│ • Tailwind CSS  │    │ • Middleware    │    │ • Seeding       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🧩 Core Components

### 1. Frontend Layer
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom components
- **State Management**: React hooks and NextAuth.js session
- **Build Tool**: Turbopack for fast development

### 2. Backend Layer
- **API Routes**: Next.js API routes for backend functionality
- **Authentication**: NextAuth.js with credentials provider
- **Database Access**: Prisma ORM for type-safe database operations
- **Middleware**: Route protection and session management

### 3. Data Layer
- **Database**: PostgreSQL for relational data
- **ORM**: Prisma for type-safe database operations
- **Migrations**: Version-controlled schema changes
- **Seeding**: Test data population

## 🗄️ Database Schema

### Core Entities

```sql
-- Users and Authentication
User {
  id, email, firstName, lastName, role
  companyId, createdAt, updatedAt
}

-- Company Management
Company {
  id, name, industry, size, website, email
  createdAt, updatedAt
}

-- Subscription Management
Subscription {
  id, companyId, plan, status, startDate, endDate
  features, limits, createdAt, updatedAt
}

-- Compliance Records
ComplianceRecord {
  id, companyId, type, status, data, result
  createdAt, updatedAt
}

-- Audit Logging
AuditLog {
  id, userId, action, resource, details
  ipAddress, userAgent, createdAt
}
```

## 🔐 Security Architecture

### Authentication Flow
1. **Credentials Provider**: Email/password authentication
2. **Session Management**: JWT-based sessions with NextAuth.js
3. **Route Protection**: Middleware-based route guards
4. **Role-Based Access**: User roles and permissions

### Data Security
- **Encryption**: Passwords hashed with bcrypt
- **HTTPS**: All communications encrypted
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: Prisma ORM prevents SQL injection

## 🚀 Deployment Architecture

### Development Environment
- **Local Development**: Next.js dev server with Turbopack
- **Database**: Local PostgreSQL instance
- **Environment Variables**: `.env.local` for configuration

### Production Environment
- **Platform**: Vercel for hosting and deployment
- **Database**: Managed PostgreSQL (e.g., Supabase, PlanetScale)
- **CDN**: Vercel Edge Network for global distribution
- **Monitoring**: Vercel Analytics and logging

## 📊 Scalability Considerations

### Horizontal Scaling
- **Stateless Design**: No server-side state dependencies
- **Database Connection Pooling**: Efficient database connections
- **CDN Distribution**: Global content delivery

### Performance Optimization
- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js Image component
- **Caching**: Static generation and ISR where appropriate
- **Bundle Optimization**: Tree shaking and minification

## 🔄 Development Workflow

### Code Organization
```
src/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
├── lib/                   # Utility functions
├── types/                 # TypeScript definitions
└── generated/             # Generated Prisma client
```

### Development Process
1. **Feature Development**: Create new pages and components
2. **Database Changes**: Update Prisma schema and run migrations
3. **API Development**: Create API routes for backend functionality
4. **Testing**: Manual testing and validation
5. **Deployment**: Push to main branch for automatic deployment

## 🔮 Future Architecture Considerations

### Microservices Migration
- **Service Decomposition**: Break down by business domain
- **API Gateway**: Centralized API management
- **Event-Driven Architecture**: Asynchronous communication
- **Container Orchestration**: Kubernetes for deployment

### AI/ML Integration
- **Model Serving**: Dedicated ML model endpoints
- **Data Pipeline**: ETL processes for training data
- **Model Monitoring**: Performance and drift detection
- **A/B Testing**: Feature flag management

---

*This architecture document is living and will be updated as the platform evolves.* 