const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export function toFormalDateTime(timestamp) {
  let date = new Date(timestamp);
  let hours_raw = date.getHours();
  let notation = hours_raw >= 12? 'PM' : 'AM';

  return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() +
    ' ' + ((hours_raw + 11) % 12 + 1) + ':' + date.getMinutes() + ' ' + notation;
}