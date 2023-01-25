import React from 'react';
import {
  AppButton,
  PageHeader,
  PricingSummary,
  SubscriptionPlanSummary,
} from 'components';
import { mapEnumObject } from 'common/helpers';
import { roles } from 'common/lookup-data';

const SubscriptionPlanDetails = ({ subscription, handleProceedPayment }) => {
  const { plan, list, role } = subscription;
  const { txtColor } = mapEnumObject(role, roles);

  return (
    <section className='sm:max-w-[95%] max-w-[95%] p-5 bg-white mx-auto my-10'>
      <PageHeader
        title={`${plan} Plan`}
        className={`mb-6 font-normal ${txtColor}`}
      />
      <div className='grid sm:grid-cols-2'>
        <SubscriptionPlanSummary list={list} />
        <div className='my-5 sm:mr-5 '>
          <PricingSummary pricingPlan={plan} />
          <div className='flex justify-start items-center font-extralight mt-3'>
            <AppButton
              type='button'
              onClick={handleProceedPayment}
              label='Proceed Payment'
              className='mb-0'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlanDetails;
