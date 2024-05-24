"use client";

import React, { useContext, useEffect, useState } from "react";
import SectionHeaders from "../components/layout/SectionHeaders";
import { CartContext } from "../components/AppContext";
import { cartProductPrice } from "../components/AppContext";
import Image from "next/image";
import Trash from "../components/icons/Trash";
import CustomInput from "../components/layout/CustomInput";
import AddressInputs from "../components/layout/AddressInputs";
import useProfile from "../components/UseProfile";

// I implemented CartPage functionalities and collaborated on styling such as form arrangement and UX design

function CartPage() {
  const { cartProducts, removeCartProducts } = useContext(CartContext);
  const { data: profileData } = useProfile();
  console.log(profileData);

  const [address, setAddress] = useState({});

  useEffect(() => {
    const {
      phone,
      street: streetAddress,
      city,
      country,
      zip: postalCode,
    } = profileData;
    const addressFromProfile = {
      phone,
      streetAddress,
      city,
      country,
      postalCode,
    };
    if (profileData?.city) {
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let total = 0;
  for (const p of cartProducts) {
    total += cartProductPrice(p);
  }

  function handleAddress(propName, value) {
    setAddress((prevAddress) => {
      return { ...prevAddress, [propName]: value };
    });
  }

  async function proceedToCheckOut(e){
      const response =  await fetch('/api/checkout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          address, cartProducts
        })
      })
      const link = await response.json()
      window.location = link;
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>

      <div className="mt-8 grid gap-8 grid-cols-2">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <div className="flex gap-4 mb-2 border-b py-2 items-center">
                <div className="w-24">
                  <Image src={product.image} width={250} height={240} />
                </div>
                <div className="grow">
                  <h3 className="font-medium">{product.name}</h3>
                  {product.size && (
                    <div className="text-sm text-gray-800">
                      Size: <span>{product.size.name || "Regular"}</span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div className="text-sm text-gray-500">
                      <span>
                        {product.extras.map((extra) => (
                          <div className="">
                            {extra.name} ${extra.price}
                          </div>
                        ))}
                      </span>
                    </div>
                  )}
                </div>
                <div className="font-semibold text-lg">
                  ${cartProductPrice(product)}
                </div>
                <div className="ml-2" type="button">
                  <button
                    className="p-2 border-0"
                    onClick={() => removeCartProducts(index)}
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          <div className="py-2 pr-16 flex gap-4 items-center  justify-end">
            <div className="text-gray-500 text-md">
              Amount:
              <br  />
              Delivery:<br />
              Tax:<br />
              Totoal:
            </div>
            <div className=" pl-2">
              ${total}
              <br />
              $5<br/>
              ${(total + 5)*0.08}<br />
             <span className="text-primary text-lg font-semibold"> ${Math.round(total + 5)*1.08}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg h-fit">
          <h2>Checkout</h2>
          <form>
            <AddressInputs
              addressProps={address}
              setAddressProps={handleAddress}
            />
            <button type="submit" onClick={proceedToCheckOut}>Pay ${total}</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
