import moment from 'moment-timezone';

export const formatMessageTime = timestamp => {
  const createdAt = moment.utc(timestamp).local(); // Convert UTC to local time
  console.log(timestamp);
  
  const now = moment();
  if (timestamp) {
    if (createdAt.isSame(now, 'day')) {
      return createdAt.format('hh:mm A'); // Show only time if today
    } else if (createdAt.isSame(now.subtract(1, 'day'), 'day')) {
      return 'Yesterday'; // Show "Yesterday" if it was yesterday
    } else {
      return createdAt.format('MM/DD/YYYY'); // Show date otherwise
    }
  } else {
    return 'Unknown Time';
  }
};
