import { useState } from "react";
import {
  addDoc,
  collection,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

const AvailabilityManager = () => {

  const [date, setDate] = useState("");
  const [startTime, setStartTime] =
    useState("");

  const [endTime, setEndTime] =
    useState("");

  const saveAvailability = async () => {
    await addDoc(
      collection(db, "availability"),
      {
        date,
        startTime,
        endTime,
        counselorId: "CURRENT_COUNSELOR_ID",
      }
    );
  };

  return (
    <div className="space-y-4">

      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        type="time"
        onChange={(e) =>
          setStartTime(e.target.value)
        }
      />

      <input
        type="time"
        onChange={(e) =>
          setEndTime(e.target.value)
        }
      />

      <button onClick={saveAvailability}>
        Save Slot
      </button>

    </div>
  );
};

export default AvailabilityManager;