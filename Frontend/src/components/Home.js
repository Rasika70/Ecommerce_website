import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Loader from "./layouts/Loader";
import MetaData from "./layouts/MetaData";
import Product from "./product/Product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";


// Import React Slick
import Slider from "react-slick";

// Slider styles (make sure these are added to your global styles like index.css or App.css)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Banner images for the slider
const bannerImages = [
  /*"https://static.vecteezy.com/system/resources/thumbnails/027/099/994/small/background-image-featuring-a-paper-bag-filled-with-healthy-vegan-and-vegetarian-food-including-free-photo.jpg",
  /* "https://www.shutterstock.com/image-photo/fresh-healthy-food-vegetables-grocery-260nw-1175684464.jpg",*/
  /*"https://thumbs.dreamstime.com/b/delivery-grocery-shopping-healthy-food-background-vegan-vegetarian-paper-bag-vegetables-fruits-nuts-grains-green-copy-178150218.jpg",*/
"https://thumbs.dreamstime.com/b/aisle-view-tesco-lotus-supermarket-nonthaburi-thailand-august-august-world-s-second-58488775.jpg?w=992.jpg" ,
  "https://thumbs.dreamstime.com/b/grain-oil-super-market-37771945.jpg?w=768.jpg",

"https://thumbs.dreamstime.com/b/bangkok-thailand-april-decision-to-buy-milk-super-market-bangkok-thailand-april-decision-to-buy-milk-super-market-139084450.jpg?w=768"
];

export default function Home() {
  const dispatch = useDispatch();
  const {
    products,
    loading,
    error,
    productsCount,
    resPerPage,
  } = useSelector((state) => state.productsState);
  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    dispatch(getProducts(null, null, null, null, currentPage));
  }, [error, dispatch, currentPage]);

  // Slick Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products"} />
          
          {/* Banner Slider */}
          <div className="banner-slider" style={{marginTop:'20px'}}>
            <Slider {...sliderSettings}>
              {bannerImages.map((img, index) => (
                <div key={index}>
                  <img src={img} alt={`banner ${index + 1}`} className="w-100" />
                </div>
              ))}
            </Slider>
          </div>

          <h1 id="products_heading">Our Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product col={4} key={product._id} product={product} />
                ))}
            </div>
          </section>

          {productsCount > 0 && productsCount > resPerPage ? (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={productsCount}
                itemsCountPerPage={resPerPage}
                nextPageText={"Next"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass={"page-item"}
                linkClass={"page-link"}
              />
            </div>
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
}


