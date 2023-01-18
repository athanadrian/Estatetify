import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { CountryDropdown } from 'react-country-region-selector';
import { Switch } from '@headlessui/react';

import {
  AppButton,
  FormInput,
  Label,
  PageHeader,
  PricingSummary,
} from 'components';
import { useSubscriptionContext } from 'store/contexts';
import { toast } from 'react-toastify';

const initialAddress = {
  name: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postal_code: '',
  country: '',
  phone: '',
};

const CheckoutDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { saveShippingAddressToState, saveBillingAddressToState } =
    useSubscriptionContext();
  const [differentAddress, setDifferentAddress] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(initialAddress);
  const [billingAddress, setBillingAddress] = useState(initialAddress);

  const handleShippingAddress = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handleBillingAddress = (e) => {
    const { name, value } = e.target;
    setBillingAddress((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !shippingAddress.name ||
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postal_code ||
      !shippingAddress.country ||
      !shippingAddress.phone
    ) {
      return toast.warning('Please fill up required fields');
    }
    saveShippingAddressToState(shippingAddress);
    if (differentAddress) {
      if (
        !billingAddress.name ||
        !billingAddress.line1 ||
        !billingAddress.city ||
        !billingAddress.state ||
        !billingAddress.postal_code ||
        !billingAddress.country ||
        !billingAddress.phone
      ) {
        return toast.warning('Please fill up required fields');
      }
      saveBillingAddressToState(billingAddress);
    } else {
      saveBillingAddressToState(shippingAddress);
    }
    navigate('/checkout', { state });
  };

  return (
    <section className='sm:max-w-[95%] max-w-[95%] p-5 bg-white mx-auto my-10'>
      <PageHeader title='Checkout Details' className='mb-6 font-normal' />
      <form onSubmit={handleSubmit}>
        <div className='grid sm:grid-cols-2'>
          <div className='my-5 sm:mr-5 '>
            {/* SHIPPING ADDRESS */}
            <h1 className='border-b pb-1 text-3xl text-darker font-thin tracking-wider'>
              Shipping Address
            </h1>
            <div className='mt-2 p-2'>
              <div className='flex flex-col gap-y-1'>
                <Label text='Recipient Name' className='mb-1' required />
                <FormInput
                  className='border border-gray-300 focus:border-dark rounded w-full px-4 h-14 text-sm outline-none'
                  type='text'
                  placeholder='Recipient Name'
                  name='name'
                  value={shippingAddress.name}
                  onChange={handleShippingAddress}
                  required
                />
                <Label text='Address Line 1' className='mb-1 mt-1' required />
                <FormInput
                  className='border border-gray-300 focus:border-dark rounded w-full px-4 h-14 text-sm outline-none'
                  type='text'
                  placeholder='Address Line 1'
                  name='line1'
                  value={shippingAddress.line1}
                  onChange={handleShippingAddress}
                  required
                />
                <Label text='Address Line 2' className='mb-1 mt-1' />
                <FormInput
                  className='border border-gray-300 focus:border-dark rounded w-full px-4 h-14 text-sm outline-none'
                  type='text'
                  placeholder='Address Line 2'
                  name='line2'
                  value={shippingAddress.line2}
                  onChange={handleShippingAddress}
                />
                <Label text='City' className='mb-1 mt-1' required />
                <FormInput
                  className='border border-gray-300 focus:border-dark rounded w-full px-4 h-14 text-sm outline-none'
                  type='text'
                  placeholder='City'
                  name='city'
                  value={shippingAddress.city}
                  onChange={handleShippingAddress}
                  required
                />
                <Label text='State' className='mb-1 mt-1' required />
                <FormInput
                  className='border border-gray-300 focus:border-dark rounded w-full px-4 h-14 text-sm outline-none'
                  type='text'
                  placeholder='State'
                  name='state'
                  value={shippingAddress.state}
                  onChange={handleShippingAddress}
                  required
                />
                <Label text='Postal Code' className='mb-1 mt-1' required />
                <FormInput
                  className='border border-gray-300 focus:border-dark rounded w-full px-4 h-14 text-sm outline-none'
                  type='text'
                  placeholder='Postal Code'
                  name='postal_code'
                  value={shippingAddress.postal_code}
                  onChange={handleShippingAddress}
                  required
                />
                <Label text='Country' className='mb-1 mt-1' required />
                <CountryDropdown
                  className='border border-gray-300 focus:border-dark rounded w-full px-4 h-14 text-sm outline-none'
                  valueType='short'
                  value={shippingAddress.country}
                  onChange={(val) =>
                    handleShippingAddress({
                      target: {
                        name: 'country',
                        value: val,
                      },
                    })
                  }
                  required
                />
                <Label text='Phone' className='mb-1 mt-1' required />
                <FormInput
                  className='border border-gray-300 focus:border-dark rounded w-full px-4 h-14 text-sm outline-none'
                  type='text'
                  placeholder='Phone'
                  name='phone'
                  value={shippingAddress.phone}
                  onChange={handleShippingAddress}
                  required
                />
              </div>
            </div>
            {/* BILLING ADDRESS ON DEMAND */}
            <div className='flex justify-between items-center border-b pb-1 mt-6'>
              <h1 className='text-3xl text-darker font-thin tracking-wider'>
                Billing Address
              </h1>
              <div className='flex items-center'>
                <p className='w-full text-right text-base text-darker font-thin tracking-wider mr-2'>
                  different address?
                </p>
                <Switch
                  checked={differentAddress}
                  onChange={setDifferentAddress}
                  className={`${
                    differentAddress ? 'bg-teal-700' : 'bg-gray-400'
                  }
          relative inline-flex h-[19px] w-[39px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <span className='sr-only'>Use setting</span>
                  <span
                    aria-hidden='true'
                    className={`${
                      differentAddress ? 'translate-x-5' : 'translate-x-0'
                    }
            pointer-events-none inline-block h-[15px] w-[15px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
            </div>
            {differentAddress && (
              <div className='mt-2 p-2'>
                <div className='flex flex-col gap-y-1'>
                  <Label text='Name' className='mb-1 mt-1' required />
                  <FormInput
                    className='border border-gray-300 focus:border-dark rounded w-full px-4 h-14 text-sm outline-none'
                    type='text'
                    placeholder='Name'
                    name='name'
                    value={billingAddress.name}
                    onChange={handleBillingAddress}
                    required
                  />
                  <Label text='Address Line 1' className='mb-1 mt-1' required />
                  <FormInput
                    className='border border-gray-300 focus:border-dark rounded w-full px-4 h-14 text-sm outline-none'
                    type='text'
                    placeholder='Address Line 1'
                    name='line1'
                    value={billingAddress.line1}
                    onChange={handleBillingAddress}
                    required
                  />
                  <Label text='Address Line 2' className='mb-1 mt-1' />
                  <FormInput
                    className='border border-gray-300 focus:border-dark rounded w-full px-4 h-14 text-sm outline-none'
                    type='text'
                    placeholder='Address Line 2'
                    name='line2'
                    value={billingAddress.line2}
                    onChange={handleBillingAddress}
                  />
                  <Label text='City' className='mb-1 mt-1' required />
                  <FormInput
                    className='border border-gray-300 focus:border-dark rounded w-full px-4 h-14 text-sm outline-none'
                    type='text'
                    placeholder='City'
                    name='city'
                    value={billingAddress.city}
                    onChange={handleBillingAddress}
                    required
                  />
                  <Label text='State' className='mb-1 mt-1' required />
                  <FormInput
                    className='border border-gray-300 focus:border-dark rounded w-full px-4 h-14 text-sm outline-none'
                    type='text'
                    placeholder='State'
                    name='state'
                    value={billingAddress.state}
                    onChange={handleBillingAddress}
                    required
                  />
                  <Label text='Postal Code' className='mb-1 mt-1' required />
                  <FormInput
                    className='border border-gray-300 focus:border-dark rounded w-full px-4 h-14 text-sm outline-none'
                    type='text'
                    placeholder='Postal Code'
                    name='postal_code'
                    value={billingAddress.postal_code}
                    onChange={handleBillingAddress}
                    required
                  />
                  <Label text='Country' className='mb-1 mt-1' required />
                  <CountryDropdown
                    className='border border-gray-300 focus:border-dark rounded w-full px-4 h-14 text-sm outline-none'
                    valueType='short'
                    value={billingAddress.country}
                    onChange={(val) =>
                      handleBillingAddress({
                        target: {
                          name: 'country',
                          value: val,
                        },
                      })
                    }
                    required
                  />
                  <Label text='Phone' className='mb-1 mt-1' required />
                  <FormInput
                    className='border border-gray-300 focus:border-dark rounded w-full px-4 h-14 text-sm outline-none'
                    type='text'
                    placeholder='Phone'
                    name='phone'
                    value={billingAddress.phone}
                    onChange={handleBillingAddress}
                    required
                  />
                </div>
              </div>
            )}
          </div>
          <div className='my-5 sm:mr-5 '>
            <PricingSummary pricingPlan={state} />
            <div className='flex justify-start items-center font-extralight mt-3'>
              <AppButton type='submit' label='Checkout' className='mb-0' />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CheckoutDetails;
