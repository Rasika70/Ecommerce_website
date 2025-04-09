import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { createNewProduct } from "../../actions/productActions";
import { clearError, clearProductCreated } from "../../slices/productSlice";
import { toast } from "react-toastify";

export default function NewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { loading, isProductCreated, error } = useSelector(state => state.productState)

  const categories = [
                'Fruits',
                'Dairy',
                'Beverages',
                'Snacks',
                'Breads',
                'Frozen Foods',
                'Household_Supplies',
                'Spices_Condiments',
                'Health_Wellness',
                'Personal_Care',
                'Baby_Products',
                'Cleaning_Supplies',
                'Grains_Pulses',
                'Miscellaneous',
];

const subCategoriesMap = {
  // Fruits Subcategories
  Fruits: ['Apple', 'Banana', 'Orange', 'Grapes', 'Mango', 'Pineapple', 'Strawberry', 'Peach', 'Watermelon', 'Papaya'],

  // Vegetables Subcategories
  //Vegetables: ['Carrot', 'Potato', 'Tomato', 'Onion', 'Spinach', 'Cucumber', 'Cabbage', 'Lettuce', 'Broccoli', 'Cauliflower'],

  // Dairy Subcategories
  Dairy: ['Milk', 'Cheese', 'Butter', 'Yogurt', 'Cream', 'Paneer', 'Ice Cream', 'Cottage Cheese'],

  // Beverages Subcategories
  Beverages: ['Tea', 'Coffee', 'Soft Drinks', 'Fruit Juices', 'Energy Drinks', 'Mineral Water', 'Sports Drinks'],

  // Snacks Subcategories
  Snacks: ['Chips', 'Popcorn', 'Nuts', 'Cookies', 'Crackers', 'Granola Bars', 'Pretzels'],

  // Breads Subcategories
  Breads: ['Whole Wheat', 'Sourdough', 'Baguettes', 'Ciabatta', 'Multigrain', 'White Bread', 'Gluten-Free Bread'],

  // Canned Goods Subcategories
  //Canned_Goods: ['Canned Vegetables', 'Canned Fruits', 'Canned Soups', 'Canned Beans', 'Canned Tomatoes', 'Canned Fish'],

  // Frozen Foods Subcategories
  Frozen_Foods: ['Frozen Vegetables', 'Frozen Meats', 'Frozen Fruits', 'Frozen Ready Meals', 'Frozen Pizza', 'Frozen Ice Cream'],

  // Household Supplies Subcategories
  Household_Supplies: ['Paper Towels', 'Toilet Paper', 'Cleaning Products', 'Laundry Detergent', 'Trash Bags', 'Dish Soap'],

  // Spices & Condiments Subcategories
  Spices_Condiments: ['Salt', 'Pepper', 'Chili Powder', 'Turmeric', 'Garlic Powder', 'Soy Sauce', 'Ketchup', 'Mustard'],

  // Organic Products Subcategories
  //Organic_Products: ['Organic Vegetables', 'Organic Fruits', 'Organic Dairy', 'Organic Rice', 'Organic Pasta', 'Organic Eggs'],

  // Health & Wellness Subcategories
  Health_Wellness: ['Vitamins', 'Supplements', 'Protein Powder', 'Herbal Teas', 'Essential Oils', 'Natural Remedies'],

  // Personal Care Subcategories
  Personal_Care: ['Shampoo', 'Conditioner', 'Soap', 'Toothpaste', 'Body Lotion', 'Deodorant', 'Face Wash'],

  // Baby Products Subcategories
  Baby_Products: ['Diapers', 'Baby Food', 'Baby Wipes', 'Baby Lotion', 'Baby Bottles', 'Baby Shampoo'],

  // Pet Supplies Subcategories
  //Pet_Supplies: ['Dog Food', 'Cat Food', 'Pet Toys', 'Pet Care Products', 'Pet Litter'],

  // Cleaning Supplies Subcategories
  Cleaning_Supplies: ['All-Purpose Cleaner', 'Floor Cleaner', 'Glass Cleaner', 'Dish Soap', 'Hand Sanitizer', 'Sponges', 'Bleach'],

  // Grains & Pulses Subcategories
  Grains_Pulses: ['Rice', 'Lentils', 'Beans', 'Chickpeas', 'Oats', 'Quinoa', 'Barley', 'Pulses'],

  // Miscellaneous Subcategories
  Miscellaneous: ['Noodles', 'Pasta', 'Sauces', 'Olive Oil', 'Vinegar', 'Honey', 'Sugar', 'Flour']
};


  const subCategories = subCategoriesMap[category] || [];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach(file => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview(oldArray => [...oldArray, reader.result])
          setImages(oldArray => [...oldArray, file])
        }
      }

      reader.readAsDataURL(file)
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('offerPrice', offerPrice);
    formData.append('stock', stock);
    formData.append('description', description);
    formData.append('seller', seller);
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    images.forEach(image => {
      formData.append('images', image)
    })
    dispatch(createNewProduct(formData))
  }

  useEffect(() => {
    if (isProductCreated) {
      toast('Product Created Succesfully!', {
        type: 'success',
        position: toast.POSITION.BOTTOM_RIGHT,
        onOpen: () => dispatch(clearProductCreated())
      })
      navigate('/admin/products')
      return;
    }

    if (error) {
      toast(error, {
        position: toast.POSITION.BOTTOM_RIGHT,
        type: 'error',
        onOpen: () => { dispatch(clearError()) }
      })
      return
    }
  }, [isProductCreated, error, dispatch, navigate])

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <Fragment>
          <div className="wrapper my-5">
            <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
              <h1 className="mb-4">New Product</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  onChange={e => setName(e.target.value)}
                  value={name}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  onChange={e => setPrice(e.target.value)}
                  value={price}
                />
              </div>

              <div className="form-group">
                <label htmlFor="offer_price_field">Offer Price</label>
                <input
                  type="text"
                  id="offer_price_field"
                  className="form-control"
                  onChange={e => setOfferPrice(e.target.value)}
                  value={offerPrice}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <input
                  className="form-control"
                  id="description_field"
                  rows="8"
                  onChange={e => setDescription(e.target.value)}
                  value={description}
                ></input>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select onChange={e => setCategory(e.target.value)} className="form-control" id="category_field">
                  <option value="">Select</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="subCategory_field">Subcategory</label>
                <select onChange={e => setSubCategory(e.target.value)} className="form-control" id="subCategory_field">
                  <option value="">Select</option>
                  {subCategories.map(subCategory => (
                    <option key={subCategory} value={subCategory}>{subCategory}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="stock_field">Stock</label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  onChange={e => setStock(e.target.value)}
                  value={stock}
                />
              </div>

              <div className="form-group">
                <label htmlFor="seller_field">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  onChange={e => setSeller(e.target.value)}
                  value={seller}
                />
              </div>

              <div className='form-group'>
                <label>Images</label>

                <div className='custom-file'>
                  <input
                    type='file'
                    name='product_images'
                    className='custom-file-input'
                    id='customFile'
                    multiple
                    onChange={onImagesChange}
                  />

                  <label className='custom-file-label' htmlFor='customFile'>
                    Choose Images
                  </label>
                </div>
                {imagesPreview.map(image => (
                  <img
                    className="mt-3 mr-2"
                    key={image}
                    src={image}
                    alt={`Image Preview`}
                    width="55"
                    height="52"
                  />
                ))}
              </div>

              <button
                id="login_button"
                type="submit"
                disabled={loading}
                className="btn btn-block py-3"
              >
                CREATE
              </button>

            </form>
          </div>
        </Fragment>
      </div>
    </div>

  )
}
