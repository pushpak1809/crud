import React, { useState, useEffect } from "react";
import firedb from "../firebase";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
const Home = () => {
  const [data, setdata] = useState({});
  useEffect(() => {
    firedb.child("books").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setdata({ ...snapshot.val() });
      } else {
        setdata({});
      }
    });
    return () => {
      setdata({});
    };
  }, []);
  const onDelete = (id) => {
    if (window.confirm("Do You want to Delete the Data")) {
      firedb.child(`books/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Data Deleted Successfully");
        }
      });
    }
  };
  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No.</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Author</th>
              <th style={{ textAlign: "center" }}>Price</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={id}>
                  <th scope="row">{index + 1}</th>
                  <td>{data[id].name}</td>
                  <td>{data[id].author}</td>
                  <td>₹{data[id].price}</td>
                  <td>
                    <Link to={`/update/${id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDelete(id)}
                    >
                      Delete
                    </button>
                    <Link to={`/view/${id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
