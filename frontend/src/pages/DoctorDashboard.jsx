export default function DoctorDashboard({ onLogout }) {
  return (
    <div className="dashboard">
      <h1 className="title">Doctor Dashboard</h1>
      <button onClick={onLogout} className="logout">Logout</button>
    </div>
  );
}
