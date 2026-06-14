import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function RejectedPage() {
  const navigate = useNavigate();

  const handleReapply = async () => {
    await signOut(auth);
    navigate("/signup");
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(160deg, #fef2f2 0%, #fff7f7 100%)",
      }}
    >
      <div
        className="max-w-md w-full text-center p-8 rounded-2xl bg-white"
        style={{
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <div className="text-6xl mb-4">❌</div>

        <h1 className="text-2xl font-bold mb-3 text-red-600">
          Application Rejected
        </h1>

        <p className="text-gray-600 mb-6">
          Your counsellor application has been rejected by the admin.
          You may create a new application and submit updated details.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleReapply}
            className="px-5 py-3 rounded-xl font-medium bg-red-600 text-white"
          >
            Reapply
          </button>

          <button
            onClick={handleLogout}
            className="px-5 py-3 rounded-xl border"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}