import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import MobileNavItem from "../MobileNavItem/MobileNavItem";
import Button from "../Button/Button";

import "./MobileNav.scss";

function MobileNav({ data, isOpen, closeNav }) {
  const element = useRef();
  const navItemClassName = "MobileNavItem";
  const navItemHeadingClassName = navItemClassName + "-heading";
  const navItemShadowClassName = navItemClassName + "-shadow";
  const navItemContentClassName = navItemClassName + "-content";
  const navItemCoverClassName = navItemClassName + "-cover";
  const [navItemHeadingHeights, setNavItemHeadingHeights] = useState([]);

  const scrollToItem = (index, nextSibling) => {
    const offsetTop =
      nextSibling.offsetTop -
      navItemHeadingHeights.slice(0, index + 1).reduce((a, b) => a + b, 0);

    element.current.scroll({
      top: offsetTop,
      left: 0,
      behavior: "smooth"
    });
  };

  const scrollListener = () => {
    const currentState = element.current.scrollTop;
    const containerHeight =
      element.current.scrollHeight - element.current.clientHeight;
    const scrollStatePercentage = (currentState / containerHeight) * 100;

    return scrollStatePercentage;
  };

  const handleScroll = () => {
    element.current.style.backgroundSize = `3px ${scrollListener()}%`;
  };

  useEffect(() => {
    const nav = element.current;
    const navItemsHeadings = nav
      ? [...element.current.querySelectorAll(`.${navItemHeadingClassName}`)]
      : [];
    const navItemHeadingHeights = [];

    navItemsHeadings.forEach(heading => {
      navItemHeadingHeights.push(heading.offsetHeight);

      setNavItemHeadingHeights(navItemHeadingHeights);
    });
  }, [isOpen, navItemHeadingClassName]);

  useEffect(() => {
    const nav = element.current;
    const navItemsContents = nav
      ? [...element.current.querySelectorAll(`.${navItemContentClassName}`)]
      : [];
    const lastNavItemsContent =
      navItemsContents.length && navItemsContents[navItemsContents.length - 1];

    const scrollToActiveItem = () => {
      const activeEl = nav.querySelector(".active");
      const activeElParent = activeEl && activeEl.offsetParent;

      element.current.scroll({
        top:
          activeEl.offsetTop +
          activeElParent.offsetTop -
          navItemHeadingHeights
            .slice(0, parseInt(activeElParent.dataset.index, 10) + 1)
            .reduce((a, b) => a + b, 0),
        left: 0
        // behavior: "smooth"
      });
    };

    if (lastNavItemsContent) {
      lastNavItemsContent.style.minHeight =
        nav.offsetHeight -
        navItemHeadingHeights.reduce((a, b) => a + b, 0) +
        "px";
    }

    if (nav && nav.querySelector(".active")) {
      scrollToActiveItem();
    }
  }, [navItemHeadingHeights, navItemContentClassName]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            key="MobileNav"
            className="MobileNav"
            ref={element}
            onScroll={handleScroll}
            initial={{ scale: 0 }}
            animate={{
              scale: 1
              // transition: { ease: "easeInOut" }
            }}
            exit={{ scale: 0 }}
          >
            {data.map((item, index) => (
              <MobileNavItem
                key={index}
                className={navItemClassName}
                headingClassName={navItemHeadingClassName}
                contentClassName={navItemContentClassName}
                shadowClassName={navItemShadowClassName}
                coverClassName={navItemCoverClassName}
                index={index}
                item={item}
                headingTop={navItemHeadingHeights
                  .slice(0, index)
                  .reduce((a, b) => a + b, 0)}
                topShadowTop={navItemHeadingHeights
                  .slice(0, index)
                  .reduce((a, b) => a + b, 0)}
                topShadowBottom={[...navItemHeadingHeights]
                  .reverse()
                  .slice(0, navItemHeadingHeights.length - index)
                  .reduce((a, b) => a + b, 0)}
                bottomShadowTop={navItemHeadingHeights
                  .slice(0, index + 1)
                  .reduce((a, b) => a + b, 0)}
                headingBottom={[...navItemHeadingHeights]
                  .reverse()
                  .slice(0, navItemHeadingHeights.length - index - 1)
                  .reduce((a, b) => a + b, 0)}
                scrollToItem={scrollToItem}
              />
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
      {isOpen && (
        <motion.div
          key="MobileNav-buttons"
          className="MobileNav-buttons"
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button type="circle" onClick={closeNav}>
            x
          </Button>
        </motion.div>
      )}
    </>
  );
}

export default MobileNav;
