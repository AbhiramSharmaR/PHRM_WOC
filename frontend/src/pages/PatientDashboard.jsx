export default function PatientDashboard({ onLogout }) {
  return (
    <div className="dashboard">
      <h1 className="title">Patient Dashboard</h1>
      <button onClick={onLogout} className="logout">Logout</button>
    </div>
  );
}
