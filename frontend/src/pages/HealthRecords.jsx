import { useEffect, useState } from "react";
import api from "../services/api";

export default function HealthRecords() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.get("/api/records/")
      .then((res) => {
        setRecords(res.data);
      })
      .catch((err) => {
        console.error("Error loading records:", err);
      });
  }, []);

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Health Records</h1>

      {records.length === 0 ? (
        <p>No records yet.</p>
      ) : (
        <ul>
          {records.map((r) => (
            <li key={r.id}>
              <strong>{r.type}</strong>: {r.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
