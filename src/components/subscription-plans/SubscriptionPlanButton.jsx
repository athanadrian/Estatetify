import { useNavigate } from 'react-router';
import { useAuthContext } from 'store/contexts';
import { Report } from 'notiflix/build/notiflix-report-aio';

const SubscriptionPlanButton = ({
  activeSubscriptions,
  plan,
  className,
  style,
  enrolled,
}) => {
  const { loggedIn } = useAuthContext();
  const navigate = useNavigate();

  const handlePlan = (plan) => {
    switch (plan.toLowerCase()) {
      case 'free':
        if (
          loggedIn &&
          activeSubscriptions.some(
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
          activeSubscriptions.some(
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
    <button
      className={className}
      style={style}
      onClick={!enrolled ? () => handlePlan(plan) : null}
    >
      {`${enrolled ? 'Enrolled' : `Start ${plan}`}`}
    </button>
  );
};

export default SubscriptionPlanButton;
