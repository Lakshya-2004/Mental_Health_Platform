import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth, db } from "@/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      const snap = await getDoc(doc(db, "users", user.uid));

      if (snap.exists() && snap.data().role === "admin") {
        setIsAdmin(true);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-muted-foreground text-sm">Checking your authentication status...</div>
  </div>
);

  if (!isAdmin) return <Navigate to="/home" replace />;

  return <>{children}</>;
}