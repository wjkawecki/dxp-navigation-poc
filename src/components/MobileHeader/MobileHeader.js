import React, { useState } from "react";
import Title from "../Title/Title";
import Button from "../Button/Button";
import MobileNav from "../MobileNav/MobileNav";

import "./MobileHeader.scss";

function MobileHeader({ data }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const openNav = () => {
    setIsNavOpen(true);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <header className="MobileHeader">
      <Title>Flughafen</Title>
      <div className="MobileHeader-buttons">
        {/* <Button type="circle">Search</Button> */}
        <Button onClick={openNav}>Menü</Button>
      </div>
      <MobileNav data={data} isOpen={isNavOpen} closeNav={closeNav} />
    </header>
  );
}

export default MobileHeader;
