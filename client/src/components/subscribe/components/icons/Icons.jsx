import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faFacebookF,
    faInstagram,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "./icons.css"

export const Icons = () => {
  return <div className="social__icons">
    <button className="icon__wraper" name="faFacebookF"><FontAwesomeIcon icon={faFacebookF} /></button>
    <button className="icon__wraper" name="faInstagram"><FontAwesomeIcon icon={faInstagram} /></button>
    <button className="icon__wraper" name="faTwitter"><FontAwesomeIcon icon={faTwitter} /></button>
    <button className="icon__wraper" name="faYoutube"><FontAwesomeIcon icon={faYoutube} /></button>
  </div>
};
