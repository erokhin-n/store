import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {

    apiKey: "AIzaSyBYLLg1BO0hccqu1fLOGqqUjUHwjR2sCZE",
  
    authDomain: "storepictures-db9c6.firebaseapp.com",
  
    projectId: "storepictures-db9c6",
  
    storageBucket: "storepictures-db9c6.appspot.com",
  
    messagingSenderId: "152604144843",
  
    appId: "1:152604144843:web:9a44fdd9327fbb9502174e",
  
    measurementId: "G-XG4T2EPTQY"
  
  };
  

// Инициализируйте Firebase с использованием конфигурации
const app = initializeApp(firebaseConfig);

// Получите ссылку на Firebase Storage
const storage = getStorage(app);

export default storage;
