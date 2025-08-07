import { db } from "./firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Save poll answers to Firestore
export async function savePoll(answers) {
    await addDoc(collection(db, "pollAnswers"), {
        answers,
        createdAt: serverTimestamp()
    });
}
