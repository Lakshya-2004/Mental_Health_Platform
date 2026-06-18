"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { auth, db } from "@/firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
declare global {
  interface Window {
    botpress: any;
    botpressWebChat: any;
  }
}

const headerStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --sage:     #5B8C6E;
    --sage-mid: #4A7560;
    --sage-light: #EAF3EC;
    --sage-pale:  #F4F9F5;
    --charcoal: #2D3340;
    --muted:    #6B7280;
    --serif: 'DM Serif Display', Georgia, serif;
    --sans:  'DM Sans', system-ui, sans-serif;
  }

  /* ── header shell ── */
  .hdr {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    transition: all .3s ease;
  }
  .hdr-default {
    background: rgba(255,255,255,0.75);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(91,140,110,0.12);
    padding: 18px 0;
  }
  .hdr-compact {
    background: rgba(255,255,255,0.96);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(91,140,110,0.18);
    padding: 12px 0;
    box-shadow: 0 2px 20px rgba(91,140,110,0.08);
  }

  /* inner flex row */
  .hdr-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  /* logo */
  .hdr-logo {
    font-family: var(--serif);
    font-style: italic;
    color: var(--sage);
    cursor: pointer;
    transition: opacity .2s;
    white-space: nowrap;
    user-select: none;
    text-decoration: none;
    flex-shrink: 1;
    min-width: 0;
  }
  .hdr-logo:hover { opacity: .78; }
  .hdr-logo-lg { font-size: 32px; }
  .hdr-logo-sm { font-size: 26px; }

  /* desktop nav links */
  .hdr-nav {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .hdr-link {
    font-family: var(--sans);
    font-size: 15px;
    font-weight: 500;
    color: var(--charcoal);
    text-decoration: none;
    padding: 8px 14px;
    border-radius: 10px;
    transition: background .18s, color .18s;
    white-space: nowrap;
  }
  .hdr-link:hover {
    background: var(--sage-pale);
    color: var(--sage);
  }
  .hdr-link-active {
    color: var(--sage);
    background: var(--sage-light);
  }

  /* right-side actions */
  .hdr-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    min-width: 0;
  }
  }

  /* sign-up button */
  .hdr-signup {
    padding: 10px 22px;
    background: var(--sage);
    color: #fff;
    font-family: var(--sans);
    font-size: 14px;
    font-weight: 600;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    text-decoration: none;
    transition: background .2s, transform .12s, box-shadow .2s;
    display: inline-block;
  }
  .hdr-signup:hover {
    background: var(--sage-mid);
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(91,140,110,0.28);
  }

  /* logout */
  .hdr-logout {
    padding: 9px 18px;
    background: transparent;
    color: var(--muted);
    font-family: var(--sans);
    font-size: 14px;
    font-weight: 500;
    border: 1.5px solid rgba(107,114,128,0.25);
    border-radius: 10px;
    cursor: pointer;
    transition: border-color .2s, color .2s, background .2s;
    white-space: nowrap;
  }
  .hdr-logout:hover {
    border-color: #e55;
    color: #c44;
    background: #fff5f5;
  }

  /* user avatar pill */
  .hdr-user {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 12px 5px 5px;
    background: var(--sage-pale);
    border: 1.5px solid rgba(91,140,110,0.18);
    border-radius: 100px;
  }
  .hdr-avatar {
    width: 32px; height: 32px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(91,140,110,0.2);
    flex-shrink: 0;
  }
  .hdr-username {
    font-family: var(--sans);
    font-size: 13px;
    font-weight: 600;
    color: var(--charcoal);
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* bot avatar */
  .hdr-bot {
    width: 44px; height: 44px;
    border-radius: 12px;
    object-fit: cover;
    cursor: pointer;
    border: 2px solid rgba(91,140,110,0.18);
    transition: transform .2s, box-shadow .2s;
    flex-shrink: 0;
  }
  .hdr-bot:hover {
    transform: scale(1.07);
    box-shadow: 0 4px 16px rgba(91,140,110,0.2);
  }

  /* hamburger */
  .hdr-ham {
    width: 40px; height: 40px;
    border-radius: 10px;
    background: transparent;
    border: 1.5px solid rgba(45,51,64,0.15);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    color: var(--charcoal);
    transition: background .18s, border-color .18s;
    flex-shrink: 0;
  }
  .hdr-ham:hover { background: var(--sage-pale); border-color: var(--sage); color: var(--sage); }

  /* ── MOBILE DRAWER ── */
  .drawer-overlay {
    position: fixed; inset: 0;
    background: rgba(45,51,64,0.45);
    backdrop-filter: blur(4px);
    z-index: 200;
    animation: fadeIn .22s ease;
  }
  @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }

  .drawer {
    position: fixed;
    top: 0; left: 0; bottom: 0;
    width: min(320px, 85vw);
    background: #fff;
    z-index: 201;
    display: flex;
    flex-direction: column;
    padding: 0;
    box-shadow: 4px 0 40px rgba(45,51,64,0.12);
    animation: slideIn .25s cubic-bezier(.22,1,.36,1);
    overflow-y: auto;
  }
  @keyframes slideIn {
    from { transform: translateX(-100%) }
    to   { transform: translateX(0) }
  }

  .drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid rgba(91,140,110,0.1);
  }
  .drawer-close {
    width: 36px; height: 36px;
    border-radius: 8px;
    background: var(--sage-pale);
    border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: var(--muted);
    transition: background .18s;
  }
  .drawer-close:hover { background: var(--sage-light); color: var(--sage); }

  .drawer-user {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px 24px;
    background: var(--sage-pale);
    border-bottom: 1px solid rgba(91,140,110,0.1);
  }
  .drawer-avatar {
    width: 44px; height: 44px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(91,140,110,0.22);
  }
  .drawer-user-name {
    font-family: var(--sans);
    font-size: 15px; font-weight: 600;
    color: var(--charcoal);
  }
  .drawer-user-sub {
    font-family: var(--sans);
    font-size: 12px; color: var(--muted);
    margin-top: 2px;
  }

  .drawer-nav {
    display: flex;
    flex-direction: column;
    padding: 16px 16px;
    gap: 4px;
    flex: 1;
  }
  .drawer-link {
    font-family: var(--sans);
    font-size: 16px; font-weight: 500;
    color: var(--charcoal);
    text-decoration: none;
    padding: 13px 16px;
    border-radius: 12px;
    transition: background .16s, color .16s;
    display: flex; align-items: center; gap: 10px;
  }
  .drawer-link:hover { background: var(--sage-pale); color: var(--sage); }
  .drawer-link-icon { font-size: 18px; }

  .drawer-footer {
    padding: 16px 24px 28px;
    border-top: 1px solid rgba(91,140,110,0.1);
    display: flex; flex-direction: column; gap: 10px;
  }
  .drawer-btn-signup {
    width: 100%; padding: 13px;
    background: var(--sage); color: #fff;
    font-family: var(--sans); font-size: 15px; font-weight: 600;
    border: none; border-radius: 12px; cursor: pointer;
    text-decoration: none; display: block; text-align: center;
    transition: background .2s;
  }
  .drawer-btn-signup:hover { background: var(--sage-mid); }
  .drawer-btn-logout {
    width: 100%; padding: 12px;
    background: transparent; color: #c44;
    font-family: var(--sans); font-size: 15px; font-weight: 500;
    border: 1.5px solid rgba(200,60,60,0.25); border-radius: 12px; cursor: pointer;
    transition: background .2s, border-color .2s;
  }
  .drawer-btn-logout:hover { background: #fff5f5; border-color: #e55; }

  /* chat window */
  .hdr-chat {
    position: fixed;
    bottom: 80px; right: 20px;
    width: 350px; height: 500px;
    z-index: 1000;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 12px 48px rgba(45,51,64,0.18);
    border: 1.5px solid rgba(91,140,110,0.15);
  }

  /* hamburger: hidden on desktop, visible only on mobile */
  .hdr-ham { display: none; }

  /* responsive breakpoints */
  @media (max-width: 900px) {
    .hdr-nav  { display: none !important; }
    .hdr-ham  { display: flex; }
  }
  @media (max-width: 520px) {
    .hdr-inner    { padding: 0 12px; gap: 8px; }
    .hdr-logo-lg  { font-size: 22px; }
    .hdr-logo-sm  { font-size: 20px; }
    .hdr-username { display: none; }
    .hdr-signup   { display: none; }
    .hdr-logout   { display: none; }
    .hdr-user     { padding: 4px; }
    .hdr-actions  { gap: 6px; }
  }
`;

export default function Header() {
  const [isBot, setIsBot] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [anonName, setAnonName] = useState<string>("User");
  const navigate = useNavigate();

  const getAvatar = (uid: string) =>
    `https://api.dicebear.com/7.x/thumbs/svg?seed=${uid}&radius=50`;

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 80;
      setIsBot(scrolled);
      setCompact(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setAnonName(userSnap.data().anonymousUsername || "User");
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  

  const openChat = () => {
    if (window.botpress) {
      window.botpress.open();
    }
  };

  const navLinks = [
    { label: "Home", href: "/", icon: "🔍" },
    { label: "About Us", href: "/about", icon: "🌿" },
    { label: "Article", href: "/article", icon: "📖" },
    { label: "Help", href: "/help", icon: "💬" },
  ];

  return (
    <>
      <style>{headerStyles}</style>

      {/* ── HEADER ── */}
      <header className={`hdr ${compact ? "hdr-compact" : "hdr-default"}`}>
        <nav className="hdr-inner">

          {/* Logo */}
          <Link to="/" className={`hdr-logo ${compact ? "hdr-logo-sm" : "hdr-logo-lg"}`}>
            The Beacon
          </Link>

          {/* Desktop nav */}
          <div className="hdr-nav">
            {navLinks.map(({ label, href }) => (
              <Link key={label} to={href} className="hdr-link">{label}</Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="hdr-actions">

            {/* Logged-in user pill */}
            {user && (
              <>
                <div className="hdr-user">
                  <img
                    src={user.photoURL || getAvatar(user.uid)}
                    className="hdr-avatar"
                    alt="avatar"
                  />
                  <span className="hdr-username">{anonName}</span>
                </div>
                <button className="hdr-logout" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}

            {/* Sign up (desktop, not logged in, not compact) */}
            {!user && !compact && (
              <Link to="/signup" className="hdr-signup">Sign Up</Link>
            )}

            {/* Bot icon */}
            <img
              src="/photo.jpg"
              id="bp-toggle-chat"
              className="hdr-bot"
              alt="Chat assistant"
              title="Open assistant"
            />

            {/* Hamburger — CSS shows this only on mobile (≤900px) */}
            <button
              className="hdr-ham"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

          </div>
        </nav>
      </header>

      {/* ── MOBILE DRAWER ── */}
      {menuOpen && (
        <div className="drawer-overlay" onClick={() => setMenuOpen(false)}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>

            {/* Drawer header */}
            <div className="drawer-header">
              <span
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: 22,
                  color: "var(--sage)",
                }}
              >
                The Beacon
              </span>
              <button className="drawer-close" onClick={() => setMenuOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {/* User info strip */}
            {user && (
              <div className="drawer-user">
                <img
                  src={user.photoURL || getAvatar(user.uid)}
                  className="drawer-avatar"
                  alt="avatar"
                />
                <div>
                  <div className="drawer-user-name">{anonName}</div>
                  <div className="drawer-user-sub">Beacon member</div>
                </div>
              </div>
            )}

            {/* Nav links */}
            <nav className="drawer-nav">
              {navLinks.map(({ label, href, icon }) => (
                <Link
                  key={label}
                  to={href}
                  className="drawer-link"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="drawer-link-icon">{icon}</span>
                  {label}
                </Link>
              ))}
            </nav>

            {/* Footer actions */}
            <div className="drawer-footer">
              {!user && (
                <Link
                  to="/signup"
                  className="drawer-btn-signup"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up — it's free
                </Link>
              )}
              {user && (
                <button
                  className="drawer-btn-logout"
                  onClick={() => { setMenuOpen(false); handleLogout(); }}
                >
                  Log out
                </button>
              )}
            </div>
          </div>
        </div>
      )}


    </>
  );
}