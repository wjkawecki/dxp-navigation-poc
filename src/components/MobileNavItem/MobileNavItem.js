import React from "react";
import { motion } from "framer-motion";

import "./MobileNavItem.scss";

function MobileNavItem({
  index,
  item,
  headingTop = 0,
  headingBottom = 0,
  topShadowTop,
  topShadowBottom,
  bottomShadowTop,
  scrollToItem,
  className,
  headingClassName,
  shadowClassName,
  contentClassName
}) {
  return (
    <>
      {index ? (
        <motion.div
          className={shadowClassName + "-top"}
          style={{
            top: topShadowTop,
            bottom: topShadowBottom,
            opacity: 0
          }}
          animate={{
            opacity: 1,
            transition: { delay: 0.4 }
          }}
        />
      ) : null}
      <motion.h2
        key={item.text}
        className={headingClassName}
        onClick={e => scrollToItem(index, e.target.nextSibling.nextSibling)}
        style={{ top: headingTop }}
        initial={{
          bottom: -50 * index
        }}
        animate={{
          bottom: [-50 * index, headingBottom],
          transition: { duration: 0.4 }
        }}
      >
        {item.text}
      </motion.h2>
      <motion.div
        className={shadowClassName + "-bottom"}
        style={{
          top: bottomShadowTop,
          opacity: 0
        }}
        animate={{
          opacity: 1,
          transition: { delay: 0.4 }
        }}
      />
      <div className={contentClassName} data-index={index}>
        <div className={className + "-cover-top"} />
        {item.groups.map((group, index) => (
          <div key={index} className={className + "-group"}>
            {group.desc && (
              <span className={className + "-desc"}>{group.desc}</span>
            )}
            <ul className={className + "-items"}>
              {group.items.map((subitem, index) => (
                <li
                  className={
                    className + "-item" + (subitem.isActive ? " active" : "")
                  }
                  key={index}
                >
                  <a className={className + "-link"} href={subitem.link}>
                    › {subitem.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={className + "-cover-bottom"} />
    </>
  );
}

export default MobileNavItem;
