import React, { Component } from 'react';
import "./About.css";
import avicenna from "../assets/Avicenna.jpg";
export default class About extends Component {
  render() {
    return (
      <div>
      <div class="split left">
        <div className="centered">
          <img 
            className="profile_image"
            src= {avicenna}
            alt="Profile Pic"
            ></img>
        </div>
      </div>
      <div className="split right">
        <div className="centered">
          <div className="name_title">Avicenna</div>
          <div className="brief_description">
            I am Avicenna, an old Persian polymath! I am, very humbly, considered to be the father of modern medicine and the second Aristotle of the world. I have written a lot about philosophy and medicine, and I have done multiple studies in physical sciences and language. It is a pleasure to be here learning some Web Dev from IBM!
          </div>
        </div>
      </div>
    </div>
    )
  }
}