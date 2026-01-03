# 🌍 GeoFeature SDK

A complete geographic feature toggle system that enables location-based feature management for mobile and web applications.

## 📋 Overview

GeoFeature SDK allows you to control application features based on user location. Configure default behaviors and create country-specific rules to enable/disable features or set custom values per region.



## 🏗️ Architecture
```
┌─────────────────────────────────┐
│     Admin Portal (React)        │  ← Manage features via web UI
│      http://localhost:5173      │
└────────────┬────────────────────┘
             │ REST API
             ▼
┌─────────────────────────────────┐
│   Backend API (Spring Boot)     │  ← Running on Koyeb 24/7
│ thundering-elfie...koyeb.app    │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│     MongoDB Atlas (Cloud)       │  ← Feature storage
└─────────────────────────────────┘
             ▲
             │ Query features
┌────────────┴────────────────────┐
│   Android SDK (Kotlin)          │  ← Mobile app integration
└─────────────────────────────────┘
```

---

## 📦 Project Structure
```
GeoFeatureSDK/
├── src/                          # Backend API (Spring Boot + Java 21)
│   └── main/
│       ├── java/
│       │   └── com/geofeature/
│       │       ├── controller/   # REST endpoints
│       │       ├── service/      # Business logic
│       │       ├── model/        # Data models
│       │       └── repository/   # MongoDB operations
│       └── resources/
│           └── application.properties
│
├── admin-portal/                 # Admin Portal (React + Vite)
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── services/            # API calls
│   │   └── App.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── README.md                # Portal-specific docs
│
├── build.gradle                  # Gradle build configuration
├── settings.gradle
├── Dockerfile                    # Docker configuration for API
├── docker-compose.yml
├── .gitignore
└── README.md                     # This file
```

---

## 🚀 Quick Start

### Prerequisites

- **Java 21** (for backend)
- **Node.js 16+** (for admin portal)
- **MongoDB Atlas account** (free tier)
- **Koyeb account** (for deployment - optional)

---

### 🔧 Backend API Setup

#### 1. Configure MongoDB

Edit `src/main/resources/application.properties`:
```properties
spring.mongodb.uri=mongodb+srv://username:password@cluster.mongodb.net/geofeature_db
server.port=8080
```

#### 2. Run Locally
```bash
# Using Gradle
./gradlew bootRun

# Using Docker
docker-compose up
```

#### 3. Test API
```bash
# Get all features
curl http://localhost:8080/api/v1/features

# Should return: []
```

#### 4. API Endpoints

Base URL: `http://localhost:8080/api/v1`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/features` | Get all features |
| `POST` | `/features` | Create new feature |
| `GET` | `/features/{id}` | Get feature by ID |
| `GET` | `/features/by-name/{name}` | Get feature by name |
| `POST` | `/features/query` | Query feature by country |
| `PUT` | `/features/{id}` | Update feature |
| `DELETE` | `/features/{id}` | Delete feature |

---

### 🌐 Admin Portal Setup

#### 1. Navigate to Portal
```bash
cd admin-portal
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Configure API URL
```bash
# Copy example env file
cp .env.example .env

# Edit .env
nano .env
```

Set your API URL:
```env
# For local development:
VITE_API_URL=http://localhost:8080/api/v1

# For production (Koyeb):
VITE_API_URL=https://thundering-elfie-geofeature-a5030253.koyeb.app/api/v1
```

#### 4. Run Development Server
```bash
npm run dev
```

Opens at: **http://localhost:5173**

#### 5. Build for Production
```bash
npm run build
# Output in dist/
```

See [admin-portal/README.md](./admin-portal/README.md) for detailed portal documentation.

---

## 📱 Android SDK Integration

### Installation

Add to your Android project:
```kotlin
// In your Application class or Activity:
GeoFeatureSDK.initialize("https://your-api-url.koyeb.app/", context)
```

### Usage Examples

#### Check if feature is enabled
```kotlin
GeoFeatureSDK.isFeatureEnabled(context, "dark_mode") { enabled, value ->
    if (enabled) {
        // Enable dark mode
        applyDarkTheme(value)
    }
}
```

#### Get current country
```kotlin
GeoFeatureSDK.getCurrentCountry(context) { country ->
    Log.d("GeoFeature", "User is in: $country")
    // country = "IL", "US", etc.
}
```

#### Check if user is in specific country
```kotlin
GeoFeatureSDK.isInCountry(context, "IL") { isInIsrael ->
    if (isInIsrael) {
        // Show Israeli content
        showIsraeliPromotion()
    }
}
```

#### Query feature for specific country
```kotlin
GeoFeatureSDK.isFeatureEnabledForCountry("payment_methods", "US") { enabled, value ->
    if (enabled) {
        val methods = value?.split(",") // ["paypal", "apple_pay", "credit_card"]
        setupPaymentMethods(methods)
    }
}
```

---

## 🎯 Feature Configuration Examples

### Example 1: Dark Mode Toggle
```json
{
  "featureName": "dark_mode",
  "defaultStatus": true,
  "geoRules": [
    {
      "countryCode": "US",
      "status": "disabled",
      "value": null
    }
  ]
}
```

**Result:**
- ✅ All countries: Dark mode enabled
- ❌ USA only: Dark mode disabled

---

### Example 2: Payment Methods by Country
```json
{
  "featureName": "payment_methods",
  "defaultStatus": false,
  "geoRules": [
    {
      "countryCode": "IL",
      "status": "enabled",
      "value": "paypal,credit_card"
    },
    {
      "countryCode": "US",
      "status": "enabled",
      "value": "paypal,apple_pay,credit_card"
    },
    {
      "countryCode": "DE",
      "status": "enabled",
      "value": "paypal,sepa"
    }
  ]
}
```

