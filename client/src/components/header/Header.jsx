import React from "react";
import Logo from "../../assets/logo/logo_pineapple.svg";
import LogoP from "../../assets/logo/logo_pineapple-1.svg";
import "./header.css"

export const Header = () => {
    return (
        <header>
            <div className="logo__container_p">
                <img src={LogoP} alt="pineapple logo" />
            </div>
            <div className="logo__container">
                <img src={Logo} alt="pineapple logo" />
            </div>
            <nav>
                <a href="/#">About</a>
                <a href="/#">How it works</a>
                <a href="/#">Contact</a>
            </nav>
        </header>
    );
};
