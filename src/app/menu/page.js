"use client";

import React, { useEffect, useState } from "react";
import SectionHeaders from "../components/layout/SectionHeaders";
import MenuItem from "../components/menu/MenuItem";


// I implemented Menupage State management and fetching along with rendering the items 
// collaboration: for UX design (CSS grid layout)

function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/categories").then((response) => {
      response.json().then((categories) => {
        setCategories(categories);
      });
    });
    fetch("/api/menu-items").then((response) => {
      response.json().then((menuItems) => {
        //console.log(menuItems);
        setMenuItems(menuItems);
      });
    });
  }, []);

  return (
    <section className="mt-8">
      {categories?.length > 0 &&
        categories.map((c) => (
          <div>
            <div className="text-center">
              <SectionHeaders mainHeader={c.name} />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 mb-14">
                {menuItems.filter((i) => i.category === c._id).map((item) => (
                <div>{<MenuItem {...item}/>}</div>
        ))}
            </div>
            
          </div>
        ))}
    </section>
  );
}

export default MenuPage;
