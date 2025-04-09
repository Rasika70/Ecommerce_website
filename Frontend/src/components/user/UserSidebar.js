import { Link } from 'react-router-dom';
//import { NavDropdown } from 'react-bootstrap';

export default function UserSidebar () {

    //const navigate = useNavigate();

    return (
        <div className="sidebar-wrapper">
            <nav id="user-sidebar no-margin">
                <ul className="list-unstyled components">
                <li>
                    <Link to="/user/filtered-products"><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
                </li>      
            </ul>
            </nav> 
        </div>
    )
}
