import React, { useState } from "react";

import "./scoresTable.css"

import { HiMiniChevronLeft } from "react-icons/hi2";
import { HiMiniChevronRight } from "react-icons/hi2";

const players = [
  { name: "Alice", score: 42 },
  { name: "Bob", score: 37 },
  { name: "Charlie", score: 55 },
  { name: "Dana", score: 29 },
];

export default function ScoresTable() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky-div">
      {/* Toggle button, fixed to the viewport */}
      
      <button
        onClick={() => setOpen((prev) => !prev)}
        style={{
          position: "sticky",
          top: "16px",
          right: open ? "16px" : "16px",
          zIndex: 1001,
          padding: "8px 14px",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          background: "#112",
          color: "#fff",
          cursor: "pointer",
          transition: "right 0.3s ease",
        }}
      >
        {open ? <HiMiniChevronRight /> : <HiMiniChevronLeft />}
      </button>

      {/* Sticky panel that slides in/out of view */}
      <div
        style={{
          position: "sticky",
          top: "16px",
          right: 0,
          width: "200px",
          transform: open ? "translateX(0)" : "translateX(120%)",
          transition: "transform 0.3s ease",
          background: "#112",
          border: "1px solid #e5e7eb",
          borderRadius: "8px 0 0 8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          zIndex: 1000,
          padding: "12px",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #e5e7eb", padding: "6px 4px" }}>
                Name
              </th>
              <th style={{ borderBottom: "1px solid #e5e7eb", padding: "6px 4px" }}>
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {players.map((p) => (
              <tr key={p.name}>
                <td style={{ padding: "6px 4px" }}>{p.name}</td>
                <td style={{ padding: "6px 4px" }}>{p.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}