# Coding Standards

## Executive Summary

MapleAI's coding standards ensure consistent, maintainable, and high-quality code across all development teams. These standards are designed to promote code readability, reduce bugs, improve performance, and facilitate collaboration in our enterprise AI automation platform.

## Technology Stack

### Core Technologies
- **Frontend**: Next.js 15.3.5, TypeScript, Tailwind CSS
- **Backend**: Node.js, TypeScript, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Testing**: Jest, React Testing Library, Playwright
- **Linting**: ESLint, Prettier
- **CI/CD**: GitHub Actions

### Development Environment
- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Git**: 2.x or higher
- **VS Code**: Recommended IDE with extensions

## TypeScript Standards

### Type Definitions
```typescript
// Use explicit types for all function parameters and return values
interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyId?: string;
  createdAt: Date;
  updatedAt: Date;
}

enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  COMPLIANCE_OFFICER = 'COMPLIANCE_OFFICER',
  HR_MANAGER = 'HR_MANAGER',
  ANALYST = 'ANALYST',
  VIEWER = 'VIEWER'
}

// Function with explicit types
async function createUser(userData: CreateUserInput): Promise<User> {
  // Implementation
}

// Use type guards for runtime type checking
function isAdmin(user: User): user is User & { role: UserRole.ADMIN } {
  return user.role === UserRole.ADMIN;
}
```

### Naming Conventions
```typescript
// Variables and functions: camelCase
const userName = 'john_doe';
const isActive = true;

function getUserById(id: string): User | null {
  // Implementation
}

// Constants: UPPER_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = 'https://api.mapleai.com';

// Interfaces and types: PascalCase
interface ComplianceRecord {
  id: string;
  type: ComplianceType;
  status: ComplianceStatus;
}

// Enums: PascalCase
enum ComplianceType {
  AML = 'AML',
  KYC = 'KYC',
  OFAC = 'OFAC'
}
```

### Error Handling
```typescript
// Use custom error classes
class ValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Proper error handling in async functions
async function processComplianceCheck(data: ComplianceData): Promise<ComplianceResult> {
  try {
    const result = await validateComplianceData(data);
    return await performComplianceCheck(result);
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new ApiError(error.message, 400, 'VALIDATION_ERROR');
    }
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Internal server error', 500, 'INTERNAL_ERROR');
  }
}
```

## React/Next.js Standards

### Component Structure
```typescript
// Use functional components with hooks
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface ComplianceDashboardProps {
  companyId: string;
  onRefresh?: () => void;
}

export default function ComplianceDashboard({ 
  companyId, 
  onRefresh 
}: ComplianceDashboardProps): JSX.Element {
  const { data: session } = useSession();
  const [complianceData, setComplianceData] = useState<ComplianceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchComplianceData();
  }, [companyId]);

  const fetchComplianceData = async (): Promise<void> => {
    try {
      setLoading(true);
      const data = await api.getComplianceData(companyId);
      setComplianceData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="compliance-dashboard">
      <h1>Compliance Dashboard</h1>
      <ComplianceDataTable data={complianceData} />
    </div>
  );
}
```

### Hook Standards
```typescript
// Custom hooks for reusable logic
import { useState, useEffect, useCallback } from 'react';

interface UseApiDataOptions<T> {
  url: string;
  dependencies?: any[];
  transform?: (data: any) => T;
}

export function useApiData<T>({ 
  url, 
  dependencies = [], 
  transform 
}: UseApiDataOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      const transformedData = transform ? transform(result) : result;
      setData(transformedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [url, transform]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  return { data, loading, error, refetch: fetchData };
}
```

### State Management
```typescript
// Use React Context for global state
import React, { createContext, useContext, useReducer } from 'react';

interface AppState {
  user: User | null;
  company: Company | null;
  theme: 'light' | 'dark';
}

type AppAction = 
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_COMPANY'; payload: Company }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' };

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
```

## Database Standards

