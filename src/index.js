import React from "react";
import ReactDOM from "react-dom";
import { Breakpoint, BreakpointProvider } from "react-socks";
import Header from "./components/Header/Header";
import MobileHeader from "./components/MobileHeader/MobileHeader";
import data from "./data/data";
import smoothscroll from "smoothscroll-polyfill";

import "./styles.scss";

smoothscroll.polyfill();

function App() {
  return (
    <BreakpointProvider>
      <Breakpoint medium down>
        <MobileHeader data={data} />
      </Breakpoint>

      <Breakpoint large up>
        <Header data={data} />
      </Breakpoint>

      <main>Main</main>
      <footer>Footer</footer>
    </BreakpointProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
