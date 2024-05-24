import React, { useState } from "react";

function DeleteButton({ onDelete, children, ...props }) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="absolute bg-black/80 inset-0 items-center justify-center h-full flex">
        <div className="p-6 rounded-lg bg-white">
          <div className="border-b pb-5"><h1>Are you sure you want to delete?</h1></div>
          <div className="flex gap-2 mt-10 ml-40">
            <button type="button" onClick={() => setShowConfirm(false)}>
              Cancel
            </button>
            <button
              className="primary"
              onClick={() => {
                setShowConfirm(false);
                onDelete();
              }}
            >
              Yes,&nbsp;delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button {...props} onClick={() => setShowConfirm(true)}>
      {children}
    </button>
  );
}

export default DeleteButton;