### Prisma Schema Standards
```prisma
// Use descriptive model names and field names
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String
  role      UserRole @default(USER)
  isActive  Boolean  @default(true)
  lastLoginAt DateTime?
  
  // Relations
  companyId String?
  company   Company? @relation(fields: [companyId], references: [id])
  
  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Indexes for performance
  @@index([email])
  @@index([companyId])
  @@index([role])
}

// Use enums for constrained values
enum UserRole {
  ADMIN
  USER
  COMPLIANCE_OFFICER
  HR_MANAGER
  ANALYST
  VIEWER
}

// Use proper field types and constraints
model ComplianceRecord {
  id        String   @id @default(cuid())
  type      String   // AML, KYC, OFAC, etc.
  status    String   // pending, approved, rejected, flagged
  riskScore Int?     // 1-100 risk assessment
  
  // Use JSON for flexible data structures
  data      Json     // Compliance check data
  metadata  Json?    // Additional context
  
  // Relations
  companyId String
  company   Company  @relation(fields: [companyId], references: [id])
  createdBy String
  reviewedBy String?
  
  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Indexes
  @@index([companyId])
  @@index([type])
  @@index([status])
  @@index([createdAt])
}
```

### Database Operations
```typescript
// Use Prisma client for database operations
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Proper error handling and transactions
export async function createComplianceRecord(data: CreateComplianceRecordInput): Promise<ComplianceRecord> {
  try {
    const record = await prisma.complianceRecord.create({
      data: {
        type: data.type,
        status: 'PENDING',
        riskScore: data.riskScore,
        data: data.entityData,
        metadata: data.metadata,
        companyId: data.companyId,
        createdBy: data.userId,
      },
      include: {
        company: true,
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'CREATE',
        entityType: 'ComplianceRecord',
        entityId: record.id,
        userId: data.userId,
        companyId: data.companyId,
        changes: { created: record },
      },
    });

    return record;
  } catch (error) {
    throw new DatabaseError('Failed to create compliance record', error);
  }
}

// Use transactions for complex operations
export async function updateComplianceStatus(
  recordId: string,
  status: string,
  userId: string
): Promise<ComplianceRecord> {
  return await prisma.$transaction(async (tx) => {
    const record = await tx.complianceRecord.update({
      where: { id: recordId },
      data: { 
        status,
        reviewedBy: userId,
        updatedAt: new Date(),
      },
    });

    await tx.auditLog.create({
      data: {
        action: 'UPDATE',
        entityType: 'ComplianceRecord',
        entityId: recordId,
        userId,
        companyId: record.companyId,
        changes: { status },
      },
    });

    return record;
  });
}
```

## API Standards

### RESTful API Design
```typescript
// Use consistent HTTP methods and status codes
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Authentication check
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'AUTHENTICATION_FAILED',
          message: 'Authentication required',
        },
      });
    }

    // Route handling
    switch (req.method) {
      case 'GET':
        return await handleGet(req, res, session);
      case 'POST':
        return await handlePost(req, res, session);
      case 'PUT':
        return await handlePut(req, res, session);
      case 'DELETE':
        return await handleDelete(req, res, session);
      default:
        return res.status(405).json({
          success: false,
          error: {
            code: 'METHOD_NOT_ALLOWED',
            message: `Method ${req.method} not allowed`,
          },
        });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Internal server error',
      },
    });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse, session: any) {
  const { id } = req.query;
  
  if (id) {
    // Get single record
    const record = await getComplianceRecord(id as string, session.user.companyId);
    return res.status(200).json({
      success: true,
      data: record,
    });
  } else {
    // Get list of records
    const records = await getComplianceRecords(session.user.companyId, req.query);
    return res.status(200).json({
      success: true,
      data: records,
      pagination: {
        page: parseInt(req.query.page as string) || 1,
        limit: parseInt(req.query.limit as string) || 20,
        total: records.length,
      },
    });
  }
}
```

### Input Validation
```typescript
// Use Zod for schema validation
import { z } from 'zod';

const CreateComplianceRecordSchema = z.object({
  type: z.enum(['AML', 'KYC', 'OFAC']),
  entityType: z.enum(['INDIVIDUAL', 'ORGANIZATION']),
  entityData: z.object({
    firstName: z.string().min(1).max(100).optional(),
    lastName: z.string().min(1).max(100).optional(),
    organizationName: z.string().min(1).max(200).optional(),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    nationality: z.string().length(2).optional(),
  }),
  riskFactors: z.array(z.string()).optional(),
});

export async function handlePost(req: NextApiRequest, res: NextApiResponse, session: any) {
  try {
    const validatedData = CreateComplianceRecordSchema.parse(req.body);
    
    const record = await createComplianceRecord({
      ...validatedData,
      companyId: session.user.companyId,
      userId: session.user.id,
    });

    return res.status(201).json({
      success: true,
      data: record,
      message: 'Compliance record created successfully',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input data',
          details: error.errors,
        },
      });
    }
    throw error;
  }
}
```

## Testing Standards

