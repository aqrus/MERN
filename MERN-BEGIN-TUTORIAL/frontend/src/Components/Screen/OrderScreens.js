import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { detailOrder, payOrder } from '../../Actions/orderAction';
import ErrorMessageBox from '../Message/ErrorMessageBox';
import LoadingBox from '../Message/LoadingBox';
import { ORDER_PAY_RESET } from '../../Constants/orderConstant';

export default function OrderScreen(props) {

    const orderId = props.match.params.id;
    const { orderDetail, error } = useSelector((state) => state.orderDetail);
    const { errorPay, successPay, loadingPay } = useSelector((state) => state.orderPay);
    const [sdkReady, setSdkReady] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const addPayPalScript = async () => {
          const { data } = await axios.get('/api/config/paypal');
          const script = document.createElement('script');
          script.type = "text/javascript";
          script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
          script.async = true;
          script.onload = () => {
            setSdkReady(true)
          }
          document.body.appendChild(script);
        }
        if(!orderDetail._id || successPay || (orderDetail && orderDetail._id !== orderId)) {
          dispatch({ type: ORDER_PAY_RESET });
          dispatch(detailOrder(orderId));
        } else {
          if(!orderDetail.isPaid){
            if(!window.paypal) {
              addPayPalScript();
            } else {
              setSdkReady(true);
            }
          }
        }
        
    }, [dispatch, orderDetail, orderId, sdkReady, successPay]);

    const successPaymentHandler = (paymentResult) => {
      dispatch(payOrder(orderDetail, paymentResult))
    }
    return error ? (
        <ErrorMessageBox variant="danger" message={error}></ErrorMessageBox>
      ) : (
        <div>
          <h1>Order {orderDetail._id}</h1>
          <div className="row top">
            <div className="col-2">
              <ul>
                <li>
                  <div className="card card-body">
                    <h2>Shipping</h2>
                    <p>
                      <strong>Name:</strong> {orderDetail.shippingAddress.fullName } <br />
                      <strong>Address: </strong> {orderDetail.shippingAddress.address},
                      {orderDetail.shippingAddress.city},{' '}
                      {orderDetail.shippingAddress.postalCode},
                      {orderDetail.shippingAddress.country}
                    </p>
                    {orderDetail.isDelivered ? (
                      <ErrorMessageBox variant="success">
                        Delivered at {orderDetail.deliveredAt}
                      </ErrorMessageBox>
                    ) : (
                      <ErrorMessageBox variant="danger" message="Not Delivered"></ErrorMessageBox>
                    )}
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Payment</h2>
                    <p>
                      <strong>Method:</strong> {orderDetail.paymentMethod}
                    </p>
                    {orderDetail.isPaid ? (
                      <ErrorMessageBox variant="success" message={`Paid at ${orderDetail.paidAt}`}>
                        
                      </ErrorMessageBox>
                    ) : (
                      <ErrorMessageBox variant="danger" message="Not Paid"></ErrorMessageBox>
                    )}
                  </div>
                </li>
                <li>
                  <div className="card card-body">
                    <h2>Order Items</h2>
                    <ul>
                      {orderDetail.orderItems.map((item) => (
                        <li key={item.id}>
                          <div className="row">
                            <div>
                              <img
                                src={item.image}
                                alt={item.name}
                                className="small"
                              ></img>
                            </div>
                            <div className="min-30">
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </div>
    
                            <div>
                              {item.qty} x ${item.price} = ${item.qty * item.price}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <h2>Order Summary</h2>
                  </li>
                  <li>
                    <div className="row">
                      <div>Items</div>
                      <div>${orderDetail.itemsPrice.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Shipping</div>
                      <div>${orderDetail.shippingFee.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Tax</div>
                      <div>${orderDetail.taxFee.toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>
                        <strong> Order Total</strong>
                      </div>
                      <div>
                        <strong>${orderDetail.totalPrice.toFixed(2)}</strong>
                      </div>
                    </div>
                  </li>
                  {!orderDetail.isPaid && (
                    <li>
                      {!sdkReady ? (
                        <LoadingBox></LoadingBox>
                      ) : (
                        <>
                          {errorPay && (
                            <ErrorMessageBox variant="danger" message={errorPay}></ErrorMessageBox>
                          )}
                          {loadingPay && <LoadingBox></LoadingBox>}
    
                          <PayPalButton
                            amount={orderDetail.totalPrice}
                            onSuccess={successPaymentHandler}
                          ></PayPalButton>
                        </>
                      )}
                    </li>
                  )}
                  {/* {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                    <li>
                      {loadingDeliver && <LoadingBox></LoadingBox>}
                      {errorDeliver && (
                        <MessageBox variant="danger">{errorDeliver}</MessageBox>
                      )}
                      <button
                        type="button"
                        className="primary block"
                        onClick={deliverHandler}
                      >
                        Deliver Order
                      </button>
                    </li>
                  )} */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
}
