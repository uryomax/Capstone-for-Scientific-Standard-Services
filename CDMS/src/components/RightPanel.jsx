import { useState, useEffect } from "react";

export default function RightPanel() {
  const name =
    sessionStorage.getItem("activeName") || // ← changed
    sessionStorage.getItem("activeUser") || // ← changed
    "Unknown User";

  const [activeUsers, setActiveUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCurrentlyLoggedIn();
  }, []);

  function formatTime(ts) {
    return new Date(ts).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  async function loadCurrentlyLoggedIn() {
    try {
      const res = await fetch("http://localhost:3000/api/logs");
      const logs = await res.json();

      const seen = new Set();
      const users = logs
        .filter((log) => log.action?.toLowerCase().includes("log"))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .filter((log) => {
          if (seen.has(log.username)) return false;
          seen.add(log.username);
          return log.action?.toLowerCase().includes("in");
        });

      setActiveUsers(users);
    } catch (err) {
      console.error("Failed to load logs:", err);
      setError("Failed to load.");
    }
  }

  return (
    <aside className="sidebar-right">
      <div className="right-panel panel-top">
        <h3>System Status</h3>
      </div>

      <div className="right-panel panel-bottom">
        <h3>Currently Logged In</h3>
        <div className="panel-content">
          {error && <p style={{ padding: "10px", color: "#888" }}>{error}</p>}
          {activeUsers.length === 0 && !error && (
            <p style={{ padding: "10px", color: "#888" }}>No active users.</p>
          )}
          {activeUsers.map((log, index) => (
            <div className="log-entry" key={index}>
              <div className="log-left">
                <span className="log-dot"></span>
                <div>
                  <div className="log-name">{log.username}</div>
                  <div className="log-meta">{log.name}</div>
                </div>
              </div>
              <span className="log-meta">{formatTime(log.timestamp)}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
