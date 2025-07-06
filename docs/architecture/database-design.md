# Database Design

## Overview

MapleAI's database architecture is built on PostgreSQL with Prisma ORM, designed for enterprise-scale operations, compliance requirements, and AI-driven features. Our schema supports multi-tenancy, audit trails, and complex business logic.

## Database Technology Stack

### Core Components
- **PostgreSQL 15+** - Primary database engine
- **Prisma ORM** - Type-safe database client
- **Connection Pooling** - PgBouncer for performance
- **Backup Strategy** - Automated daily backups with point-in-time recovery
- **Monitoring** - Query performance and health monitoring

### Infrastructure
- **Production**: Managed PostgreSQL service (AWS RDS/Azure Database)
- **Development**: Local PostgreSQL with Docker
- **Testing**: Isolated test databases
- **Staging**: Production-like environment

## Core Schema Design

### User Management

```prisma
enum UserRole {
  ADMIN
  USER
  COMPLIANCE_OFFICER
  HR_MANAGER
  ANALYST
  VIEWER
}

enum SubscriptionTier {
  TRIAL
  STARTER
  PROFESSIONAL
  ENTERPRISE
}

model User {
  id            String         @id @default(cuid())
  email         String         @unique
  name          String?
  password      String
  role          UserRole       @default(USER)
  isActive      Boolean        @default(true)
  lastLoginAt   DateTime?
  companyId     String?
  company       Company?       @relation(fields: [companyId], references: [id])
  subscription  Subscription?  @relation(fields: [subscriptionId], references: [id])
  subscriptionId String?
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  
  // Audit fields
  createdBy     String?
  updatedBy     String?
  
  @@index([email])
  @@index([companyId])
  @@index([subscriptionId])
}
```

### Company & Organization

```prisma
model Company {
  id              String    @id @default(cuid())
  name            String
  industry        String?
  size            String?   // SMB, Mid-Market, Enterprise
  region          String?
  complianceLevel String?   // Basic, Advanced, Enterprise
  isActive        Boolean   @default(true)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  // Relations
  users           User[]
  subscriptions   Subscription[]
  complianceRecords ComplianceRecord[]
  auditLogs       AuditLog[]
  
  @@index([name])
  @@index([industry])
  @@index([region])
}
```

### Subscription Management

```prisma
model Subscription {
  id              String           @id @default(cuid())
  tier            SubscriptionTier
  status          String           // active, suspended, cancelled
  startDate       DateTime
  endDate         DateTime?
  billingCycle    String           // monthly, annual
  price           Decimal          @db.Decimal(10, 2)
  features        Json?            // Feature flags and limits
  companyId       String
  company         Company          @relation(fields: [companyId], references: [id])
  users           User[]
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt
  
  @@index([companyId])
  @@index([tier])
  @@index([status])
}
```

## Compliance & Audit Schema

### Compliance Records

```prisma
model ComplianceRecord {
  id              String    @id @default(cuid())
  type            String    // AML, KYC, OFAC, etc.
  status          String    // pending, approved, rejected, flagged
  riskScore       Int?      // 1-100 risk assessment
  data            Json      // Compliance check data
  metadata        Json?     // Additional context
  companyId       String
  company         Company   @relation(fields: [companyId], references: [id])
  createdBy       String
  reviewedBy      String?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  // Audit trail
  auditLogs       AuditLog[]
  
  @@index([companyId])
  @@index([type])
  @@index([status])
  @@index([createdAt])
}
```

### Audit Logging

```prisma
model AuditLog {
  id              String    @id @default(cuid())
  action          String    // CREATE, UPDATE, DELETE, VIEW
  entityType      String    // User, Company, ComplianceRecord, etc.
  entityId        String
  userId          String
  companyId       String
  company         Company   @relation(fields: [companyId], references: [id])
  changes         Json?     // Before/after data
  ipAddress       String?
  userAgent       String?
  timestamp       DateTime  @default(now())
  
  @@index([entityType, entityId])
  @@index([userId])
  @@index([companyId])
  @@index([timestamp])
}
```

## AI & Analytics Schema

### AI Models & Deployments

```prisma
model AIModel {
  id              String    @id @default(cuid())
  name            String
  version         String
  type            String    // compliance, hr, analytics, agent
  status          String    // training, deployed, archived
  performance     Json?     // Model metrics
  configuration   Json      // Model config
  companyId       String?
  company         Company?  @relation(fields: [companyId], references: [id])
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  @@index([type])
  @@index([status])
  @@index([companyId])
}
```

