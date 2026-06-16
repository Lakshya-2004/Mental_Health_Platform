import { useState } from "react";
import { auth } from "@/firebase/firebaseConfig";
import BackToHome from "./BackToHome";
import { useNavigate } from "react-router-dom";

const BookCounselorMeeting = () => {
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const submitRequest = async () => {
    if (!date || !message.trim()) {
      alert("Please select a date and enter a message.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        userId: auth.currentUser?.uid,
        userName: auth.currentUser?.displayName || auth.currentUser?.email?.split('@')[0] || "Anonymous",
        userEmail: auth.currentUser?.email,
        preferredDate: date,
        message,
      };

      console.log("SENDING PAYLOAD:", payload);

      const response = await fetch(`${API_URL}/api/meetings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit request");
      }

      setSent(true);
      setMessage("");
      setDate("");

      console.log("Meeting request saved:", data);
    } catch (error) {
      console.error("Meeting request error:", error);
      alert("Failed to submit meeting request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen p-6 md:p-10"
      style={{
        background: "linear-gradient(160deg, #f5f7ee 0%, #eef1e2 100%)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@500;600&family=DM+Sans:wght@400;500;600&display=swap');
      `}</style>


      <div className="max-w-xl mx-auto">


        {/* Header */}
        <p
          className="text-xs font-semibold tracking-[0.18em] uppercase mb-3"
          style={{ color: "#8a9a5b" }}
        >
          Beacon · Counseling
        </p>
        <h1
          className="text-4xl font-semibold leading-snug mb-1"
          style={{ color: "#2e3a1f", fontFamily: "'Lora', serif" }}
        >
          Request a session
        </h1>
        <div
          className="w-10 h-[2px] rounded-full my-3"
          style={{ background: "#8a9a5b" }}
        />
        <p className="text-sm mb-8" style={{ color: "#6b7560" }}>
          Your counselor will confirm within 24 hours.
        </p>

        {/* Card */}
        <div
          className="relative rounded-2xl p-8 overflow-hidden"
          style={{
            background: "#ffffff",
            border: "1px solid #d6dcc4",
            boxShadow: "0 4px 24px rgba(75,83,32,0.07)",
          }}
        >
          {/* Decorative blobs — olive-tinted */}
          <div
            className="absolute -top-10 -right-10 w-36 h-36 rounded-full pointer-events-none"
            style={{ background: "#e8ecce", opacity: 0.45 }}
          />
          <div
            className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full pointer-events-none"
            style={{ background: "#e8ecce", opacity: 0.25 }}
          />

          <div className="relative space-y-5">

            {/* Date field */}
            <div>
              <label
                className="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase mb-2"
                style={{ color: "#6b7560" }}
              >
                <svg
                  className="w-3.5 h-3.5"
                  style={{ color: "#8a9a5b" }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Preferred date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition"
                style={{
                  background: "#f7f8f2",
                  border: "1px solid #d6dcc4",
                  color: "#2e3a1f",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#8a9a5b";
                  e.target.style.boxShadow = "0 0 0 3px rgba(138,154,91,0.15)";
                  e.target.style.background = "#ffffff";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d6dcc4";
                  e.target.style.boxShadow = "none";
                  e.target.style.background = "#f7f8f2";
                }}
              />
            </div>

            {/* Message field */}
            <div>
              <label
                className="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase mb-2"
                style={{ color: "#6b7560" }}
              >
                <svg
                  className="w-3.5 h-3.5"
                  style={{ color: "#8a9a5b" }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                What's on your mind?
              </label>
              <textarea
                placeholder="Share as little or as much as you'd like…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none transition leading-relaxed"
                style={{
                  background: "#f7f8f2",
                  border: "1px solid #d6dcc4",
                  color: "#2e3a1f",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#8a9a5b";
                  e.target.style.boxShadow = "0 0 0 3px rgba(138,154,91,0.15)";
                  e.target.style.background = "#ffffff";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d6dcc4";
                  e.target.style.boxShadow = "none";
                  e.target.style.background = "#f7f8f2";
                }}
              />
            </div>

            <div style={{ borderTop: "1px solid #e4e9d4" }} />

            {/* Footer */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <BackToHome />
              <span
                className="flex items-center gap-1.5 text-xs"
                style={{ color: "#a4ac88" }}
              >
                <svg
                  className="w-3.5 h-3.5"
                  style={{ color: "#8a9a5b" }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Private &amp; confidential
              </span>

              <div className="flex gap-3">
                <button
                  onClick={() => navigate("/my-meetings")}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 hover:opacity-80"
                  style={{
                    border: "1px solid #8a9a5b",
                    color: "#4b5320",
                    background: "transparent",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  My Meetings
                </button>

                <button
                  onClick={submitRequest}
                  disabled={loading || sent}
                  className="flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-150 active:scale-95 disabled:opacity-60"
                  style={{
                    background: sent ? "#8a9a5b" : "#4b5320",
                    color: "#e8ecce",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Sending…
                    </>
                  ) : sent ? (
                    "✓ Sent"
                  ) : (
                    "Request Meeting →"
                  )}
                </button>
              </div>
            </div>

            {/* Success toast */}
            {sent && (
              <div
                className="flex items-center gap-2 text-sm font-medium rounded-xl px-4 py-3"
                style={{
                  background: "#e8ecce",
                  border: "1px solid #8a9a5b",
                  color: "#4b5320",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                ✓ Request sent — your counselor will follow up soon.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCounselorMeeting;