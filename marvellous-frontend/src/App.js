import React from "react";
import Batch from "./components/Batch";

function App() {
  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold text-primary">
          Marvellous Batch Management System
        </h1>
        <hr />
      </div>
      <Batch />
    </div>
  );
}

export default App;