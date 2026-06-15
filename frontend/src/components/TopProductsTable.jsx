import { useEffect, useState } from "react";
import API from "../api/api";

function TopProductsTable() {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        API.get("/top-products")
            .then((response) => {
                setProducts(response.data);
            });

    }, []);

    return (
        <div>

            <h2>Top Products</h2>

            <table border="1">

                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Sales</th>
                    </tr>
                </thead>

                <tbody>

                    {products.map((item, index) => (

                        <tr key={index}>
                            <td>{item.product_name}</td>
                            <td>₹{item.sales}</td>
                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default TopProductsTable;