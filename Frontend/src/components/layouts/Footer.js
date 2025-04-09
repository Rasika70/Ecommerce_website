/* export  default function Footer (){
    return (
        <footer className="py-1">
            <p className="text-center text-dark mt-1">
                ONTOTS - 2023-2024, All Rights Reserved
            </p>
        </footer>
    )
} */


import { Link } from 'react-router-dom';


import './Footer.css'


export default function Footer() {
    return (
        
            <div className='footer' id='footer'>
                <div className="footer-content">
                    
                    <div className="footer-content-center">
                        <h2>COMPANY</h2>
                        <ul>
                            <li><a href='/' style={{color:'white',textDecoration:'none', marginRight:'10px'}}>Home</a></li>
                            <li><a href='/about' style={{color:'white',textDecoration:'none', marginRight:'10px'}}>About us</a></li>
                            {/* <li>Delivery</li> */}
                            <li><a href='/privacy_policy' style={{color:'white',textDecoration:'none', marginRight:'10px'}}>Privacy policy</a></li>
                        </ul>
                    </div>
                    <div className="footer-content-right">
                        <h2>GET IN TOUCH</h2>
                        <ul>
                            <li>+91 9344128833</li>
                            <li>contact@supermart.com</li>
                        </ul>
                    </div>
                </div>
                <hr />
                <p className="footer-copyright">Copyright 2025 © supermarket.com - All Right Reserved.</p>
            </div>       
    );
}