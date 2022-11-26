const Modal = ({ open, close, children }) => {
  return (
    <>
      {open ? (
        <>
          <div className='fixed inset-0 z-10 overflow-y-auto'>
            <div
              className='fixed inset-0 w-full h-full bg-black opacity-70'
              onClick={close}
            ></div>
            <div className='flex items-center min-h-screen px-4 py-12'>
              {children}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
