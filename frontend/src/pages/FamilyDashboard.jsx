export default function FamilyDashboard({ onLogout }) {
  return (
    <div className="dashboard">
      <h1 className="title">Family Dashboard</h1>
      <button onClick={onLogout} className="logout">Logout</button>
    </div>
  );
}
