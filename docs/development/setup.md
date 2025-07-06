# 🚀 Development Setup Guide

This guide will help you set up your development environment for MapleAI.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Git** for version control
- **PostgreSQL** 15+ for local development
- **VS Code** (recommended) with extensions:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - Prisma VS Code Extension
  - ESLint
  - Prettier

## 🛠️ Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd mapleai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/mapleai_dev"

# Authentication
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Optional: AI Services
OPENAI_API_KEY="your-openai-key"
ANTHROPIC_API_KEY="your-anthropic-key"
```

### 4. Database Setup

#### Option A: Local PostgreSQL

1. **Install PostgreSQL** (if not already installed):
   ```bash
   # macOS with Homebrew
   brew install postgresql@15
   brew services start postgresql@15
   
   # Ubuntu/Debian
   sudo apt-get install postgresql postgresql-contrib
   ```

2. **Create Database and User**:
   ```bash
   # Connect to PostgreSQL
   psql postgres
   
   # Create database and user
   CREATE DATABASE mapleai_dev;
   CREATE USER mapleai_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE mapleai_dev TO mapleai_user;
   \q
   ```

#### Option B: Docker PostgreSQL

```bash
docker run --name mapleai-postgres \
  -e POSTGRES_DB=mapleai_dev \
  -e POSTGRES_USER=mapleai_user \
  -e POSTGRES_PASSWORD=your_password \
  -p 5432:5432 \
  -d postgres:15
```

### 5. Database Migration and Seeding

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database with test data
npm run db:seed
```

### 6. Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 🧪 Testing the Setup

### 1. Verify the Application

1. Open [http://localhost:3000](http://localhost:3000)
2. You should see the MapleAI landing page
3. Click "Get Started" to navigate to registration

### 2. Test Authentication

1. Navigate to `/auth/register`
2. Create a new account or use test credentials from [credentials.md](/docs/credentials.md)
3. Log in and verify you can access the dashboard

### 3. Test Database Connection

```bash
# Open Prisma Studio to view database
npx prisma studio
```

This will open a web interface at [http://localhost:5555](http://localhost:5555) where you can browse your database.

## 🔧 Development Tools

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with test data
npm run db:studio    # Open Prisma Studio
```

### Database Management

```bash
# Generate Prisma client (after schema changes)
npx prisma generate

# Create a new migration
npx prisma migrate dev --name migration_name

# Reset database (⚠️ Destructive)
npx prisma migrate reset

# Push schema changes without migration
npx prisma db push
```

### Code Quality

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint -- --fix

# Type checking
npm run type-check
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Database Connection Issues

**Error**: `ECONNREFUSED` or `password authentication failed`

**Solution**:
- Verify PostgreSQL is running: `brew services list | grep postgresql`
- Check your DATABASE_URL in `.env.local`
- Ensure database and user exist

#### 2. Prisma Client Issues

**Error**: `@prisma/client did not initialize yet`

**Solution**:
```bash
npx prisma generate
npm run dev
```

#### 3. Port Already in Use

**Error**: `Port 3000 is already in use`

**Solution**:
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

#### 4. TypeScript Errors

**Error**: Type errors in components

**Solution**:
```bash
# Regenerate Prisma client
npx prisma generate

# Restart TypeScript server in VS Code
# Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Getting Help

1. **Check the logs**: Look at terminal output for error messages
2. **Verify environment**: Ensure all environment variables are set
3. **Database state**: Check if database is properly seeded
4. **Dependencies**: Try deleting `node_modules` and `npm install`

## 📚 Next Steps

After setting up your development environment:

1. **Read the Architecture Documentation**: [System Architecture](/docs/architecture/system-architecture.md)
2. **Explore the Codebase**: Familiarize yourself with the project structure
3. **Review the Business Model**: [Business Model](/docs/business/business-model.md)
4. **Check the Product Roadmap**: [Product Roadmap](/docs/product/product-roadmap.md)

## 🤝 Contributing

When contributing to the project:

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes and test thoroughly
3. Run linting: `npm run lint`
4. Commit with a descriptive message
5. Push and create a pull request

---

*For additional help, refer to the [Architecture Documentation](/docs/architecture/) or contact the development team.* 