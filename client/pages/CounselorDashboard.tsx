import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
interface MeetingRequest {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  preferredDate: string;
  message: string;
  status: string;
  meetLink?: string;
}

const CounselorDashboard = () => {
  const [requests, setRequests] = useState<MeetingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
const [authChecking, setAuthChecking] = useState(true);
const API_URL = import.meta.env.VITE_API_URL;
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    try {
      if (!user) {
        navigate("/login");
        return;
      }

      console.log("Logged In UID:", user.uid);

      const snap = await getDoc(doc(db, "users", user.uid));

      if (!snap.exists()) {
        navigate("/login");
        return;
      }

      const data = snap.data();

      const role = data.role || "student";
      const status = data.verificationStatus || "pending";

      console.log("Role:", role);
      console.log("Verification:", status);
      console.log("Firestore User Data:", data);

      // 🔥 ONLY COUNSELLOR RESTRICTION LOGIC
      if (role === "counsellor") {
        if (status === "pending") {
          navigate("/pending-approval");
          return;
        }

        if (status === "rejected") {
          navigate("/");
          return;
        }

        if (status !== "approved") {
          navigate("/");
          return;
        }
      }

      // ✅ ALLOWED TO ENTER DASHBOARD
      fetchRequests();
    } catch (err) {
      console.error(err);
      navigate("/login");
    } finally {
      setAuthChecking(false);
    }
  });

  return () => unsubscribe();
}, [navigate]);

 
  
  const fetchRequests = async () => {
    try {
      const response = await fetch(`${API_URL}/api/meetings`);
      const data = await response.json();
      console.log("API RESPONSE:", data);
      if (Array.isArray(data.meetings)) {
        setRequests(data.meetings);
      } else {
        setRequests([]);
        console.error("meetings is not an array");
      }
    } catch (error) {
      console.error(error);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const acceptMeeting = async (requestId: string) => {
    try {
      const meetLink =
        "https://meet.jit.si/beacon-" +
        Math.random().toString(36).substring(2);
      const response = await fetch(
        `${API_URL}/api/meetings/${requestId}/accept`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ meetLink }),
        }
      );
      if (!response.ok) throw new Error("Failed to accept request");
      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  const rejectMeeting = async (requestId: string) => {
    try {
      const response = await fetch(
        `${API_URL}/api/meetings/${requestId}/reject`,
        { method: "PATCH" }
      );
      if (!response.ok) throw new Error("Failed to reject request");
      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  const statusConfig: Record<string, { label: string; style: string }> = {
    accepted: {
      label: "Accepted",
      style: "bg-[#e8ecce] text-[#4b5320] border border-[#8a9a5b]",
    },
    rejected: {
      label: "Rejected",
      style: "bg-[#f5ece8] text-[#7a3b2e] border border-[#d4a090]",
    },
    pending: {
      label: "Pending Review",
      style: "bg-[#fdf8ec] text-[#7a6022] border border-[#d4bc78]",
    },
  };
if (authChecking) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Checking access...
    </div>
  );
}
  return (
    <div
      className="min-h-screen p-6 md:p-12"
      style={{
        background: "linear-gradient(160deg, #f5f7ee 0%, #eef1e2 100%)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@500;600&family=DM+Sans:wght@400;500;600&display=swap');
      `}</style>

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p
            className="text-xs uppercase tracking-[0.18em] font-semibold mb-3"
            style={{ color: "#8a9a5b", fontFamily: "'DM Sans', sans-serif" }}
          >
            Beacon · Counselor Portal
          </p>
          <h1
            className="text-4xl md:text-5xl font-semibold tracking-tight"
            style={{ color: "#2e3a1f", fontFamily: "'Lora', serif" }}
          >
            Meeting Requests
          </h1>
          <div
            className="mt-3 w-12 h-[2px] rounded-full"
            style={{ background: "#8a9a5b" }}
          />
          <p
            className="mt-4 text-base"
            style={{ color: "#6b7560", fontFamily: "'DM Sans', sans-serif" }}
          >
            Review and respond to student counseling requests below.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div
              className="w-10 h-10 rounded-full border-[3px] border-t-transparent animate-spin"
              style={{ borderColor: "#8a9a5b", borderTopColor: "transparent" }}
            />
            <p className="text-sm" style={{ color: "#8a9a5b" }}>
              Loading requests…
            </p>
          </div>

        ) : requests.length === 0 ? (
          /* Empty State */
          <div
            className="rounded-2xl p-12 text-center"
            style={{
              background: "#ffffff",
              border: "1px solid #d6dcc4",
              boxShadow: "0 2px 12px rgba(75,83,32,0.06)",
            }}
          >
            <div className="text-5xl mb-5">📭</div>
            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: "#2e3a1f", fontFamily: "'Lora', serif" }}
            >
              No requests yet
            </h2>
            <p className="text-sm" style={{ color: "#8a9a5b" }}>
              New student requests will appear here once submitted.
            </p>
          </div>

        ) : (
          /* Request Cards */
          <div className="flex flex-col gap-4">
            {requests.map((request) => {
              const statusKey = request.status?.toLowerCase();
              const status = statusConfig[statusKey] ?? {
                label: request.status,
                style: "bg-gray-100 text-gray-600 border border-gray-300",
              };

              return (
                <div
                  key={request._id}
                  className="rounded-2xl p-6 transition-shadow duration-200 hover:shadow-md"
                  style={{
                    background: "#ffffff",
                    border: "1px solid #d6dcc4",
                    boxShadow: "0 2px 10px rgba(75,83,32,0.05)",
                  }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                    {/* Left: Student Info */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3
                          className="text-lg font-semibold leading-snug"
                          style={{
                            color: "#2e3a1f",
                            fontFamily: "'Lora', serif",
                          }}
                        >
                          {request.userName}
                        </h3>
                        <p
                          className="text-sm mt-0.5"
                          style={{ color: "#8a9a5b" }}
                        >
                          {request.userEmail}
                        </p>
                      </div>

                      <div
                        className="text-sm space-y-1"
                        style={{ color: "#4b5320" }}
                      >
                        <p>
                          <span className="font-medium">Preferred date: </span>
                          <span style={{ color: "#6b7560" }}>
                            {request.preferredDate}
                          </span>
                        </p>
                        <p>
                          <span className="font-medium">Message: </span>
                          <span style={{ color: "#6b7560" }}>
                            {request.message}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Right: Status + Actions */}
                    <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${status.style}`}
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {status.label}
                      </span>

                      {request.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => acceptMeeting(request._id)}
                            className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 hover:opacity-90 active:scale-95"
                            style={{
                              background: "#4b5320",
                              color: "#e8ecce",
                              fontFamily: "'DM Sans', sans-serif",
                            }}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => rejectMeeting(request._id)}
                            className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 hover:opacity-90 active:scale-95"
                            style={{
                              background: "#f5ece8",
                              color: "#7a3b2e",
                              border: "1px solid #d4a090",
                              fontFamily: "'DM Sans', sans-serif",
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      )}

                      {request.meetLink && (
                        <a
                          href={request.meetLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium underline underline-offset-2 transition-opacity hover:opacity-70"
                          style={{
                            color: "#4b5320",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          Join meeting →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CounselorDashboard;