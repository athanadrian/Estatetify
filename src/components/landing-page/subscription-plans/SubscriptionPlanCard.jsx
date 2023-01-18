import { AppIcon } from 'components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuthContext, useSubscriptionContext } from 'store/contexts';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { mapEnumObject } from 'common/helpers';
import { roles } from 'common/lookup-data';

const SubscriptionPlanCard = ({ best, plan, price, priceText, list, role }) => {
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
        <h3
          className={`text-[22px] font-bold text-${
            mapEnumObject(role, roles).color
          }`}
        >
          {plan}
        </h3>
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
          // isEnrolled={isEnrolled}
          // handlePlan={handlePlan}
          className={`py-5 border-4 border-[#27ae601f] px-10 text-[#27ae60] rounded-[50px] text-xl font-[400] bg-white w-full 
          ${true && 'cursor-default'}
          `}
          style={{
            background: plan === 'Basic' ? '#27ae60' : '#fff',
            color: plan === 'Basic' ? '#fff' : '#27ae60',
          }}
        />
      </div>
    </>
  );
};

export default SubscriptionPlanCard;

const SubscriptionPlanButton = ({
  plan,
  className,
  style,
  //isEnrolled,
  //handlePlan,
}) => {
  const navigate = useNavigate();
  const { loggedIn, user } = useAuthContext();
  const { getMySubscriptions, subscriptions: mySubscriptions } =
    useSubscriptionContext();
  useEffect(() => {
    if (loggedIn && user) {
      getMySubscriptions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn, user?.uid]);

  const checkForActiveSubscriptions = (plan) => {
    let activeSub = null;
    const activeSubscriptions = mySubscriptions.filter((sub) => sub.isActive);
    activeSubscriptions.forEach((sub) => {
      if (sub.plan.toLowerCase() === plan.toLowerCase()) activeSub = sub;
    });
    if (activeSub) return true;
  };

  const isEnrolled = loggedIn && checkForActiveSubscriptions(plan);

  const handlePlan = (plan) => {
    switch (plan.toLowerCase()) {
      case 'free':
        if (
          mySubscriptions.some(
            (sub) =>
              sub.isActive && (sub.plan === 'premium' || sub.plan === 'basic')
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
          mySubscriptions.some((sub) => sub.isActive && sub.plan === 'premium')
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
    <button
      className={className}
      style={style}
      onClick={!isEnrolled ? () => handlePlan(plan) : null}
    >
      {`${isEnrolled ? 'Already enrolled' : `Start ${plan}`}`}
    </button>
  );
};
