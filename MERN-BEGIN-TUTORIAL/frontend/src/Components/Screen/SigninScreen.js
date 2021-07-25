import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { signing } from '../../Actions/userAction';
import ErrorMessageBox from '../Message/ErrorMessageBox';

export default function SigninScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const query = new URLSearchParams(props.location.search);
    const redirect = query.get('redirect') ?? '/';

    const { userInfo,error } = useSelector(state => state.user)
    
    const onSubmitHandler = (e) => {
        e.preventDefault(); 
        dispatch(signing(email, password));
    }

    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, userInfo, redirect])
    return (
        <div className="container"> 
            <form  method="POST" className="form-horizontal" onSubmit={onSubmitHandler}>
            { error && <ErrorMessageBox variant="danger" message={error}></ErrorMessageBox>}
                    <div className="form-group">
                        <h1>Sign In</h1>
                    </div>
                    <div>
                        <span className="label label-info">Email</span>
                        <input 
                            type="email"
                            name="email"
                            className="form-control"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span className="label  label-info">Pass Word</span>
                        <input 
                            type="password"
                            name="password"
                            className="form-control"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <div className="col-md-4 col-md-offset-4">
                            <button type="submit" className="btn btn-primary btn-lg">Sign In</button>
                        </div>
                    </div>
                    <div>
                        NewCustomer ? <Link to={`/register?redirect=${redirect}`}>Create your accout</Link>
                    </div>
            </form>
            
        </div>
    )
}
