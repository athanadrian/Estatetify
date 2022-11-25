const Modal = ({ open, close, children }) => {
  return (
    <>
      {open ? (
        <>
          <div className='fixed inset-0 z-10 overflow-y-auto'>
            <div
              className='fixed inset-0 w-full h-full bg-black opacity-40'
              onClick={close}
            ></div>
            <div className='flex items-center min-h-screen px-4 py-8'>
              <div className='relative w-full max-w-lg tablet:max-w-3xl p-4 mx-auto bg-white rounded-md shadow-lg'>
                <div className='my-3 sm:flex'>{children}</div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
