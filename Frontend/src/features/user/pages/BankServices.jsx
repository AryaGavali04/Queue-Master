// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import "../styles/ServiceModern.scss";

// const BankServices = () => {
//   const navigate = useNavigate();
//   const { bankName } = useParams();
//   const [selectedService, setSelectedService] = useState(null);
//   const [search, setSearch] = useState("");

//   const [formData, setFormData] = useState({
//     fullName: "",
//     mobile: "",
//     email: "",
//     idType: "",
//     idNumber: "",
//     date: "",
//     time: "",
//     notes: "",
//     agree: false,
//   });

//   const services = [
//     {
//       id: 1,
//       name: "Account Opening",
//       description: "Open savings or current account",
//       counter: "Counter 1",
//       timing: "10:00 AM – 3:00 PM",
//       status: "Available",
//     },
//     {
//       id: 2,
//       name: "Cash Deposit / Withdrawal",
//       description: "Cash transactions and cheque deposits",
//       counter: "Counter 3",
//       timing: "10:00 AM – 4:00 PM",
//       status: "Busy",
//     },
//     {
//       id: 3,
//       name: "Loan Enquiry",
//       description: "Home, car, and personal loan guidance",
//       counter: "Loan Desk",
//       timing: "11:00 AM – 2:00 PM",
//       status: "Available",
//     },
//     {
//       id: 4,
//       name: "Card Services",
//       description: "ATM/Debit/Credit card issues",
//       counter: "Help Desk",
//       timing: "10:30 AM – 3:30 PM",
//       status: "Limited",
//     },
//   ];

//   const filteredServices = services.filter(
//     (s) =>
//       s.name.toLowerCase().includes(search.toLowerCase()) ||
//       s.description.toLowerCase().includes(search.toLowerCase()) ||
//       s.counter.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleGetToken = (service) => {
//     setSelectedService(service);
//   };

//   const closeModal = () => {
//     setSelectedService(null);
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.agree) {
//       alert("Please accept terms before booking.");
//       return;
//     }

//     console.log("BOOKING DATA:", {
//       service: selectedService.name,
//       bank: decodeURIComponent(bankName),
//       ...formData,
//     });

//     alert(`Token booked successfully for ${selectedService.name}`);
//     closeModal();
//   };

//   return (
//     <div className="service-page">
//       {/* NAVBAR */}
//       <div className="service-navbar">
//         <button className="back-btn" onClick={() => navigate(-1)}>
//           ← Back
//         </button>

//         <div className="nav-brand">
//           <div className="logo">🏦</div>
//           <div>
//             <h2>Bank Service Board</h2>
//             <p>{decodeURIComponent(bankName)}</p>
//           </div>
//         </div>

//         {/* Search Bar */}
//         <div className="navbar-search">
//           <input
//             type="text"
//             placeholder="Search service..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* SERVICE LIST */}
//       <div className="service-table">
//         {filteredServices.map((s) => (
//           <div key={s.id} className="service-row doctor-board">
//             <div className="doctor-left">
//               <div className="doctor-avatar">{s.name.charAt(0)}</div>
//               <div className="doctor-info-vertical">
//                 <div className="doctor-name">{s.name}</div>
//                 <div className="doctor-line">
//                   <span className="label">Service:</span>
//                   <span>{s.description}</span>
//                 </div>
//                 <div className="doctor-line">
//                   <span className="label">Counter:</span>
//                   <span>{s.counter}</span>
//                 </div>
//                 <div className="doctor-line">
//                   <span className="label">Service Time:</span>
//                   <span>{s.timing}</span>
//                 </div>
//               </div>
//             </div>

//             <div className="doctor-right">
//               <span className={`status ${s.status.toLowerCase()}`}>
//                 {s.status}
//               </span>

//               <button
//                 className="token-btn"
//                 disabled={s.status !== "Available"}
//                 onClick={() => handleGetToken(s)}
//               >
//                 Get Token
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* BOOKING MODAL */}
//       {selectedService && (
//         <div className="modal-overlay">
//           <div className="modal-card compact">
//             <div className="modal-header">
//               <div>
//                 <h3>Book Bank Service Token</h3>
//                 <div className="doctor-ref">
//                   {selectedService.name} — {decodeURIComponent(bankName)}
//                 </div>
//               </div>
//               <button className="close-btn" onClick={closeModal}>✕</button>
//             </div>

//             <form className="modal-form" onSubmit={handleSubmit}>
//               <div className="form-grid">
//                 <div className="form-group">
//                   <label>Full Name *</label>
//                   <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
//                 </div>

