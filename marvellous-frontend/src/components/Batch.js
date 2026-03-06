import React, { useEffect, useState } from "react";
import axios from "axios";

function Batch() {

  const [batches, setBatches] = useState([]);
  const [name, setName] = useState("");
  const [fees, setFees] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = () => {
    axios.get("http://localhost:8080/batches")
        .then(res => {
        const fixedData = res.data.map(batch => ({
            ...batch,
            id: batch.id || batch._id
        }));
        setBatches(fixedData);
        })
        .catch(err => console.log(err));
    };

  const saveBatch = () => {

    if (!name || !fees) {
      alert("Please fill all fields");
      return;
    }

    const batchData = {
      name: name,
      fees: parseInt(fees)
    };

    if (editId === null) {
      axios.post("http://localhost:8080/batches", batchData)
        .then(() => {
          fetchBatches();
          clearForm();
        });
    } else {
      axios.put(`http://localhost:8080/batches/id/${editId}`, batchData)
        .catch(err => {
        console.log("Update error:", err);
        alert("Update failed");
    });
    }
  };

  const deleteBatch = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      axios.delete(`http://localhost:8080/batches/id/${id}`)
        .then(() => fetchBatches());
    }
  };

  const editBatch = (batch) => {
    setName(batch.name);
    setFees(batch.fees);
    setEditId(batch.id || batch._id);
  };

  const clearForm = () => {
    setName("");
    setFees("");
    setEditId(null);
  };

  return (
    <div>

      {/* Form Card */}
      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white">
          {editId === null ? "Add New Batch" : "Update Batch"}
        </div>
        <div className="card-body">

          <div className="row">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Batch Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-md-5">
              <input
                type="number"
                className="form-control"
                placeholder="Enter Fees"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
              />
            </div>

            <div className="col-md-2 d-grid">
              <button
                className={`btn ${editId === null ? "btn-success" : "btn-warning"}`}
                onClick={saveBatch}
              >
                {editId === null ? "Add" : "Update"}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Table Card */}
      <div className="card shadow">
        <div className="card-header bg-dark text-white">
          Batch List
        </div>
        <div className="card-body">

          <table className="table table-striped table-hover text-center">
            <thead className="table-primary">
              <tr>
                <th>Batch Name</th>
                <th>Fees</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {batches.length === 0 ? (
                <tr>
                  <td colSpan="3">No Data Available</td>
                </tr>
              ) : (
                batches.map((batch) => (
                  <tr key={batch.id || batch._id}>
                    <td>{batch.name}</td>
                    <td>₹ {batch.fees}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-info me-2"
                        onClick={() => editBatch(batch)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteBatch(batch.id || batch._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}

export default Batch;