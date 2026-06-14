import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "@/firebase/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";

type Status = "pending" | "approved" | "rejected";

export default function PendingApproval() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>("pending");

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const unsub = onSnapshot(doc(db, "users", user.uid), (snap) => {
      if (!snap.exists()) return;

      const data = snap.data();
      setStatus(data.verificationStatus);
    });

    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(160deg, #f5f7ee 0%, #eef1e2 100%)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        className="max-w-md w-full text-center p-8 rounded-2xl"
        style={{
          background: "#ffffff",
          border: "1px solid #d6dcc4",
          boxShadow: "0 10px 30px rgba(75,83,32,0.08)",
        }}
      >
        {/* ICON */}
        <div className="text-5xl mb-4">
          {status === "approved" ? "✅" : status === "rejected" ? "❌" : "⏳"}
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-semibold mb-2" style={{ color: "#2e3a1f" }}>
          {status === "approved"
            ? "Approved!"
            : status === "rejected"
            ? "Application Rejected"
            : "Approval Pending"}
        </h1>

        {/* MESSAGE */}
        <p className="text-sm mb-6" style={{ color: "#6b7560" }}>
          {status === "approved"
            ? "Your counsellor account is approved. You can now access your dashboard."
            : status === "rejected"
            ? "Your application was rejected. Please contact admin or reapply."
            : "Your counsellor account is under review. We will verify your details soon."}
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-3">
          {status === "approved" && (
            <button
              onClick={() => navigate("/counsellor")}
              className="px-5 py-2 rounded-xl text-sm font-medium"
              style={{ background: "#4b5320", color: "#e8ecce" }}
            >
              Go to Dashboard
            </button>
          )}

          {status === "rejected" && (
            <button
              onClick={() => navigate("/signup")}
              className="px-5 py-2 rounded-xl text-sm font-medium"
              style={{ background: "#b23b3b", color: "#fff" }}
            >
              Reapply
            </button>
          )}

          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-xl text-sm font-medium border"
            style={{
              borderColor: "#d6dcc4",
              color: "#4b5320",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}