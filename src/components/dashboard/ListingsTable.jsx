import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';

import { AppIcon, TableActionsMenu } from 'components';
import defaultStyles from 'common/config';
import { useProfileContext } from 'store/contexts';

const ListingsTable = ({ listings }) => {
  const { myProfile } = useProfileContext();
  return (
    <table className='mr-auto max-w-full w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300'>
      <thead className='bg-gray-200'>
        <tr className='text-dark text-left'>
          <th className='font-semibold text-sm uppercase px-6 py-4'>
            title / category
          </th>
          <th className='font-semibold text-sm uppercase px-6 py-4'>
            country / city
          </th>
          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>
            type
          </th>
          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>
            setup
          </th>
          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>
            utilities
          </th>
          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>
            price
          </th>
          <th className='font-semibold text-sm uppercase px-6 py-4'>actions</th>
        </tr>
      </thead>
      <tbody className='divide-y divide-gray-200'>
        {listings?.map(
          ({
            id,
            category,
            title,
            type,
            rooms,
            bathrooms,
            beds,
            geolocation,
            offerPrice,
            regularPrice,
            squareFeet,
            imgUrls,
            parking,
            furnished,
          }) => {
            return (
              <tr key={id}>
                <td className='px-6 py-4'>
                  <div className='flex items-center space-x-3'>
                    <div className='relative flex text-primary max-w-[150px] '>
                      <img
                        src={imgUrls[0]}
                        alt={title}
                        className='min-w-[150px] h-full'
                      />
                      <div className='text-white absolute w-10 h-5 bg-black/50 px-3 py-2 top-0 left-0 text-sm flex justify-center items-center'>
                        <AppIcon
                          nav
                          Icon={defaultStyles.icons.image_edit}
                          className='mr-2'
                        />
                        {imgUrls.length}
                      </div>
                    </div>
                    <div>
                      <p> {title} </p>
                      <div className='inline-flex items-center'>
                        <AppIcon
                          nav
                          Icon={defaultStyles.icons[category]}
                          size={34}
                          tooltip={category}
                          className='mr-2 text-primary'
                        />
                        <p className='text-gray-500 text-sm font-semibold tracking-wide'>
                          {category}
                        </p>
                      </div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4'>
                  <p> {geolocation?.country} </p>
                  <p className='text-gray-500 text-sm font-semibold tracking-wide'>
                    {geolocation?.city}
                  </p>
                </td>
                <td className='px-6 py-4 text-center'>
                  <span
                    className={`text-white text-sm w-1/3 py-1 ${
                      type === 'rent' ? 'bg-dark/80' : 'bg-darker'
                    }  font-semibold px-2 rounded-md`}
                  >
                    {type === 'rent' ? 'Rent' : 'Sale'}
                  </span>
                </td>
                <td className='px-6 py-4 text-center'>
                  <p className='flex justify-between text-sm font-semibold tracking-wide'>
                    <span className='text-dark'>
                      Size m<sup>2</sup>:
                    </span>
                    <span className='text-darker'>{squareFeet}</span>
                  </p>
                  <p className='flex justify-between text-sm font-semibold tracking-wide'>
                    <span className='text-dark'>Rooms:</span>
                    <span className='text-darker'>{rooms}</span>
                  </p>
                  <p className='flex justify-between text-sm font-semibold tracking-wide'>
                    <span className='text-dark'>Bathrooms:</span>
                    <span className='text-darker'>{bathrooms}</span>
                  </p>
                  <p className='flex justify-between text-sm font-semibold tracking-wide'>
                    <span className='text-dark'>Beds:</span>
                    <span className='text-darker'>{beds}</span>
                  </p>
                </td>
                <td className='px-6 py-4 text-center space-y-2'>
                  <p className='flex justify-between text-sm font-semibold tracking-wide'>
                    <span className='text-dark'>Furnished:</span>
                    <span className='text-darker'>
                      {furnished ? (
                        <AppIcon
                          nav
                          size={20}
                          Icon={defaultStyles.icons.checkIcon}
                          className='text-teal-700'
                        />
                      ) : (
                        <AppIcon
                          nav
                          size={20}
                          Icon={defaultStyles.icons.cancel}
                          className='text-red-500'
                        />
                      )}
                    </span>
                  </p>
                  <p className='flex justify-between text-sm font-semibold tracking-wide'>
                    <span className='text-dark'>Parking:</span>
                    <span className='text-darker'>
                      {parking ? (
                        <AppIcon
                          nav
                          size={20}
                          Icon={defaultStyles.icons.checkIcon}
                          className='text-teal-700'
                        />
                      ) : (
                        <AppIcon
                          nav
                          size={20}
                          Icon={defaultStyles.icons.cancel}
                          className='text-red-500'
                        />
                      )}
                    </span>
                  </p>
                </td>
                <td className='px-6 py-4 text-center space-y-2'>
                  <p className='flex justify-between text-sm font-semibold tracking-wide'>
                    <span className='text-dark'>Regular:</span>
                    <span className='text-darker'>{regularPrice}€</span>
                  </p>
                  {offerPrice && (
                    <p className='flex justify-between text-teal-600 text-sm font-semibold tracking-wide'>
                      <span>Offer:</span> <span>{offerPrice}€</span>
                    </p>
                  )}
                </td>
                <td className='px-6 py-4 text-center'>
                  <TableActionsMenu>
                    <div className='px-1 py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={`/${myProfile?.role}/listings-edit/${id}`}
                            className={`capitalize flex ${
                              active
                                ? `bg-${myProfile?.role}-500 text-white`
                                : 'text-gray-700'
                            }  py-2 px-4 text-sm group transition-colors items-center`}
                          >
                            <AppIcon
                              Icon={defaultStyles.icons.edit}
                              className='mr-2'
                            />
                            edit
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to='/listing'
                            className={`capitalize flex ${
                              active
                                ? `bg-${myProfile?.role}-500 text-white`
                                : 'text-gray-700'
                            }  py-2 px-4 text-sm group transition-colors items-center`}
                          >
                            <AppIcon
                              Icon={defaultStyles.icons.delete}
                              className='mr-2'
                            />
                            delete
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                    <div className='px-1 py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={`/listings/${type}/${id}`}
                            className={`capitalize flex ${
                              active
                                ? `bg-${myProfile?.role}-500 text-white`
                                : 'text-gray-700'
                            }  py-2 px-4 text-sm group transition-colors items-center`}
                          >
                            <AppIcon
                              Icon={defaultStyles.icons.showPassword}
                              className='mr-2'
                              size={18}
                            />
                            show
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </TableActionsMenu>
                </td>
              </tr>
            );
          }
        )}
        <tr className='h-24'>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};

export default ListingsTable;
