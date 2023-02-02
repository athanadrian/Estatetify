import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  AppButton,
  FormImageInput,
  FormInput,
  FormLookUpSelect,
  Label,
  LayoutHeading,
  Loader,
} from 'components';

import { useNavigate, useParams } from 'react-router';
import { categories, floors } from 'common/lookup-data';
import { useAuthContext, useListingContext } from 'store/contexts';
import { getGeoData } from 'common/helpers';
import { Layout } from 'components';

const EditListing = () => {
  const initialValues = {
    type: 'rent',
    title: '',
    category: null,
    squareMeters: 20,
    floor: '',
    rooms: 1,
    beds: 1,
    bathrooms: 1,
    furnished: true,
    parking: false,
    offer: false,
    address: '',
    latitude: 0,
    longitude: 0,
    description: '',
    regularPrice: 0,
    offerPrice: 0,
    images: null,
    imgUrls: [],
  };
  const navigate = useNavigate();
  const { listingId } = useParams();
  const { user, logOut } = useAuthContext();
  const {
    handleUploadImageToStorage,
    deleteImageFromStorage,
    editListing,
    isLoading,
    setLoading,
    getListing,
    listing,
  } = useListingContext();
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [values, setValues] = useState(initialValues);
  const {
    type,
    title,
    category,
    squareMeters,
    floor,
    rooms,
    beds,
    bathrooms,
    furnished,
    parking,
    address,
    latitude,
    longitude,
    offer,
    description,
    regularPrice,
    offerPrice,
    images,
    imgUrls,
  } = values;

  const showFloor =
    values.category === 'condo' ||
    values.category === 'office' ||
    values.category === 'apartment';

  const handleChange = (e) => {
    let boolean = null;

    const { name, value } = e.target;
    if (value === 'true') {
      boolean = true;
    }
    if (value === 'false') {
      boolean = false;
    }

    if (e.target.files)
      setValues((preValues) => ({ ...preValues, images: e.target.files }));

    if (!e.target.files)
      setValues((preValues) => ({ ...preValues, [name]: boolean ?? value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (imgUrls.length === 0) {
      setLoading(false);
      toast.warning('You must upload at least 1 image!');
      return;
    }

    if (+offerPrice >= +regularPrice) {
      setLoading(false);
      toast.error('Offer price should be lower than regular price!');
      return;
    }
    let geolocation = {};
    let location;
    if (geolocationEnabled) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
      );
      const data = await response.json();
      geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;
      geolocation.address = data.results[0]?.formatted_address ?? '';
      geolocation.city =
        getGeoData('locality', data.results[0]?.address_components) ?? '';
      geolocation.state =
        getGeoData('administrative', data.results[0]?.address_components) ?? '';
      geolocation.country =
        getGeoData('country', data.results[0]?.address_components) ?? '';

      location = data.status === 'ZERO_RESULTS' && undefined;

      if (location === undefined) {
        setLoading(false);
        toast.error('Please enter a valid address!');
        return;
      }
    } else {
      setGeolocationEnabled(false);
      geolocation.lat = latitude;
      geolocation.lng = longitude;
      geolocation.address = address;
    }

    const listingData = {
      ...values,
      geolocation,
      squareMeters: Number(values.squareMeters),
      regularPrice: Number(values.regularPrice),
      offerPrice: Number(values.offerPrice),
    };
    delete listingData.images;
    delete listingData.latitude;
    delete listingData.longitude;
    !listingData.offer && delete listingData.offerPrice;
    await editListing(listingId, listingData);

    navigate(`/listings/${type}/${listingId}`);
    setLoading(false);
    toast.success('Listing updated successfully!');
  };

  const handleUploadImages = async () => {
    if (images === null || images.length === 0) {
      toast.warning('Pick up to 6 images before uploading');
      return;
    }

    if (imgUrls.length === 6 || images.length > 6) {
      toast.warning('You are not allowed to upload more than 6 images');
      return;
    }

    const tempImgUrls = await Promise.all(
      [...images].map((image) => handleUploadImageToStorage(image))
    ).catch((error) => {
      setLoading(false);
      console.log('😱 Error Add Listing imgUrls: ', error);
      toast.error('Images not uploaded!');
      return;
    });
    setValues((preValues) => ({
      ...preValues,
      imgUrls: [...imgUrls, ...tempImgUrls],
      images: null,
    }));
  };

  const handleDeleteListingImage = async (imgUrl) => {
    try {
      await deleteImageFromStorage(imgUrl);
      const tempImgUrls = imgUrls.filter((img) => img !== imgUrl);
      setValues((preValues) => ({
        ...preValues,
        imgUrls: tempImgUrls,
      }));
      toast.success('Temporary image removed successfully');
    } catch (error) {
      console.log('😱 Error remove Avatar: ', error);
      toast.error('Temporary image was not removed!');
    }
  };

  useEffect(() => {
    getListing(listingId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingId]);

  useEffect(() => {
    if (listing !== undefined)
      setValues((newValues) => ({ ...newValues, ...listing }));
  }, [listing]);

  useEffect(() => {
    if (listing !== undefined && user && listing?.userRef !== user?.uid) {
      //TODO
      // logOut();
      // navigate('/sign-in');
      toast.error(`You don't have permissions for that action!`);
    }
  }, [listing, user, logOut, navigate]);

  if (isLoading) return <Loader />;
  return (
    <Layout>
      <section className='max-w-lg mx-auto px-2'>
        <LayoutHeading icon='edit' title='Edit Property' className='mb-2' />
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
          <div className='flex justify-center items-center space-x-3'>
            <div className='flex flex-col space-y-0.5 w-full'>
              <Label text='category' />
              <FormLookUpSelect
                value={category}
                name={'category'}
                className='px-4 py-3 w-full rounded shadow-lg bg-primary hover:bg-dark focus:bg-darker transition duration-150 focus:ring-0 focus:outline-none text-white'
                onChange={handleChange}
                required
                listData={categories}
              />
            </div>
            <div className='flex flex-col space-y-0.5 w-full'>
              <Label text='square Feet' />
              <FormInput
                name='squareMeters'
                value={squareMeters}
                min='20'
                max='500'
                type='number'
                onChange={handleChange}
                placeholder='sq feet'
                required
              />
            </div>
            <div className='flex flex-col space-y-0.5 w-full'>
              <Label text='Floor' />
              <FormLookUpSelect
                value={floor}
                name={'floor'}
                className='capitalize px-4 py-3 w-full rounded shadow-lg bg-primary hover:bg-dark focus:bg-darker transition duration-150 focus:ring-0 focus:outline-none text-white'
                onChange={handleChange}
                required={showFloor}
                listData={floors}
              />
            </div>
          </div>
          <div className='flex justify-center items-center space-x-2'>
            <div className='flex flex-col space-y-0.5 w-full'>
              <Label text='Rooms' />
              <FormInput
                name='rooms'
                value={rooms}
                min='1'
                max='50'
                type='number'
                onChange={handleChange}
                placeholder='Rooms'
                required
              />
            </div>
            <div className='flex flex-col space-y-0.5 w-full'>
              <Label text='beds' />
              <FormInput
                name='beds'
                value={beds}
                min='1'
                max='50'
                type='number'
                onChange={handleChange}
                placeholder='beds'
                required={furnished}
                disabled={!furnished}
              />
            </div>
            <div className='flex flex-col space-y-0.5 w-full'>
              <Label text='Bathrooms' />
              <FormInput
                name='bathrooms'
                value={bathrooms}
                min='1'
                max='50'
                type='number'
                onChange={handleChange}
                placeholder='Bathrooms'
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
          {!geolocationEnabled && (
            <div className='flex justify-center items-center space-x-2 w-full'>
              <div className='flex flex-col space-y-0.5 w-full'>
                <Label text='latitude' />
                <FormInput
                  name='latitude'
                  value={latitude}
                  min='-90'
                  max='90'
                  type='number'
                  onChange={handleChange}
                  placeholder='latitude'
                  required={!geolocationEnabled}
                />
              </div>
              <div className='flex flex-col space-y-0.5 w-full'>
                <Label text='longitude' />
                <FormInput
                  name='longitude'
                  value={longitude}
                  min='-180'
                  max='180'
                  type='number'
                  onChange={handleChange}
                  placeholder='longitude'
                  required={!geolocationEnabled}
                />
              </div>
            </div>
          )}
          <Label text='description' />
          <textarea
            name='description'
            value={description}
            type='text'
            onChange={handleChange}
            placeholder='description'
            className='border border-gray-300 focus:border-dark rounded w-full p-4 h-36 text-sm text-gray-400 outline-none resize-none placeholder:capitalize placeholder:text-light placeholder:text-base'
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
          <FormImageInput
            onChange={(e) => {
              handleChange(e);
            }}
            pickedImages={images?.length ?? 0}
            uploadedImgUrls={imgUrls}
            handleDelete={handleDeleteListingImage}
            handleUpload={handleUploadImages}
            multiple
          />
          <AppButton type='submit' label='Update Listing' />
        </form>
      </section>
    </Layout>
  );
};

export default EditListing;
