import React from 'react'
import AddToCartButton from './AddToCartButton'

function MenuItemTile({onAddToCart, ...item}) {

    const { image, name, description, basePrice, sizes, extraIngridientsPrices } = item;
    const hasOptions = sizes.length > 0 || extraIngridientsPrices.length > 0

  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:border hover:border-gray-300 hover:bg-white hover:shadow-lg hover:shadow-black/30 transition-all">
        <img className="max-h-32 block mx-auto" src={image} alt="" />
        <h4 className="font-semibold text-xl my-3">{name}</h4>
        <p className="text-gray-500 text-sm line-clamp-3">
          {description
            ? description
            : "Officia nisi elit nisi aute aliquip irure proident aute cillum. Consequat cillum veniam ut irure consectetur. Enim anim commodo velit aliquip."}
        </p>
        <AddToCartButton image={image} hasOptions={hasOptions} onClick={onAddToCart} basePrice={basePrice} />
      </div>
  )
}

export default MenuItemTile