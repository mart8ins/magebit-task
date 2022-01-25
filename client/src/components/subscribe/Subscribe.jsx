import React, {useState} from 'react';
import "./subscribe.css";
import {Icons} from "./components/icons/Icons";
import {Form} from "./components/form/Form";

export const Subscribe = () => {
    const [subscribeSuccess, setSubscribeSuccess] = useState(false);


  return <div className="app__subscribe">
    <div className="subscribe__heading">
        {subscribeSuccess && <img src="./images/Union.png" alt="Union"/>} 
        <h1>{subscribeSuccess ? "Thanks for subscribing!" : "Subscribe to newsletter"}</h1>
        <p> {subscribeSuccess ? 
        "You have successfully subscribed to our email listing. Check your email for the discount code" 
        : 
        "Subscribe to our newsletter and get 10% discount on pineapple glasses."
        }    
        </p>
    </div>
    {!subscribeSuccess && <Form setSubscribeSuccess={setSubscribeSuccess}/>}
    <div className="seperator__line"></div>
    <Icons/>
</div>
};
