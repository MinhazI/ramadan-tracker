import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
import FIREBASE from '@/constants/firebase';

const firebaseConfig = {
    apiKey: FIREBASE.API_KEY,
    authDomain: FIREBASE.AUTH_DOMAIN,
    projectId: FIREBASE.PROJECT_ID,
    storageBucket: FIREBASE.STORAGE_BUCKET,
    messagingSenderId: FIREBASE.SENDER_ID,
    appId: FIREBASE.APP_ID,
    measurementId: FIREBASE.MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const fbAnalytics = getAnalytics(app);
export const fbDb = getFirestore(app);