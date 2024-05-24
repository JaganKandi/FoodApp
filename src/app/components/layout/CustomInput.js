import React from "react";

function CustomInput({labelName, ...props}) {
  return (
    <div>
      <label className="text-gray-500 text-xs">{labelName}</label>
      <input
        style={{ marginTop: 0 }}
        {...props}
        // onChange={(e) => setUserName(e.target.value)}
      />
    </div>
  );
}

export default CustomInput;
