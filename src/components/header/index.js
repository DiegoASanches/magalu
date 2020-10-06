import React from 'react';
import logo from '../../assets/images/logo.png';
import './style.scss';

const Header = () => (
  <header className="Header">
    <h1 className="Header-title">Teste Magazine</h1>
    <div className="brand">
      <img src={logo} className="img-responsive center-block brand-logo" alt="Marvel logo" />
    </div>
  </header>
);

export default Header;
