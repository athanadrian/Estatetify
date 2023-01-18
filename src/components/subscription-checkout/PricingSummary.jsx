import { subscriptionPlans } from 'common/lookup-data';
import React from 'react';

const PricingSummary = ({ pricingPlan }) => {
  const subscription = subscriptionPlans.find(
    (sub) => sub.plan.toLowerCase() === pricingPlan.toLowerCase()
  );
  const { plan, price, tax } = subscription;
  return (
    <>
      <h1 className='border-b pb-1 text-3xl text-darker font-thin tracking-wider'>
        Pricing Summary
      </h1>
      <div className='mt-2 bg-gray-100'>
        <div className='p-2 flex flex-col text-darker'>
          <div className='flex justify-between items-center'>
            <p className='text-base sm:text-lg font-light'>{plan} Package</p>
            <p className='text-sm sm:text-base font-light pr-3'>
              {+price - (+price * +tax) / 100}€
            </p>
          </div>
          <div className='flex justify-between items-center mt-1'>
            <p className='text-base sm:text-lg font-light'>Taxes {tax}%</p>
            <p className='text-sm sm:text-base font-light pr-3'>
              {(+price * +tax) / 100}€
            </p>
          </div>
          <div className='flex justify-between items-center mt-3'>
            <p className='text-base sm:text-lg font-light'>Other Charges</p>
            <p className='text-sm sm:text-base font-light pr-3'>0€</p>
          </div>
          <div className='flex justify-between items-center mt-6 border-t'>
            <p className='text-base sm:text-lg font-light mt-1'>Subtotal</p>
            <p className='text-sm sm:text-base font-light mt-1 pr-3'>
              {price}€
            </p>
          </div>
          <div className='flex justify-end items-center font-semibold mt-12 border-t'>
            <p className='text-base sm:text-lg  px-3 mt-1 py-[5px] bg-gray-300'>
              Total:
            </p>
            <p className='text-sm sm:text-base px-3 mt-1 py-[7px] bg-gray-300'>
              {price}€
            </p>
          </div>
          <div className='flex justify-start items-center font-extralight'>
            <p className='text-sm sm:text-base mr-2 mt-1'>
              (<span className='text-red-500'>*</span> This is an annual
              subscription)
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingSummary;
