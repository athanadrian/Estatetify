import {
  categories,
  //sizes
} from 'common/lookup-data';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useListingContext } from 'store/contexts';
import AppButton from './elements/AppButton';
import { FormLookUpSelect, FormSelect } from 'components';
const initialFilters = {
  type: 'rent',
  category: '',
  size: '',
  city: '',
};
const Filter = () => {
  const [filters, setFilters] = useState(initialFilters);
  const { getListingsLocations, cities, listingsLocations } =
    useListingContext();
  const {
    type,
    category,
    city,
    // size
    // squareFeet,
    // floor,
    // rooms,
    // beds,
    // bathrooms,
    // furnished,
    // parking,
    // address,
    // latitude,
    // longitude,
    // offer,
    // description,
    // regularPrice,
    // offerPrice,
    // images,
  } = filters;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((preFilters) => ({ ...preFilters, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //
  };

  useEffect(() => {
    getListingsLocations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className='relative flex flex-col mx-20 bottom-20 opacity-80 z-20'>
        <div className='flex flex-row bg-light box-content w-fit rounded-t-xl cursor-pointer'>
          <button
            name='type'
            type='button'
            value={'sale'}
            onClick={handleChange}
            className={`px-16 py-4 font-semibold text-base text-gray-500 rounded-t-xl bg-white
            ${type === 'rent' ? 'bg-light text-dark' : 'bg-white text-white'}`}
          >
            Sale
          </button>
          <button
            name='type'
            type='button'
            value='rent'
            onClick={handleChange}
            className={`px-16 py-4 font-semibold text-base text-dark rounded-t-xl
            ${type === 'sale' ? 'bg-light' : 'bg-white'}`}
          >
            Rent
          </button>
        </div>
        <div className='sticky flex flex-col space-y-3 justify-between bg-white p-10 rounded-r-xl rounded-bl-xl  drop-shadow-xl w-full laptop:space-y-0 laptop:flex-row'>
          {/* <div className='flex flex-col'>
            <div className='text-gray-400 mb-2'>Location</div>
            <div className='text-night font-bold text-xl'>Athens</div>
          </div> */}
          <div className='flex flex-col mb-3'>
            <div className='text-gray-400 mb-2'>Category</div>
            <FormLookUpSelect
              value={category}
              name={'category'}
              className='px-0 py-3 w-full shadow-none rounded bg-transparent hover:bg-white  active:bg-white focus:ring-0 focus:outline-none text-night font-bold text-xl focus:bg-white border-b-2 border-gray-200'
              onChange={handleChange}
              required
              listData={categories}
            />
          </div>
          <div className='flex flex-col mb-3'>
            <div className='text-gray-400 mb-2'>Location</div>
            <FormSelect
              value={city}
              name={'city'}
              className='mb-3 px-0 py-3 w-full shadow-none rounded bg-transparent hover:bg-white  active:bg-white focus:ring-0 focus:outline-none text-night font-bold text-xl focus:bg-white border-b-2 border-gray-200'
              onChange={handleChange}
              required
              listData={cities}
            />
          </div>
          {/* <div className='flex flex-col'>
            <div className='text-gray-400 mb-2'>Size</div>
            <FormSelect
              value={size}
              name={'size'}
              className='py-0 px-0 w-full shadow-none rounded bg-transparent hover:bg-white  active:bg-white focus:ring-0 focus:outline-none text-night font-bold text-xl focus:bg-white'
              onChange={handleChange}
              required
              listData={sizes}
            /> 
          </div>*/}
          {/* <div className='flex flex-col'>
            <div className='text-gray-400 mb-2'>Price Range</div>
            <div className='text-night font-bold text-xl'>
              €85,000 - €98,000
            </div>
          </div> */}
          <AppButton
            label='Search'
            className='w-full laptop:w-1/5 laptop:h-1/5 self-center'
          />
        </div>
      </div>
    </form>
  );
};

export default Filter;
