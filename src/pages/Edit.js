import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./Edit.css";
import firedb from "../firebase";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  author: "",
  price: "",
};

const Edit = () => {
  const [state, setstate] = useState(initialState);
  const [data, setdata] = useState({});
  const { name, author, price } = state;
  const History = useHistory();

  const { id } = useParams();
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
  }, [id]);

  useEffect(() => {
    if (id) {
      setstate({ ...data[id] });
    } else {
      setstate({ ...initialState });
    }
    return () => {
      setstate({ ...initialState });
    };
  }, [id, data]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setstate({ ...state, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !author || !price) {
      toast.error("Field is Empty");
    } else {
      if (!id) {
        firedb.child("books").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Book Added Successfully");
          }
        });
      } else {
        firedb.child(`books/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Data Updated Successfully");
          }
        });
      }

      setTimeout(() => History.push("/"), 300);
    }
  };
  return (
    <>
      <div style={{ margin: "100px" }}>
        <form
          style={{
            margin: "auto",
            padding: "15px",
            maxwidth: "400px",
            alignContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Book Name..."
            value={name || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Book Author..."
            value={author || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Book Price..."
            value={price || ""}
            onChange={handleInputChange}
          />
          <input type="submit" value={id ? "Update" : "Save"} />
        </form>
      </div>
    </>
  );
};

export default Edit;