### Analytics Data

```prisma
model AnalyticsEvent {
  id              String    @id @default(cuid())
  eventType       String    // user_action, system_event, ai_prediction
  eventData       Json      // Event payload
  userId          String?
  companyId       String
  company         Company   @relation(fields: [companyId], references: [id])
  timestamp       DateTime  @default(now())
  
  @@index([eventType])
  @@index([userId])
  @@index([companyId])
  @@index([timestamp])
}
```

## HR & Workflow Schema

### HR Records

```prisma
model HRRecord {
  id              String    @id @default(cuid())
  type            String    // candidate, employee, performance
  status          String    // active, inactive, pending
  data            Json      // HR data
  aiInsights      Json?     // AI-generated insights
  companyId       String
  company         Company   @relation(fields: [companyId], references: [id])
  createdBy       String
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  @@index([type])
  @@index([status])
  @@index([companyId])
}
```

### Workflow Definitions

```prisma
model Workflow {
  id              String    @id @default(cuid())
  name            String
  description     String?
  type            String    // onboarding, compliance, approval
  steps           Json      // Workflow definition
  isActive        Boolean   @default(true)
  companyId       String
  company         Company   @relation(fields: [companyId], references: [id])
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  @@index([type])
  @@index([companyId])
}
```

## Data Security & Privacy

### Encryption
- **At Rest**: AES-256 encryption for sensitive data
- **In Transit**: TLS 1.3 for all connections
- **Field Level**: Encrypted PII fields (SSN, credit card, etc.)

### Access Control
- **Row-Level Security**: Company-based data isolation
- **Column-Level Security**: Role-based field access
- **Audit Logging**: Complete data access tracking

### Data Retention
- **Compliance Data**: 7-year retention (regulatory requirement)
- **Audit Logs**: 10-year retention
- **User Data**: Configurable retention policies
- **Backup Retention**: 30-day point-in-time recovery

## Performance Optimization

### Indexing Strategy
```sql
-- Composite indexes for common queries
CREATE INDEX idx_compliance_company_status_date 
ON "ComplianceRecord" (company_id, status, created_at);

CREATE INDEX idx_audit_entity_timestamp 
ON "AuditLog" (entity_type, entity_id, timestamp);

CREATE INDEX idx_analytics_company_event_timestamp 
ON "AnalyticsEvent" (company_id, event_type, timestamp);
```

### Partitioning
- **Audit Logs**: Partitioned by month for large datasets
- **Analytics Events**: Partitioned by date for performance
- **Compliance Records**: Partitioned by company for isolation

### Query Optimization
- **Connection Pooling**: PgBouncer with 20-100 connections
- **Read Replicas**: Analytics queries on read replicas
- **Materialized Views**: Pre-computed analytics aggregations

## Backup & Recovery

### Backup Strategy
- **Daily Full Backups**: Automated daily backups
- **Point-in-Time Recovery**: 15-minute recovery point objective
- **Cross-Region Replication**: Disaster recovery setup
- **Backup Encryption**: AES-256 encrypted backups

### Recovery Procedures
- **RTO**: 4-hour recovery time objective
- **RPO**: 15-minute recovery point objective
- **Testing**: Monthly backup restoration tests
- **Documentation**: Detailed recovery runbooks

## Monitoring & Maintenance

### Performance Monitoring
- **Query Performance**: Slow query identification
- **Connection Monitoring**: Connection pool health
- **Storage Monitoring**: Disk space and growth
- **Replication Lag**: Read replica synchronization

### Maintenance Tasks
- **VACUUM**: Automated table maintenance
- **ANALYZE**: Statistics updates for query planning
- **Index Maintenance**: Index rebuild and optimization
- **Log Rotation**: Database log management

## Future Enhancements

### Planned Schema Changes
- **Multi-Region Support**: Geographic data distribution
- **Real-time Analytics**: Streaming data processing
- **Advanced AI Features**: Model training data storage
- **Integration Hub**: Third-party system connectors

### Scalability Considerations
- **Horizontal Scaling**: Database sharding strategy
- **Microservices**: Service-specific databases
- **Event Sourcing**: Audit trail optimization
- **CQRS**: Command-query responsibility separation 