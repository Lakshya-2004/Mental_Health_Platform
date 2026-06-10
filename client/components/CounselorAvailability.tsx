import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

interface Slot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

const CounselorAvailability = () => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const snapshot = await getDocs(collection(db, "availability"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Slot, "id">),
      }));
      setSlots(data);
    } catch (error) {
      console.error("Error fetching slots:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans p-6 max-w-2xl mx-auto">

      {/* Header */}
      <div className="border-b border-[#8a9a5b30] pb-6 mb-6">
        <p className="text-[11px] font-semibold tracking-widest uppercase text-[#8a9a5b] mb-1.5">
          Beacon · Counselor Portal
        </p>
        <h1 className="font-serif text-2xl font-medium text-[#2c2f14] mb-1">
          Availability schedule
        </h1>
        <p className="text-sm text-gray-500">
          Manage your open counseling sessions.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2.5 mb-6">
        {[
          { label: "Total slots", value: String(slots.length), sub: "this week", dot: false },
          { label: "Status", value: "Active", sub: "accepting bookings", dot: true },
          { label: "Upcoming", value: String(slots.length), sub: "available", dot: false },
        ].map(({ label, value, sub, dot }) => (
          <div key={label} className="bg-[#f0f1e6] rounded-xl p-3.5">
            <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-1">{label}</p>
            <p className="text-xl font-medium text-[#2c2f14] flex items-center gap-1.5">
              {dot && (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8a9a5b] flex-shrink-0" />
              )}
              {value}
            </p>
            <p className="text-[11px] text-[#8a9a5b] mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Slot list */}
      {loading ? (
        <div className="flex justify-center py-14">
          <div className="h-8 w-8 border-2 border-[#8a9a5b40] border-t-[#4b5320] rounded-full animate-spin" />
        </div>
      ) : slots.length === 0 ? (
        <div className="text-center py-14">
          <div className="text-4xl text-gray-300 mb-3">📅</div>
          <h3 className="text-base font-medium text-gray-700">No availability added</h3>
          <p className="text-sm text-gray-400 mt-1">
            Create slots so students can book sessions.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="flex items-center justify-between bg-white border border-[#8a9a5b30] hover:border-[#8a9a5b70] rounded-2xl px-4 py-3.5 transition-colors"
            >
              {/* Left: icon + date */}
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-[#4b532012] flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-[18px] h-[18px] text-[#4b5320]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-0.5">
                    Session date
                  </p>
                  <p className="text-[15px] font-medium text-[#2c2f14]">{slot.date}</p>
                </div>
              </div>

              {/* Right: time + badge */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-sm font-medium text-[#4b5320] bg-[#4b532014] rounded-full px-3 py-1">
                  {slot.startTime} – {slot.endTime}
                </span>
                <span className="text-[11px] font-semibold text-[#3a4118] bg-[#8a9a5b28] rounded-full px-2.5 py-1 uppercase tracking-wider">
                  Available
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CounselorAvailability;