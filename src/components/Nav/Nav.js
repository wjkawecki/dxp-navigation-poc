import React, { useRef, useState } from "react";
import NavFlyout from "../NavFlyout/NavFlyout";
import MagicLine from "../MagicLine/MagicLine";

import "./Nav.scss";

function Nav({ data }) {
  const element = useRef();
  const [openNavIndex, setOpenNavIndex] = useState(undefined);
  const [[magicLineLeft, magicLineWidth], setMagicLine] = useState([]);
  const [animationDistance, setAnimationDistance] = useState(0);

  const closeNav = () => {
    setAnimationDistance(0);
    setMagicLine([magicLineLeft + magicLineWidth / 2, 0]);
    setOpenNavIndex(undefined);
  };

  const openNav = (e, index) => {
    const item = e.target;
    setAnimationDistance(
      openNavIndex !== undefined ? magicLineLeft - item.offsetLeft : 0
    );
    setMagicLine([item.offsetLeft, item.offsetWidth]);
    setOpenNavIndex(index);
  };

  return (
    <nav className="Nav" ref={element}>
      <ul className="Nav-items">
        {data.map((item, index) => (
          <li
            key={index}
            className={`Nav-item${index === openNavIndex ? " active" : ""}`}
            onClick={e => openNav(e, index)}
          >
            {item.text}
          </li>
        ))}
      </ul>
      <MagicLine left={magicLineLeft} width={magicLineWidth} />
      <NavFlyout
        groups={data[openNavIndex] && data[openNavIndex].groups}
        isOpen={openNavIndex !== undefined}
        index={openNavIndex}
        animationDistance={animationDistance}
        closeNav={closeNav}
      />
    </nav>
  );
}

export default Nav;
