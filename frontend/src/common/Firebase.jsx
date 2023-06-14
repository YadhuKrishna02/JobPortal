import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCS3elAunDx4yVP4_rAq24SNX8loBViWiM',
  authDomain: 'job-portal-86bc7.firebaseapp.com',
  projectId: 'job-portal-86bc7',
  storageBucket: 'job-portal-86bc7.appspot.com',
  messagingSenderId: '715613521111',
  appId: '1:715613521111:web:ebfbefdf6d1bbb3cd55c92',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
};
