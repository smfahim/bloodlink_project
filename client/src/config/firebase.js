import { initializeApp }        from "firebase/app";
import { getAuth }              from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8R4WjV2ZL3NVmNVUNSP-E_81ee1wwRvc",
  authDomain: "bloodlink-36318.firebaseapp.com",
  projectId: "bloodlink-36318",
  storageBucket: "bloodlink-36318.firebasestorage.app",
  messagingSenderId: "1058239584398",
  appId: "1:1058239584398:web:58e8f9828aa57a318a11df"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };