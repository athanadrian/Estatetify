import { FormInput, Label, PageHeader } from 'components';
import React, { useState } from 'react';

const initialValues = {
  type: 'rent',
  title: '',
  rooms: 1,
  bedrooms: 1,
  baths: 1,
  furnished: true,
  parking: false,
  offer: false,
  address: '',
  description: '',
  regularPrice: 0,
  offerPrice: 0,
};

const AddListing = () => {
  const [values, setValues] = useState(initialValues);
  const {
    type,
    title,
    rooms,
    bedrooms,
    baths,
    furnished,
    parking,
    address,
    offer,
    description,
    regularPrice,
    offerPrice,
  } = values;

  const handleChange = (e) => {
    let boolean = null;

    const { name, value } = e.target;
    if (value === 'true') {
      boolean = true;
    }
    if (value === 'false') {
      boolean = false;
    }

    console.log('first', e.target);
    setValues((preValues) => ({ ...preValues, [name]: boolean ?? value }));
  };
  console.log('values', values);

  const handleSubmit = () => {
    //
  };

  return (
    <main className='max-w-md mx-auto px-2'>
      <PageHeader text='Add your Property' />
      <form onSubmit={handleSubmit}>
        <Label text='Sell / Rent' />
        <div className='flex justify-center items-center'>
          <button
            name='type'
            type='button'
            value={'sale'}
            onClick={handleChange}
            className={`rounded shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out mr-3 px-7 py-3 w-full
            ${type === 'rent' ? 'bg-white text-dark' : 'bg-dark text-white'}`}
          >
            Sale
          </button>
          <button
            name='type'
            type='button'
            value='rent'
            onClick={handleChange}
            className={`rounded shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out px-7 py-3 w-full
            ${type === 'sale' ? 'bg-white text-dark' : 'bg-dark text-white'}`}
          >
            Rent
          </button>
        </div>
        <Label text='Title' />
        <FormInput
          name='title'
          value={title}
          type='text'
          maxLength='32'
          minLength='10'
          onChange={handleChange}
          placeholder='Title'
          required
        />
        <div className='flex justify-center items-center space-x-2'>
          <div className='flex flex-col space-y-0.5'>
            <Label text='Rooms' />
            <FormInput
              name='rooms'
              value={rooms}
              min='1'
              max='50'
              type='number'
              onChange={handleChange}
              placeholder='Rooms'
              className='w-full'
              required
            />
          </div>
          <div className='flex flex-col space-y-0.5'>
            <Label text='bedrooms' />
            <FormInput
              name='bedrooms'
              value={bedrooms}
              min='1'
              max='50'
              type='number'
              onChange={handleChange}
              placeholder='bedrooms'
              className='w-full'
              required
            />
          </div>
          <div className='flex flex-col space-y-0.5'>
            <Label text='Baths' />
            <FormInput
              name='baths'
              value={baths}
              min='1'
              max='50'
              type='number'
              onChange={handleChange}
              placeholder='Baths'
              className='w-full'
              required
            />
          </div>
        </div>
        <Label text='Furnished' />
        <div className='flex justify-center items-center'>
          <button
            name='furnished'
            type='button'
            value={true}
            onClick={handleChange}
            className={`rounded shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out mr-3 px-7 py-3 w-full
            ${!furnished ? 'bg-white text-dark' : 'bg-dark text-white'}`}
          >
            Yes
          </button>
          <button
            name='furnished'
            type='button'
            value={false}
            onClick={handleChange}
            className={`rounded shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out px-7 py-3 w-full
            ${furnished ? 'bg-white text-dark' : 'bg-dark text-white'}`}
          >
            No
          </button>
        </div>
        <Label text='Parking Spot' />
        <div className='flex justify-center items-center'>
          <button
            name='parking'
            type='button'
            value={true}
            onClick={handleChange}
            className={`rounded shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out mr-3 px-7 py-3 w-full
            ${!parking ? 'bg-white text-dark' : 'bg-dark text-white'}`}
          >
            Yes
          </button>
          <button
            name='parking'
            type='button'
            value={false}
            onClick={handleChange}
            className={`rounded shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out px-7 py-3 w-full
            ${parking ? 'bg-white text-dark' : 'bg-dark text-white'}`}
          >
            No
          </button>
        </div>
        <Label text='Address' />
        <FormInput
          name='address'
          value={address}
          type='text'
          onChange={handleChange}
          placeholder='Address'
          required
        />
        <Label text='description' />
        <textarea
          name='description'
          value={description}
          type='text'
          onChange={handleChange}
          placeholder='description'
          className='focus:outline-none w-full min-h-max px-4 py-2 text-base placeholder:capitalize placeholder:text-light text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white'
          rows={3}
          required
        />
        <Label text='Offer' />
        <div className='flex justify-center items-center'>
          <button
            name='offer'
            type='button'
            value={true}
            onClick={handleChange}
            className={`rounded shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out mr-3 px-7 py-3 w-full
            ${!offer ? 'bg-white text-dark' : 'bg-dark text-white'}`}
          >
            Yes
          </button>
          <button
            name='offer'
            type='button'
            value={false}
            onClick={handleChange}
            className={`rounded shadow-md hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out px-7 py-3 w-full
            ${offer ? 'bg-white text-dark' : 'bg-dark text-white'}`}
          >
            No
          </button>
        </div>
        <div className='flex justify-between items-center space-x-5'>
          <div className='flex flex-col space-y-0.5 w-1/2'>
            <Label text='regular price' />
            <FormInput
              name='regularPrice'
              value={regularPrice}
              min={50}
              max={500000}
              type='number'
              onChange={handleChange}
              placeholder='regular price'
              className='w-full mr-3'
              required
            />
          </div>
          {type === 'rent' && (
            <div className='flex flex-col flex-1 h-full w-full space-y-6'>
              <Label />
              <p
                text='€ / Month'
                className='text-md  justify-start whitespace-nowrap'
              >
                € / Month
              </p>
            </div>
          )}
        </div>
        {offer && (
          <div className='flex justify-between items-center space-x-5'>
            <div className='flex flex-col space-y-0.5 w-1/2'>
              <Label text='offer price' />
              <FormInput
                name='offerPrice'
                value={offerPrice}
                min={50}
                max={500000}
                type='number'
                onChange={handleChange}
                placeholder='offer price'
                className='w-full mr-3'
                required={offer}
              />
            </div>
            {type === 'rent' && (
              <div className='flex flex-col flex-1 h-full w-full space-y-6'>
                <Label />
                <p
                  text='€ / Month'
                  className='text-md  justify-start whitespace-nowrap'
                >
                  € / Month
                </p>
              </div>
            )}
          </div>
        )}
        <div className='flex flex-col'>
          <Label text='images' className='mb-0' />
          <p className='mt-0 text-sm text-gray-400'>
            The first image will be the cover (max 6)
          </p>
          <label class='block'>
            <span class='sr-only'>Choose Image/s</span>
            <input
              type='file'
              name='images'
              accept='.jpg,.png,.jpeg'
              multiple
              required
              class='mt-3 mb-6 block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-7 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-dark file:text-white hover:file:bg-darker hover:file:shadow-lg transition duration-150 ease-in-out'
            />
          </label>
        </div>
        <button
          type='submit'
          className='mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
        >
          Add Listing
        </button>
      </form>
    </main>
  );
};

export default AddListing;
