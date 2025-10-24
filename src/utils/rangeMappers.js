// Convert user input daily usage hours to range categories (matches Daily Usage labels)
export const dailyUsageToRange = (hours) => {
  if (hours < 1) return 'Less than 1 hour';
  if (hours <= 2) return '1-2 hours';
  if (hours <= 3) return '2-3 hours';
  if (hours <= 4) return '3-4 hours';
  return 'More than 4 hours';
};

// Convert sleep hours to category (matches Sleep Hours labels)
export const sleepHoursToCategory = (hours) => {
  if (hours < 5) return 'Less than 5 hours';
  if (hours <= 6) return '5-6 hours';
  if (hours <= 7) return '6-7 hours';
  if (hours <= 8) return '7-8 hours';
  return 'More than 8 hours';
};

// Convert study hours to category (matches Study Hours labels)
export const studyHoursToCategory = (hours) => {
  if (hours < 2) return 'Less than 2 hours';
  if (hours <= 4) return '2-4 hours';
  if (hours <= 6) return '4-6 hours';
  if (hours <= 8) return '6-8 hours';
  return 'More than 8 hours';
};

// Convert marks percentage to range (matches Recent Past Paper and Avg Five Papers labels)
export const marksToRange = (marks) => {
  if (marks < 40) return 'Below 40%';
  if (marks < 55) return '40-55%';
  if (marks < 70) return '55-70%';
  if (marks < 85) return '70-85%';
  return 'Above 85%';
};

// Convert past papers count to category (matches Past Papers Count labels)
export const pastPapersToCategory = (count) => {
  if (count <= 10) return '0-10 papers';
  if (count <= 20) return '11-20 papers';
  if (count <= 30) return '21-30 papers';
  if (count <= 40) return '31-40 papers';
  return 'More than 40 papers';
};
