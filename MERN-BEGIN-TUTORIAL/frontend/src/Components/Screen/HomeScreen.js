import React, { useEffect } from 'react';
import Product from '../Products/Product';
import ErrorMessageBox from '../Message/ErrorMessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { getListProduct } from '../../Actions/productAction';
function HomeScreen() {
    const distpatch = useDispatch();
    const productsList = useSelector(state => state.productList);
    const {products, error} = productsList;

    useEffect(() => {
        distpatch(getListProduct());
    }, [distpatch]);
    return (
        <div>
            {error
                ? <ErrorMessageBox message={error} variant="danger"></ErrorMessageBox>
                : <div className="row center">
                    {
                        products.map(product => (
                            <Product product={product} key={product._id}></Product>
                        ))
                    }
                </div>
            }
        </div>
    );
}

export default HomeScreen;