import React from "react";
import Title from "../Title/Title";
import Button from "../Button/Button";
import Nav from "../Nav/Nav";

import "./Header.scss";

function Header({ data }) {
  return (
    <header className="Header">
      <Title>Flughafen</Title>
      <Nav data={data} />
      <div className="Header-buttons">
        <Button type="circle">Me</Button>
        <Button type="circle">DE</Button>
        <Button type="circle">Search</Button>
      </div>
    </header>
  );
}

export default Header;
