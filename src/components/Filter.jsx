import { categories, sizes } from 'common/lookup-data';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useListingContext } from 'store/contexts';
import AppButton from './elements/AppButton';
import { FormLookUpSelect, FormSelect } from 'components';
import { useNavigate } from 'react-router';

const initialFilters = {
  type: 'rent',
  category: null,
  squareFeet: null,
  city: '',
};

const Filter = () => {
  const [filters, setFilters] = useState(initialFilters);
  const navigate = useNavigate();
  const { getListingsLocations, cities } = useListingContext();
  const {
    type,
    category,
    city,
    squareFeet,
    // floor,
    // rooms,
    // beds,
    // bathrooms,
    // furnished,
    // parking,
    // offer,
    // regularPrice,
    // offerPrice,
  } = filters;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFilters((preFilters) => ({ ...preFilters, [name]: value }));
  };

  const handleFilterListings = async () => {
    navigate('/search-results', { state: { filters } });
  };

  const handleClearFilters = async () => {
    setFilters(initialFilters);
  };

  useEffect(() => {
    getListingsLocations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form>
      <div className='relative flex flex-col mx-20 bottom-20 opacity-80 z-20'>
        <div className='flex flex-row bg-light box-content w-fit rounded-t-xl cursor-pointer'>
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
        </div>
        <div className='sticky flex flex-col space-y-3 justify-between bg-white p-10 rounded-r-xl rounded-bl-xl  drop-shadow-xl w-full laptop:space-y-0 laptop:flex-row'>
          <div className='flex flex-col mb-3'>
            <div className='text-gray-400 mb-2'>Category</div>
            <FormLookUpSelect
              value={category}
              name={'category'}
              className='px-0 py-3 w-full shadow-none rounded bg-transparent hover:bg-white  active:bg-white focus:ring-0 focus:outline-none text-night font-bold text-xl focus:bg-white border-b-2 border-gray-200'
              onChange={handleChange}
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
              listData={cities}
            />
          </div>
          <div className='flex flex-col mb-3'>
            <div className='text-gray-400 mb-2'>Size</div>
            <FormLookUpSelect
              value={squareFeet}
              name='squareFeet'
              className='px-0 py-3 w-full shadow-none rounded bg-transparent hover:bg-white  active:bg-white focus:ring-0 focus:outline-none text-night font-bold text-xl focus:bg-white border-b-2 border-gray-200 mb-6'
              onChange={handleChange}
              listData={sizes}
            />
          </div>
          {/* <div className='flex flex-col'>
            <div className='text-gray-400 mb-2'>Price Range</div>
            <div className='text-night font-bold text-xl'>
              €85,000 - €98,000
            </div>
          </div> */}
          <div className='flex flex-col'>
            <AppButton
              onClick={handleFilterListings}
              type='button'
              label='Search'
              className='w-full laptop:w-fit laptop:h-1/3 self-center'
            />
            <AppButton
              onClick={handleClearFilters}
              type='button'
              label='Clear'
              className='w-full tracking-widest text-lg laptop:w-fit laptop:h-1/3 self-center'
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Filter;
