"use client";

import { useState, useEffect } from "react";
import React from "react";
import { CSSProperties } from "react";

type Feedback = {
  id: number;
  name: string;
  message: string;
  createdAt: string;
};

export default function Home() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
 
const itemsPerPage = 2;

  // 🔹 Fetch feedbacks
  const fetchFeedbacks = async () => {
    const res = await fetch("/api/feedback");
    const data = await res.json();
    setFeedbacks(data);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // 🔹 Submit form
  const handleSubmit = async (e:React.FormEvent) => {
  e.preventDefault();

  // ✅ Frontend validation
  if (!name.trim()) {
    setStatus("Name is required");
    return;
  }

  if (message.length < 10 || message.length > 200) {
    setStatus("Message must be between 10 and 200 characters");
    return;
  }

  setLoading(true);
  setStatus("");

  const res = await fetch("/api/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, message }),
  });

  const data = await res.json();

  if (!res.ok) {
    setStatus(data.error);
  } else {
    setStatus("✅ Feedback submitted successfully!");
    setName("");
    setMessage("");
    fetchFeedbacks();
    setCurrentPage(1);
  }

  setLoading(false);
};

const startIndex = (currentPage - 1) * itemsPerPage;
const currentItems: Feedback[] = feedbacks.slice(startIndex, startIndex + itemsPerPage);

const totalPages = Math.ceil(feedbacks.length / itemsPerPage);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Feedback App</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          <textarea
            placeholder="Your Feedback"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={styles.textarea}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {/* Status */}
        {status && (
  <p
    style={{
      marginTop: "10px",
      color: status.includes("success") ? "green" : "red",
      fontSize: "14px",
    }}
  >
    {status}
  </p>
)}
        {/* Feedback List */}
        <div style={styles.result}>
          <h3>All Feedback</h3>

          {currentItems.map((f) => (
  <div key={f.id} style={styles.feedbackItem}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <strong>{f.name}</strong>
      <small style={{ color: "#888" }}>
        {new Date(f.createdAt).toLocaleTimeString()}
      </small>
    </div>
    <p style={{ marginTop: "5px" }}>{f.message}</p>
  </div>
))}

<div style={styles.pagination}>
  <button
    onClick={() => setCurrentPage((p) => p - 1)}
    disabled={currentPage === 1}
    style={styles.pageBtn}
  >
    Prev
  </button>

  <span style={{ margin: "0 10px" }}>
    Page {currentPage} of {totalPages}
  </span>

  <button
    onClick={() => setCurrentPage((p) => p + 1)}
    disabled={currentPage === totalPages}
    style={styles.pageBtn}
  >
    Next
  </button>
</div>
        </div>
      </div>
    </div>
  );
}

const styles :{ [key: string]: CSSProperties } = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  card: {
    background: "#fff",
    padding: "35px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "520px",
  },
  title: {
    textAlign: "center",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    minHeight: "80px",
  },
  button: {
    padding: "10px",
    background: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  status: {
    marginTop: "10px",
    color: "green",
  },
  result: {
    marginTop: "20px",
  },
  feedbackItem: {
    marginTop: "10px",
    padding: "10px",
    background: "#f9f9f9",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },

  pagination: {
  marginTop: "15px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
},

pageBtn: {
  padding: "5px 10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  background: "#fff",
  cursor: "pointer",
},
};