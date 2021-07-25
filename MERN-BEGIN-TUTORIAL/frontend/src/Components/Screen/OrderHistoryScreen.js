import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listOrderMine } from '../../Actions/orderAction';
import ErrorMessageBox from '../Message/ErrorMessageBox';
import LoadingBox from '../Message/LoadingBox';

export default function OrderHistoryScreen(props) {
    const { orders, error, loading } = useSelector(state => state.orderMineList);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listOrderMine())
    }, [dispatch])

    console.log(orders);
    return (
        <div>
            <h1>Order History</h1>
            {
                loading ? (<LoadingBox></LoadingBox>) 
                : error ? (<ErrorMessageBox></ErrorMessageBox>)
                : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createAt}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>{order.isPaid ? order.paidAt : 'No'}</td>
                                        <td>{order.isDelivered ? order.deliveredAt : 'No'}</td>
                                        <td>
                                            <button 
                                                type="button" 
                                                className="smaill" 
                                                onClick={() => {props.history.push(`/order/${order._id}`)}}>
                                                    Details
                                            </button>
                                        </td>
                                    </tr>
                                    
                                ))
                            }
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}
