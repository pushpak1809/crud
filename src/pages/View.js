import React, { useState, useEffect } from "react";
import firedb from "../firebase";
import { useParams, Link } from "react-router-dom";
import "./View.css";
const View = () => {
  const [user, setuser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    firedb
      .child(`books/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setuser({ ...snapshot.val() });
        } else {
          setuser({});
        }
      });
  }, [id]);

  return (
    <>
      <div style={{ margin: "150px " }}>
        <div className="card">
          <div className="card-header">
            <p>Book Details</p>
            <div className="container">
              <strong>ID : </strong>
              <span>{id}</span>
              <br />
              <br />
              <strong>NAME : </strong>
              <span>{user.name}</span>
              <br />
              <br />
              <strong>AUTHOR : </strong>
              <span>{user.author}</span>
              <br />
              <br />
              <strong>PRICE : ₹ </strong>
              <span>{user.price}</span>
              <br />
              <br />
              <Link to="/">
                <button className="btn btn-edit">Go Back</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
