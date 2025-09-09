# Pet Manager Backend

🐾 **NestJS API** pentru Pet Manager MVP - serving mock JSON data

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Setup environment**
   ```bash
   cp .env.example .env
   ```

3. **Start development server**
   ```bash
   npm run start:dev
   ```

4. **API will be available at:**
   - **API Base**: http://localhost:3001/api
   - **Documentation**: http://localhost:3001/api/docs
   - **Health Check**: http://localhost:3001/api/health

## 📚 API Documentation

### Swagger UI
Visit http://localhost:3001/api/docs for interactive API documentation.

### Key Endpoints

#### System Endpoints
- `GET /api` - Welcome message
- `GET /api/health` - Health check
- `GET /api/statistics` - System statistics
- `GET /api/version` - Version information

#### Authentication
- `POST /api/auth/login` - Login with credentials
- `POST /api/auth/demo-login` - Demo login for testing
- `POST /api/auth/logout` - Logout

#### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/:id/pets` - Get user's pets
- `GET /api/users/:id/dashboard` - Get user dashboard

#### Pets
- `GET /api/pets` - Get all pets
- `POST /api/pets` - Create new pet
- `GET /api/pets/:id` - Get pet by ID
- `PATCH /api/pets/:id` - Update pet
- `DELETE /api/pets/:id` - Delete pet
- `GET /api/pets/:id/health-summary` - Pet health overview

#### Vaccinations
- `GET /api/vaccinations` - Get all vaccinations
- `GET /api/vaccinations/due-soon` - Upcoming vaccinations
- `GET /api/vaccinations/expired` - Expired vaccinations
- `GET /api/vaccinations/:id/certificate` - Vaccination certificate

## 🔧 Configuration

### Environment Variables
Copy `.env.example` to `.env` and configure:

```env
NODE_ENV=development
PORT=3001
JWT_SECRET=your-secret-key
CORS_ORIGINS=http://localhost:3000,http://localhost:4200
```

### CORS Configuration
The API is configured to accept requests from:
- http://localhost:3000 (React)
- http://localhost:4200 (Angular)
- http://localhost:8100 (Ionic)

## 🛡️ Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Request throttling
- **Input Validation** - DTO validation with class-validator
- **JWT Authentication** - Bearer token auth
- **Global Exception Filter** - Error handling

## 📊 Mock Data

The API serves data from JSON files in `../mock-data/`:

- **users.json** - 5 users (3 owners, 2 vets)
- **pets.json** - 6 pets with complete profiles
- **vaccinations.json** - 10 vaccination records
- **consultations.json** - 6 medical consultations
- **documents.json** - 12 medical documents
- **feeding-schedules.json** - 6 feeding plans
- **notifications.json** - 10 smart notifications

### Data Statistics
- **3 Pet Owners** with multiple pets each
- **2 Veterinarians** with clinic information
- **Complete Health Records** for all pets
- **Romanian Localization** throughout

## 🧪 Demo Authentication

For MVP testing, use the demo login endpoint:

```bash
# Login as pet owner
curl -X POST http://localhost:3001/api/auth/demo-login \
  -H "Content-Type: application/json" \
  -d '{"userType": "owner"}'

# Login as veterinarian
curl -X POST http://localhost:3001/api/auth/demo-login \
  -H "Content-Type: application/json" \
  -d '{"userType": "veterinarian"}'
```

## 📈 API Features

### Smart Filtering
```bash
# Filter pets by owner
GET /api/pets?ownerId=1

# Filter pets by species
GET /api/pets?species=Câine

# Search pets by name/breed
GET /api/pets?search=Max

# Filter vaccinations by status
GET /api/vaccinations?status=due_soon
```

### Dashboard Data
```bash
# Get complete dashboard for user
GET /api/users/1/dashboard

# Get pet health summary
GET /api/pets/1/health-summary
```

### Statistics
```bash
# System-wide statistics
GET /api/statistics

# Pet statistics
GET /api/pets/statistics

# Vaccination statistics
GET /api/vaccinations/statistics
```

## 🚀 Development

### Available Scripts
```bash
npm run start          # Start production server
npm run start:dev      # Start development server (watch mode)
npm run start:debug    # Start debug server
npm run build          # Build for production
npm run test           # Run unit tests
npm run test:e2e       # Run e2e tests
npm run lint           # Lint code
npm run format         # Format code
```

### Project Structure
```
backend/src/
├── auth/              # JWT authentication module
├── common/            # Shared interfaces, DTOs, services
│   ├── interfaces/    # TypeScript interfaces
│   ├── dto/          # Data Transfer Objects
│   ├── services/     # Mock data service
│   ├── filters/      # Exception filters
│   └── interceptors/ # Request/response interceptors
├── modules/          # Feature modules
│   ├── users/        # User management
│   ├── pets/         # Pet management
│   └── vaccinations/ # Vaccination tracking
├── app.module.ts     # Root application module
├── app.controller.ts # System endpoints
├── app.service.ts    # System services
└── main.ts          # Application bootstrap
```

## 🌍 Romanian Localization

The API includes full Romanian localization:
- **Pet species** in Romanian (Câine, Pisică, etc.)
- **Vaccination types** in Romanian
- **Error messages** in Romanian
- **Date formats** (DD.MM.YYYY)
- **Phone formats** (+40XXXXXXXXX)

## 📝 Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "data": {...},
  "timestamp": "2024-08-30T12:00:00Z",
  "path": "/api/pets",
  "message": "Pets retrieved successfully"
}
```

## 🔍 Health Monitoring

### Health Check Endpoint
```bash
GET /api/health
```

Returns:
- System status
- Memory usage
- Uptime
- Database connection status
- Response time

### Logging
Structured logging with:
- Request/response logging
- Error tracking
- Performance monitoring
- User activity logging

## 🚨 Error Handling

Global exception filter provides:
- Consistent error format
- Detailed error logging
- Development vs production error messages
- HTTP status code mapping

## 📋 Next Steps

1. **Database Integration** - Replace mock data with PostgreSQL
2. **Real Authentication** - Implement password hashing and validation
3. **File Upload** - Add document/photo upload endpoints
4. **WebSocket** - Real-time notifications
5. **Caching** - Redis for improved performance
6. **Testing** - Unit and integration tests
7. **Deployment** - Docker containerization

This MVP backend provides a complete foundation for the Pet Manager application with all necessary endpoints, authentication, documentation, and Romanian localization ready for immediate frontend integration.