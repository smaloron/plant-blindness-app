import {db} from "./firebaseConfig";
import {collection, doc, addDoc, updateDoc, serverTimestamp} from "firebase/firestore";

// Save poll answers to Firestore
export async function savePoll(data, docId) {

    const col = collection(db, "polls");

    try {
        if (!docId) {
            const ref = await addDoc(col, {
                data,
                createdAt: serverTimestamp()
            });
            return ref;
        } else {
            const ref = doc(db, "polls", docId);
            await updateDoc(ref, {answers: data});
            return ref;
        }
    } catch (err) {
        console.log(err);
    }

}