### Unit Testing
```typescript
// Use Jest for unit testing
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import ComplianceDashboard from '../components/ComplianceDashboard';

// Mock dependencies
jest.mock('next-auth/react');
jest.mock('../lib/api');

describe('ComplianceDashboard', () => {
  const mockSession = {
    user: {
      id: 'user_123',
      email: 'test@example.com',
      companyId: 'company_456',
    },
  };

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      data: mockSession,
      status: 'authenticated',
    });
  });

  it('renders compliance dashboard with data', async () => {
    const mockData = [
      {
        id: 'record_1',
        type: 'AML',
        status: 'PENDING',
        riskScore: 75,
      },
    ];

    // Mock API response
    (api.getComplianceData as jest.Mock).mockResolvedValue(mockData);

    render(<ComplianceDashboard companyId="company_456" />);

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Compliance Dashboard')).toBeInTheDocument();
      expect(screen.getByText('AML')).toBeInTheDocument();
      expect(screen.getByText('PENDING')).toBeInTheDocument();
    });
  });

  it('handles error state', async () => {
    (api.getComplianceData as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch data')
    );

    render(<ComplianceDashboard companyId="company_456" />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch data')).toBeInTheDocument();
    });
  });

  it('calls onRefresh when refresh button is clicked', async () => {
    const onRefresh = jest.fn();
    (api.getComplianceData as jest.Mock).mockResolvedValue([]);

    render(
      <ComplianceDashboard 
        companyId="company_456" 
        onRefresh={onRefresh} 
      />
    );

    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    fireEvent.click(refreshButton);

    expect(onRefresh).toHaveBeenCalled();
  });
});
```

### Integration Testing
```typescript
// Use Playwright for integration testing
import { test, expect } from '@playwright/test';

test.describe('Compliance Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/auth/login');
    await page.fill('[data-testid="email"]', 'test@example.com');
    await page.fill('[data-testid="password"]', 'password123');
    await page.click('[data-testid="login-button"]');
    await page.waitForURL('/dashboard');
  });

  test('displays compliance records', async ({ page }) => {
    await page.goto('/dashboard/compliance');
    
    // Wait for data to load
    await page.waitForSelector('[data-testid="compliance-table"]');
    
    // Verify table headers
    await expect(page.locator('text=Type')).toBeVisible();
    await expect(page.locator('text=Status')).toBeVisible();
    await expect(page.locator('text=Risk Score')).toBeVisible();
    
    // Verify data rows
    await expect(page.locator('[data-testid="compliance-row"]')).toHaveCount(5);
  });

  test('filters compliance records', async ({ page }) => {
    await page.goto('/dashboard/compliance');
    
    // Select filter
    await page.selectOption('[data-testid="type-filter"]', 'AML');
    
    // Wait for filtered results
    await page.waitForSelector('[data-testid="compliance-row"]');
    
    // Verify only AML records are shown
    const rows = page.locator('[data-testid="compliance-row"]');
    await expect(rows).toHaveCount(2);
    
    for (let i = 0; i < 2; i++) {
      await expect(rows.nth(i).locator('text=AML')).toBeVisible();
    }
  });

  test('creates new compliance record', async ({ page }) => {
    await page.goto('/dashboard/compliance');
    
    // Click create button
    await page.click('[data-testid="create-record-button"]');
    
    // Fill form
    await page.selectOption('[data-testid="type-select"]', 'KYC');
    await page.selectOption('[data-testid="entity-type-select"]', 'INDIVIDUAL');
    await page.fill('[data-testid="first-name-input"]', 'John');
    await page.fill('[data-testid="last-name-input"]', 'Doe');
    await page.fill('[data-testid="date-of-birth-input"]', '1990-01-01');
    
    // Submit form
    await page.click('[data-testid="submit-button"]');
    
    // Verify success message
    await expect(page.locator('text=Record created successfully')).toBeVisible();
    
    // Verify new record in table
    await expect(page.locator('text=John Doe')).toBeVisible();
  });
});
```

## Security Standards

### Authentication and Authorization
```typescript
// Use NextAuth.js for authentication
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export async function requireAuth(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    throw new ApiError('Authentication required', 401, 'AUTHENTICATION_FAILED');
  }
  
  return session;
}

export async function requireRole(
  req: NextApiRequest,
  res: NextApiResponse,
  requiredRoles: UserRole[]
) {
  const session = await requireAuth(req, res);
  
  if (!requiredRoles.includes(session.user.role)) {
    throw new ApiError('Insufficient permissions', 403, 'AUTHORIZATION_FAILED');
  }
  
  return session;
}

// Use middleware for route protection
export function withAuth(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await requireAuth(req, res);
      return handler(req, res);
    } catch (error) {
      if (error instanceof ApiError) {
        return res.status(error.statusCode).json({
          success: false,
          error: {
            code: error.code,
            message: error.message,
          },
        });
      }
      throw error;
    }
  };
}
```

