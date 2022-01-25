import React from "react";
import "./App.css";
import { Header } from "./components/header/Header";
import { Subscribe } from "./components/subscribe/Subscribe";
import { BackgroundImage } from "./components/backgroundImage/BackgroundImage";

function App() {
    return (
        <main className="app__container">
            <div className="header__subscribe">
                <Header />
                <Subscribe />
            </div>
            <BackgroundImage />
        </main>
    );
}

export default App;
