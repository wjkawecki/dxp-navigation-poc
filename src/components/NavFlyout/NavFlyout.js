import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button/Button";

import "./NavFlyout.scss";

function NavFlyout({ groups, isOpen, index, animationDistance, closeNav }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="NavFlyout"
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <div className="NavFlyout-content">
            <div className="NavFlyout-widget">Widget</div>
            <motion.div
              key={index}
              className="NavFlyout-groups"
              initial={{
                x: animationDistance,
                opacity: 0
              }}
              animate={{ x: 0, opacity: 1 }}
            >
              {groups.map(group => (
                <div key={group.desc} className="NavFlyout-group">
                  {group.desc && (
                    <div className="NavFlyout-desc">{group.desc}</div>
                  )}
                  <ul className="NavFlyout-items" key={group.text}>
                    {group.items &&
                      group.items.map(item => (
                        <li key={item.text} className="NavFlyout-item">
                          <a className="NavFlyout-link" href={item.link}>
                            › {item.text}
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </motion.div>
            <Button type="circle" onClick={closeNav}>
              x
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NavFlyout;
