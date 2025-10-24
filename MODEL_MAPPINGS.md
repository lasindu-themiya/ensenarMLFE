# Model Field Mappings & Label Encodings

This document describes the exact field values and transformations expected by the ML model.

## Label Encodings from Model

### Stream
```
Commerce: 0
```

### Subject
```
Accounting: 0
```

### Gender
```
Female: 0
Male: 1
```

### Medium
```
English: 0
Sinhala: 1
```

### Social Media Platform
```
Facebook: 0
Instagram: 1
TikTok: 2
WhatsApp: 3
YouTube: 4
```

### Daily Usage (Social Media Hours)
```
1-2 hours: 0
2-3 hours: 1
3-4 hours: 2
Less than 1 hour: 3
More than 4 hours: 4
```

**Frontend Mapping Logic** (`dailyUsageToRange`):
- `< 1 hour` → `"Less than 1 hour"`
- `1-2 hours` → `"1-2 hours"`
- `2-3 hours` → `"2-3 hours"`
- `3-4 hours` → `"3-4 hours"`
- `> 4 hours` → `"More than 4 hours"`

### Notification Status
```
Always kept on: 0
Always turned off: 1
Sometimes turned off: 2
Usually kept on: 3
```

**Frontend Options**:
- Always kept on
- Usually kept on
- Sometimes turned off
- Always turned off

### Sleep Hours
```
5-6 hours: 0
6-7 hours: 1
7-8 hours: 2
Less than 5 hours: 3
More than 8 hours: 4
```

**Frontend Mapping Logic** (`sleepHoursToCategory`):
- `< 5` → `"Less than 5 hours"`
- `5-6` → `"5-6 hours"`
- `6-7` → `"6-7 hours"`
- `7-8` → `"7-8 hours"`
- `> 8` → `"More than 8 hours"`

### Timing Behavior
```
Always completed within the allocated time limit: 0
Always took longer than the allocated time: 1
Often exceeded the time limit: 2
Sometimes exceeded the time limit: 3
Usually completed within the time limit: 4
```

**Frontend Options** (exact match):
- Always completed within the allocated time limit
- Usually completed within the time limit
- Sometimes exceeded the time limit
- Often exceeded the time limit
- Always took longer than the allocated time

### Study Hours
```
2-4 hours: 0
4-6 hours: 1
6-8 hours: 2
Less than 2 hours: 3
More than 8 hours: 4
```

**Frontend Mapping Logic** (`studyHoursToCategory`):
- `< 2` → `"Less than 2 hours"`
- `2-4` → `"2-4 hours"`
- `4-6` → `"4-6 hours"`
- `6-8` → `"6-8 hours"`
- `> 8` → `"More than 8 hours"`

### Recent Past Paper (Percentage Range)
```
40-55%: 0
55-70%: 1
70-85%: 2
Above 85%: 3
Below 40%: 4
```

**Frontend Mapping Logic** (`marksToRange`):
- `< 40` → `"Below 40%"`
- `40-55` → `"40-55%"`
- `55-70` → `"55-70%"`
- `70-85` → `"70-85%"`
- `≥ 85` → `"Above 85%"`

User enters percentage (0-100), frontend converts to range.

### Past Papers Count
```
0-10 papers: 0
11-20 papers: 1
21-30 papers: 2
31-40 papers: 3
More than 40 papers: 4
```

**Frontend Mapping Logic** (`pastPapersToCategory`):
- `0-10` → `"0-10 papers"`
- `11-20` → `"11-20 papers"`
- `21-30` → `"21-30 papers"`
- `31-40` → `"31-40 papers"`
- `> 40` → `"More than 40 papers"`

User enters count (0-100), frontend converts to range.

### Avg Five Papers (Percentage Range)
```
40-55%: 0
55-70%: 1
70-85%: 2
Above 85%: 3
Below 40%: 4
```

**Frontend Mapping Logic** (`marksToRange` - same as Recent Past Paper):
- `< 40` → `"Below 40%"`
- `40-55` → `"40-55%"`
- `55-70` → `"55-70%"`
- `70-85` → `"70-85%"`
- `≥ 85` → `"Above 85%"`

User enters percentage (0-100), frontend converts to range.

---

## Frontend Form Fields

### Fields Removed (Not in Model)
- ❌ **Distraction Level** (was 1-10 scale)
- ❌ **Consistency** (was High/Medium/Low/Very Low)

### Updated Field Types

| Field Name | Input Type | User Enters | Converted To |
|------------|------------|-------------|--------------|
| Stream | Select | "Commerce", "Science", etc. | Direct value |
| Subject | Select | "Accounting", "Physics", etc. | Direct value |
| Gender | Select | "Male", "Female" | Direct value |
| Medium | Select | "English", "Sinhala" | Direct value |
| Social Media Platform | Select | Platform name | Direct value |
| Daily Usage | Number (0-24) | Hours (e.g., 3) | Range string |
| Notification Status | Select | Status option | Direct value |
| Sleep Hours | Number (0-24) | Hours (e.g., 7) | Range string |
| Timing Behavior | Select | Behavior option | Direct value |
| Study Hours | Number (0-24) | Hours (e.g., 4) | Range string |
| Recent Past Paper | Number (0-100) | Percentage (e.g., 75) | Range string |
| Past Papers Count | Number (0-100) | Count (e.g., 15) | Range string |
| Avg Five Papers | Number (0-100) | Percentage (e.g., 72.5) | Range string |

---

## Example API Request

**User Input:**
```json
{
  "Stream": "Commerce",
  "Subject": "Accounting",
  "Gender": "Male",
  "Medium": "English",
  "Social Media Platform": "YouTube",
  "Daily Usage": 3,
  "Notification Status": "Usually kept on",
  "Sleep Hours": 7,
  "Timing Behavior": "Usually completed within the time limit",
  "Study Hours": 4,
  "Recent Past Paper": 75,
  "Past Papers Count": 15,
  "Avg Five Papers": 72.5
}
```

**Transformed for API:**
```json
{
  "Stream": "Commerce",
  "Subject": "Accounting",
  "Gender": "Male",
  "Medium": "English",
  "Social Media Platform": "YouTube",
  "Daily Usage": "2-3 hours",
  "Notification Status": "Usually kept on",
  "Sleep Hours": "6-7 hours",
  "Timing Behavior": "Usually completed within the time limit",
  "Study Hours": "4-6 hours",
  "Recent Past Paper": "70-85%",
  "Past Papers Count": "11-20 papers",
  "Avg Five Papers": "70-85%"
}
```

---

## Validation Rules

- **Marks/Percentages**: 0-100
- **Hours**: 0-24
- **Past Papers Count**: 0-100
- **All fields required**

---

## Files Updated

1. `src/utils/rangeMappers.js` - Conversion functions updated to match model labels
2. `src/components/PredictionForm.jsx` - Removed Distraction Level & Consistency, updated options
3. `src/utils/validation.js` - Updated required fields list
4. Form field types changed:
   - "Recent Past Paper" from Select to Number input
   - Notification Status options updated
   - Timing Behavior options updated
