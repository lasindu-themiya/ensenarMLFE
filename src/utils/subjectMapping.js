// Stream to Subject Mapping - Updated to match model
export const STREAM_SUBJECTS = {
  Mathematics: ['Combined Mathematics', 'Physics', 'Chemistry', 'Information and Communication Technology (ICT)'],
  Biology: ['Biology', 'Chemistry', 'Physics', 'Agricultural Science'],
  Commerce: ['Business Studies', 'Accounting', 'Economics', 'Information and Communication Technology (ICT)', 'Business Statistics']
};

// Subject name normalization for API calls
export const SUBJECT_API_MAP = {
  'Accounting': 'accounting',
  'Physics': 'physics',
  'Chemistry': 'chemistry',
  'Biology': 'biology',
  'Information and Communication Technology (ICT)': 'ict',
  'Economics': 'economics',
  'Agricultural Science': 'agriculture',
  'Business Statistics': 'bstatistics',
  'Business Studies': 'bstudies',
  'Combined Mathematics': 'combinedmaths'
};

// Reverse mapping for display
export const API_TO_DISPLAY_MAP = Object.fromEntries(
  Object.entries(SUBJECT_API_MAP).map(([k, v]) => [v, k])
);

// Get subjects for a stream
export const getSubjectsForStream = (stream) => {
  return STREAM_SUBJECTS[stream] || [];
};

// Convert subject display name to API name
export const toApiSubject = (displayName) => {
  return SUBJECT_API_MAP[displayName] || displayName.toLowerCase();
};

// Convert API subject to display name
export const toDisplaySubject = (apiName) => {
  return API_TO_DISPLAY_MAP[apiName] || apiName;
};