**Result:**
- 🇮🇱 Israel: PayPal + Credit Card
- 🇺🇸 USA: PayPal + Apple Pay + Credit Card
- 🇩🇪 Germany: PayPal + SEPA
- 🌍 Other countries: No payment methods (disabled)

---

### Example 3: Beta Features Rollout
```json
{
  "featureName": "new_ui_beta",
  "defaultStatus": false,
  "geoRules": [
    {
      "countryCode": "IL",
      "status": "enabled",
      "value": "beta_v2"
    }
  ]
}
```

**Result:**
- 🇮🇱 Israel: New UI (beta testing)
- 🌍 Rest of world: Old UI

---

## 🛠️ Technology Stack

### Backend API
- **Java 21**
- **Spring Boot 3.2**
- **MongoDB** (via Spring Data MongoDB)
- **Docker** (containerization)
- **Gradle 8.14** (build tool)

### Admin Portal
- **React 18**
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **Axios** (HTTP client)
- **Lucide React** (icons)

### Database
- **MongoDB Atlas** (cloud-hosted)

### Deployment
- **Backend:** Koyeb (Platform as a Service)
- **Frontend:** Can be deployed to Netlify, Vercel, or GitHub Pages

### Mobile SDK
- **Kotlin**
- **Retrofit** (API client)
- **GPS Location** (with Locale fallback)

---

## 🌐 Production Deployment

### Backend API (Koyeb)

Already deployed! ✅

- **URL:** https://thundering-elfie-geofeature-a5030253.koyeb.app
- **Auto-deploy:** Pushes to `main` branch trigger automatic deployment
- **Status:** Running 24/7

### Admin Portal (Options)

#### Option 1: Netlify (Recommended)
```bash
cd admin-portal
npm run build

# Upload dist/ folder to netlify.com
# Set environment variable: VITE_API_URL
```

#### Option 2: Vercel
```bash
npm install -g vercel
cd admin-portal
vercel
```

#### Option 3: GitHub Pages
```bash
# Add to package.json:
"homepage": "https://yourusername.github.io/geofeature-admin",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

npm install -D gh-pages
npm run deploy
```

---

## 🔐 Security Notes

### Current Implementation
- ✅ CORS configured on backend
- ✅ MongoDB Atlas with authentication
- ✅ HTTPS on Koyeb



## 📊 Data Model

### Feature Schema
```json
{
  "id": "uuid-string",
  "featureName": "dark_mode",
  "defaultStatus": true,
  "geoRules": [
    {
      "countryCode": "IL",
      "status": "enabled",
      "value": "auto"
    }
  ],
  "createdAt": "2026-01-03T10:00:00",
  "updatedAt": "2026-01-03T10:30:00"
}
```

### Geographic Rule Logic

1. SDK queries feature with user's country code
2. API checks if geo rule exists for that country
3. If rule exists → return rule status and value
4. If no rule → return default status

---


## 📖 API Documentation

### Swagger/OpenAPI

When running locally:
- **Swagger UI:** http://localhost:8080/swagger-ui.html
- **API Docs:** http://localhost:8080/api-docs

### Example Request: Create Feature
```bash
curl -X POST http://localhost:8080/api/v1/features \
  -H "Content-Type: application/json" \
  -d '{
    "featureName": "dark_mode",
    "defaultStatus": true,
    "geoRules": [
      {
        "countryCode": "US",
        "status": "disabled",
        "value": null
      }
    ]
  }'
```

### Example Request: Query Feature
```bash
curl -X POST http://localhost:8080/api/v1/features/query \
  -H "Content-Type: application/json" \
  -d '{
    "featureName": "dark_mode",
    "countryCode": "IL"
  }'
```

Response:
```json
{
  "enabled": true,
  "value": null
}
```

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** MongoDB connection failed
```
Solution: Check MONGODB_URI in application.properties
Verify MongoDB Atlas IP whitelist includes your IP (or 0.0.0.0/0)
```

**Problem:** Port 8080 already in use
```bash
# Find process using port 8080
lsof -i :8080

# Kill process
kill -9 <PID>
```

### Admin Portal Issues

**Problem:** Network Error / Can't connect to API
```
1. Check API is running (visit API URL in browser)
2. Verify .env has correct VITE_API_URL
3. Check CORS is enabled in Spring Boot
4. Restart dev server: npm run dev
```

**Problem:** White screen / Nothing loads
```
1. Open browser DevTools (F12)
2. Check Console for errors
3. Verify npm install completed successfully
4. Clear browser cache
```

---

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [MongoDB Atlas Guide](https://www.mongodb.com/docs/atlas/)
- [Koyeb Documentation](https://www.koyeb.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 📝 License

MIT License - feel free to use this project for your own purposes.

---

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

For issues or questions:
- Check existing documentation
- Open an issue on GitHub
- Review API logs in Koyeb dashboard
- Check MongoDB Atlas logs

---

## 🎯 Roadmap

- [ ] Add analytics dashboard
- [ ] Implement A/B testing support
- [ ] Add email notifications for feature changes
- [ ] Support percentage-based rollouts
- [ ] Add feature usage statistics
- [ ] Implement scheduled feature rollouts
- [ ] Add multi-user authentication
- [ ] Create iOS SDK

---

**Built by using Spring Boot, React, and MongoDB**

