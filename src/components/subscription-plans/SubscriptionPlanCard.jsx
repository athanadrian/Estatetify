import { AppIcon } from 'components';
import { useEffect } from 'react';
import { useAuthContext, useSubscriptionContext } from 'store/contexts';
import SubscriptionPlanButton from './SubscriptionPlanButton';

const SubscriptionPlanCard = ({ best, plan, price, priceText, list, role }) => {
  const { loggedIn } = useAuthContext();
  const { checkForMyActiveSubscriptions, activeSubscriptions } =
    useSubscriptionContext();

  useEffect(() => {
    checkForMyActiveSubscriptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  const enrolled =
    loggedIn &&
    activeSubscriptions.some(
      (sub) => sub.plan.toLowerCase() === plan.toLowerCase()
    );

  return (
    <>
      <div className='md:w-[31%] w-[90%] mb-12 p-8 bg-white rounded-xl shadow-[0_0_10px_0_rgba(0,0,0,0.2)]'>
        {best && (
          <div className='mb-5'>
            <button className=' px-[30px] py-[17px] text-white font-bold bg-[#ff6922] rounded-[50px] '>
              {best}
            </button>
          </div>
        )}
        <h3 className={`text-[22px] font-bold text-${role}-500`}>{plan}</h3>
        <h1 className='text-6xl'>
          <span className='text-3xl font-medium'>€</span>
          {price}
          <span className='text-xl font-medium'>/ year</span>
        </h1>
        <p>{priceText}</p>

        <ul className=' mt-10'>
          {list.map((val, index) => {
            const { icon, text, change } = val;
            return (
              <li key={index} className='flex mb-5'>
                <label
                  className=' w-8 h-8 mr-5 rounded-[50%] leading-7 flex justify-center items-center'
                  style={{
                    background: change === 'color' ? '#dc35451f' : '#27ae601f',
                    color: change === 'color' ? '#dc3848' : '#27ae60',
                  }}
                >
                  <AppIcon Icon={icon} size={20} />
                </label>
                <p>{text}</p>
              </li>
            );
          })}
        </ul>
        <SubscriptionPlanButton
          plan={plan}
          activeSubscriptions={activeSubscriptions}
          className={`py-5 border-4 border-[#27ae601f] px-10 text-[#27ae60] rounded-[50px] text-xl font-[400] bg-white w-full 
          ${enrolled && 'cursor-default'}
          `}
          style={{
            background: plan === 'Basic' ? '#27ae60' : '#fff',
            color: plan === 'Basic' ? '#fff' : '#27ae60',
          }}
          enrolled={enrolled}
        />
      </div>
    </>
  );
};

export default SubscriptionPlanCard;
