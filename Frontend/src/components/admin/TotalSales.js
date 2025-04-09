import React, { useState } from 'react';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import jsPDF from 'jspdf'; 
import 'jspdf-autotable'; 

const TotalSalesByDay = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!startDate || !endDate) {
            setError('Please select both start and end dates');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const response = await axios.get(`/api/v1/admin/order/get-total-sales?startDate=${startDate}&endDate=${endDate}`);
            console.log(response)
            setSalesData(response.data.data);
        } catch (error) {
            setError('Error fetching total sales data');
        } finally {
            setLoading(false);
        }
    };

    // Calculate sum of total sales
    const totalSalesSum = salesData.reduce((acc, curr) => acc + curr.totalSales, 0);

    // Define table data
    const tableData = {
        columns: [
            {
                label: 'ID',
                field: '_id',
                sort: 'asc'
            },
            {
                label: 'Date',
                field: 'date',
                sort: 'asc'
            },
            {
                label: 'Total Sales',
                field: 'totalSales',
                sort: 'asc'
            }
        ],
        rows: salesData.map((item, index) => ({
            id: item._id,
            date: `${item._id.year}-${item._id.month}-${item._id.day}`,
            totalSales: item.totalSales,
        }))
    };

    // Function to download PDF report
    const downloadReport = () => {
        const doc = new jsPDF();

        // Add a title to the PDF
        doc.text('Sales Report', 14, 16);

        // Define the columns for the PDF table
        const columns = ["ID", "Date", "Total Sales"];

        // Map the sales data to rows for the PDF table
        const rows = salesData.map((item) => [
            item.id,
            `${item._id.year}-${item._id.month}-${item._id.day}`,
            item.totalSales,
        ]);

        // Add the table to the PDF
        doc.autoTable({
            startY: 20,
            head: [columns],
            body: rows,
        });

        // Add total sales at the bottom
        doc.text(`Total Sales: ${totalSalesSum}`, 14, doc.autoTable.previous.finalY + 10);

        // Save the PDF document
        doc.save('sales_report.pdf');
    };

    return (
        <div className='container'>
            <h2 style={{ marginTop: '20px' }}>Sales Report</h2>
            <div className='d-flex' style={{ marginTop: '50px' }}>
                <div style={{ marginRight: '30px' }}>
                    <label htmlFor="startDate">Start Date: </label>
                    <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div style={{ marginRight: '30px' }}>
                    <label htmlFor="endDate">End Date: </label>
                    <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <button onClick={handleSearch}
                className='search-btn'>
                    Search
                </button>

                <button onClick={downloadReport} 
                className='download-btn'>
                Download Report as PDF
            </button>

            </div>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            <MDBDataTable
                striped
                bordered
                hover
                data={tableData}
                className='text-center'
            />
            <div>
                <h4 style={{ fontWeight: '200px', textAlign: 'right', color: 'rgb(63, 127, 223)' }}>Total Sales: {totalSalesSum}</h4>
            </div>
            {/* Button to download PDF */}
            {/* <button onClick={downloadReport} style={{ marginTop: '20px' }}>
                Download Report as PDF
            </button> */}
        </div>
    );
};

export default TotalSalesByDay;
