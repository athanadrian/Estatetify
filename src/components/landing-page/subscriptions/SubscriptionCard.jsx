import { AppIcon } from 'components';
import { useAuth } from 'hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useListingContext, useSubscriptionContext } from 'store/contexts';

const SubscriptionCard = ({ best, plan, price, priceText, list }) => {
  const navigate = useNavigate();
  const { loggedIn, user } = useAuth();
  const { getMySubscriptions, subscriptions } = useSubscriptionContext();
  const { getMyListings, listings } = useListingContext();

  console.log('listings', listings.length);

  useEffect(() => {
    if (loggedIn && user) {
      getMySubscriptions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn, user?.uid]);

  useEffect(() => {
    if (loggedIn && user) {
      getMyListings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid, loggedIn]);

  const isActivated = (subs) => {
    return subs.filter((sub) => sub.isActive && sub.plan !== 'free').length > 0;
  };

  const handlePlan = (plan) => {
    switch (plan.toLowerCase()) {
      case 'free':
        navigate('/sign-up');
        break;
      case 'basic':
        navigate('/subscription/basic');
        break;
      case 'premium':
        navigate('/subscription/premium');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className='md:w-[31%] w-[90%] mb-12 p-8 bg-white rounded-xl shadow-[0_0_20px_0_rgba(0,0,0,0.2)]'>
        {best && (
          <div className='mb-5'>
            <button className=' px-[30px] py-[17px] text-white font-bold bg-[#ff6922] rounded-[50px] '>
              {best}
            </button>
          </div>
        )}
        <h3 className='text-[22px] font-bold'>{plan}</h3>
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
        <SubscriptionButton
          plan={plan}
          loggedIn={loggedIn}
          subscriptions={subscriptions}
          isActivated={isActivated}
          handlePlan={handlePlan}
        />
      </div>
    </>
  );
};

export default SubscriptionCard;

const SubscriptionButton = ({
  plan,
  loggedIn,
  subscriptions,
  isActivated,
  handlePlan,
}) => {
  const isEnrolled =
    (loggedIn && isActivated(subscriptions)) || (loggedIn && plan === 'Free');

  return (
    <button
      className={`py-5 border-4 border-[#27ae601f] px-10 text-[#27ae60] rounded-[50px] text-xl font-[400] bg-white w-full ${
        isEnrolled && 'cursor-default'
      }`}
      style={{
        background: plan === 'Basic' ? '#27ae60' : '#fff',
        color: plan === 'Basic' ? '#fff' : '#27ae60',
      }}
      onClick={!isEnrolled ? () => handlePlan(plan) : null}
    >
      {`${
        isEnrolled
          ? // (loggedIn && isActivated(subscriptions)) ||
            // (loggedIn && plan === 'Free')
            //loggedIn && (isActivated(subscriptions) || plan === 'Free')
            'Already enrolled'
          : `Start ${plan}`
      }`}
    </button>
  );
};
