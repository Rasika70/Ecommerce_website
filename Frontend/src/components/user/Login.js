// import {Fragment, useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { clearAuthError, login } from '../../actions/userActions';
// import MetaData from '../layouts/MetaData';
// import { toast } from 'react-toastify';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// //import UserSidebar from  './UserSidebar';

//  export default function Login() {
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const { loading, error, isAuthenticated } = useSelector(state => state.authState)
//     const redirect = location.search?'/'+location.search.split('=')[1]:'/';

//     const  submitHandler = (e) => {
//         e.preventDefault();
//         dispatch(login(email, password))
//     }

//     useEffect(() => {
//         if(isAuthenticated) {
//             navigate(redirect)
//         }

//         if(error)  {
//             toast(error, {
//                 position: toast.POSITION.BOTTOM_RIGHT,
//                 type: 'error',
//                 onOpen: ()=> { dispatch(clearAuthError) }
//             })
//             return
//         }
//     },[error, isAuthenticated, dispatch, navigate,redirect])

    

// return (
//     <Fragment>
//         <MetaData title={`Login`} />
//         <div className="row wrapper">
//             <div className="col-12 col-lg-5">
//                 <h1 className='title text-center' style={{ fontSize: "70px" }}>Login</h1>
//                 <form onSubmit={submitHandler} className="shadow-lg">
//                     <h1 className="mb-3">Login</h1>
//                     <div className="form-group">
//                         <label htmlFor="email_field">Email</label>
//                         <input
//                             type="email"
//                             id="email_field"
//                             className="form-control"
//                             value={email}
//                             onChange={e => setEmail(e.target.value)}
//                         />
//                     </div>

//                     <div className="form-group mt-2">
//                         <label htmlFor="password_field">Password</label>
//                         <input
//                             type="password"
//                             id="password_field"
//                             className="form-control"
//                             value={password}
//                             onChange={e => setPassword(e.target.value)}
//                         />
//                     </div>

//                     <Link to="/password/forgot" className="float-right mb-4 mt-2">Forgot Password?</Link>

//                     <button
//                         id="login_button"
//                         type="submit"
//                         className="btn btn-block py-3"
//                         disabled={loading}
//                     >
//                         LOGIN
//                     </button>

//                     <Link to="/register" className="float-right mt-3">New User?</Link>
//                 </form>
//             </div>
//         </div>
//     </Fragment>
// );
//  }


import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, login } from '../../actions/userActions';
import MetaData from '../layouts/MetaData';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../styles/login.css'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { loading, error, isAuthenticated,user } = useSelector(state => state.authState);
    const redirect = location.search ? '/' + location.search.split('=')[1] : '/';

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    useEffect(() => {
        // if (isAuthenticated) {
        //     navigate(redirect);
        // }
        if (isAuthenticated) {
            if (user && user.role === 'admin'){
             navigate('/admin/dashboard');
            }
            else{
             navigate('/');
            }
         }

        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_RIGHT,
                type: 'error',
                onOpen: () => { dispatch(clearAuthError) },
            });
            return;
        }
    }, [error, isAuthenticated, dispatch, navigate, redirect]);

    return (
        <Fragment>
            <MetaData title={`Login`} />
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <h1 className="text-center mb-4" style={{ fontSize: "35px", fontWeight: "bold" }}>Login</h1>
                    <form onSubmit={submitHandler} className="p-3">
                        <div className="form-group mb-3">
                            <label htmlFor="email_field" className="form-label">Email Address</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="password_field" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="d-flex justify-content-between">
                            <Link to="/password/forgot" className="text-muted">Forgot Password?</Link>
                            <Link to="/register" className="text-muted">New User?</Link>
                        </div>

                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-primary btn-block py-3 mt-4"
                            disabled={loading}
                            style={{ width: "100%" }}
                        >
                            LOGIN
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}
