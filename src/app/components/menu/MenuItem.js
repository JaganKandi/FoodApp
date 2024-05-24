import React, { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "./MenuItemTile";
import Image from "next/image";

function MenuItem(menuItem) {
  const { image, name, description, basePrice, sizes, extraIngridientsPrices } =
    menuItem;
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);

  const { addToCart } = useContext(CartContext);

  const [showPopup, setShowPopup] = useState(false);

  function handleAddToCartButtonClick() {
    
    const hasOptions = sizes.length > 0 || extraIngridientsPrices.length > 0

    if(hasOptions && !showPopup){
      setShowPopup(true)
      return;
    }
    addToCart(menuItem,selectedSize, selectedExtras)
    setShowPopup(false)
    toast.success('Added to cart!')
  }

  function handleExtrasClick(e, extraThing) {
    const checked = e.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((ex) => ex.name !== extraThing.name);
      });
    }
  }

  let selectedPrice = basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }
  return (
    <>
      {showPopup && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-white p-4 rounded-lg max-w-md max-h-[88vh] overflow-y-scroll scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end items-center sticky top-0">
              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className="w-auto p-0 border-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <Image src={image} width={300} height={200} className="mx-auto" />
            <h2 className="text-lg font-bold text-center mb-3">{name}</h2>
            <p className="text-center text-gray-500 text-sm">{description}</p>
            {sizes?.length > 0 && (
              <div className=" p-2">
                <h3 className="text-center text-gray-700 mt-3">
                  Pick your sizes
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {" "}
                  {sizes.map((size) => (
                    <label className="flex grow items-center gap-2 p-3 rounded-md border">
                      <input
                        onClick={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                        type="radio"
                        name="size"
                      />{" "}
                      {size.name} ${basePrice + size.price}
                    </label>
                  ))}
                </div>
              </div>
            )}
            {extraIngridientsPrices?.length > 0 && (
              <div className=" p-2">
                <h3 className="text-center text-gray-700 mt-3">
                  Pick your extras
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {extraIngridientsPrices.map((extras) => (
                    <label className="flex grow items-center gap-2 p-3 rounded-md border">
                      <input
                        onClick={(e) => handleExtrasClick(e, extras)}
                        type="checkbox"
                        name={extras.name}
                      />{" "}
                      {extras.name} +${extras.price}
                    </label>
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={handleAddToCartButtonClick}
              className="primary sticky bottom-0"
              type="button"
            >
              Add to cart ${selectedPrice}
            </button>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
}

export default MenuItem;
