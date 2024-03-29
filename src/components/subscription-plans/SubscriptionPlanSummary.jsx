import React from 'react';
import { AppIcon, SubscriptionPlanButton } from 'components';
import { useAuthContext } from 'store/contexts';
import { mapEnumObject } from 'common/helpers';
import { roles } from 'common/lookup-data';

const SubscriptionPlanSummary = ({
  page,
  plan,
  list,
  role,
  activeSubscriptions,
}) => {
  const { loggedIn } = useAuthContext();
  const features = list.filter((feat) => feat.isFeature);
  const { bgColor, brdColor, txtColor } = mapEnumObject(role, roles);

  const enrolled =
    loggedIn &&
    activeSubscriptions?.some(
      (sub) => sub?.plan.toLowerCase() === plan.toLowerCase()
    );
  return (
    <>
      <div className='my-5 sm:mr-5 '>
        <div className='flex justify-between items-center border-b'>
          <h1 className='pb-1 text-3xl text-darker font-thin tracking-wider'>
            Features
          </h1>
          {page && (
            <SubscriptionPlanButton
              className={`mb-2 font-semibold py-2 px-4 rounded-lg ${
                enrolled
                  ? `${bgColor} text-white cursor-default`
                  : `${txtColor} border ${brdColor} bg-transparent hover:border-transparent hover:${bgColor} hover:text-white`
              }`}
              plan={plan}
              enrolled={enrolled}
              activeSubscriptions={activeSubscriptions}
            />
          )}
        </div>
        <div className='mt-2 p-2'>
          <ul>
            {features.map(({ text, description, featureIcon }, index) => (
              <li
                className='mb-4 font-light text-dark text-base sm:text-lg flex justify-start items-center'
                key={index}
              >
                <AppIcon
                  Icon={featureIcon}
                  size={22}
                  className='sm:mr-4 mr-8 text-primary'
                />
                <div className='flex flex-col'>
                  <p>{text}</p>
                  <p className='text-sm text-gray-400 mr-8 sm:mr-4'>
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPlanSummary;
