import React from 'react';

const Map = () => {
  return (
    <div className="w-full h-[350px]">
      <iframe
        className="w-full h-full"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.8393746101!2d77.06889918790227!3d28.527352230308683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1dce59d33eab%3A0xbfff8bba2c5dcac2!2sDelhi!5e0!3m2!1sen!2sin!4v1640701332315!5m2!1sen!2sin"
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Map;
