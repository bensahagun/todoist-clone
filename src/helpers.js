import firebase from 'firebase/app';

export const getDateToday = () => new Date().toLocaleDateString('en-CA');
export const getServerDateTime = () => firebase.firestore.FieldValue.serverTimestamp();

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const monthNames = [
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
    'December',
  ];

  return `${monthNames[date.getMonth()]} ${date.getDate()}`;
};
