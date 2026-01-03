# 🌐 GeoFeature Admin Portal

Web-based administration interface for managing GeoFeature SDK features.

## 📋 Overview

The Admin Portal provides a user-friendly interface to:
- ✨ View dashboard with statistics
- 🎯 Create, edit, and delete features
- 🌍 Configure geographic rules per country
- 📊 Monitor feature usage and coverage

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed
- GeoFeature API running (locally or on Koyeb)

### Installation
```bash
# 1. Navigate to admin portal directory
cd admin-portal

# 2. Install dependencies
npm install

# 3. Configure API URL
cp .env.example .env
nano .env

# 4. Run development server
npm run dev
```

Portal opens at: **http://localhost:5173**

---

## ⚙️ Configuration

### Environment Variables

Edit `.env` file:
```env
# For local development
VITE_API_URL=http://localhost:8080/api/v1

# For production (Koyeb)
VITE_API_URL=https://thundering-elfie-geofeature-a5030253.koyeb.app/api/v1
```

**Important:** Never commit `.env` to Git! Use `.env.example` instead.

---

## 📁 Project Structure
```
admin-portal/
├── src/
│   ├── components/              # React components
│   │   ├── Dashboard.jsx        # Statistics dashboard
│   │   ├── FeatureList.jsx      # Features table
│   │   └── FeatureForm.jsx      # Create/Edit form
│   │
│   ├── services/
│   │   └── api.js               # API service layer
│   │
│   ├── App.jsx                  # Main application
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
│
├── public/
├── index.html
├── package.json
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind CSS config
├── postcss.config.js            # PostCSS config
├── .env                         # Environment variables (not in Git)
├── .env.example                 # Example env file
├── .gitignore
└── README.md                    # This file
```

---

## 🎨 Features

### 📊 Dashboard

View real-time statistics:
- Total number of features
- Features enabled/disabled by default
- Number of configured countries
- List of all countries with rules

### 🎯 Feature Management

**Create Feature:**
1. Click "Add Feature"
2. Enter feature name (e.g., `dark_mode`)
3. Set default status (enabled/disabled)
4. Add geographic rules (optional)
5. Click "Create Feature"

**Edit Feature:**
1. Click edit icon (✏️) on feature
2. Modify settings
3. Add/remove geographic rules
4. Click "Update Feature"

**Delete Feature:**
1. Click delete icon (🗑️)
2. Confirm deletion

### 🌍 Geographic Rules

Configure country-specific behavior:

**Fields:**
- **Country Code:** 2-letter ISO code (IL, US, GB, etc.)
- **Status:** Enabled or Disabled
- **Value:** Optional custom value

**Example:**
```
Feature: payment_methods
Default: Disabled

Geographic Rules:
- IL: Enabled, value="paypal,credit_card"
- US: Enabled, value="paypal,apple_pay,credit_card"
```

---

## 🛠️ Development

### Available Scripts
```bash
# Start development server
npm run dev


```

### Development Workflow

1. Make changes to React components
2. Save file (Ctrl+S)
3. Browser auto-refreshes with changes (Hot Module Replacement)

### Adding New Features

#### 1. Create Component
```jsx
// src/components/MyComponent.jsx
import { useState } from 'react';

const MyComponent = () => {
  return (
    <div className="p-4">
      <h1>My Component</h1>
    </div>
  );
};

export default MyComponent;
```

#### 2. Import in App.jsx
```jsx
import MyComponent from './components/MyComponent';

// Use in render
<MyComponent />
```

#### 3. Add API Function
```javascript
// src/services/api.js
export const myApiFunction = async () => {
  const response = await api.get('/my-endpoint');
  return response.data;
};
```

---

## 🎨 Styling with Tailwind CSS

This project uses Tailwind CSS for styling.

### Example Usage
```jsx
<div className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-700">
  Styled Button
</div>
```

### Common Classes

| Class | Description |
|-------|-------------|
| `bg-blue-500` | Blue background |
| `text-white` | White text |
| `p-4` | Padding 1rem |
| `rounded-lg` | Rounded corners |
| `hover:bg-blue-700` | Darker blue on hover |

See [Tailwind CSS Docs](https://tailwindcss.com/docs) for full reference.

---

## 🌐 Production Deployment

### GitHub Pages
```bash
# 1. Install gh-pages
npm install -D gh-pages

# 2. Add to package.json:
"homepage": "https://yourusername.github.io/geofeature-admin",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# 3. Deploy
npm run deploy
```

---

## 🔧 Technology Stack

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Lucide React** - Icon library

---

## 📡 API Integration

The portal communicates with the backend API using Axios.

### API Service (`src/services/api.js`)
```javascript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllFeatures = async () => {
  const response = await api.get('/features');
  return response.data;
};
```

### Making API Calls
```javascript
import { getAllFeatures } from '../services/api';

const loadFeatures = async () => {
  try {
    const data = await getAllFeatures();
    setFeatures(data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

## 📖 Usage Guide

### Creating Your First Feature

1. **Open Portal:** http://localhost:5173
2. **Go to Features tab**
3. **Click "Add Feature"**
4. **Fill in:**
   - Feature Name: `dark_mode`
   - Default Status: ✅ Enabled
5. **Add Geographic Rule (optional):**
   - Country: `US`
   - Status: Disabled
6. **Click "Create Feature"**

### Result

- All users: Dark mode enabled
- USA users: Dark mode disabled

---

## 🎯 Best Practices

### Feature Naming

✅ **Good:**
- `dark_mode`
- `payment_methods`
- `premium_features`

❌ **Bad:**
- `Dark Mode` (spaces)
- `feature-123` (not descriptive)
- `תכונה_חדשה` (non-English)

### Default Status

- Set `enabled` if most users should have the feature
- Set `disabled` if it's region-specific or beta

### Geographic Rules

- Use 2-letter ISO country codes (IL, US, GB)
- Keep `value` simple and parseable
- Document what `value` represents

---

## 📝 Example Workflows

### Workflow 1: Regional Payment Methods
```
1. Create feature: "payment_methods"
2. Default: Disabled
3. Add rules:
   - IL: Enabled, "paypal,credit_card"
   - US: Enabled, "paypal,apple_pay,credit_card"
   - DE: Enabled, "paypal,sepa"
4. Save
```

### Workflow 2: Beta Testing
```
1. Create feature: "new_ui_beta"
2. Default: Disabled
3. Add rule:
   - IL: Enabled, "beta_v2"
4. Save
5. Test with Israeli users
6. Gradually add more countries
```

---


## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Axios Documentation](https://axios-http.com/docs/intro)

---

## 📞 Support

- Check browser console for errors (F12)
- Verify API is running and accessible
- Review `.env` configuration
- Check network tab in DevTools

---

## 🎉 Tips & Tricks

### Hot Reload
Any change to `.jsx`, `.js`, or `.css` files triggers instant browser refresh!

### DevTools
- Press **F12** to open browser DevTools
- **Console tab:** See JavaScript errors
- **Network tab:** Monitor API calls
- **Elements tab:** Inspect DOM

---

**Built with React, Vite, and Tailwind CSS**

For main project documentation, see [../README.md](../README.md)