# API Documentation

## Overview

MapleAI provides a comprehensive RESTful API for enterprise AI automation, compliance, and analytics. All endpoints are secured with JWT authentication and follow consistent error handling patterns.

## Base URL
```
Production: https://api.mapleai.com/v1
Staging: https://staging-api.mapleai.com/v1
Development: http://localhost:3000/api
```

## Authentication

### JWT Token Authentication
All API requests require a valid JWT token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

### Token Refresh
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

## Common Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation completed successfully",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "issue": "Email format is invalid"
    }
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Authentication Endpoints

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@company.com",
  "password": "secure-password"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@company.com",
      "name": "John Doe",
      "role": "COMPLIANCE_OFFICER",
      "companyId": "company_456"
    },
    "accessToken": "jwt-access-token",
    "refreshToken": "jwt-refresh-token",
    "expiresIn": 3600
  }
}
```

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@company.com",
  "password": "secure-password",
  "name": "John Doe",
  "companyName": "Acme Corp",
  "industry": "Financial Services"
}
```

### Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

## User Management

### Get Current User
```http
GET /api/users/me
Authorization: Bearer <token>
```

### Update User Profile
```http
PUT /api/users/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Smith",
  "preferences": {
    "notifications": true,
    "timezone": "UTC-5"
  }
}
```

### Get Users (Admin Only)
```http
GET /api/users?companyId=company_456&role=COMPLIANCE_OFFICER&page=1&limit=20
Authorization: Bearer <token>
```

## Company Management

### Get Company Details
```http
GET /api/companies/me
Authorization: Bearer <token>
```

### Update Company
```http
PUT /api/companies/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Acme Corporation",
  "industry": "Financial Services",
  "complianceLevel": "Advanced"
}
```

## Compliance API

### Create Compliance Check
```http
POST /api/compliance/checks
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "AML",
  "entityType": "INDIVIDUAL",
  "entityData": {
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "1980-01-01",
    "nationality": "US"
  },
  "riskFactors": ["high_value_transaction", "new_customer"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "check_789",
    "type": "AML",
    "status": "PENDING",
    "riskScore": 75,
    "flags": [
      {
        "type": "SANCTIONS_MATCH",
        "severity": "HIGH",
        "description": "Potential OFAC match found"
      }
    ],
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### Get Compliance Checks
```http
GET /api/compliance/checks?type=AML&status=PENDING&page=1&limit=50
Authorization: Bearer <token>
```

### Update Compliance Check
```http
PUT /api/compliance/checks/check_789
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "APPROVED",
  "notes": "Manual review completed - false positive",
  "reviewedBy": "user_123"
}
```

### Generate Compliance Report
```http
POST /api/compliance/reports
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "MONTHLY_AML_REPORT",
  "dateRange": {
    "start": "2024-01-01",
    "end": "2024-01-31"
  },
  "format": "PDF"
}
```

## HR Automation API

### Create Candidate Profile
```http
POST /api/hr/candidates
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@email.com",
  "position": "Senior Developer",
  "resume": "base64-encoded-resume",
  "skills": ["JavaScript", "React", "Node.js"],
  "experience": 5
}
```

### Get AI Insights
```http
POST /api/hr/insights
Authorization: Bearer <token>
Content-Type: application/json

{
  "candidateId": "candidate_123",
  "analysisType": "CULTURAL_FIT",
  "companyValues": ["innovation", "collaboration", "excellence"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "culturalFitScore": 85,
    "recommendations": [
      "Strong technical skills match",
      "Good cultural alignment indicators",
      "Consider behavioral interview for leadership assessment"
    ],
    "riskFactors": [
      "Limited remote work experience"
    ]
  }
}
```

### Get HR Analytics
```http
GET /api/hr/analytics?metric=attrition&timeframe=quarterly&department=engineering
Authorization: Bearer <token>
```

## Workflow Orchestration API

### Create Workflow
```http
POST /api/workflow/workflows
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Employee Onboarding",
  "description": "Automated onboarding workflow",
  "type": "ONBOARDING",
  "steps": [
    {
      "id": "step_1",
      "name": "Document Collection",
      "type": "FORM",
      "required": true,
      "nextStep": "step_2"
    },
    {
      "id": "step_2",
      "name": "Compliance Check",
      "type": "AUTOMATED",
      "required": true,
      "nextStep": "step_3"
    }
  ]
}
```

### Start Workflow Instance
```http
POST /api/workflow/instances
Authorization: Bearer <token>
Content-Type: application/json

{
  "workflowId": "workflow_123",
  "entityId": "employee_456",
  "data": {
    "employeeName": "John Doe",
    "position": "Software Engineer"
  }
}
```

### Get Workflow Status
```http
GET /api/workflow/instances/instance_789
Authorization: Bearer <token>
```

## Analytics API

### Create Analytics Query
```http
POST /api/analytics/queries
Authorization: Bearer <token>
Content-Type: application/json