//                 <div className="form-group">
//                   <label>Mobile Number *</label>
//                   <input type="tel" name="mobile" pattern="[0-9]{10}" value={formData.mobile} onChange={handleChange} required />
//                 </div>

//                 <div className="form-group">
//                   <label>Email Address</label>
//                   <input type="email" name="email" value={formData.email} onChange={handleChange} />
//                 </div>

//                 <div className="form-group">
//                   <label>ID Proof Type *</label>
//                   <select name="idType" value={formData.idType} onChange={handleChange} required>
//                     <option value="">Select ID</option>
//                     <option>Aadhaar Card</option>
//                     <option>PAN Card</option>
//                     <option>Driving License</option>
//                     <option>Passport</option>
//                     <option>Voter ID</option>
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label>ID Number *</label>
//                   <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} required />
//                 </div>

//                 <div className="form-group">
//                   <label>Appointment Date *</label>
//                   <input type="date" name="date" value={formData.date} onChange={handleChange} required />
//                 </div>

//                 <div className="form-group">
//                   <label>Preferred Time Slot *</label>
//                   <input type="time" name="time" value={formData.time} onChange={handleChange} required />
//                 </div>
//               </div>

//               <div className="form-group full">
//                 <label>Purpose / Notes</label>
//                 <textarea rows="2" name="notes" value={formData.notes} onChange={handleChange} />
//               </div>

//               <div className="checkbox-group">
//                 <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} id="agree" />
//                 <label htmlFor="agree">I confirm the information provided is correct</label>
//               </div>

//               <div className="modal-actions">
//                 <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
//                 <button type="submit" className="confirm-btn">Confirm Booking</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BankServices;




// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import "../styles/ServiceModern.scss";

// const BankServices = () => {
//   const navigate = useNavigate();
//   const { branchId } = useParams(); // ✅ MUST be branchId

//   const [services, setServices] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   // ✅ FETCH SERVICES FROM YOUR CONTROLLER
//   useEffect(() => {
//   fetch(`http://localhost:8080/api/branch-services/${branchId}`)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("Fetched services:", data);
//       setServices(data);
//     })
//     .catch((err) => console.error(err));
// }, [branchId]);

//   const filteredServices = services.filter(
//     (s) =>
//       s.name?.toLowerCase().includes(search.toLowerCase()) ||
//       s.description?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="service-page">
//       {/* NAVBAR */}
//       <div className="service-navbar">
//         <button className="back-btn" onClick={() => navigate(-1)}>
//           ← Back
//         </button>

//         <div className="nav-brand">
//           <div className="logo">🏦</div>
//           <div>
//             <h2>Bank Services</h2>
//             <p>Branch ID: {branchId}</p>
//           </div>
//         </div>

//         <div className="navbar-search">
//           <input
//             type="text"
//             placeholder="Search service..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* SERVICE LIST */}
//       <div className="service-table">
//         {loading ? (
//           <h3 style={{ padding: "20px" }}>Loading services...</h3>
//         ) : filteredServices.length === 0 ? (
//           <h3 style={{ padding: "20px" }}>No services found</h3>
//         ) : (
//           filteredServices.map((service) => (
//             <div key={service.id} className="service-row">
//               <div>
//                 <div className="service-name">{service.name}</div>
//                 <div className="service-meta">
//                   {service.description}
//                 </div>
//                 <div className="service-meta">
//                   ⏱ {service.timing}
//                 </div>
//               </div>

//               <div className={`status ${service.status?.toLowerCase()}`}>
//                 {service.status}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default BankServices;







// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import "../styles/ServiceModern.scss";

// const BankServices = () => {
//   const navigate = useNavigate();
//   const { branchId } = useParams();

//   const [services, setServices] = useState([]);
//   const [selectedService, setSelectedService] = useState(null);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     mobile: "",
//     email: "",
//     idType: "",
//     idNumber: "",
//     date: "",
//     time: "",
//     notes: "",
//     agree: false,
//   });

//   // ✅ FETCH SERVICES FROM BACKEND
//   useEffect(() => {
//     if (!branchId) return;

//     fetch(`http://localhost:8080/api/branch-services/${branchId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setServices(Array.isArray(data) ? data : []);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching services:", err);
//         setServices([]);
//         setLoading(false);
//       });
//   }, [branchId]);

//   const filteredServices = services.filter(
//     (s) =>
//       s.name?.toLowerCase().includes(search.toLowerCase()) ||
//       s.description?.toLowerCase().includes(search.toLowerCase()) ||
//       s.counter?.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleGetToken = (service) => {
//     setSelectedService(service);
//   };

