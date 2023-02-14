import { initializeApp } from "firebase/app";
import {addDoc, collection, getDocs, getFirestore, orderBy, query} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage();
const postsRef = collection(db, "posts");

export const getPosts = async () => {
  const q = query(postsRef, orderBy("date", "desc"));
  const snapshot = await getDocs(q);

  const posts = snapshot.docs.map((e) => {
    let post = e.data();
    post.id = e.id;

    return post;
  });
  return posts
}

export const exportOnePost = async (post) => {
  addDoc(collection(db, "posts"), post);
}
