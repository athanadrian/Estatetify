import React from 'react';
import { Menu } from '@headlessui/react';
import { Link } from 'react-router-dom';

import { AppIcon, SubscriptionPlanAvatar, TableActionsMenu } from 'components';
import defaultStyles from 'common/config';
import { getDatesLeft } from 'common/helpers';
import { useProfileContext } from 'store/contexts';

const SubscriptionsTable = ({ subscriptions }) => {
  const { myProfile } = useProfileContext();
  return (
    <table className='mr-auto max-w-full w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden'>
      <thead className='bg-gray-200'>
        <tr className='text-dark text-left'>
          <th className='font-semibold text-sm uppercase px-6 py-4'>
            plan / role
          </th>
          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>
            status
          </th>
          <th className='font-semibold text-sm uppercase px-6 py-4 text-left'>
            issued / due
          </th>
          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>
            Payment ID
          </th>
          <th className='font-semibold text-sm uppercase px-6 py-4'> </th>
        </tr>
      </thead>
      <tbody className='divide-y divide-gray-200'>
        {subscriptions?.map(
          ({
            id,
            role,
            isActive,
            purchaseRef,
            createdDate,
            expiringDate,
            plan,
          }) => {
            const { remainingDays } = getDatesLeft(expiringDate, createdDate);
            return (
              <tr key={id}>
                <td className='px-6 py-4'>
                  <div className='flex items-center space-x-3'>
                    <div className='inline-flex'>
                      <SubscriptionPlanAvatar role={role} />
                    </div>
                    <div>
                      <p> {plan} </p>
                      <p className='text-gray-500 text-sm font-semibold tracking-wide'>
                        {role}
                      </p>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 text-center'>
                  <span
                    className={`text-white text-sm w-1/3 py-1 ${
                      isActive ? 'bg-green-600' : 'bg-red-600'
                    }  font-semibold px-2 rounded-full`}
                  >
                    {isActive ? 'Active' : 'Expired'}
                  </span>
                </td>
                <td className='px-6 py-4'>
                  <p> {createdDate} </p>
                  <p className='text-gray-500 text-sm font-semibold tracking-wide'>
                    Due in {remainingDays} days
                  </p>
                </td>
                <td className='px-6 py-4 text-center text-dark hover:text-darker hover:underline '>
                  <Link to={`/${myProfile?.role}/purchases/${purchaseRef}`}>
                    {purchaseRef}
                  </Link>
                </td>
                <td className='px-6 py-4 text-center'>
                  <TableActionsMenu>
                    <div className='px-1 py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={`/${myProfile?.role}/subscriptions/${id}`}
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
                            Subscription
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                    <div className='px-1 py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={`/${myProfile?.role}/purchases/${purchaseRef}`}
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
                            payment
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
        <tr className='h-20'>
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

export default SubscriptionsTable;
