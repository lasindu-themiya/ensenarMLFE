# Ensenar Frontend

A modern, dark-themed React application for predicting student academic performance across multiple subjects using machine learning.

## Features

- **Stream-Based Subject Selection**: Automatically filters subjects based on selected academic stream
- **Smart Validations**: Client-side validation for marks (0-100), hours (0-24), and other inputs
- **Range Mapping**: Converts user-friendly inputs (e.g., 3 hours) to backend-expected ranges
- **Dark Theme**: Clean, modern UI with Tailwind CSS dark color palette
- **Real-time API Status**: Shows connection status to the backend API
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client for API calls

## Subject Mapping

The application handles subject name normalization for API calls:

- **Science Stream**: Physics, Chemistry, Biology, Combined Maths
- **Commerce Stream**: Accounting, Economics, Business Statistics, Business Studies
- **Technology Stream**: ICT, Physics, Chemistry, Combined Maths
- **Arts Stream**: Economics, Geography, History

### API Subject Names

User-friendly names are converted to API format:
- `Accounting` → `accounting`
- `Physics` → `physics`
- `Chemistry` → `Chemistry`
- `Biology` → `Biology`
- `ICT` → `Ict`
- `Economics` → `Economics`
- `Agriculture` → `Agriculture`
- `Business Statistics` → `Bstatistics`
- `Business Studies` → `Bstudies`
- `Combined Maths` → `Combined_maths`

## Setup & Installation

### Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:5000`

### Install Dependencies

```powershell
cd E:\NIBM\HDSE\ML\ensenarMLFE
npm install
```

### Run Development Server

```powershell
npm run dev
```

The application will start on `http://localhost:3000`

### Build for Production

```powershell
npm run build
```

The optimized build will be in the `dist/` folder.

## Environment Variables

Create a `.env` file in the project root (optional):

```env
VITE_API_URL=http://localhost:5000
```

If not set, defaults to `http://localhost:5000`.

## Validations

The form includes comprehensive validations:

- **Marks**: 0-100 range
- **Hours** (sleep, study, social media): 0-24 range
- **Distraction Level**: 1-10 scale
- **Past Papers Count**: 0-100 range
- **Required Fields**: All fields must be filled

## Range Mappers

User inputs are automatically converted to backend-expected ranges:

- **Social Media Hours**: `3` → `"2-3 hours"`
- **Sleep Hours**: `7` → `"6-8 hours"`
- **Study Hours**: `4` → `"3-4 hours"`
- **Distraction Level**: `8` → `"Very High"`
- **Past Papers**: `5` → `"4-5"`

## Project Structure

```
ensenarMLFE/
├── src/
│   ├── components/
│   │   ├── Alert.jsx
│   │   ├── FormInput.jsx
│   │   ├── FormSelect.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── PredictionForm.jsx
│   │   └── PredictionResult.jsx
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   ├── subjectMapping.js
│   │   ├── rangeMappers.js
│   │   └── validation.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## API Endpoints Used

- `GET /api/health` - Health check
- `GET /api/predict/subjects` - Get available subjects
- `POST /api/predict/:subject` - Make prediction

## Usage

1. Select your **Stream** (Science, Commerce, Technology, Arts)
2. Select your **Subject** from the filtered list
3. Fill in personal information (Gender, Medium)
4. Enter social media usage details
5. Provide study habits information
6. Enter past performance data
7. Click **Predict Performance**
8. View results with predicted grade, confidence, and probabilities

## Color Palette (Dark Theme)

- **Background**: Gray 900 (#111827)
- **Cards**: Gray 800 (#1F2937)
- **Borders**: Gray 700 (#374151)
- **Primary**: Blue 600 (#0284C7)
- **Text**: Gray 100 (#F3F4F6)
- **Success**: Green 500
- **Error**: Red 500
- **Warning**: Yellow 500

## Troubleshooting

### API Connection Issues

- Ensure backend server is running: `node server.js` in `ensenarBE` folder
- Check if backend is on port 5000
- Verify CORS is enabled on backend

### Module Not Found Errors

```powershell
rm -rf node_modules
npm install
```

### Build Errors

```powershell
npm run build
```

Check console for specific errors and ensure all dependencies are installed.

## License

MIT
