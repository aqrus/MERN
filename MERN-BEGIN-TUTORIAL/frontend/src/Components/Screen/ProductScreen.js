import React, { useEffect, useState } from 'react';
import Rating from '../Products/Rating';
import { useSelector, useDispatch } from 'react-redux';
import { Link} from 'react-router-dom';
import { getDetailProduct } from '../../Actions/productAction';
import ErrorMessageBox from '../Message/ErrorMessageBox';

function ProductScreen(props) {
    const productID = props.match.params.id;
    const [qty, setQty] = useState(1);
    const product = useSelector(state => state.productDetail.product);
    const error = useSelector(state => state.productDetail.error);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDetailProduct(productID));
    }, [dispatch, productID])

    const addToCartHandler = () => {
        props.history.push(`/cart/${productID}?qty=${qty}`);
    };
    return (
        <div>
            {
                error
                    ? <ErrorMessageBox variant='danger' message={error}></ErrorMessageBox>
                    : <div>
                        <Link to='/'>Back to home</Link>
                        <div className='row top'>
                            <div className='col-2'>
                                <img className='large' src={product.image} alt={product.name}></img>
                            </div>
                            <div className='col-1'>
                                <ul>
                                    <li>
                                        <h1>{product.name}</h1>
                                    </li>
                                    <li>
                                        <Rating
                                            rating={product.rating}
                                            numReviews={product.numReviews}
                                        ></Rating>
                                    </li>
                                    <li>
                                        <div className="price">${product.price}</div>
                                    </li>
                                    <li>
                                        Description:
                                        <p>{product.description}</p>
                                    </li>
                                </ul>
                            </div>
                            <div className='col-1'>
                                <div className='card card-body'>
                                    <ul>
                                        <li>
                                            <div className='row'>
                                                <div>Price</div>
                                                <div className='price'>${product.price}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='row'>
                                                <div>Status</div>
                                                <div>
                                                    {
                                                        product.countInStock > 0
                                                            ? <span className='success'>In stock</span>
                                                            : <span className='error'>Unvailable</span>
                                                    }
                                                </div>
                                            </div>
                                        </li>
                                        {
                                            product.countInStock > 0 &&
                                            <>
                                                <li>
                                                    <div className="row">
                                                        <div>Quantyti</div>
                                                        <select value={qty} onChange={e => setQty(e.target.value)}>
                                                            {
                                                                
                                                                [...Array(product.countInStock).keys()].map(
                                                                    x => <option key={x + 1} value={x + 1}> {x + 1}</option>
                                                                )
                                                            }
                                                        </select>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button 
                                                        onClick={addToCartHandler} 
                                                        className='primary'
                                                    >Add to cart
                                                    </button>
                                                </li>
                                            </>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
}

export default ProductScreen;