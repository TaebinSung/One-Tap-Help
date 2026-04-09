import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firestore";
import type { Caregiver, FireRequest, Urgency } from "../types/request";
import { sendNotification } from "../utils/notifications";

export type { FireRequest };

const CAREGIVERS_COL = "Caregivers";
const requestsCol = collection(db, "requests");

export async function createRequest(params: {
  title: string;
  urgency: Urgency;
  createdBy: string;
}) {
  await addDoc(requestsCol, {
    title: params.title,
    urgency: params.urgency,
    status: "pending",
    createdAt: serverTimestamp(),
    createdBy: params.createdBy,
    acceptedBy: null,
    completedBy: null,
  });

  // Send notifications to Caregivers on shift only
  try {
    const CaregiversSnap = await getDocs(
      collection(db, CAREGIVERS_COL)
    );
    const onShiftCaregivers = CaregiversSnap.docs.filter(
      (d) => d.data().onShift === true && d.data().pushToken
    );
    
    for (const CaregiverDoc of onShiftCaregivers) {
      const pushToken = CaregiverDoc.data().pushToken;
      await sendNotification(
        pushToken,
        params.title,
        `${params.urgency.toUpperCase()} request from patient`
      );
    }
    
    // No on-shift caregivers — guardian fallback will handle the request
  } catch (error) {
    console.log("Could not send notifications:", error);
  }
}

export function listenRequests(cb: (items: FireRequest[]) => void) {
  const q = query(requestsCol, orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) => {
      const items: FireRequest[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any),
      }));
      cb(items);
    },
    (error) => {
      console.error("Could not listen to requests:", error);
      cb([]);
    }
  );
}

export async function acceptRequest(requestId: string, userId: string) {
  await updateDoc(doc(db, "requests", requestId), {
    status: "accepted",
    acceptedBy: userId,
    acceptedAt: serverTimestamp(),
  });
}

export async function completeRequest(requestId: string, userId: string) {
  await updateDoc(doc(db, "requests", requestId), {
    status: "completed",
    completedBy: userId,
    completedAt: serverTimestamp(),
  });
}

export async function registerCaregiverToken(
  caregiverId: string,
  pushToken: string
) {
  try {
    const CaregiverRef = doc(db, CAREGIVERS_COL, caregiverId);
    await setDoc(
      CaregiverRef,
      {
        pushToken,
        lastUpdated: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Failed to register Caregiver token:", error);
  }
}

export async function setCaregiverShift(
  caregiverId: string,
  onShift: boolean
) {
  const CaregiverRef = doc(db, CAREGIVERS_COL, caregiverId);
  try {
    await setDoc(
      CaregiverRef,
      { onShift, lastUpdated: serverTimestamp() },
      { merge: true }
    );
  } catch (error) {
    console.error("Could not update Caregiver shift status:", error);
  }
}

export function listenCaregivers(cb: (caregivers: Caregiver[]) => void) {
  const q = query(collection(db, CAREGIVERS_COL));
  return onSnapshot(
    q,
    (snap) => {
      const items = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any),
      }));
      cb(items);
    },
    (error) => {
      console.error("Could not listen to caregivers:", error);
      cb([]);
    }
  );
}

export function listenCaregiverShift(
  caregiverId: string,
  cb: (onShift: boolean) => void
) {
  const CaregiverRef = doc(db, CAREGIVERS_COL, caregiverId);
  return onSnapshot(
    CaregiverRef,
    (snap) => {
      const onShift = snap.data()?.onShift ?? false;
      cb(onShift);
    },
    (error) => {
      console.error("Could not listen to caregiver shift:", error);
      cb(false);
    }
  );
}


