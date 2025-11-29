export default function ResearchDashboard({ onLogout }) {
  return (
    <div className="dashboard">
      <h1 className="title">Research Dashboard</h1>
      <button onClick={onLogout} className="logout">Logout</button>
    </div>
  );
}
