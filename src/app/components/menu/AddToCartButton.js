import React from "react";


function AddToCartButton({ hasOptions, onClick, basePrice, image }) {
  if (!hasOptions) {
    return (
      <div className="flying-button-parent mt-4" onClick={onClick}>
        <button src={image} >
          Add to cart $
          {basePrice ? basePrice : Math.floor(Math.random() * (12 - 7 + 1)) + 7}
        </button>
      </div>
    );
  }
  return (
    <button
      type="button"
      className="bg-primary mt-4 text-white rounded-full px-8 py-3"
      onClick={onClick}
    >
      {hasOptions &&(
        <span>Add to cart - from ${basePrice}</span>
      )}
    </button>
  );
}

export default AddToCartButton;
