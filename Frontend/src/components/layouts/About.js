// AboutUs.js
import React from 'react';

const About = () => {
    return (
        <div className="about-us-container">
            <header className="about-header">
                <h1>About SuperMarket Online</h1>
                <p>Your one-stop shop for fresh, quality groceries delivered to your door!</p>
            </header>

            <section className="about-content">
                <h2>Our Story</h2>
                <p>
                    Welcome to SuperMart, where convenience meets quality. Founded in [Year], we’ve been bringing fresh groceries
                    directly to your doorstep. From organic produce to pantry essentials, we are committed to providing the finest
                    products and excellent service for all your grocery needs.
                </p>
                <p>
                    Our journey began with the goal of making grocery shopping easy, affordable, and convenient for everyone. Over the years,
                    we’ve expanded our offerings to include a wide range of products, from fresh fruits and vegetables to international
                    ingredients and household supplies.
                </p>
            </section>

            <section className="team-section">
                <h2>Meet Our Team</h2>
                <div className="team-cards">
                    <div className="team-card">
                        <img src="path/to/grocery1.jpg" alt="Grocery Manager" />
                        <h3>John</h3>
                        <p>Grocery Manager</p>
                        <p>With over 15 years in the grocery industry, John oversees product selection, ensuring you get only the best and freshest items in your orders.</p>
                    </div>
                    <div className="team-card">
                        <img src="path/to/grocery2.jpg" alt="Logistics Specialist" />
                        <h3>Sam</h3>
                        <p>Logistics Specialist</p>
                        <p>Jane’s expertise ensures that your groceries are delivered on time and in perfect condition. She manages all our delivery logistics, keeping everything running smoothly.</p>
                    </div>
                    <div className="team-card">
                        <img src="path/to/grocery3.jpg" alt="Customer Support" />
                        <h3>Ram</h3>
                        <p>Customer Support</p>
                        <p>Emily is dedicated to making your shopping experience as smooth as possible. Whether it’s helping you track your order or answering questions, she’s here to assist you!</p>
                    </div>
                </div>
            </section>

            <section className="cta">
                <h2>Want to Know More?</h2>
                <p>Explore our wide selection of groceries and get them delivered right to your home!</p>
                {/* <a href="/shop">Shop Now</a> */}
            </section>
        </div>
    );
};

export default About;

