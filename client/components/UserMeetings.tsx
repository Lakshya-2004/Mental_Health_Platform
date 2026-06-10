import { useEffect, useState } from "react";
import { auth } from "@/firebase/firebaseConfig";
import BackToHome from "@/pages/BackToHome";

interface MeetingRequest {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  preferredDate: string;
  meetingDate?: string;
  meetingTime?: string;
  message: string;
  status: string;
  meetLink?: string;
  createdAt?: string;
}

const UserMeetings = () => {
  const [meetings, setMeetings] = useState<MeetingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyMeetings();
    const interval = setInterval(() => {
      fetchMyMeetings();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchMyMeetings = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/meetings");
      const data = await response.json();
      const meetingsArray = data.meetings || [];
      const myMeetings = meetingsArray.filter(
        (meeting: MeetingRequest) =>
          meeting.userId === auth.currentUser?.uid
      );
      setMeetings(myMeetings);
    } catch (error) {
      console.error("Failed to fetch meetings:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-[#e8ecce] text-[#4b5320] border-[#8a9a5b]";
      case "rejected":
        return "bg-[#f5ece8] text-[#7a3b2e] border-[#d4a090]";
      default:
        return "bg-[#fdf8ec] text-[#7a6022] border-[#d4bc78]";
    }
  };

  return (
    <div
      className="min-h-screen p-6 md:p-12"
      style={{
        background: "linear-gradient(160deg, #f5f7ee 0%, #eef1e2 100%)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@500;600&family=DM+Sans:wght@400;500;600&display=swap');
      `}</style>

      <BackToHome />

      <div className="max-w-4xl mx-auto mt-4">

        {/* Header */}
        <div className="mb-10">
          <p
            className="text-xs uppercase tracking-[0.18em] font-semibold mb-3"
            style={{ color: "#8a9a5b" }}
          >
            Beacon · Student Portal
          </p>
          <h1
            className="text-4xl md:text-5xl font-semibold tracking-tight"
            style={{ color: "#2e3a1f", fontFamily: "'Lora', serif" }}
          >
            My Counseling Sessions
          </h1>
          <div
            className="mt-3 w-12 h-[2px] rounded-full"
            style={{ background: "#8a9a5b" }}
          />
          <p className="mt-4 text-base" style={{ color: "#6b7560" }}>
            Track your counseling requests and upcoming sessions.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div
              className="w-10 h-10 rounded-full border-[3px] animate-spin"
              style={{
                borderColor: "#8a9a5b",
                borderTopColor: "transparent",
              }}
            />
            <p className="text-sm" style={{ color: "#8a9a5b" }}>
              Loading your sessions…
            </p>
          </div>
        ) : meetings.length === 0 ? (
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
              No sessions yet
            </h2>
            <p className="text-sm" style={{ color: "#8a9a5b" }}>
              Your counseling requests will appear here once submitted.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {meetings.map((meeting) => (
              <div
                key={meeting._id}
                className="rounded-2xl p-6 transition-shadow duration-200 hover:shadow-md"
                style={{
                  background: "#ffffff",
                  border: "1px solid #d6dcc4",
                  boxShadow: "0 2px 10px rgba(75,83,32,0.05)",
                }}
              >
                <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

                  {/* Left Side */}
                  <div className="space-y-3">
                    <h2
                      className="text-lg font-semibold"
                      style={{ color: "#2e3a1f", fontFamily: "'Lora', serif" }}
                    >
                      Counseling Request
                    </h2>

                    <p className="text-sm" style={{ color: "#6b7560" }}>
                      <span className="font-medium" style={{ color: "#4b5320" }}>
                        Preferred Date:{" "}
                      </span>
                      {meeting.preferredDate}
                    </p>

                    <p className="text-sm" style={{ color: "#6b7560" }}>
                      <span className="font-medium" style={{ color: "#4b5320" }}>
                        Message:{" "}
                      </span>
                      {meeting.message}
                    </p>

                    {meeting.createdAt && (
                      <p className="text-xs" style={{ color: "#a4ac88" }}>
                        Submitted:{" "}
                        {new Date(meeting.createdAt).toLocaleDateString(
                          "en-IN",
                          { day: "numeric", month: "short", year: "numeric" }
                        )}
                      </p>
                    )}
                  </div>

                  {/* Right Side */}
                  <div className="flex flex-col gap-4 lg:items-end">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide border ${getStatusColor(
                        meeting.status
                      )}`}
                    >
                      {meeting.status.toUpperCase()}
                    </span>

                    {meeting.status === "accepted" && (
                      <div
                        className="rounded-xl p-4 w-full lg:w-72"
                        style={{
                          background: "#f2f5e4",
                          border: "1px solid #c8d4a0",
                        }}
                      >
                        <h3
                          className="font-semibold text-sm mb-2"
                          style={{
                            color: "#4b5320",
                            fontFamily: "'Lora', serif",
                          }}
                        >
                          Session confirmed 🌿
                        </h3>

                        <p className="text-xs mb-1" style={{ color: "#6b7560" }}>
                          Your counselor has approved the request.
                        </p>

                        <p className="text-xs mt-2" style={{ color: "#6b7560" }}>
                          <span className="font-medium" style={{ color: "#4b5320" }}>
                            Date:{" "}
                          </span>
                          {meeting.meetingDate || meeting.preferredDate}
                        </p>

                        {meeting.meetingTime && (
                          <p className="text-xs" style={{ color: "#6b7560" }}>
                            <span className="font-medium" style={{ color: "#4b5320" }}>
                              Time:{" "}
                            </span>
                            {meeting.meetingTime}
                          </p>
                        )}

                        {meeting.meetLink ? (
                          
                          <a  href={meeting.meetLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 mt-4 w-full rounded-xl px-4 py-2.5 text-sm font-medium transition-opacity hover:opacity-85"
                            style={{
                              background: "#4b5320",
                              color: "#e8ecce",
                              fontFamily: "'DM Sans', sans-serif",
                            }}
                          >
                            🎥 Join Meeting
                          </a>
                        ) : (
                          <div
                            className="mt-3 rounded-xl px-3 py-2.5 text-xs"
                            style={{
                              background: "#fdf8ec",
                              border: "1px solid #d4bc78",
                              color: "#7a6022",
                            }}
                          >
                            Approved — meeting link coming soon.
                          </div>
                        )}
                      </div>
                    )}

                    {meeting.status === "rejected" && (
                      <div
                        className="rounded-xl px-4 py-3 text-sm"
                        style={{
                          background: "#fdf2ee",
                          border: "1px solid #e8c0b0",
                          color: "#7a3b2e",
                        }}
                      >
                        Your request was declined.
                      </div>
                    )}

                    {meeting.status === "pending" && (
                      <div
                        className="rounded-xl px-4 py-3 text-sm"
                        style={{
                          background: "#fdf8ec",
                          border: "1px solid #d4bc78",
                          color: "#7a6022",
                        }}
                      >
                        Waiting for counselor approval.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMeetings;