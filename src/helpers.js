import firebase from 'firebase/app';

export const getDateToday = () => new Date().toLocaleDateString('en-CA');
export const getServerDateTime = () => firebase.firestore.FieldValue.serverTimestamp();
