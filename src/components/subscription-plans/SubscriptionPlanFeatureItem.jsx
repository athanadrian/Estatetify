import React from 'react';
import { useNavigate } from 'react-router';
import { Report } from 'notiflix/build/notiflix-report-aio';

import { useAuthContext } from 'store/contexts';
import { AppIcon } from 'components';
import defaultStyles from 'common/config';

const SubscriptionPlanFeatureItem = ({
  shadow,
  role,
  price,
  plan,
  listings,
  activeSubscriptions,
}) => {
  const { loggedIn } = useAuthContext();
  const navigate = useNavigate();

  const enrolled =
    loggedIn &&
    activeSubscriptions?.some(
      (sub) => sub?.plan.toLowerCase() === plan.toLowerCase()
    );

  const handlePlan = (plan) => {
    switch (plan.toLowerCase()) {
      case 'free':
        if (
          loggedIn &&
          activeSubscriptions?.some(
            (sub) =>
              sub.plan.toLowerCase() === 'premium' ||
              sub.plan.toLowerCase() === 'basic'
          )
        ) {
          Report.info(
            'Subscription Info',
            'You have an active basic/premium package. You can not downgrade to a free subscription',
            'Ok'
          );
          break;
        }
        navigate('/subscription/free');
        break;
      case 'basic': {
        if (
          loggedIn &&
          activeSubscriptions?.some(
            (sub) => sub.plan.toLowerCase() === 'premium'
          )
        ) {
          Report.info(
            'Subscription Info',
            'You have an active premium package. You can not downgrade to a basic subscription',
            'Ok'
          );
          break;
        }
        navigate('/subscription/basic');
        break;
      }
      case 'premium':
        navigate('/subscription/premium');
        break;
      default:
        break;
    }
  };

  return (
    <div
      onClick={!enrolled ? () => handlePlan(plan) : null}
      className={`relative md:w-[31%] w-[90%] mb-12 p-6 bg-white rounded-xl ${shadow} ${
        !enrolled && 'hover:scale-105 cursor-pointer'
      }`}
    >
      <div className='flex md:flex-col md:gap-3 desktop:flex-row justify-between items-center'>
        <div className='flex flex-col gap-2 items-center'>
          <div
            className={`relative bg-transparent w-[50px] h-[50px] p-0.5 rounded-full flex justify-center items-center border border-${role}-500`}
          >
            <span className={`absolute text-${role}-500 top-0 -right-1`}>
              <AppIcon Icon={defaultStyles.icons.star} />
            </span>
            <div
              className={`bg-light w-full h-full text-${role}-500 flex justify-center items-center rounded-full`}
            >
              <AppIcon
                size={24}
                Icon={defaultStyles.icons.profile}
                tooltip={role}
              />
            </div>
          </div>
          <p
            className={`capitalize font-bold text-xl text-${role}-500 tracking-wider`}
          >
            {role}
          </p>
        </div>
        <div className='flex flex-col gap-2'>
          <p className={`capitalize text-xl text-${role}-500 tracking-wider`}>
            {plan} Plan
          </p>
          <p className='text-sm tracking-wide text-gray-500'>
            Manage {listings === 1000 ? 'unlimited' : `up to ${listings}`}{' '}
            listings
          </p>
          <p className='text-lg tracking-wide text-gray-500'>€{price}</p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlanFeatureItem;