//   const closeModal = () => {
//     setSelectedService(null);
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.agree) {
//       alert("Please accept terms before booking.");
//       return;
//     }

//     console.log("BOOKING DATA:", {
//       service: selectedService.name,
//       branchId,
//       ...formData,
//     });

//     alert(`Token booked successfully for ${selectedService.name}`);
//     closeModal();
//   };

//   return (
//     <div className="service-page">
//       {/* NAVBAR */}
//       <div className="service-navbar">
//         <button className="back-btn" onClick={() => navigate(-1)}>
//           ← Back
//         </button>

//         <div className="nav-brand">
//           <div className="logo">🏦</div>
//           <div>
//             <h2>Bank Service Board</h2>
//             <p>Branch ID: {branchId}</p>
//           </div>
//         </div>

//         <div className="navbar-search">
//           <input
//             type="text"
//             placeholder="Search service..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* SERVICE LIST */}
//       <div className="service-table">
//         {loading ? (
//           <h3 style={{ padding: "20px" }}>Loading services...</h3>
//         ) : filteredServices.length === 0 ? (
//           <h3 style={{ padding: "20px" }}>No services found</h3>
//         ) : (
//           filteredServices.map((s) => (
//             <div key={s.id} className="service-row doctor-board">
//               <div className="doctor-left">
//                 <div className="doctor-avatar">
//                   {s.name?.charAt(0)}
//                 </div>
//                 <div className="doctor-info-vertical">
//                   <div className="doctor-name">{s.name}</div>

//                   <div className="doctor-line">
//                     <span className="label">Service:</span>
//                     <span>{s.description}</span>
//                   </div>

//                   <div className="doctor-line">
//                     <span className="label">Counter:</span>
//                     <span>{s.counter}</span>
//                   </div>

//                   <div className="doctor-line">
//                     <span className="label">Service Time:</span>
//                     <span>{s.timing}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="doctor-right">
//                 <span className={`status ${s.status?.toLowerCase()}`}>
//                   {s.status}
//                 </span>

//                 <button
//                   className="token-btn"
//                   disabled={s.status !== "Available"}
//                   onClick={() => handleGetToken(s)}
//                 >
//                   Get Token
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* BOOKING MODAL */}
//       {selectedService && (
//         <div className="modal-overlay">
//           <div className="modal-card compact">
//             <div className="modal-header">
//               <div>
//                 <h3>Book Bank Service Token</h3>
//                 <div className="doctor-ref">
//                   {selectedService.name} — Branch {branchId}
//                 </div>
//               </div>
//               <button className="close-btn" onClick={closeModal}>
//                 ✕
//               </button>
//             </div>

//             <form className="modal-form" onSubmit={handleSubmit}>
//               <div className="form-grid">
//                 <div className="form-group">
//                   <label>Full Name *</label>
//                   <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
//                 </div>

//                 <div className="form-group">
//                   <label>Mobile Number *</label>
//                   <input type="tel" name="mobile" pattern="[0-9]{10}" value={formData.mobile} onChange={handleChange} required />
//                 </div>

//                 <div className="form-group">
//                   <label>Email Address</label>
//                   <input type="email" name="email" value={formData.email} onChange={handleChange} />
//                 </div>

//                 <div className="form-group">
//                   <label>ID Proof Type *</label>
//                   <select name="idType" value={formData.idType} onChange={handleChange} required>
//                     <option value="">Select ID</option>
//                     <option>Aadhaar Card</option>
//                     <option>PAN Card</option>
//                     <option>Driving License</option>
//                     <option>Passport</option>
//                     <option>Voter ID</option>
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label>ID Number *</label>
//                   <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} required />
//                 </div>

//                 <div className="form-group">
//                   <label>Appointment Date *</label>
//                   <input type="date" name="date" value={formData.date} onChange={handleChange} required />
//                 </div>

//                 <div className="form-group">
//                   <label>Preferred Time Slot *</label>
//                   <input type="time" name="time" value={formData.time} onChange={handleChange} required />
//                 </div>
//               </div>

//               <div className="form-group full">
//                 <label>Purpose / Notes</label>
//                 <textarea rows="2" name="notes" value={formData.notes} onChange={handleChange} />
//               </div>

//               <div className="checkbox-group">
//                 <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} id="agree" />
//                 <label htmlFor="agree">I confirm the information provided is correct</label>
//               </div>

//               <div className="modal-actions">
//                 <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
//                 <button type="submit" className="confirm-btn">Confirm Booking</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BankServices;


















import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // Make sure axios is installed: npm install axios
import "../styles/ServiceModern.scss";