{
  "query": "SELECT COUNT(*) as total_checks, AVG(risk_score) as avg_risk FROM compliance_checks WHERE created_at >= '2024-01-01'",
  "type": "CUSTOM",
  "parameters": {
    "dateRange": "last_30_days"
  }
}
```

### Get Predictive Analytics
```http
POST /api/analytics/predictions
Authorization: Bearer <token>
Content-Type: application/json

{
  "model": "CHURN_PREDICTION",
  "input": {
    "customerId": "customer_123",
    "features": {
      "usageFrequency": 0.8,
      "supportTickets": 2,
      "paymentHistory": "good"
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "prediction": 0.15,
    "confidence": 0.89,
    "factors": [
      {
        "feature": "usageFrequency",
        "impact": 0.6,
        "description": "High usage indicates engagement"
      }
    ],
    "recommendations": [
      "Consider proactive outreach",
      "Offer additional training resources"
    ]
  }
}
```

### Get Dashboard Metrics
```http
GET /api/analytics/dashboard?timeframe=monthly&metrics=compliance_checks,hr_insights,workflow_completion
Authorization: Bearer <token>
```

## AI Agents API

### Create Agent
```http
POST /api/agents
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "ComplianceGPT",
  "description": "AI agent for compliance assistance",
  "type": "COMPLIANCE",
  "configuration": {
    "model": "gpt-4",
    "temperature": 0.3,
    "maxTokens": 1000,
    "systemPrompt": "You are a compliance expert assistant..."
  },
  "capabilities": ["document_analysis", "risk_assessment", "regulatory_guidance"]
}
```

### Chat with Agent
```http
POST /api/agents/agent_123/chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "What are the AML requirements for high-value transactions?",
  "context": {
    "documentType": "transaction_report",
    "amount": 50000
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "response": "For transactions over $10,000, you must file a CTR (Currency Transaction Report)...",
    "confidence": 0.95,
    "sources": [
      "31 CFR 1010.311",
      "FinCEN guidance 2023-01"
    ],
    "recommendedActions": [
      "File CTR within 15 days",
      "Conduct enhanced due diligence",
      "Monitor for suspicious patterns"
    ]
  }
}
```

### Get Agent Performance
```http
GET /api/agents/agent_123/performance?timeframe=weekly
Authorization: Bearer <token>
```

## Security API

### Get Security Events
```http
GET /api/security/events?severity=HIGH&timeframe=last_24_hours
Authorization: Bearer <token>
```

### Create Security Alert
```http
POST /api/security/alerts
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "SUSPICIOUS_LOGIN",
  "severity": "MEDIUM",
  "description": "Multiple failed login attempts detected",
  "userId": "user_123",
  "ipAddress": "192.168.1.100",
  "metadata": {
    "attempts": 5,
    "timeWindow": "10 minutes"
  }
}
```

### Get Security Dashboard
```http
GET /api/security/dashboard?timeframe=daily
Authorization: Bearer <token>
```

## Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `AUTHENTICATION_FAILED` | Invalid credentials | 401 |
| `AUTHORIZATION_FAILED` | Insufficient permissions | 403 |
| `VALIDATION_ERROR` | Invalid input data | 400 |
| `RESOURCE_NOT_FOUND` | Requested resource not found | 404 |
| `RATE_LIMIT_EXCEEDED` | Too many requests | 429 |
| `INTERNAL_ERROR` | Server error | 500 |
| `SERVICE_UNAVAILABLE` | Service temporarily unavailable | 503 |

## Rate Limiting

- **Standard Users**: 1000 requests per hour
- **Premium Users**: 5000 requests per hour
- **Enterprise Users**: 20000 requests per hour

Rate limit headers:
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 950
X-RateLimit-Reset: 1642248000
```

## Webhooks

### Configure Webhook
```http
POST /api/webhooks
Authorization: Bearer <token>
Content-Type: application/json

{
  "url": "https://your-app.com/webhooks/compliance",
  "events": ["compliance.check.completed", "compliance.alert.triggered"],
  "secret": "webhook-secret-key"
}
```

### Webhook Payload Example
```json
{
  "event": "compliance.check.completed",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "checkId": "check_789",
    "status": "FLAGGED",
    "riskScore": 85
  }
}
```

## SDKs and Libraries

### JavaScript/TypeScript
```bash
npm install @mapleai/sdk
```

```javascript
import { MapleAI } from '@mapleai/sdk';

const client = new MapleAI({
  apiKey: 'your-api-key',
  environment: 'production'
});

const complianceCheck = await client.compliance.createCheck({
  type: 'AML',
  entityData: { /* ... */ }
});
```

### Python
```bash
pip install mapleai-sdk
```

```python
from mapleai import MapleAI

client = MapleAI(api_key="your-api-key", environment="production")

compliance_check = client.compliance.create_check(
    type="AML",
    entity_data={...}
)
```

## Support

- **API Documentation**: https://docs.mapleai.com/api
- **SDK Documentation**: https://docs.mapleai.com/sdk
- **Support Email**: api-support@mapleai.com
- **Status Page**: https://status.mapleai.com 