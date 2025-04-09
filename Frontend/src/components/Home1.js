import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Loader from "./layouts/Loader";
import MetaData from "./layouts/MetaData";
import Product from "./product/Product";
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';
import { BiPhone, BiLogoInstagram } from 'react-icons/bi';
import Video from '../assets/video.gif';
import TablePricing from '../components/HomeComponent/TablePricing';
import OfferAd from "./adds/OfferAd";

export default function Home1() {
    const dispatch = useDispatch();
    const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState);
    const { isAuthenticated } = useSelector((state) => state.authState);
    const [currentPage, setCurrentPage] = useState(1);
    const [showHeader, setShowHeader] = useState(false);

    const handleLoginClick = () => {
        setShowHeader(true);
    }

    useEffect(() => {
        if (error) {
            return toast.error(error, {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }

        // Only fetch products if the user is logged in
        if (isAuthenticated) {
            dispatch(getProducts(null, null, null, null, currentPage))
        }
    }, [error, dispatch, currentPage, isAuthenticated])

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={'Buy Best Products'} />

                    <section id="products" className="container mt-5">

                        {isAuthenticated ? (
                            <>
                                <OfferAd />
                                <div className="row">
                                    {products && products.map(product => (
                                        <Product col={4} key={product._id} product={product} />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className='container-fluid px-0'>
                                <div style={{ paddingBottom: "60px" }}>
                                    <div className=''>
                                        <div className='text-center border-bottom'>
                                            <h1 className="title " style={{ fontSize: "70px", height: "50px" }}>Ontots</h1>
                                            <p style={{ fontSize: "10px", padding: '10px' }}>Tiny Trends, Big Smiles!</p>
                                        </div>
                                        <div className='container'>
                                            <div className='row mt-5'>
                                                <div className='col-lg-7 col-12' style={{ paddingRight: '5%' }} >
                                                    <img src={Video} alt="" />
                                                </div>
                                                <div className='col-lg-5 col-12' style={{ paddingLeft: '5%' }}>
                                                    <TablePricing />
                                                </div>
                                                <div className='text-center'>
                                                    <h4 className='col-lg-12 col-12 fw-bold pt-5 px-lg-5 lh-lg'>"Welcome to <span style={{ color: 'green' }}>ONTOTS</span> - Where Style Meets Comfort for Little Ones! Discover our exclusive dress shop specializing in high-quality muslin and cotton outfits for boys aged 6 months to 3 years. Founded by two passionate sisters who are proud women entrepreneurs, ONTOTS is your go-to destination for adorable and fashion-forward clothing, ensuring your little gentlemen look and feel their best. Explore our collection today and dress your kids in comfort and style!"
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-center text-success'>
                                        <a href='/login' onClick={handleLoginClick}>
                                            <h3 className='mt-2 fw-bold text-success underline-on-hover'>
                                                Visit Store?
                                            </h3>
                                        </a>
                                    </div>
                                </div>
                                {showHeader && (
                                    <div className='vh-50 container-fluid' style={{ background: 'rgb(127,160,138)', width: '100%' }}>
                                        <div className='container py-3'>
                                            <div className='row'>
                                                <div className='col-md-6 py-3'>
                                                    <div className=''>
                                                        <h1 className="title " style={{ fontSize: "80px", height: "70px" }}>Ontots</h1>
                                                        <p className=' ps-3' style={{ fontSize: "13px", }}>Tiny Trends, Big Smiles!</p>
                                                    </div>
                                                </div>
                                                <div className='col-md-6 py-3 mt-3' >
                                                    <h3 className=' text-end' style={{ width: '250px', marginLeft: '250px' }}>
                                                        <a href='tel:+918122208696'>
                                                            <BiPhone /> +91 93441 28833
                                                        </a>
                                                    </h3>
                                                    <br />
                                                    <h3 className='text-end' style={{ width: '250px', marginLeft: '250px' }}>
                                                        <a href="https://instagram.com/ontotskid?igshid=NzZlODBkYWE4Ng==">
                                                            <BiLogoInstagram /> Ontots
                                                        </a>
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </section>
                    {isAuthenticated && productsCount > 0 && productsCount > resPerPage ? (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                onChange={setCurrentPage}
                                totalItemsCount={productsCount}
                                itemsCountPerPage={resPerPage}
                                nextPageText={'Next'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass={'page-item'}
                                linkClass={'page-link'}
                            />
                        </div>
                    ) : null}
                </Fragment>
            }
        </Fragment>
    )
}
