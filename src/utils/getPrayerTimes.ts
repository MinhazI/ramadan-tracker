import { doc, getDoc } from "firebase/firestore";
import { fbDb } from "./firebase";
import iPrayerTime from "@/interfaces/iPrayerTime";

const getPrayerTimes = async (month: string, day: number): Promise<iPrayerTime | null> => {
    const docId = `${month}_${day}`;
    const docRef = doc(fbDb, "prayerTimes", docId);

    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as iPrayerTime;
        } else {
            console.log("No prayer times found for this day");
            return null;
        }
    } catch (error) {
        console.error("Error fetching prayer times: ", error)
        return null
    }
}
export default getPrayerTimes;