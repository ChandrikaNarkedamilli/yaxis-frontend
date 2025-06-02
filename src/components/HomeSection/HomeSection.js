import React from "react";
import "./HomeSection.css";

const HomeSection = () => {
    return (
        <div className="home-section">
            <div className="home-content">
                <div className="left">
                    <span className="tagline">Trusted by 1000+ people</span>
                    <h1>
                        Your Journey Begins <br />
                        <span className="highlight">With Expert Visa Guidance</span>
                    </h1>
                    <p>
                        Navigate your visa application with confidence. Our expert
                        consultants ensure a smooth, hassle-free process with personalized
                        support at every step.
                    </p>
                    <div className="cta-buttons">
                        <button className="primary-btn">Start Your Application →</button>
                        <button className="secondary-btn">Learn More 🌐</button>
                    </div>
                </div>

                <div className="right">
                    <div className="stat-box">
                        <h2>99%</h2>
                        <p><span className="green">Success Rate</span><br />Visa Approval</p>
                    </div>
                    <div className="stat-box">
                        <h2>6+</h2>
                        <p><span className="green">Countries</span><br />Supported Destinations</p>
                    </div>
                    <div className="stat-box">
                        <h2>3–4</h2>
                        <p><span className="green">Business Days</span><br />Request Processing Time</p>
                    </div>
                    <div className="stat-box">
                        <h2>400+</h2>
                        <p><span className="green">Happy Clients</span><br />And Growing</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeSection;