### Input Sanitization
```typescript
// Sanitize user inputs
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}
```

## Performance Standards

### Code Optimization
```typescript
// Use React.memo for expensive components
import React from 'react';

interface ComplianceTableProps {
  data: ComplianceRecord[];
  onRowClick: (record: ComplianceRecord) => void;
}

export const ComplianceTable = React.memo<ComplianceTableProps>(
  ({ data, onRowClick }) => {
    return (
      <table className="compliance-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Status</th>
            <th>Risk Score</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record) => (
            <tr
              key={record.id}
              onClick={() => onRowClick(record)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <td>{record.type}</td>
              <td>{record.status}</td>
              <td>{record.riskScore}</td>
              <td>{formatDate(record.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
);

// Use useMemo for expensive calculations
export function useComplianceStats(data: ComplianceRecord[]) {
  return useMemo(() => {
    const total = data.length;
    const pending = data.filter(r => r.status === 'PENDING').length;
    const approved = data.filter(r => r.status === 'APPROVED').length;
    const rejected = data.filter(r => r.status === 'REJECTED').length;
    const averageRisk = data.reduce((sum, r) => sum + (r.riskScore || 0), 0) / total;

    return {
      total,
      pending,
      approved,
      rejected,
      averageRisk: Math.round(averageRisk),
    };
  }, [data]);
}
```

### Database Optimization
```typescript
// Use proper indexing and query optimization
export async function getComplianceRecords(
  companyId: string,
  filters: ComplianceFilters
): Promise<ComplianceRecord[]> {
  const where: any = { companyId };

  if (filters.type) where.type = filters.type;
  if (filters.status) where.status = filters.status;
  if (filters.dateRange) {
    where.createdAt = {
      gte: filters.dateRange.start,
      lte: filters.dateRange.end,
    };
  }

  return await prisma.complianceRecord.findMany({
    where,
    include: {
      company: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: filters.limit || 20,
    skip: (filters.page - 1) * (filters.limit || 20),
  });
}

// Use connection pooling
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: ['query', 'info', 'warn', 'error'],
});
```

## Documentation Standards

### Code Comments
```typescript
/**
 * Creates a new compliance record and associated audit log
 * @param data - The compliance record data
 * @returns Promise<ComplianceRecord> - The created compliance record
 * @throws {ValidationError} - When input data is invalid
 * @throws {DatabaseError} - When database operation fails
 */
export async function createComplianceRecord(
  data: CreateComplianceRecordInput
): Promise<ComplianceRecord> {
  // Validate input data
  const validatedData = validateComplianceData(data);
  
  // Create record in transaction
  return await prisma.$transaction(async (tx) => {
    const record = await tx.complianceRecord.create({
      data: validatedData,
    });
    
    // Create audit log for compliance
    await tx.auditLog.create({
      data: {
        action: 'CREATE',
        entityType: 'ComplianceRecord',
        entityId: record.id,
        userId: data.userId,
        companyId: data.companyId,
      },
    });
    
    return record;
  });
}
```

### README Standards
```markdown
# Component Name

Brief description of what this component does.

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| data | ComplianceRecord[] | Yes | Array of compliance records to display |
| onRowClick | (record: ComplianceRecord) => void | No | Callback when row is clicked |
| loading | boolean | No | Whether data is loading |

## Usage

```tsx
import { ComplianceTable } from './ComplianceTable';

function Dashboard() {
  const [data, setData] = useState([]);
  
  return (
    <ComplianceTable
      data={data}
      onRowClick={(record) => console.log(record)}
    />
  );
}
```

## Testing

Run tests with:
```bash
npm test ComplianceTable
```

## Dependencies

- React 18+
- TypeScript 4.9+
- Tailwind CSS
```

## Conclusion

These coding standards ensure consistent, maintainable, and high-quality code across the MapleAI development team. By following these standards, we can:

- Improve code readability and maintainability
- Reduce bugs and improve reliability
- Enhance performance and scalability
- Facilitate collaboration and code reviews
- Ensure security and compliance requirements

All developers should familiarize themselves with these standards and apply them consistently in their daily development work. 