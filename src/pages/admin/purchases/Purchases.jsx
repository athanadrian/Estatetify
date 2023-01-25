import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDatesLeft } from 'common/helpers';
import {
  AppIcon,
  Layout,
  LayoutHeading,
  Loader,
  SubscriptionPlanAvatar,
} from 'components';
import defaultStyles from 'common/config';
import { useSubscriptionContext } from 'store/contexts';
//TODO
//Change to PURCHASES
const Purchases = () => {
  const { getMySubscriptions, isLoading, subscriptions } =
    useSubscriptionContext();

  useEffect(() => {
    getMySubscriptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Loader />;

  return (
    <Layout>
      <div className='bg-white pl-4 desktop:px-4 py-5 min-h-[50vh]'>
        <div className='overflow-x-auto w-full'>
          <LayoutHeading title='Subscriptions' />
          <table className='mr-auto max-w-full w-full whitespace-nowrap rounded-lg bg-gray-100 divide-y divide-gray-300 overflow-hidden'>
            <thead className='bg-primary'>
              <tr className='text-white text-left'>
                <th className='font-semibold text-sm uppercase px-6 py-4'>
                  plan
                </th>
                <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>
                  status
                </th>
                <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>
                  issued
                </th>
                <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>
                  expires
                </th>
                <th className='font-semibold text-sm uppercase px-6 py-4 text-center'>
                  Days Left
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
                }) => {
                  const { remainingDays } = getDatesLeft(
                    expiringDate,
                    createdDate
                  );
                  return (
                    <tr key={id}>
                      <td className='px-6 py-4'>
                        <div className='flex items-center space-x-3'>
                          <div className='inline-flex'>
                            <SubscriptionPlanAvatar role={role} />
                          </div>
                          <div>
                            <p> Basic </p>
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
                      <td className='px-6 py-4 text-center'> {createdDate} </td>
                      <td className='px-6 py-4 text-center'>{expiringDate}</td>
                      <td className='px-6 py-4 text-center'>{remainingDays}</td>
                      <td className='px-6 py-4 text-center text-dark hover:text-darker hover:underline '>
                        <Link to='/'>{purchaseRef} </Link>
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
        </div>
      </div>
    </Layout>
  );
};

export default Purchases;
