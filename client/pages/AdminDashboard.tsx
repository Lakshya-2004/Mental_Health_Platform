import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

type Counsellor = {
  id: string;
  name: string;
  email: string;
  qualification?: string;
  experience?: string;
  documentURL?: string;
  verificationStatus: string;
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#EAF2EE",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    padding: "40px 24px",
    color: "#1F3D31",
  },
  header: {
    maxWidth: 760,
    margin: "0 auto 36px",
  },
  eyebrow: {
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "#5B8F7E",
    marginBottom: "8px",
  },
  title: {
    fontSize: "26px",
    fontWeight: 700,
    color: "#2D5A4A",
    margin: "0 0 6px",
    lineHeight: 1.25,
  },
  subtitle: {
    fontSize: "14px",
    color: "#5B8F7E",
    margin: 0,
  },
  divider: {
    maxWidth: 760,
    margin: "0 auto 28px",
    border: "none",
    borderTop: "1px solid #C8DDD6",
  },
  grid: {
    maxWidth: 760,
    margin: "0 auto",
    display: "grid",
    gap: "16px",
  },
  card: {
    backgroundColor: "#FAFBFA",
    borderRadius: "12px",
    borderLeft: "4px solid #5B8F7E",
    padding: "20px 24px",
    boxShadow: "0 1px 4px rgba(45,90,74,0.07)",
    display: "flex",
    flexDirection: "column" as const,
    gap: "4px",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "8px",
  },
  name: {
    fontSize: "17px",
    fontWeight: 600,
    color: "#2D5A4A",
    margin: 0,
  },
  badge: {
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    backgroundColor: "#FFF3DC",
    color: "#B07A10",
    borderRadius: "20px",
    padding: "3px 10px",
    border: "1px solid #F5A623",
  },
  email: {
    fontSize: "13px",
    color: "#5B8F7E",
    margin: "0 0 10px",
  },
  metaRow: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap" as const,
    marginBottom: "4px",
  },
  metaItem: {
    fontSize: "13px",
    color: "#4A6A5C",
    display: "flex",
    flexDirection: "column" as const,
    gap: "2px",
  },
  metaLabel: {
    fontSize: "10px",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#8AADA0",
  },
  docLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "13px",
    color: "#2D5A4A",
    textDecoration: "none",
    fontWeight: 500,
    marginTop: "8px",
    padding: "4px 0",
    borderBottom: "1px solid #C8DDD6",
    width: "fit-content",
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "16px",
    paddingTop: "16px",
    borderTop: "1px solid #E2EDEA",
  },
  approveBtn: {
    flex: 1,
    backgroundColor: "#2D5A4A",
    color: "#FAFBFA",
    border: "none",
    borderRadius: "8px",
    padding: "9px 0",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "0.03em",
    transition: "background 0.15s",
  },
  rejectBtn: {
    flex: 1,
    backgroundColor: "#FAFBFA",
    color: "#D96B6B",
    border: "1.5px solid #D96B6B",
    borderRadius: "8px",
    padding: "9px 0",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "0.03em",
    transition: "all 0.15s",
  },
  emptyState: {
    textAlign: "center" as const,
    padding: "60px 20px",
    color: "#5B8F7E",
    maxWidth: 760,
    margin: "0 auto",
  },
  emptyIcon: {
    fontSize: "40px",
    marginBottom: "12px",
  },
  emptyTitle: {
    fontSize: "17px",
    fontWeight: 600,
    color: "#2D5A4A",
    margin: "0 0 6px",
  },
  emptyText: {
    fontSize: "14px",
    margin: 0,
  },
  loadingWrap: {
    maxWidth: 760,
    margin: "0 auto",
    display: "grid",
    gap: "16px",
  },
  skeleton: {
    backgroundColor: "#FAFBFA",
    borderRadius: "12px",
    borderLeft: "4px solid #C8DDD6",
    padding: "20px 24px",
    height: "140px",
    opacity: 0.7,
  },
};

const SkeletonCard = () => (
  <div style={styles.skeleton} />
);

const AdminDashboard = () => {
  const [counsellors, setCounsellors] = useState<Counsellor[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // 🔥 FETCH PENDING COUNSELLORS
  const fetchCounsellors = async () => {
    try {
      setLoading(true);

      const q = query(
        collection(db, "users"),
        where("role", "==", "counsellor"),
        where("verificationStatus", "==", "pending")
      );

      const snap = await getDocs(q);

      const data = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Counsellor),
      }));

      setCounsellors(data);
    } catch (err) {
      console.error("Failed to fetch counsellors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounsellors();
  }, []);

  // ✅ APPROVE
  const approveCounsellor = async (id: string) => {
    setActionLoading(id);
    try {
      await updateDoc(doc(db, "users", id), {
        verificationStatus: "approved",
      });

      setCounsellors((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Approve failed:", error);
    }
    finally {
      setActionLoading(null);
    }
  };

  const rejectCounsellor = async (id: string) => {
    setActionLoading(id);
    try {
      await updateDoc(doc(db, "users", id), {
        verificationStatus: "rejected",
      });

      setCounsellors((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Reject failed:", error);
    }
    finally {
      setActionLoading(null);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <p style={styles.eyebrow}>Admin Portal</p>
        <h1 style={styles.title}>Counsellor Approvals</h1>
        <p style={styles.subtitle}>
          Review and verify pending counsellor applications
        </p>
      </div>

      <hr style={styles.divider} />

      {loading && (
        <div style={styles.loadingWrap}>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {!loading && counsellors.length === 0 && (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>🌿</div>
          <p style={styles.emptyTitle}>All caught up</p>
          <p style={styles.emptyText}>No pending applications to review right now.</p>
        </div>
      )}

      {!loading && counsellors.length > 0 && (
        <div style={styles.grid}>
          {counsellors.map((c) => (
            <div key={c.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.name}>{c.name}</h3>
                <span style={styles.badge}>Pending</span>
              </div>

              <p style={styles.email}>{c.email}</p>

              <div style={styles.metaRow}>
                {c.qualification && (
                  <div style={styles.metaItem}>
                    <span style={styles.metaLabel}>Qualification</span>
                    <span>{c.qualification}</span>
                  </div>
                )}
                {c.experience && (
                  <div style={styles.metaItem}>
                    <span style={styles.metaLabel}>Experience</span>
                    <span>{c.experience}</span>
                  </div>
                )}
              </div>

              {c.documentURL && (
                <a
                  href={c.documentURL}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.docLink}
                >
                  ↗ View supporting document
                </a>
              )}

              <div style={styles.actions}>
                <button
                  disabled={actionLoading === c.id}
                  onClick={() => approveCounsellor(c.id)}
                  style={styles.approveBtn}
                >
                  {actionLoading === c.id ? "Processing..." : "Approve"}
                </button>

                <button
                  disabled={actionLoading === c.id}
                  onClick={() => rejectCounsellor(c.id)}
                  style={styles.rejectBtn}
                >
                  {actionLoading === c.id ? "Processing..." : "Reject"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;