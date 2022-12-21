import ReactDOM from 'react-dom';

const Modal = ({ open, close, children }) => {
  return ReactDOM.createPortal(
    <>
      {open ? (
        <>
          <div className='fixed inset-0 z-[99999] overflow-y-auto'>
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
    </>,
    document.getElementById('app-modal')
  );
};

export default Modal;
