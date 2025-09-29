import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
 
import { useState } from "react";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectName: "Sahajanand Marigold", // hidden field
  });
  const [loading, setLoading] = useState(false);

  // Google Apps Script Web App URL
  const scriptURL = "https://script.google.com/macros/s/AKfycbyx5IH1DGPVxZ9LFQzYb1mpXXF1DQrQL8YjVod2IkKRr7Yvi2FlXztUp6VydW3-tUcx/exec";

  // Brochure PDF URL
  const brochureURL =
    "https://elasticbeanstalk-ap-south-1-471112538523.s3.ap-south-1.amazonaws.com/production/documents/projectdocuments/brochure-1751371180465-468257066.pdf";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(scriptURL, {
        method: "POST",
        body: formData,
        headers: { "Content-Type": "application/json" },
      });
      console.error("res---:", res);
 alert("res   lead!",res);
      if (res.ok) {
        alert("Lead saved to Google Sheet!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectName: formData.projectName,
        });
        setShowForm(false);

        // Automatically download brochure
        const link = document.createElement("a");
        link.href = brochureURL;
        link.download = "The-Gold-Sky-Villa-Brochure.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert("Error saving lead!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error");
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Download Brochure
        </button>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "400px",
            margin: "20px auto",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h3>Fill this form to download brochure</h3>

          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />

          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: "10px" }}
          />

          <input type="hidden" name="projectName" value={formData.projectName} />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#0070f3",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {loading ? "Submitting..." : "Submit & Download"}
          </button>
        </form>
      )}
    </div>
  );
}
