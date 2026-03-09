
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ServiceModern.scss";
import BookAppointmentModal from "./BookAppointmentModal";

const DoctorList = () => {
  const navigate = useNavigate();
  const { hospitalId } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch Doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/doctors/${hospitalId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [hospitalId]);

  // 🔍 Search filter
  const filteredDoctors = doctors.filter(
    (d) =>
      d.name?.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization?.toLowerCase().includes(search.toLowerCase())
  );

  // 🔹 Token Booking (fixed payload + error handling)
  const bookToken = async (doctor) => {
    const tokenData = {
      userId: 2,                          // ← TODO: Replace with real logged-in user ID
      doctorId: doctor.id,
      branchServiceId: 1                  // ← CHANGE TO A REAL EXISTING ID FROM branch_services TABLE (e.g., run SELECT id FROM branch_services LIMIT 1;)
    };

    console.log("Sending booking payload:", tokenData);  // ← Debug log

    try {
      const res = await fetch("http://localhost:8080/api/tokens/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(tokenData)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      alert(`Token #${data.tokenNumber} booked successfully with Dr. ${doctor.name}! Estimated wait: ${data.estimatedWaitTime} min`);
      setSelectedDoctor(null);
    } catch (err) {
      console.error("Booking failed:", err);
      alert(`Token booking failed: ${err.message}`);
    }
  };

  return (
    <div className="service-page">
      {/* NAVBAR */}
      <div className="service-navbar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div className="nav-brand">
          <div className="logo">🏥</div>
          <div>
            <h2>Doctor Board</h2>
            <p>Hospital ID: {hospitalId}</p>
          </div>
        </div>
        {/* SEARCH */}
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search doctor or specialization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* DOCTOR LIST */}
      <div className="service-table">
        {loading ? (
          <h3 style={{ padding: "20px" }}>Loading doctors...</h3>
        ) : filteredDoctors.length === 0 ? (
          <h3 style={{ padding: "20px" }}>No doctors found</h3>
        ) : (
          filteredDoctors.map((d) => (
            <div key={d.id} className="service-row doctor-board">
              {/* LEFT SIDE */}
              <div className="doctor-left">
                <div className="doctor-avatar">
                  {d.name?.charAt(0)}
                </div>
                <div className="doctor-info-vertical">
                  <div className="doctor-name">{d.name}</div>
                  <div className="doctor-line">
                    <span className="label">Specialization:</span>
                    <span>{d.specialization}</span>
                  </div>
                  <div className="doctor-line">
                    <span className="label">Experience:</span>
                    <span>{d.experience}</span>
                  </div>
                  <div className="doctor-line">
                    <span className="label">OPD Timing:</span>
                    <span>{d.timing}</span>
                  </div>
                  <div className="doctor-line">
                    <span className="label">Rating:</span>
                    <span>⭐ {d.rating} / 5</span>
                  </div>
                </div>
              </div>
              {/* RIGHT SIDE */}
              <div className="doctor-right">
                <span className={`status ${d.status?.toLowerCase()}`}>
                  {d.status}
                </span>
                <button
                  className="token-btn"
                  disabled={d.status !== "Available"}
                  onClick={() => setSelectedDoctor(d)}
                >
                  Get Token
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* BOOK APPOINTMENT MODAL */}
      {selectedDoctor && (
        <BookAppointmentModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onConfirm={() => bookToken(selectedDoctor)}
        />
      )}
    </div>
  );
};

export default DoctorList;