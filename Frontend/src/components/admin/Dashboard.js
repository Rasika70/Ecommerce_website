// import React, { useEffect } from 'react';
// import Sidebar from "./Sidebar";
// import { useDispatch, useSelector } from 'react-redux';
// import { getAdminProducts } from "../../actions/productActions";
// import { getUsers } from '../../actions/userActions';
// import { adminOrders as adminOrdersAction } from '../../actions/orderActions';
// import { Link } from "react-router-dom";
// import { Bar, Pie } from 'react-chartjs-2';
// import DashboardChart from './DashboardChart';

// export default function Dashboard() {
//     const { products = [] } = useSelector(state => state.productsState);
//     const { adminOrders = [] } = useSelector(state => state.orderState);
//     const { users = [] } = useSelector(state => state.userState);
//     const dispatch = useDispatch();
//     let outOfStock = 0;

//     if (products.length > 0) {
//         products.forEach(product => {
//             if (product.stock === 0) {
//                 outOfStock = outOfStock + 1;
//             }
//         });
//     }

//     let totalAmount = 0;
//     if (adminOrders.length > 0) {
//         adminOrders.forEach(order => {
//             totalAmount += order.totalPrice;
//         });
//     }

//     useEffect(() => {
//         dispatch(getAdminProducts);
//         dispatch(getUsers);
//         dispatch(adminOrdersAction);
//     }, [dispatch]);

//     // Chart Data
//     const barChartData = {
//         labels: ['Products', 'Orders', 'Users', 'Out of Stock'],
//         datasets: [
//             {
//                 label: 'Count',
//                 data: [products.length, adminOrders.length, users.length, outOfStock],
//                 backgroundColor: [
//                     'rgba(75, 192, 192, 0.6)',
//                     'rgba(255, 99, 132, 0.6)',
//                     'rgba(54, 162, 235, 0.6)',
//                     'rgba(255, 206, 86, 0.6)'
//                 ],
//                 borderWidth: 1,
//             },
//         ],
//     };

//     const pieChartData = {
//         labels: ['Products', 'Orders', 'Users', 'Out of Stock'],
//         datasets: [
//             {
//                 label: 'Count',
//                 data: [products.length, adminOrders.length, users.length, outOfStock],
//                 backgroundColor: [
//                     'rgba(75, 192, 192, 0.6)',
//                     'rgba(255, 99, 132, 0.6)',
//                     'rgba(54, 162, 235, 0.6)',
//                     'rgba(255, 206, 86, 0.6)'
//                 ],
//                 borderWidth: 1,
//             },
//         ],
//     };

//     const barChartOptions = {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     };

//     return (
//         <div className="row">
//             <div className="col-12 col-md-2">
//                 <Sidebar />
//             </div>
//             <div className="col-12 col-md-10">
//                 <h1 className="my-4">Dashboard</h1>

//                 {/* Total Amount Card */}
//                  <div className="row pr-4">
//                     <div className="col-xl-12 col-sm-12 mb-3">
//                         <div className="card text-white o-hidden h-100" style={{ backgroundColor: 'rgb(127,160,138)' }}>
//                             <div className="card-body">
//                                 <div className="text-center card-font-size">
//                                     Total Amount<br /> <b>₹{totalAmount.toFixed(2)}</b>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div> 

//                 {/* Chart Section */}
//                  <div className="row pr-4">
//                     <div className="col-xl-6 col-sm-12 mb-3">
//                         <div className="card">
//                             <div className="card-body">
//                                 <h5 className="card-title">Overview - Bar Chart</h5>
//                                 <Bar data={barChartData} options={barChartOptions} />
//                             </div>
//                         </div>
//                     </div>

//                     <div className="col-xl-6 col-sm-12 mb-3">
//                         <div className="card">
//                             <div className="card-body">
//                                 <h5 className="card-title">Overview - Pie Chart</h5>
//                                 <Pie data={pieChartData} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>                    

//             </div>
//         </div>
//     );
// }


import React, { useEffect } from 'react';
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts } from "../../actions/productActions";
import { getUsers } from '../../actions/userActions';
import { adminOrders as adminOrdersAction } from '../../actions/orderActions';
import { Link } from "react-router-dom";
import { Bar, Pie } from 'react-chartjs-2';
import DashboardChart from './DashboardChart';

export default function Dashboard() {
    const { products = [] } = useSelector(state => state.productsState);
    const { adminOrders = [] } = useSelector(state => state.orderState);
    const { users = [] } = useSelector(state => state.userState);
    const dispatch = useDispatch();
    let outOfStock = 0;

    if (products.length > 0) {
        products.forEach(product => {
            if (product.stock === 0) {
                outOfStock = outOfStock + 1;
            }
        });
    }

    let totalAmount = 0;
    if (adminOrders.length > 0) {
        adminOrders.forEach(order => {
            totalAmount += order.totalPrice;
        });
    }

    let subCategoryCounts = {};
    if (products.length > 0) {
        products.forEach(product => {
            const subCategory = product.subCategory;
            if (subCategoryCounts[subCategory]) {
                subCategoryCounts[subCategory] += 1;
            } else {
                subCategoryCounts[subCategory] = 1;
            }
        });
    }

    const subCategoryLabels = Object.keys(subCategoryCounts);
    const subCategoryData = Object.values(subCategoryCounts);


    useEffect(() => {
        dispatch(getAdminProducts);
        dispatch(getUsers);
        dispatch(adminOrdersAction);
    }, [dispatch]);

    // Chart Data
    const barChartData = {
        labels: ['Products', 'Orders', 'Users', 'Out of Stock'],
        datasets: [
            {
                label: 'Count',
                data: [products.length, adminOrders.length, users.length, outOfStock],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const pieChartData = {
        labels: ['Products', 'Orders', 'Users', 'Out of Stock'],
        datasets: [
            {
                label: 'Count',
                data: [products.length, adminOrders.length, users.length, outOfStock],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const barChartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1, 
                },
            },
        },
    };

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4">Dashboard</h1>

                {/* Total Amount Card */}
                 <div className="row pr-4">
                    <div className="col-xl-12 col-sm-12 mb-3">
                        <div className="card text-white o-hidden h-100" style={{ backgroundColor: 'rgb(127,160,138)' }}>
                            <div className="card-body">
                                <div className="text-center card-font-size">
                                    Total Amount<br /> <b>₹{totalAmount.toFixed(2)}</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 

                {/* Chart Section */}
                 <div className="row pr-4">
                    <div className="col-xl-6 col-sm-12 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Overview - Bar Chart</h5>
                                <Bar data={barChartData} options={barChartOptions} />
                            </div>
                        </div>
                    </div>


                    <div className="col-xl-6 col-sm-12 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Subcategory Counts</h5>
                                <Bar
                                    data={{
                                        labels: subCategoryLabels,
                                        datasets: [
                                            {
                                                label: 'Products per Subcategory',
                                                data: subCategoryData,
                                                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                                                borderWidth: 1,
                                            },
                                        ],
                                    }}
                                    /* options={{ scales: { y: { beginAtZero: true } } }} */
                                    options={{
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                ticks: {
                                                    stepSize: 1, // Set the step size to 1 to show only whole numbers
                                                },
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                      <div className="col-xl-6 col-sm-12 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Overview - Pie Chart</h5>
                                <Pie data={pieChartData} />
                            </div>
                        </div>
                    </div> 
                    
                </div>                     

            </div>
        </div>
    );
}


