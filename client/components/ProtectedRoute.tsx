import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, authLoading] = useAuthState(auth);
  const [dbUser, setDbUser] = useState<any>(null);
  const [dbLoading, setDbLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        setDbUser(null);
        setDbLoading(false);
        return;
      }

      setDbLoading(true);

      try {
        const snap = await getDoc(doc(db, "users", user.uid));

        if (!snap.exists()) {
          setDbUser(null);
        } else {
          setDbUser(snap.data());
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setDbUser(null);
      }

      setDbLoading(false);
    };

    fetchUser();
  }, [user]);

  // 1. Show loader until BOTH are ready
if (authLoading || dbLoading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// 2. Only check Firebase auth
if (!user) {
  return <Navigate to="/signup" replace />;
}

/**
 * 3. IMPORTANT CHANGE:
 * DO NOT redirect if dbUser is still null immediately
 * Instead wait OR treat as loading-safe state
 */
if (!dbUser) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-sm opacity-70">Loading profile...</div>
    </div>
  );
}

  // ===============================
  // 🔥 ROLE BASED ROUTING
  // ===============================

  const role = dbUser.role;
  const status = dbUser.verificationStatus;

  // 👨‍🎓 STUDENT FLOW (always allowed if logged in)
  if (role === "student") {
    return <>{children}</>;
  }
if (role === "admin") {
  return <>{children}</>;
}
  // 👨‍⚕️ COUNSELLOR FLOW
  if (role === "counsellor") {
    if (status === "pending") {
      return <Navigate to="/pending-approval" replace />;
    }

    if (status === "rejected") {
      return <Navigate to="/rejected" replace />;
    }

    if (status === "approved") {
      return <>{children}</>;
    }

    // fallback safety
    return <Navigate to="/pending-approval" replace />;
  }

  // 🚨 unknown role safety
  return <Navigate to="/" replace />;
}