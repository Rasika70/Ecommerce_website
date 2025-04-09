import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Image } from 'react-bootstrap';
import { logout } from '../../actions/userActions';
import { FaShoppingCart } from 'react-icons/fa';
import LogoImage from '../../images/super.jpg';
import  Whatsapp  from '../../images/whatsapp-svgrepo-com (1).svg';

export default function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { items: cartItems = [] } = useSelector((state) => state.cartState); // default to empty array to prevent errors
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout); // Call the logout function properly
    navigate('/'); // Redirect user to home after logout
  };

  return (
    <nav className="navbar row">
      <div className="col-12 col-md-1">
         <div className="navbar-brand">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img src={LogoImage} alt='' style={{ height: '73px', width: '170px' }} />
            <h2 style={{ color: 'white' }}></h2>
          </Link>
        </div> 
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {isAuthenticated ? (          
          <Dropdown className="d-inline">
            <Dropdown.Toggle variant="default text-white pr-5" id="dropdown-basic">
              <figure className="avatar avatar-nav">
                <Image
                  width="50px"
                  src={user.avatar || './images/default_avatar.png'} // handle undefined avatar
                  alt=""
                />
              </figure>
               <span>{user.name}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {user.role === 'admin' && (
                <Dropdown.Item onClick={() => navigate('/admin/dashboard')} className="text-dark">
                  Dashboard
                </Dropdown.Item>
              )}
              {user.role === 'user' && (
                <>
                  <Dropdown.Item onClick={() => navigate('/user/filtered-products')} className="text-dark">
                    Products Filter
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate('/wishlist')} className="text-dark">
                    My Wishlist
                  </Dropdown.Item>
                </>
              )}
              <Dropdown.Item onClick={() => navigate('/myprofile')} className="text-dark">
                Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate('/orders')} className="text-dark">
                Orders
              </Dropdown.Item>
              <Dropdown.Item onClick={logoutHandler} className="text-danger">
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <>
          {/* <a href='/about' style={{color:'white',textDecoration:'none', marginRight:'10px'}}>About</a> */}
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
          </>
        )}

        <Link to="/cart" className="ml-3">
          <span id="cart" style={{ color: 'white' }}>
            <FaShoppingCart size={24} />
          </span>
        </Link>
        <span className="ml-1" id="cart_count">
          {cartItems.length} {/* Show cart item count safely */}
        </span>
      </div>
      
   <div class="whatsapp-icon">
    <a href="https://wa.me/9344128833" target="_blank">
      <img src={Whatsapp} alt="WhatsApp" width="60" height="60" />
    </a>
  </div> 

    </nav>
  );
}

