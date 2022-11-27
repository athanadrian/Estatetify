import React from 'react';

const Footer = () => {
  return (
    <footer className=' bg-main py-5 text-center text-gray-400 mt-12'>
      <div className='container mx-auto'>
        Copyright &copy; {new Date().getFullYear()}.
        <a
          href='https://atana.site'
          target='_blank'
          rel='noreferrer noopener'
          className='mx-2 text-primary'
        >
          DevWith❤️
        </a>
        All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
