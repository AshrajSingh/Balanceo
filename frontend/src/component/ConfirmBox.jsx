import React, { useState } from "react";
import "../styleSheets/confirmBox.css"

function ConfirmBox({ message, onConfirm }) {
  const [visible, setVisible] = useState(false);

  const handleClick = () => setVisible(true);
  const handleCancel = () => setVisible(false);
  const handleConfirm = () => {
    setVisible(false);
    onConfirm(); // trigger parent action
  };

  return (
    <>
      <button className="cb-trigger" onClick={handleClick}>
        Delete
      </button>

      {visible && (
        <div className="cb-overlay">
          <div className="cb-box">
            <p>{message}</p>
            <div className="cb-buttons">
              <button className="cb-cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button className="cb-confirm" onClick={handleConfirm}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ConfirmBox; 