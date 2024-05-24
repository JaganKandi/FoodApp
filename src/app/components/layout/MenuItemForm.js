import React, { useEffect, useState } from "react";
import Image from "next/image";
import EditableImage from "@/app/components/layout/EditableImage";
import CustomInput from "@/app/components/layout/CustomInput";
import MenuItemPriceProps from "@/app/components/layout/MenuItemPriceProps";
import DeleteButton from "../DeleteButton";

function MenuItemForm({onDelete, onSubmit, menuItem}) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const[category, setCategory] = useState(menuItem?.category || '')
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraIngridientsPrices, setExtraIngridientsPrices] = useState(menuItem?.extraIngridientsPrices || []);

  const[categories, setCategories] = useState([])

  useEffect(()=>{
    fetch('/api/categories').then(response =>{
      response.json().then(categories =>{
        setCategories(categories)      })
    })
  },[])

  return (
    <form
      onSubmit={(e) =>
        onSubmit(e, {
          image,
          name,
          description,
          basePrice,
          sizes,
          extraIngridientsPrices,
          category
        })
      }
      className="mt-8 max-w-xl mx-auto"
    >
      <div className="flex gap-2 items-start">
        <div className="p-2 relative max-w-[150px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <CustomInput
            labelName="Item name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <CustomInput
            labelName={"Description"}
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>Categroy</label>
          <select value={category} onChange={e => setCategory(e.target.value)} style={{marginTop: '0'}}><option value="-" selected>Pick a category</option>{categories?.length >0 && categories.map(c=> <option value={c._id}>{c.name}</option>)}</select>
          <CustomInput
            labelName={"Base Price"}
            type="text"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
          />
          <MenuItemPriceProps
            name={"Sizes"}
            addLabel={"Add item size"}
            props={sizes}
            setProps={setSizes}
          />
          <MenuItemPriceProps
            name={"Extra ingridients"}
            addLabel={"Add ingridients"}
            props={extraIngridientsPrices}
            setProps={setExtraIngridientsPrices}
          />
          <button type="submit">Save</button>
          {menuItem && <DeleteButton onDelete={onDelete} className="mt-4" type="button">Delete</DeleteButton>}
          
        </div>
      </div>
    </form>
  );
}

export default MenuItemForm;
