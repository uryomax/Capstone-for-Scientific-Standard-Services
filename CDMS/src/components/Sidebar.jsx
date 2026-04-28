// import { Link, useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// export default function Sidebar() {
//   const role = sessionStorage.getItem("role");
//   const navigate = useNavigate();

//   // ==========================
//   // SAVE LOG HELPER
//   // ==========================
//   async function saveLog(action) {
//     try {
//       await fetch("http://localhost:3000/api/logs", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           username: sessionStorage.getItem("activeUser"),
//           name: localStorage.getItem("name"),
//           role: sessionStorage.getItem("userRole"),
//           action,
//           timestamp: new Date().toISOString(),
//         }),
//       });
//     } catch (err) {
//       console.error("Log error:", err);
//     }
//   }

//   // ==========================
//   // TAB/BROWSER CLOSE
//   // ==========================
//   useEffect(() => {
//     const handleBeforeUnload = () => {
//       if (!sessionStorage.getItem("activeUser")) return;
//       sessionStorage.setItem("reloading", "true");

//       const payload = JSON.stringify({
//         username: sessionStorage.getItem("activeUser"),
//         name: localStorage.getItem("name"),
//         role: sessionStorage.getItem("userRole"),
//         action: "logged out",
//         timestamp: new Date().toISOString(),
//       });

//       navigator.sendBeacon(
//         "http://localhost:3000/api/logs",
//         new Blob([payload], { type: "application/json" }),
//       );
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => window.removeEventListener("beforeunload", handleBeforeUnload);
//   }, []);

//   // ==========================
//   // RELOAD RE-LOGIN LOG
//   // ==========================
//   useEffect(() => {
//     if (sessionStorage.getItem("reloading") === "true") {
//       sessionStorage.removeItem("reloading");
//       saveLog("logged in");
//     }
//   }, []);

//   // ==========================
//   // LOGOUT
//   // ==========================
//   async function handleLogout() {
//     await saveLog("logged out");
//     sessionStorage.clear();
//     localStorage.removeItem("name");
//     localStorage.removeItem("username");
//     navigate("/", { replace: true });
//   }
//   return (
//     <aside className="sidebar">
//       <nav className="nav-menu">
//         <p className="nav-label">Main Menu</p>
//         {role === "admin" && (
//           <Link className="nav-link" to="/admin">
//             Dashboard
//           </Link>
//         )}
//         <Link className="nav-link" to="/admin/customer">
//           Customer
//         </Link>
//         <Link className="nav-link" to="/admin/joblist">
//           Job Number List
//         </Link>
//         {role === "admin" && (
//           <Link className="nav-link" to="/admin/addaccount">
//             Add Account
//           </Link>
//         )}
//         {role === "admin" && (
//           <Link className="nav-link" to="/admin/systemactivity">
//             System Activity
//           </Link>
//         )}

//         <p className="nav-label">Calibration</p>
//         <Link className="nav-link" to="/admin/incomingcalib">
//           Incoming Calibration
//         </Link>
//         <Link className="nav-link" to="/admin/ongoinggcalib">
//           On Going Calibration
//         </Link>
//         <Link className="nav-link" to="/admin/sitecalibration">
//           Site Calibration
//         </Link>
//         <Link className="nav-link" to="/admin/standardforcalib">
//           Standard For Calibration
//         </Link>
//         <Link className="nav-link" to="/admin/schedmonitor">
//           Schedule Monitor
//         </Link>

//         <p className="nav-label">Standards</p>
//         <Link className="nav-link" to="/admin/stdforcertification">
//           Std For Certification
//         </Link>
//         <Link className="nav-link" to="/admin/stdforupdate">
//           Std For Update
//         </Link>
//         <Link className="nav-link" to="/admin/recallsys">
//           Recall System
//         </Link>
//         <Link className="nav-link" to="/admin/assetmonitoring">
//           Asset Monitoring
//         </Link>
//         <Link className="nav-link" to="/admin/instrumenttag">
//           Instrument Tag
//         </Link>

//         <p className="nav-label">Quotation</p>
//         <Link className="nav-link" to="/admin/qtnlist">
//           Quotation List
//         </Link>
//         <Link className="nav-link" to="/admin/qtnforcheck">
//           Qtn For Check
//         </Link>
//         <Link className="nav-link" to="/admin/qtnforfile">
//           Qtn For File
//         </Link>
//         <Link className="nav-link" to="/admin/qtnforfolowup">
//           Qtn For Follow Up
//         </Link>

//         <p className="nav-label">Concerns</p>
//         <Link className="nav-link" to="/admin/concernincoming">
//           Concern Incoming
//         </Link>
//         <Link className="nav-link" to="/admin/concernout">
//           Concern Out
//         </Link>

//         <p className="nav-label">Documents</p>
//         <Link className="nav-link" to="/admin/jobreceipt">
//           Job Receipt
//         </Link>
//         <Link className="nav-link" to="/admin/deliveryreceipt">
//           Delivery Receipt
//         </Link>
//         <Link className="nav-link" to="/admin/printagreement">
//           Print Agreement
//         </Link>
//         <Link className="nav-link" to="/admin/printfinal">
//           Print Final
//         </Link>

//         <p className="nav-label">Checking</p>
//         <Link className="nav-link" to="/admin/forcheckingic">
//           For Checking OIC
//         </Link>
//         <Link className="nav-link" to="/admin/forcheckingsig">
//           For Checking Sig
//         </Link>
//         <Link className="nav-link" to="/admin/fortyping">
//           For Typing
//         </Link>
//         <Link className="nav-link" to="/admin/monitoring">
//           Monitoring
//         </Link>
//         <Link className="nav-link" to="/admin/onholdlist">
//           On Hold List
//         </Link>
//       </nav>

