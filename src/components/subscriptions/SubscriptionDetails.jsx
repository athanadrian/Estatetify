import React from 'react';
import { AppButton, AppIcon, PageHeader } from 'components';

const SubscriptionDetails = ({ subscription }) => {
  const { plan, price, tax, list } = subscription;
  const features = list.filter((feat) => feat.isFeature);
  return (
    <section className='sm:max-w-[95%] max-w-[95%] p-5 bg-white mx-auto my-10'>
      <PageHeader title={`${plan} Subscription`} className='mb-6 font-normal' />
      <div className='grid sm:grid-cols-2'>
        <div className='my-5 sm:mr-5 '>
          {' '}
          <h1 className='border-b pb-1 text-3xl text-darker font-thin tracking-wider'>
            Features
          </h1>
          <div className='mt-2 p-2'>
            <ul>
              {features.map(({ text, description, featureIcon }, index) => (
                <li
                  className='mb-4 font-light text-dark text-base sm:text-lg flex justify-start items-center'
                  key={index}
                >
                  <AppIcon
                    Icon={featureIcon}
                    size={22}
                    className='sm:mr-4 mr-8 text-primary'
                  />
                  <div className='flex flex-col'>
                    <p>{text}</p>
                    <p className='text-sm text-gray-400 mr-8 sm:mr-4'>
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='my-5 sm:mr-5 '>
          {' '}
          <h1 className='border-b pb-1 text-3xl text-darker font-thin tracking-wider'>
            Pricing
          </h1>
          <div className='mt-2 bg-gray-100'>
            <div className='p-2 flex flex-col text-darker'>
              <div className='flex justify-between items-center'>
                <p className='text-base sm:text-lg font-light'>
                  {plan} Package
                </p>
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
                <p className='text-sm sm:text-base mr-2'>
                  (<span className='text-red-500'>*</span> This is an annual
                  subscription)
                </p>
              </div>
              <div className='flex justify-start items-center font-extralight mt-12'>
                <AppButton
                  type='button'
                  onClick={() => {}}
                  label='Proceed Payment'
                  className='mb-0'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionDetails;
