import { AppIcon, SubscriptionPlanAvatar } from 'components';
import React from 'react';
import { Link } from 'react-router-dom';
import defaultStyles from 'common/config';
import { getDatesLeft } from 'common/helpers';
import { useProfileContext } from 'store/contexts';

const SubscriptionsTable = ({ subscriptions }) => {
  const { myProfile } = useProfileContext();
  return (
    <table className='mr-auto max-w-full w-full whitespace-nowrap rounded-lg bg-gray-100 divide-y divide-gray-300 overflow-hidden'>
      <thead className='bg-primary'>
        <tr className='text-white text-left'>
          <th className='font-semibold text-sm uppercase px-6 py-4'> plan </th>
          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>
            {' '}
            status{' '}
          </th>
          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>
            {' '}
            issued{' '}
          </th>
          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>
            {' '}
            expires{' '}
          </th>
          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>
            {' '}
            Days Left{' '}
          </th>
          <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>
            Payment ID{' '}
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
                        {' '}
                        {role}{' '}
                      </p>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 text-center'>
                  {' '}
                  <span
                    className={`text-white text-sm w-1/3 py-1 ${
                      isActive ? 'bg-green-600' : 'bg-red-600'
                    }  font-semibold px-2 rounded-full`}
                  >
                    {' '}
                    {isActive ? 'Active' : 'Expired'}{' '}
                  </span>{' '}
                </td>
                <td className='px-6 py-4 text-center'> {createdDate} </td>
                <td className='px-6 py-4 text-center'> {expiringDate} </td>
                <td className='px-6 py-4 text-center'> {remainingDays} </td>
                <td className='px-6 py-4 text-center text-dark hover:text-darker hover:underline '>
                  {' '}
                  <Link to={`/${myProfile?.role}/purchases/${purchaseRef}`}>
                    {purchaseRef}{' '}
                  </Link>
                </td>
                <td className='px-6 py-4 text-center'>
                  <AppIcon Icon={defaultStyles.icons.actions} />
                </td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
};

export default SubscriptionsTable;
