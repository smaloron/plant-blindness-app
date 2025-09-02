import { db } from "./firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Save poll answers to Firestore
export async function savePoll(answers) {

    const pollAnswers = answers.map((item, index)=> {
        return { questionNumber: (index +1), "answer": item };
    })

    await addDoc(collection(db, "pollAnswers"), {
        pollAnswers,
        createdAt: serverTimestamp()
    });
}
