import React from "react";

const SideWidgets = () => {
  const publicUrl = process.env.PUBLIC_URL;

  return (
    <>
      <div className="side-icons-left">
        <img src={`${publicUrl}/icon.png`} alt="Icon" id="icon" />
        <a href="tel:+923020887777">
          <img src={`${publicUrl}/phone.png`} alt="Phone" />
        </a>
        <a href="mailto:alisocial233@gmail.com">
          <img src={`${publicUrl}/mail.png`} alt="Mail" />
        </a>
      </div>
      <div className="vertical-text-widget">
        <p>delivering perfection</p>
      </div>
      <div className="vertical-text-widget-2">
        <p>voice your needs</p>
      </div>
      <div className="vertical-text-widget-small">
        <p>know your contacts</p>
      </div>
    </>
  );
};

export default SideWidgets;
