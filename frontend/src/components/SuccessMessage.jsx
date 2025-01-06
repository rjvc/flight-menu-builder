import React from "react";

const SuccessMessage = ({ message, onClose }) => {
  return (
    <div
      style={{
        backgroundColor: "#d4edda",
        color: "#155724",
        padding: "15px",
        border: "1px solid #c3e6cb",
        borderRadius: "5px",
        textAlign: "center",
        margin: "20px auto",
        width: "50%",
      }}
    >
      <p>{message}</p>
      <button
        onClick={onClose}
        style={{
          marginTop: "10px",
          backgroundColor: "#155724",
          color: "#ffffff",
          border: "none",
          borderRadius: "3px",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        Close
      </button>
    </div>
  );
};

export default SuccessMessage;
