import React, { useState } from "react";
import Trash from "@/app/components/icons/Trash";
import Plus from "@/app/components/icons/Plus";
import ToggleIcon from "@/app/components/icons/ToggleIcon";

function MenuItemPriceProps({ name, addLabel, props, setProps }) {
  const [isOpen, setIsOpen] = useState(false);

  function addSize() {
    setProps((oldSizes) => {
      return [...oldSizes, { name: "", price: 0 }];
    });
  }
  function editSize(e, index, prop) {
    const newValue = e.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }
  function removeSize(idx) {
    setProps((prev) => prev.filter((value, index) => index !== idx));
  }

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <div>
        <button
          className="p-1 justify-start border-0"
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <ToggleIcon
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
          <span>{name}</span>
          <span>({props?.length})</span>
        </button>
      </div>
            {isOpen && <>{props?.length > 0 &&
        props.map((size, index) => (
          <div className="flex gap-2 items-end">
            <div>
              <label>Name</label>
              <input
                style={{ marginTop: 0 }}
                type="text"
                placeholder="Size name"
                value={size.name}
                onChange={(e) => editSize(e, index, "name")}
              />
            </div>
            <div>
              <label>Extra price</label>
              <input
                style={{ marginTop: 0 }}
                type="text"
                placeholder="Extra price"
                value={size.price}
                onChange={(e) => editSize(e, index, "price")}
              />
            </div>
            <div>
              <button
                type="button"
                className=" mb-2 px-1 border-0"
                onClick={() => removeSize(index)}
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      <button type="button" className="bg-white items-center" onClick={addSize}>
        <Plus className="w-4 h-4" /> {addLabel}
      </button>
     </>}
       </div>     
      
  );
}

export default MenuItemPriceProps;
