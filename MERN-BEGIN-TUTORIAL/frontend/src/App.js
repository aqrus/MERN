import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import HomeScreen from './Components/Screen/HomeScreen';
import ProductScreen from './Components/Screen/ProductScreen';
import CartScreen from './Components/Screen/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './Components/Screen/SigninScreen';
import { signout } from './Actions/userAction';
import RegisterScreen from './Components/Screen/RegisterScreen';
import ShippingAddressScreen from './Components/Screen/ShippingAddressScreen';
import PaymentMethodScreen from './Components/Screen/PaymentMethodScreen';
import PlaceOrderScreen from './Components/Screen/PlaceOrderScreen';
import OrderScreens from './Components/Screen/OrderScreens';
import OrderHistoryScreen from './Components/Screen/OrderHistoryScreen';
import ProfileScreen from './Components/Screen/ProfileScreen';

function App() {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
    };
    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="row">
                    <div>
                        <Link className="brand" to="/">amazona</Link>
                    </div>
                    <div>
                        <Link to="/cart"> Cart
                            <span className="badge">{cartItems.length}</span>
                        </Link>
                        {
                            userInfo 
                                ?   <div className="dropdown">
                                        <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i></Link>
                                        <ul className="dropdown-content">
                                            <li>
                                                <Link to="#signout" onClick={signoutHandler}>Sign out</Link>
                                            </li>
                                            <li>
                                                <Link to="/orderhistory">History</Link>
                                            </li>
                                            <li>
                                                <Link to={`/myprofile`}>My Profile</Link>
                                            </li>
                                        </ul>
                                    </div>
                                : <Link to="signin">Sign In</Link>
                        }
                        
                    </div>
                </header>
                <main>
                    
                    <Route path='/product/:id' component={ProductScreen}></Route>
                    <Route path='/cart/:id?' component={CartScreen}></Route>
                    <Route path='/signin' component={ SigninScreen }></Route>
                    <Route path='/register' component={ RegisterScreen }></Route>
                    <Route path='/shiping' component={ ShippingAddressScreen }></Route>
                    <Route path='/payment' component={ PaymentMethodScreen }></Route>
                    <Route path='/placeorder' component={ PlaceOrderScreen }></Route>
                    <Route path='/order/:id' component={ OrderScreens }></Route>
                    <Route path='/orderhistory' component={ OrderHistoryScreen }></Route>
                    <Route path='/myprofile' component={ ProfileScreen }></Route>
                    <Route path='/' component={HomeScreen} exact></Route>
                </main>
                <footer className="row center">All right reserved</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
