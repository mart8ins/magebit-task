import React, {useState, useEffect} from 'react';
import axios from "axios";
import "./form.css";
import {validateForm} from "./validateForm";

export const Form = ({setSubscribeSuccess}) => {
    const [valid, setValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [serverError, setServerError] = useState(undefined);

    const [typing, setTyping] = useState(false);

    const [subscription, setSubscription] = useState({
        email: "",
        terms: false
    })

    useEffect(()=> {
        if(subscription.email.length > 0) {
            setTyping(true);
            const {message, valid} = validateForm(subscription);
            setValid(valid);
            setErrorMessage(message);
        } else {
            if(typing) {
                setErrorMessage("Email address is required");
                setValid(false)
            }
        }
    }, [subscription, typing])

    const onFormChange = (e) => {
        setSubscription({
            ...subscription,
            [e.target.name]: e.target.name === "terms" ? e.target.checked : e.target.value
        })
    }

    const submitSubscription = async (e) => {
        e.preventDefault();
        const email = subscription.email;
        const res = await axios.post("/", {email});
        if(res.status === 200) {
            console.log(res.data.message);
            setSubscribeSuccess(true);
        } else {
            console.log(res.data.error);
            setServerError(res.data.error)
        }
    }

    return <form>
    <div>
        <div>
            <input
                type="email"
                name="email"
                placeholder="Type your email address here..."
                onChange={onFormChange}
            />
            <button onClick={submitSubscription} disabled={!valid}>&#8594;</button>
        </div>
    </div>
    <p>{(!valid && errorMessage) || serverError}</p>
    <div>
        <label htmlFor="terms">
            <input
                type="checkbox"
                id="terms"
                name="terms"
                value={subscription.terms}
                onChange={onFormChange}
            />
            <span className="custom__checkbox"></span>I
            agree to
        </label> <a href="/#">terms of service</a>
    </div>
  </form>
};
