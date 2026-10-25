import { useCallback, useEffect, useState } from "react";
import { api } from "../lib/api";
import { SECTIONS } from "../../shared/schema.js";
import LoginForm from "./LoginForm";
import SectionEditor from "./SectionEditor";
import MessagesPanel from "./MessagesPanel";
import "./admin.css";

const TABS = [
  ...Object.entries(SECTIONS).map(([key, section]) => ({ key, label: section.label })),
  { key: "messages", label: "Messages" },
];

function AdminApp() {
  const [session, setSession] = useState("checking"); // "checking" | "in" | "out"
  const [content, setContent] = useState(null);
  const [activeTab, setActiveTab] = useState("site");
  const [loadError, setLoadError] = useState("");

  const signOutLocally = useCallback(() => setSession("out"), []);

  useEffect(() => {
    api
      .checkSession()
      .then(({ authenticated }) => setSession(authenticated ? "in" : "out"))
      .catch(() => setSession("out"));
  }, []);

  useEffect(() => {
    if (session !== "in") return;
    api
      .getContent()
      .then(setContent)
      .catch((err) => setLoadError(err.message));
  }, [session]);

  async function handleLogout() {
    await api.logout().catch(() => {});
    setContent(null);
    setSession("out");
  }

  if (session === "checking") {
    return <p className="admin-status">Checking session…</p>;
  }

  if (session === "out") {
    return <LoginForm onLogin={() => setSession("in")} />;
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <h1>Admin</h1>
        <nav>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={tab.key === activeTab ? "active" : ""}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <button type="button" className="admin-logout" onClick={handleLogout}>
          Log out
        </button>
      </aside>

      <main className="admin-main">
        {activeTab === "messages" && <MessagesPanel onUnauthorized={signOutLocally} />}

        {activeTab !== "messages" && loadError && <p className="admin-error">{loadError}</p>}

        {activeTab !== "messages" && !content && !loadError && <p>Loading content…</p>}

        {activeTab !== "messages" && content && (
          <SectionEditor
            key={activeTab}
            sectionKey={activeTab}
            initialData={content[activeTab]}
            onSaved={setContent}
            onUnauthorized={signOutLocally}
          />
        )}
      </main>
    </div>
  );
}

export default AdminApp;