//       <div className="sidebar-footer">
//         <div className="user-display">
//           <i className="fas fa-user-circle"></i>
//           <span>{localStorage.getItem("name") || "User"}</span>
//         </div>
//         <a className="nav-link logout" onClick={handleLogout}>
//           <i className="fas fa-sign-out-alt"></i>
//           Logout
//         </a>
//       </div>
//     </aside>
//   );
// }
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Sidebar() {
  const role = sessionStorage.getItem("role");
  const navigate = useNavigate();

  // ==========================
  // SAVE LOG HELPER
  // ==========================
  async function saveLog(action) {
    try {
      await fetch("http://localhost:3000/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: sessionStorage.getItem("activeUser"),
          name: sessionStorage.getItem("activeName"),
          role: sessionStorage.getItem("userRole"),
          action,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("Log error:", err);
    }
  }

  // ==========================
  // TAB/BROWSER CLOSE
  // ==========================
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!sessionStorage.getItem("activeUser")) return;

      const payload = JSON.stringify({
        username: sessionStorage.getItem("activeUser"),
        name: sessionStorage.getItem("activeName"),
        role: sessionStorage.getItem("userRole"),
        action: "logged out",
        timestamp: new Date().toISOString(),
      });

      navigator.sendBeacon(
        "http://localhost:3000/api/logs",
        new Blob([payload], { type: "application/json" }),
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // ==========================
  // LOGOUT
  // ==========================
  async function handleLogout() {
    await saveLog("logged out");
    sessionStorage.clear();
    localStorage.removeItem("name");
    localStorage.removeItem("username");
    navigate("/", { replace: true });
  }

  return (
    <aside className="sidebar">
      <nav className="nav-menu">
        <p className="nav-label">Main Menu</p>
        {(role === "admin" || role === "owner") && (
          <Link className="nav-link" to="/admin">
            Dashboard
          </Link>
        )}
        <Link className="nav-link" to="/admin/customer">
          Customer
        </Link>
        <Link className="nav-link" to="/admin/joblist">
          Job Number List
        </Link>
        {role === "owner" && (
          <Link className="nav-link" to="/admin/accounts">
            Accounts
          </Link>
        )}
        {role === "owner" && (
          <Link className="nav-link" to="/admin/systemactivity">
            System Activity
          </Link>
        )}
        <p className="nav-label">Calibration</p>
        <Link className="nav-link" to="/admin/incomingcalib">
          Incoming Calibration
        </Link>
        <Link className="nav-link" to="/admin/ongoinggcalib">
          On Going Calibration
        </Link>
        <Link className="nav-link" to="/admin/sitecalibration">
          Site Calibration
        </Link>
        <Link className="nav-link" to="/admin/standardforcalib">
          Standard For Calibration
        </Link>
        <Link className="nav-link" to="/admin/schedmonitor">
          Schedule Monitor
        </Link>

        <p className="nav-label">Standards</p>
        <Link className="nav-link" to="/admin/stdforcertification">
          Std For Certification
        </Link>
        <Link className="nav-link" to="/admin/stdforupdate">
          Std For Update
        </Link>
        <Link className="nav-link" to="/admin/recallsys">
          Recall System
        </Link>
        <Link className="nav-link" to="/admin/assetmonitoring">
          Asset Monitoring
        </Link>
        <Link className="nav-link" to="/admin/instrumenttag">
          Instrument Tag
        </Link>

        <p className="nav-label">Quotation</p>
        <Link className="nav-link" to="/admin/qtnlist">
          Quotation List
        </Link>
        <Link className="nav-link" to="/admin/qtnforcheck">
          Qtn For Check
        </Link>
        <Link className="nav-link" to="/admin/qtnforfile">
          Qtn For File
        </Link>
        <Link className="nav-link" to="/admin/qtnforfolowup">
          Qtn For Follow Up
        </Link>

        <p className="nav-label">Concerns</p>
        <Link className="nav-link" to="/admin/concernincoming">
          Concern Incoming
        </Link>
        <Link className="nav-link" to="/admin/concernout">
          Concern Out
        </Link>

        <p className="nav-label">Documents</p>
        <Link className="nav-link" to="/admin/jobreceipt">
          Job Receipt
        </Link>
        <Link className="nav-link" to="/admin/deliveryreceipt">
          Delivery Receipt
        </Link>
        <Link className="nav-link" to="/admin/printagreement">
          Print Agreement
        </Link>
        <Link className="nav-link" to="/admin/printfinal">
          Print Final
        </Link>

        <p className="nav-label">Checking</p>
        <Link className="nav-link" to="/admin/forcheckingic">
          For Checking OIC
        </Link>
        <Link className="nav-link" to="/admin/forcheckingsig">
          For Checking Sig
        </Link>
        <Link className="nav-link" to="/admin/fortyping">
          For Typing
        </Link>
        <Link className="nav-link" to="/admin/monitoring">
          Monitoring
        </Link>
        <Link className="nav-link" to="/admin/onholdlist">
          On Hold List
        </Link>
      </nav>

      <div className="sidebar-footer">
        <div className="user-display">
          <i className="fas fa-user-circle"></i>
          <span>{sessionStorage.getItem("activeName") || "User"}</span>
        </div>
        <a className="nav-link logout" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          Logout
        </a>
      </div>
    </aside>
  );
}
