# 🐾 Pet Manager API - Postman Collection

Complete Postman collection for testing the Pet Manager API with all CRUD operations and real database persistence.

## 📁 Files

- `Pet-Manager-API.postman_collection.json` - **Original collection with new registration endpoints**
- `Pet-Manager-API-Updated.postman_collection.json` - **Complete collection with ALL CRUD operations**
- `Pet-Manager-Environment.postman_environment.json` - **Environment variables for local testing**

## 🚀 Quick Setup

### 1. Import Files
- Import the collection file into Postman
- Import the environment file into Postman
- Set environment to "Pet Manager API"

### 2. Start Local Server
```bash
cd backend
npm run start:dev
```
Server runs on: `http://localhost:4000`

### 3. Test Registration (No Auth Required)
```json
POST /api/register/owner
{
    "name": "Maria Popescu",
    "email": "maria@gmail.com", 
    "phone": "+40722123456",
    "password": "SecurePass123!"
}
```

## 📊 Available Endpoints

### 🔐 Registration & Authentication
- `POST /api/register/owner` - Register pet owner
- `POST /api/register/veterinarian` - Register veterinarian  
- `POST /api/register/check-email` - Check email availability
- `POST /api/auth/demo-login` - Demo login (testing)
- `POST /api/auth/login` - Regular login
- `POST /api/auth/logout` - Logout

### 👥 Users (Complete CRUD)
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PATCH /api/users/:id` - Update user  
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/statistics` - User statistics

### 🐾 Pets (Complete CRUD)  
- `GET /api/pets` - List all pets
- `GET /api/pets/:id` - Get pet by ID
- `POST /api/pets` - Create pet (requires owner_id)
- `PATCH /api/pets/:id` - Update pet
- `DELETE /api/pets/:id` - Delete pet
- `GET /api/pets/statistics` - Pet statistics
- `GET /api/pets/:id/health-summary` - Comprehensive health data

### 💉 Vaccinations (Complete CRUD)
- `GET /api/vaccinations` - List all vaccinations
- `GET /api/vaccinations/:id` - Get vaccination by ID  
- `POST /api/vaccinations` - Create vaccination
- `PATCH /api/vaccinations/:id` - Update vaccination
- `DELETE /api/vaccinations/:id` - Delete vaccination
- `GET /api/vaccinations/statistics` - Vaccination statistics

### 🏥 Consultations (Complete CRUD)
- `GET /api/consultations` - List all consultations
- `GET /api/consultations/:id` - Get consultation by ID
- `POST /api/consultations` - Create consultation  
- `PATCH /api/consultations/:id` - Update consultation
- `DELETE /api/consultations/:id` - Delete consultation
- `GET /api/consultations/statistics` - Consultation statistics

### 📄 Documents (Complete CRUD)
- `GET /api/documents` - List all documents
- `GET /api/documents/:id` - Get document by ID
- `POST /api/documents` - Upload document
- `PATCH /api/documents/:id` - Update document
- `DELETE /api/documents/:id` - Delete document
- `GET /api/documents/statistics` - Document statistics

### 🍽️ Feeding Schedules (Complete CRUD)
- `GET /api/feeding-schedules` - List all schedules
- `GET /api/feeding-schedules/:id` - Get schedule by ID
- `POST /api/feeding-schedules` - Create schedule
- `PATCH /api/feeding-schedules/:id` - Update schedule  
- `DELETE /api/feeding-schedules/:id` - Delete schedule
- `POST /api/feeding-schedules/:id/feeding-note` - Add feeding note
- `GET /api/feeding-schedules/:id/recommendations` - Get recommendations

### 🔔 Notifications (Complete CRUD)
- `GET /api/notifications` - List all notifications
- `GET /api/notifications/:id` - Get notification by ID
- `POST /api/notifications` - Create notification
- `PATCH /api/notifications/:id` - Update notification
- `DELETE /api/notifications/:id` - Delete notification  
- `PATCH /api/notifications/:id/mark-read` - Mark as read
- `POST /api/notifications/mark-all-read/:userId` - Mark all as read

## 🧪 Testing Workflow

### 1. Register Users
```bash
# Register Pet Owner
POST /api/register/owner
{
    "name": "Maria Popescu",
    "email": "maria@gmail.com",
    "phone": "+40722123456", 
    "password": "SecurePass123!"
}

# Register Veterinarian  
POST /api/register/veterinarian
{
    "name": "Dr. Ion Marinescu",
    "email": "ion@veterinar.ro",
    "phone": "+40721987654",
    "password": "VetSecure123!",
    "clinic_name": "AnimalCare Clinic",
    "clinic_address": "Str. Sănătății 45, București", 
    "license_number": "VET-BUC-001"
}
```

### 2. Create Pet
```bash
POST /api/pets
{
    "owner_id": 1,
    "name": "Buddy",
    "species": "Câine",
    "breed": "Labrador", 
    "gender": "Masculin",
    "emergency_contact": {
        "name": "Maria",
        "phone": "+40722123456",
        "relationship": "Owner"
    }
}
```

### 3. Add Health Records
```bash
# Add Vaccination
POST /api/vaccinations
{
    "pet_id": 1,
    "administered_by_vet_id": 2,
    "vaccine_name": "Rabies Vaccine",
    "vaccine_type": "antirabic",
    "date_administered": "2024-01-15",
    "next_due_date": "2025-01-15"
}

# Add Consultation
POST /api/consultations  
{
    "pet_id": 1,
    "vet_id": 2,
    "appointment_date": "2025-01-15T10:00:00",
    "consultation_type": "control_rutina",
    "reason": "Annual checkup"
}
```

## 🔧 Environment Variables

The environment file includes these variables:
- `fullApiUrl` - Points to `http://localhost:4000/api`
- `accessToken` - JWT token (auto-set by demo login)
- `userId` - Current user ID  
- `petId` - Test pet ID (10)
- `vaccinationId` - Test vaccination ID (1)

## 🏥 Database Features

✅ **Real PostgreSQL operations** - All data persists  
✅ **Entity relationships** - Users → Pets → Vaccinations/Consultations  
✅ **Advanced queries** - Search, filter, statistics  
✅ **Data validation** - Comprehensive input validation  
✅ **Security** - Password hashing, JWT authentication  

## 📈 Real-time Statistics

All modules provide real-time statistics:
- User registration trends
- Pet demographics and health status
- Vaccination coverage and due dates
- Consultation completion rates
- Document management metrics
- Feeding schedule analysis
- Notification engagement rates

## 💡 Pro Tips

1. **Use Demo Login** first to get authentication token
2. **Create a user** before creating pets (owner_id required)  
3. **Check Statistics** endpoints for data insights
4. **Test Relationships** by using IDs from other entities
5. **Verify Health Summary** to see all connected data

The API is production-ready with complete CRUD functionality!