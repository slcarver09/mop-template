// utils/timeUtils.js
export const convertToUTC = (date, hour, minute, timezone) => {
  if (!date || !hour || !minute || !timezone) {
    return null;
  }

  try {
    const offsetMap = {
      'America/New_York': { std: -5, dst: -4 },
      'America/Chicago': { std: -6, dst: -5 },
      'America/Denver': { std: -7, dst: -6 },
      'America/Phoenix': { std: -7, dst: -7 }, // No DST
      'America/Los_Angeles': { std: -8, dst: -7 },
      'America/Anchorage': { std: -9, dst: -8 },
      'Pacific/Honolulu': { std: -10, dst: -10 }, // No DST
    };
    
    // More accurate DST calculation
    // DST in US: Second Sunday in March (2 AM) to First Sunday in November (2 AM)
    const year = parseInt(date.split('-')[0]);
    const month = parseInt(date.split('-')[1]);
    const day = parseInt(date.split('-')[2]);
    
    // Helper function to find the nth occurrence of a day of week in a month
    const getNthSundayOfMonth = (year, month, n) => {
      let count = 0;
      for (let d = 1; d <= 31; d++) {
        const testDate = new Date(year, month - 1, d);
        if (testDate.getMonth() !== month - 1) break; // Moved to next month
        if (testDate.getDay() === 0) { // Sunday
          count++;
          if (count === n) return d;
        }
      }
      return null;
    };
    
    // Get the second Sunday of March
    const marchSecondSunday = getNthSundayOfMonth(year, 3, 2);
    // Get the first Sunday of November
    const novemberFirstSunday = getNthSundayOfMonth(year, 11, 1);
    
    let isDST = false;
    
    if (month > 3 && month < 11) {
      // April through October - definitely DST
      isDST = true;
    } else if (month === 3) {
      // March - DST starts on second Sunday at 2 AM
      isDST = day > marchSecondSunday || (day === marchSecondSunday && parseInt(hour) >= 2);
    } else if (month === 11) {
      // November - DST ends on first Sunday at 2 AM
      isDST = day < novemberFirstSunday || (day === novemberFirstSunday && parseInt(hour) < 2);
    }
    // For months 1, 2, 12 (Jan, Feb, Dec), isDST stays false (standard time)
    
    const tzInfo = offsetMap[timezone];
    if (!tzInfo) {
      console.error('Unknown timezone:', timezone);
      return null;
    }
    
    const offset = isDST ? tzInfo.dst : tzInfo.std;
    
    // Convert local time to UTC
    // If timezone is UTC-5, then local 14:00 = UTC 19:00
    // Formula: UTC = Local - offset
    // Example: Local 14:00, offset -5 → UTC = 14:00 - (-5) = 19:00
    const totalMinutes = parseInt(hour) * 60 + parseInt(minute);
    const utcTotalMinutes = totalMinutes - (offset * 60);
    
    let utcHour = Math.floor(utcTotalMinutes / 60);
    let utcMinute = utcTotalMinutes % 60;
    
    // Handle day overflow/underflow
    while (utcHour < 0) utcHour += 24;
    while (utcHour >= 24) utcHour -= 24;
    if (utcMinute < 0) {
      utcMinute += 60;
      utcHour -= 1;
      if (utcHour < 0) utcHour += 24;
    }
    
    return `${String(utcHour).padStart(2, '0')}:${String(utcMinute).padStart(2, '0')}`;
  } catch (error) {
    console.error('Error converting to UTC:', error);
    return null;
  }
};

export const formatTimeWithUTC = (date, hour, minute, timezone) => {
  if (!date || !hour || !minute) {
    return '';
  }

  const localTime = `${hour}:${minute}`;
  const utcTime = convertToUTC(date, hour, minute, timezone);
  
  if (utcTime) {
    return `${localTime} (${utcTime} UTC)`;
  }
  
  return localTime;
};