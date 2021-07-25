import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, updateUserProfile } from '../../Actions/userAction';
import ErrorMessageBox from '../Message/ErrorMessageBox';
import LoadingBox from '../Message/LoadingBox';

export default function ProfileScreen(props) {

    const { userInfo } = useSelector(state => state.user);
    const { loading, error, userDetail } = useSelector(state => state.userDetail);
    const { loadingUpdate, errorUpdate, successUpdate } = useSelector(state => state.userUpdate);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if(!userDetail) {
            dispatch(detailsUser(userInfo._id))
        }
        else{
            setName(userDetail.name);
            setEmail(userDetail.email);
            
        }
    }, [dispatch, userDetail, userInfo._id])

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert('password and Confirm Password are not match');
        } else {
            dispatch(updateUserProfile({ userId: userDetail._id, name, email, password}));
        }
    }
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <h1>User Profile</h1>
                    {
                        loading ? <LoadingBox></LoadingBox>
                            : error ? <ErrorMessageBox variant="danger" message={error}></ErrorMessageBox>
                                : (<>
                                    { loadingUpdate && <LoadingBox></LoadingBox> }
                                    { errorUpdate && <ErrorMessageBox variant="danger" message={errorUpdate}></ErrorMessageBox> }
                                    {successUpdate && <ErrorMessageBox variant="succes" message="Update succes"></ErrorMessageBox> }
                                    <div>
                                        <label htmlFor="name">Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="Enter Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        >
                                        </input>
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="Enter Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        >
                                        </input>
                                    </div>
                                    <div>
                                        <label htmlFor="password">PassWord</label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Enter Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        >
                                        </input>
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword">confirm PassWord</label>
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="Enter Confirm Password"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        >
                                        </input>
                                    </div>
                                    <div>
                                        <label>
                                            <button className="primary" type="submit"> Update </button>
                                        </label>
                                    </div>
                                </>
                                )
                    }
            </form>

        </div>
    )
}
