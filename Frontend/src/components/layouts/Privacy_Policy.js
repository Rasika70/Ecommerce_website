// PrivacyPolicy.js
import React from 'react';
import './Privacy_Policy.js';

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy-container">
            <header className="privacy-header">
                <h1>Privacy Policy</h1>
                <p>Your privacy is important to us!</p>
            </header>

            <section className="privacy-content">
                <h2>Introduction</h2>
                <p>
                    At FreshMart Online, we are committed to protecting your privacy. This Privacy Policy explains how we collect,
                    use, and safeguard your information when you visit our website or purchase our products.
                </p>

                <h2>Information We Collect</h2>
                <p>
                    We may collect personal information from you when you:
                </p>
                <ul>
                    <li>Register on our site</li>
                    <li>Place an order</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Contact us for support</li>
                </ul>
                <p>
                    The types of personal information we may collect include your name, email address, phone number, and shipping address.
                </p>

                <h2>How We Use Your Information</h2>
                <p>
                    We use the information we collect for various purposes, including:
                </p>
                <ul>
                    <li>Processing and fulfilling your orders</li>
                    <li>Improving our website and services</li>
                    <li>Sending you promotional materials and updates</li>
                    <li>Responding to your inquiries and providing customer support</li>
                </ul>

                <h2>Information Protection</h2>
                <p>
                    We implement a variety of security measures to maintain the safety of your personal information. Your data is stored
                    on secure servers and is only accessible by authorized personnel.
                </p>

                <h2>Cookies</h2>
                <p>
                    Our website may use "cookies" to enhance user experience. You can choose to accept or decline cookies through your
                    browser settings. Please note that declining cookies may limit your ability to use certain features of our site.
                </p>

                <h2>Changes to This Privacy Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on
                    this page. We encourage you to review this policy periodically for any updates.
                </p>

                <h2>Contact Us</h2>
                <p>
                    If you have any questions or concerns about this Privacy Policy, please contact us at:
                    <br />
                    <strong>Email:</strong> support@supermart.com
                </p>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
