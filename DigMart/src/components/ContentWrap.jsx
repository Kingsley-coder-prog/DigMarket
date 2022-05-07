import React from "react";

export default function ContentWrap({ children }) {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "auto",
        padding: "0 20px",
      }}
    >
      {children}
    </div>
  );
}
