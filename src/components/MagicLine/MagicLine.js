import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./MagicLine.scss";

function MagicLine({ left = 0, bottom = 0, width }) {
  return (
    <AnimatePresence>
      {width && (
        <motion.span
          className="MagicLine"
          initial={{
            scale: 0,
            left,
            bottom,
            width
          }}
          animate={{
            scale: 1,
            left,
            bottom,
            width
          }}
          exit={{
            scale: 0
          }}
        />
      )}
    </AnimatePresence>
  );
}

export default MagicLine;
