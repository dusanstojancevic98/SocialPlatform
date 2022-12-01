import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBiNERqSioUc2kT8DgyS3PowiRp-A_TFNA",
  authDomain: "fir-upload-image-2e659.firebaseapp.com",
  projectId: "fir-upload-image-2e659",
  storageBucket: "fir-upload-image-2e659.appspot.com",
  messagingSenderId: "322403435680",
  appId: "1:322403435680:web:7512131f56fa1445b235c5",
  measurementId: "G-9X6HSMCBD4",
};

const app = initializeApp(firebaseConfig);

const upload = async (file: any, info: any) => {
  const storage = getStorage(app);
  const storageRef = ref(storage, "images/" + info.filename);

  try {
      const uploadTask = await uploadBytes(storageRef, file, {
        contentType: info.mimeType,
        contentEncoding: info.encoding
      });
      const url = await getDownloadURL(storageRef);
      return url;
  } catch (error) {
      console.log(error)
  }

};

export { upload };
