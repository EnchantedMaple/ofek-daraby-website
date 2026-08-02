import { app, db } from "./firebase.jsx"
import { collection, addDoc, getDocs } from "firebase/firestore"; 

async function addScore(username, score) {
    try {
      const docRef = await addDoc(collection(db, "Scores"), {
        username: username,
        score: score,
      });
      console.log("Entry written successfully, entry ID: ", docRef.id);
      return 0;
    } catch (e) {
      console.error("Error adding document: ", e);
      return 1;
    }
}

/*
export async function getScores() {
    const querySnapshot = await getDocs(collection(db, "Scores"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
}*/

export default addScore;