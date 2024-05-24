import React from 'react'
import CustomInput from './CustomInput'

function AddressInputs({addressProps, setAddressProps}) {

    const {phone, streetAddress, postalCode, city, country} = addressProps;
  return (
    <>
        <CustomInput labelName="Phone" name="phone" type="tel" placeholder='+1 1234567890' value={phone} onChange = {e => setAddressProps('phone',e.target.value)}/>
              <CustomInput labelName="Street address" name="street" type="text" placeholder='123 North St.' value={streetAddress} onChange = {e => setAddressProps('streetAddress',e.target.value)}/>
              <div className="grid grid-cols-2 gap-2">
                <CustomInput labelName="City" name="city" type="text" placeholder='City of dreams' value={city} onChange = {e => setAddressProps('city',e.target.value)}/>
                <CustomInput labelName="Postal Code" name="zip" type="text" placeholder='12345' value={postalCode} onChange = {e => setAddressProps('postalCode',e.target.value)}/>
              </div>
              <CustomInput labelName="Country" name="country" type="text" placeholder='United States' value={country} onChange = {e => setAddressProps('country',e.target.value)}/>
             
    </>
  )
}

export default AddressInputs