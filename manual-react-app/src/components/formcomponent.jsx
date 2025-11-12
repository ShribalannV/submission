import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setField, submitForm, resetForm } from "../features/formSlice";
import Popup from "./popup/popup.jsx";
import "./formcomponent.css";

export default function FormComponent() {
  const dispatch = useDispatch();
  const { username, email, password, submittedData } = useSelector(
    (state) => state.form
  );
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitForm()); // snapshot submittedData
    setShowPopup(true); // show popup
    dispatch(resetForm()); // reset only input fields
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <div className="form-section modern-form">
      <h2 className="form-title">Modern Redux Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) =>
              dispatch(setField({ name: "username", value: e.target.value }))
            }
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              dispatch(setField({ name: "email", value: e.target.value }))
            }
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              dispatch(setField({ name: "password", value: e.target.value }))
            }
          />
        </div>
        <div className="button-group">
          <button type="submit" className="submit-btn">
            Submit
          </button>
          <button
            type="button"
            className="reset-btn"
            onClick={() => dispatch(resetForm())}
          >
            Reset
          </button>
        </div>
      </form>

      <Popup show={showPopup} onClose={() => setShowPopup(false)} title="Success">
        <p> Data Submitted Successfully!</p>
      </Popup>
    </div>
  );
}
