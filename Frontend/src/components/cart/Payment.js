/* ============= Card, Qr code and Cash on delivery ================ */

import React, { useState } from 'react';
import CardPayment from '../cart/CardPayment';
import QrCodePayment from '../cart/QrCodePayment';
import './Payment.css'
import CashOnDelivery from '../cart/CashOnDelivery';

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState('card'); // Default to card payment

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };   

    return (
        
        <div style={{paddingTop:'30px', fontSize:'20px', fontWeight:'500'}}>
            
            <div className="payment-options-container">
                <label>
                    <input
                        type="radio"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={() => handlePaymentMethodChange('card')}
                    /> Card Payment
                </label>                
                <label className='qr-payment'>
                    <input
                        type="radio"
                        value="qrCode"
                        checked={paymentMethod === 'qrCode'}
                        onChange={() => handlePaymentMethodChange('qrCode')}
                    /> QR Code Payment
                </label>
                <label className='cod-payment'>
                    <input
                        type="radio"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => handlePaymentMethodChange('cod')}
                    /> Cash On Delivery
                </label>
            </div>           
            
            {paymentMethod === 'card' ? <CardPayment /> : (paymentMethod === 'qrCode' ? <QrCodePayment />
             : 
             <div>
                <CashOnDelivery />
            </div>
            )}
        </div>
    );
};

export default Payment;

