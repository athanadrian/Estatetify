import { Link } from 'react-router-dom';
import { useProfileContext } from 'store/contexts';

const CheckoutSuccess = () => {
  const { myProfile } = useProfileContext();

  return (
    <div className='flex justify-center items-center h-[80vh]'>
      <div className='flex justify-center items-center flex-col'>
        <h2 className='text-primary text-center text-5xl'>
          Checkout <span className='hidden sm:inline-block'>was</span>{' '}
          Successful
        </h2>
        <p className='mb-8 text-dark'>Thank you for your purchase</p>
        <div className='flex gap-x-2'>
          <button
            className='bg-dark hover:bg-darker text-white rounded p-4 text-sm w-fit transition'
            type='button'
          >
            <Link to='/home'>&larr; Back Home</Link>
          </button>
          <button
            type='button'
            className='border border-dark text-dark hover:border-dark hover:text-dark rounded p-4 text-sm w-fit transition'
          >
            <Link to={`/${myProfile?.role}/subscriptions`}>
              View History &#x26C1;
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
