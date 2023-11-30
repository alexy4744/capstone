import { collection, getDocs, getFirestore } from "firebase/firestore";

const FOCUS_TOPICS_COLLECTION = "focus-topics";

export type FocusTopic = {
  name: string;
};

export const getAvailableFocusTopics = async () => {
  const firestore = getFirestore();

  const focusTopicsRef = collection(firestore, FOCUS_TOPICS_COLLECTION);

  const focusTopics = await getDocs(focusTopicsRef);

  return focusTopics.docs.map((doc) => doc.data() as FocusTopic);
};
