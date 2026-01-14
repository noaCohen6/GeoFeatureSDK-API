# 🌍 GeoFeature SDK - API

**Complete geographic feature toggle system for location-based feature management**

[![Live API](https://img.shields.io/badge/API-live-success)](https://thundering-elfie-geofeature-a5030253.koyeb.app)
[![Admin Portal](https://img.shields.io/badge/Portal-live-blue)](https://noacohen6.github.io/GeoFeatureSDK-API/)
[![Java](https://img.shields.io/badge/Java-21-orange)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-brightgreen)](https://spring.io/projects/spring-boot)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Architecture](#%EF%B8%8F-architecture)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [API Endpoints](#-api-endpoints)
- [Feature Examples](#-feature-examples)
- [Technology Stack](#%EF%B8%8F-technology-stack)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

---

## 🎯 Overview

GeoFeature SDK enables you to control application features based on user location. Configure default behaviors and create country-specific rules to enable/disable features or set custom values per region.

**Key Features:**
- 🌍 Country-specific feature toggles
- 📊 Web-based admin portal for easy management
- 🔄 RESTful API for mobile/web integration
- 📱 Android SDK for easy mobile integration
- ☁️ Cloud-hosted (MongoDB Atlas + Koyeb)

**Live URLs:**
- **API:** https://thundering-elfie-geofeature-a5030253.koyeb.app
- **Admin Portal:** https://noacohen6.github.io/GeoFeatureSDK-API/

---

## 🏗️ Architecture

```
┌─────────────────────────────────┐
│   Admin Portal (React + Vite)   │  ← Manage features via web UI
│   GitHub Pages (noacohen6...)   │
└────────────┬────────────────────┘
             │ REST API
             ▼
┌─────────────────────────────────┐
│  Backend API (Spring Boot 3.2)  │  ← Deployed on Koyeb
│  thundering-elfie...koyeb.app   │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│     MongoDB Atlas (Cloud)       │  ← Feature storage
└─────────────────────────────────┘
             ▲
             │ Query features
┌────────────┴────────────────────┐
│  Android SDK / Mobile Apps      │  ← App integration
└─────────────────────────────────┘
```

---

## 📁 Project Structure

```
GeoFeatureSDK-API/
├── src/main/java/com/geofeature/
│   ├── controller/              # REST API endpoints
│   │   └── FeatureController.java
│   ├── service/                 # Business logic
│   │   ├── FeatureService.java
│   │   └── FeatureServiceImpl.java
│   ├── model/                   # Data models
│   │   ├── Feature.java
│   │   └── GeoRule.java
│   ├── repository/              # MongoDB operations
│   │   └── FeatureRepository.java
│   └── boundaries/              # API DTOs
│       ├── FeatureBoundary.java
│       └── FeatureQueryRequest.java
│
├── admin-portal/                # Admin Portal (React)
│   ├── src/
│   │   ├── components/          # Dashboard, FeatureList, FeatureForm
│   │   ├── services/            # API integration
│   │   └── App.jsx
│   ├── .env                     # API URL configuration
│   ├── vite.config.js
│   └── README.md                # Portal documentation
│
├── .github/workflows/
│   └── deploy-portal.yml        # GitHub Actions for portal deployment
│
├── build.gradle                 # Gradle build config
├── Dockerfile                   # Docker configuration
└── README.md                    # This file
```

---

## 🚀 Quick Start

### Prerequisites

- **Java 21** ([Download](https://openjdk.org/))
- **MongoDB Atlas account** ([Sign up](https://www.mongodb.com/cloud/atlas/register))
- **Node.js 16+** (for admin portal)

---

### 1️⃣ Backend API Setup

#### Configure MongoDB

Edit `src/main/resources/application.properties`:

```properties
# MongoDB connection
spring.mongodb.uri=mongodb+srv://username:password@cluster.mongodb.net/geofeature_db

# Server port
server.port=8080
```

#### Run Locally

```bash
# Using Gradle
./gradlew bootRun

# Using Docker
docker-compose up
```

#### Test API

```bash
curl http://localhost:8080/api/v1/features
# Should return: []
```

**Swagger UI:** http://localhost:8080/swagger-ui.html

---

### 2️⃣ Admin Portal Setup

```bash
cd admin-portal
npm install
npm run dev
```

Portal opens at: **http://localhost:5173**

See [admin-portal/README.md](./admin-portal/README.md) for detailed documentation.

---

### 3️⃣ Android SDK Integration

```kotlin
// Initialize SDK in your Application class or Activity
GeoFeatureSDK.initialize("https://thundering-elfie-geofeature-a5030253.koyeb.app/", context)

// Check if feature is enabled
GeoFeatureSDK.isFeatureEnabled(context, "dark_mode", callback)
// callback receives: (enabled: Boolean, value: String?)
// Example: if enabled is true, activate the feature

// Get current country
GeoFeatureSDK.getCurrentCountry(context, callback)
// callback receives: (countryCode: String)
// Example: countryCode = "IL", "US", "GB", etc.

// Check if user is in specific country
GeoFeatureSDK.isInCountry(context, "IL", callback)
// callback receives: (isInCountry: Boolean)
// Example: if true, user is in Israel
```

---

## 🔌 API Endpoints

**Base URL:** `https://thundering-elfie-geofeature-a5030253.koyeb.app/api/v1`

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `GET` | `/features` | Get all features | - |
| `POST` | `/features` | Create feature | `FeaturePostBoundary` |
| `GET` | `/features/{id}` | Get by ID | - |
| `GET` | `/features/by-name/{name}` | Get by name | - |
| `POST` | `/features/query` | Query by country | `FeatureQueryRequest` |
| `PUT` | `/features/{id}` | Update feature | `FeaturePostBoundary` |
| `DELETE` | `/features/{id}` | Delete feature | - |

---

### Example: Create Feature

```bash
curl -X POST https://thundering-elfie-geofeature-a5030253.koyeb.app/api/v1/features \
  -H "Content-Type: application/json" \
  -d '{
    "featureName": "black_friday_discount",
    "defaultStatus": true,
    "geoRules": [
      {
        "countryCode": "US",
        "status": "enabled",
        "value": "50"
      },
      {
        "countryCode": "CA",
        "status": "enabled",
        "value": "30"
      },
      {
        "countryCode": "IL",
        "status": "disabled",
        "value": null
      }
    ]
  }'
```

---

### Example: Query Feature

```bash
curl -X POST https://thundering-elfie-geofeature-a5030253.koyeb.app/api/v1/features/query \
  -H "Content-Type: application/json" \
  -d '{
    "featureName": "black_friday_discount",
    "countryCode": "US"
  }'
```

**Response:**
```json
{
  "enabled": true,
  "value": "50"
}
```

---

## 🎯 Feature Examples

### Example 1: Black Friday Discount

**Scenario:** Different discounts per country

```json
{
  "featureName": "black_friday_discount",
  "defaultStatus": true,
  "geoRules": [
    { "countryCode": "US", "status": "enabled", "value": "50" },
    { "countryCode": "CA", "status": "enabled", "value": "30" },
    { "countryCode": "IL", "status": "disabled" }
  ]
}
```

**Result:**
- 🇺🇸 USA: 50% discount
- 🇨🇦 Canada: 30% discount
- 🇮🇱 Israel: No discount
- 🌍 Others: Default (enabled, no specific value)

---

### Example 2: Payment Methods

**Scenario:** Enable different payment options per region

```json
{
  "featureName": "payment_methods",
  "defaultStatus": false,
  "geoRules": [
    { "countryCode": "IL", "status": "enabled", "value": "paypal,credit_card" },
    { "countryCode": "US", "status": "enabled", "value": "paypal,apple_pay,credit_card" },
    { "countryCode": "DE", "status": "enabled", "value": "paypal,sepa" }
  ]
}
```

**Result:**
- 🇮🇱 Israel: PayPal + Credit Card
- 🇺🇸 USA: PayPal + Apple Pay + Credit Card
- 🇩🇪 Germany: PayPal + SEPA
- 🌍 Others: No payment methods (disabled)

---

### Example 3: Dark Mode

**Scenario:** Enable globally except specific countries

```json
{
  "featureName": "dark_mode",
  "defaultStatus": true,
  "geoRules": [
    { "countryCode": "CN", "status": "disabled" },
    { "countryCode": "JP", "status": "disabled" }
  ]
}
```

**Result:**
- 🌍 Most countries: Dark mode enabled
- 🇨🇳 China: Disabled
- 🇯🇵 Japan: Disabled

---

## 🛠️ Technology Stack

### Backend API
| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 21 | Programming language |
| Spring Boot | 3.2 | Application framework |
| MongoDB | Atlas | Database (cloud-hosted) |
| Docker | Latest | Containerization |
| Gradle | 8.14 | Build tool |

### Admin Portal
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3 | UI framework |
| Vite | 6.0 | Build tool |
| Tailwind CSS | 3.4 | Styling |
| Axios | 1.7 | HTTP client |

### Deployment
- **Backend API:** Koyeb (Platform as a Service)
- **Admin Portal:** GitHub Pages
- **Database:** MongoDB Atlas (free tier)

---

## 🚀 Deployment

### Backend (Koyeb) - Already Deployed ✅

**Live URL:** https://thundering-elfie-geofeature-a5030253.koyeb.app

**Features:**
- ✅ Auto-deploy on push to `master` branch
- ✅ Scale-to-zero (free tier)
- ✅ HTTPS enabled
- ✅ Custom domain support

**Environment Variables in Koyeb:**
```
MONGODB_URI=mongodb+srv://...
PORT=8080
```

---

### Admin Portal (GitHub Pages) - Already Deployed ✅

**Live URL:** https://noacohen6.github.io/GeoFeatureSDK-API/

**Deployment Process:**
1. Push changes to `master` branch
2. GitHub Actions runs automatically (`.github/workflows/deploy-portal.yml`)
3. Portal built and deployed in 2-3 minutes

**Manual Deploy:**
- Go to Actions tab → "Deploy Admin Portal to GitHub Pages" → Run workflow

---

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
3. **If rule exists** → return rule status and value
4. **If no rule** → return default status

---

## 🐛 Troubleshooting

### Backend Issues

| Problem | Solution |
|---------|----------|
| MongoDB connection failed | Check `MONGODB_URI` in `application.properties`<br>Verify MongoDB Atlas IP whitelist (use `0.0.0.0/0` for testing) |
| Port 8080 in use | Kill existing process: `lsof -i :8080` → `kill -9 <PID>` |
| API not responding | Check if Spring Boot started successfully<br>Verify MongoDB is reachable |

---

### Admin Portal Issues

| Problem | Solution |
|---------|----------|
| Network Error | API is sleeping (Scale-to-Zero)<br>→ Open API URL in browser, wait 15 seconds<br>→ Refresh portal (Ctrl+Shift+R) |
| Blank page | Check browser console (F12)<br>Verify `.env` has correct `VITE_API_URL`<br>Run `npm install` again |
| Changes not showing | Hard refresh (Ctrl+Shift+R)<br>Clear browser cache<br>Wait for GitHub Actions to complete |

---

### Koyeb API Sleeping

When using Free Tier, API sleeps after 5-10 minutes of inactivity.

**To wake it up:**
1. Open: `https://thundering-elfie-geofeature-a5030253.koyeb.app/api/v1/features`
2. Wait 10-15 seconds (cold start)
3. Refresh your app/portal


---

## 📚 Documentation

- **Admin Portal:** [admin-portal/README.md](./admin-portal/README.md)

---

## 🔐 Security Notes

**Current Implementation:**
- ✅ CORS enabled for all origins (for development)
- ✅ MongoDB Atlas with authentication
- ✅ HTTPS enabled on Koyeb
- ✅ No sensitive data in `.env` (public API URL only)

**For Production:**
- Add authentication/authorization
- Restrict CORS to specific domains
- Implement rate limiting
- Add API key validation

---

## 🎓 Best Practices

### Feature Naming
- ✅ Use lowercase with underscores: `dark_mode`, `payment_methods`
- ❌ Avoid spaces, special chars, or non-English: `Dark Mode`, `תכונה חדשה`

### Default Status
- Use `true` for features available globally
- Use `false` for region-specific or beta features

### Country Codes
- Use official 2-letter ISO codes: IL, US, GB, FR, DE
- Always uppercase in API/database

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 Noa Cohen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

See the [LICENSE](LICENSE) file for full details.

---

## 📖 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [MongoDB Atlas Guide](https://www.mongodb.com/docs/atlas/)
- [Koyeb Documentation](https://www.koyeb.com/docs)
- [React Documentation](https://react.dev)

---

## 🎉 You're All Set!

Your GeoFeature SDK is now ready to use!

- 📊 **Manage features:** https://noacohen6.github.io/GeoFeatureSDK-API/
- 🔌 **API endpoint:** https://thundering-elfie-geofeature-a5030253.koyeb.app
- 📖 **Portal docs:** [admin-portal/README.md](./admin-portal/README.md)

---

## 🔗 Related Repositories

- **[GeoFeatureSDK](https://github.com/noaCohen6/GeoFeatureSDK)** - Android SDK + Demo App

---
---

**Built with Spring Boot, React, and MongoDB**