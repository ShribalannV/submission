import React from "react";
import { useSelector } from "react-redux";
import "./displaycomponent.css";

export default function DisplayComponent() {
  const submittedData = useSelector((state) => state.form.submittedData);

  return (
    <div className="display-section">
      <div className="modern-console">
        <div className="console-header">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
          <h3>Submitted Data Console</h3>
        </div>
        <div className="console-body">
          {submittedData ? (
            <>
              <div className="console-line">
                <span className="key">Username:</span>
                <span className="value">{submittedData.username}</span>
              </div>
              <div className="console-line">
                <span className="key">Email:</span>
                <span className="value">{submittedData.email}</span>
              </div>
              <div className="console-line">
                <span className="key">Password:</span>
                <span className="value">{submittedData.password}</span>
              </div>
              <div className="console-line">
                <span className="key">Token:</span>
                <span className="value">{submittedData.token}</span>
              </div>
            </>
          ) : (
            <div className="console-empty">No data submitted yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