const BankServices = () => {
  const navigate = useNavigate();
  const { branchId } = useParams();

  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    idType: "",
    idNumber: "",
    date: "",
    time: "",
    notes: "",
    agree: false,
  });

  // Replace with real logged-in user ID (from context, localStorage, auth state, etc.)
  const currentUserId = 1; // ← TEMPORARY – CHANGE THIS IN PRODUCTION

  // FETCH SERVICES FROM BACKEND
  useEffect(() => {
    if (!branchId) return;

    setLoading(true);
    axios
      .get(`http://localhost:8080/api/branch-services/${branchId}`)
      .then((res) => {
        setServices(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching services:", err);
        setServices([]);
        setLoading(false);
      });
  }, [branchId]);

  const filteredServices = services.filter(
    (s) =>
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.description?.toLowerCase().includes(search.toLowerCase()) ||
      s.counter?.toLowerCase().includes(search.toLowerCase())
  );

  const handleGetToken = (service) => {
    setSelectedService(service);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const closeModal = () => {
    setSelectedService(null);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agree) {
      setErrorMessage("Please accept terms before booking.");
      return;
    }

    if (!selectedService) {
      setErrorMessage("No service selected.");
      return;
    }

    if (!currentUserId) {
      setErrorMessage("Please log in to book a token.");
      return;
    }

    const payload = {
      userId: currentUserId,
      doctorId: null,                     // ← null if no doctor for bank services
      branchServiceId: selectedService.id,
    };

    console.log("Sending booking payload:", payload);

    setBookingLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/tokens/book",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Booking success:", response.data);

      setSuccessMessage(
        `Token booked successfully! Token #${response.data.tokenNumber}`
      );

      // Optional: close modal after a few seconds
      setTimeout(() => {
        closeModal();
      }, 3000);
    } catch (err) {
      console.error("Booking error:", err);

      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Failed to book token. Please try again later.";

      setErrorMessage(errorMsg);
    } finally {
      setBookingLoading(false);
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
          <div className="logo">🏦</div>
          <div>
            <h2>Bank Service Board</h2>
            <p>Branch ID: {branchId}</p>
          </div>
        </div>
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* SERVICE LIST */}
      <div className="service-table">
        {loading ? (
          <h3 style={{ padding: "20px" }}>Loading services...</h3>
        ) : filteredServices.length === 0 ? (
          <h3 style={{ padding: "20px" }}>No services found</h3>
        ) : (
          filteredServices.map((s) => (
            <div key={s.id} className="service-row doctor-board">
              <div className="doctor-left">
                <div className="doctor-avatar">{s.name?.charAt(0)}</div>
                <div className="doctor-info-vertical">
                  <div className="doctor-name">{s.name}</div>
                  <div className="doctor-line">
                    <span className="label">Service:</span>
                    <span>{s.description}</span>
                  </div>
                  <div className="doctor-line">
                    <span className="label">Counter:</span>
                    <span>{s.counter}</span>
                  </div>
                  <div className="doctor-line">
                    <span className="label">Service Time:</span>
                    <span>{s.timing}</span>
                  </div>
                </div>
              </div>
              <div className="doctor-right">
                <span className={`status ${s.status?.toLowerCase()}`}>
                  {s.status}
                </span>
                <button
                  className="token-btn"
                  disabled={s.status !== "Available"}
                  onClick={() => handleGetToken(s)}
                >
                  Get Token
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* BOOKING MODAL */}
      {selectedService && (
        <div className="modal-overlay">
          <div className="modal-card compact">
            <div className="modal-header">
              <div>
                <h3>Book Bank Service Token</h3>
                <div className="doctor-ref">
                  {selectedService.name} — Branch {branchId}
                </div>
              </div>
              <button className="close-btn" onClick={closeModal}>
                ✕
              </button>
            </div>

            {successMessage && (
              <div
                style={{
                  color: "green",
                  margin: "15px 0",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div
                style={{
                  color: "red",
                  margin: "15px 0",
                  textAlign: "center",
                }}
              >
                {errorMessage}
              </div>
            )}

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    pattern="[0-9]{10}"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>ID Proof Type *</label>
                  <select
                    name="idType"
                    value={formData.idType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select ID</option>
                    <option>Aadhaar Card</option>
                    <option>PAN Card</option>
                    <option>Driving License</option>
                    <option>Passport</option>
                    <option>Voter ID</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>ID Number *</label>
                  <input
                    type="text"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Appointment Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Preferred Time Slot *</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group full">
                <label>Purpose / Notes</label>
                <textarea
                  rows="2"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  id="agree"
                />
                <label htmlFor="agree">
                  I confirm the information provided is correct
                </label>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                  disabled={bookingLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="confirm-btn"
                  disabled={bookingLoading}
                >
                  {bookingLoading ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankServices;