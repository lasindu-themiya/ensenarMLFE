# Quick Start Guide - Ensenar Frontend

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies (Already Done!)
```powershell
cd E:\NIBM\HDSE\ML\ensenarMLFE
npm install
```

### Step 2: Start the Backend API
In a separate PowerShell window:
```powershell
cd E:\NIBM\HDSE\ML\ensenarBE
node server.js
```

Make sure you see:
```
🚀 Ensenar Backend is running on port 5000
```

### Step 3: Start the Frontend
```powershell
cd E:\NIBM\HDSE\ML\ensenarMLFE
npm run dev
```

The app will open at: **http://localhost:3000**

---

## 📝 How to Use

1. **Select Stream**: Choose Science, Commerce, Technology, or Arts
2. **Select Subject**: The dropdown will show subjects for your stream
3. **Fill the Form**: 
   - Personal info (Gender, Medium)
   - Social media usage (Platform, Hours, Notifications)
   - Study habits (Sleep, Study hours, Timing)
   - Past performance (Past papers, Average marks)
4. **Click "Predict Performance"**
5. **View Results**: See predicted grade, confidence, and probabilities

---

## ✅ Features

### Smart Validations
- ✓ Marks must be 0-100
- ✓ Hours must be 0-24
- ✓ All required fields must be filled
- ✓ Real-time error messages

### Automatic Range Mapping
The app converts your inputs to the format the API expects:

**Examples:**
- Social Media: `3 hours` → `"2-3 hours"`
- Sleep: `7 hours` → `"6-8 hours"`
- Study: `4 hours` → `"3-4 hours"`
- Distraction: `8` → `"Very High"`
- Past Papers: `5` → `"4-5"`

### Stream-Subject Mapping

**Science Stream:**
- Physics, Chemistry, Biology, Combined Maths

**Commerce Stream:**
- Accounting, Economics, Business Statistics, Business Studies

**Technology Stream:**
- ICT, Physics, Chemistry, Combined Maths

**Arts Stream:**
- Economics, Geography, History

---

## 🎨 UI Features

- **Dark Theme**: Modern, easy on the eyes
- **Responsive**: Works on desktop, tablet, and mobile
- **Loading States**: Spinner while predicting
- **Success/Error Alerts**: Clear feedback
- **API Status Indicator**: Shows if backend is connected (green dot)

---

## 🔧 Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## 🐛 Troubleshooting

### "API Disconnected" warning
**Solution**: Make sure the backend is running on port 5000
```powershell
cd E:\NIBM\HDSE\ML\ensenarBE
node server.js
```

### Port 3000 already in use
**Solution**: The Vite config will try port 3001, or you can change it in `vite.config.js`

### Missing model error
**Solution**: Ensure `.pkl` model files exist in `E:\NIBM\HDSE\ML\ensenarBE\models\`

---

## 📊 Example Test Data

Try these values to test the form:

- **Stream**: Science
- **Subject**: Physics
- **Gender**: Male
- **Medium**: English
- **Social Media Platform**: YouTube
- **Daily Usage**: 3 hours
- **Notification Status**: Off
- **Distraction Level**: 5
- **Sleep Hours**: 7
- **Timing Behavior**: Studied at night
- **Study Hours**: 4
- **Consistency**: High
- **Recent Past Paper**: Yes
- **Past Papers Count**: 10
- **Average of Five Papers**: 75

---

## 📁 Project Structure

```
ensenarMLFE/
├── src/
│   ├── components/       # React components
│   ├── services/         # API calls
│   ├── utils/            # Helper functions
│   ├── App.jsx           # Main app
│   └── index.css         # Tailwind styles
├── package.json
├── vite.config.js
└── README.md
```

---

## 🎯 Subject API Mapping

When you select a subject, it gets converted for the API:

| Display Name | API Name |
|--------------|----------|
| Accounting | `accounting` |
| Physics | `physics` |
| Chemistry | `Chemistry` |
| Biology | `Biology` |
| ICT | `Ict` |
| Economics | `Economics` |
| Business Statistics | `Bstatistics` |
| Business Studies | `Bstudies` |
| Combined Maths | `Combined_maths` |

---

## 💡 Tips

1. **Stream First**: Always select stream before subject
2. **Check API Status**: Green dot = connected, Red = disconnected
3. **Valid Numbers**: Use decimals for marks (e.g., 75.5)
4. **Quick Reset**: Click "Reset" to clear the form
5. **New Prediction**: After viewing results, click "Make Another Prediction"

---

## 🌐 URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health
- **Available Subjects**: http://localhost:5000/api/predict/subjects

---

Enjoy predicting student performance! 🎓✨
