import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth, db } from "@/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface Props {
  children: React.ReactNode;
}

interface UserData {
  role: string | null;
  verificationStatus: string | null;
  isAuthenticated: boolean;
}

export default function CounsellorRoute({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>({
    role: null,
    verificationStatus: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserData({ role: null, verificationStatus: null, isAuthenticated: false });
        setLoading(false);
        return;
      }

      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          const data = snap.data();
          // single setState call — no stale state race
          setUserData({
            role: data.role || null,
            verificationStatus: data.verificationStatus || null,
            isAuthenticated: true,
          });
        } else {
          setUserData({ role: null, verificationStatus: null, isAuthenticated: true });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUserData({ role: null, verificationStatus: null, isAuthenticated: true });
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
       Checking your authentication status...
      </div>
    );
  }

  const { role, verificationStatus, isAuthenticated } = userData;

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role === "admin") return <>{children}</>;

  if (role === "counsellor") {
    if (verificationStatus === "approved") return <>{children}</>;
    if (verificationStatus === "pending") return <Navigate to="/pending-approval" replace />;
    if (verificationStatus === "rejected") return <Navigate to="/rejected" replace />;
  }

  return <Navigate to="/home" replace />;
}