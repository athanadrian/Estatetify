import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSubscriptionContext } from 'store/contexts';
import { Report } from 'notiflix/build/notiflix-report-aio';

const SubscriptionPlanButton = ({ plan, className, style }) => {
  const navigate = useNavigate();
  const {
    checkForMyActiveSubscriptions,
    //checkIsEnrolledSubscription,
    subscriptions: mySubscriptions,
    isEnrolled,
    getMySubscriptions,
  } = useSubscriptionContext();

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

  useEffect(() => {
    getMySubscriptions();
    checkForMyActiveSubscriptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

export default SubscriptionPlanButton;
