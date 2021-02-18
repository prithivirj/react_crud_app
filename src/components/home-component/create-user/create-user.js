import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import homeService from '../home.service'
import './create-user.scss';
import toaster from '../../../core/toaster';

export default function CreateUser(props) {

    const [user, setUser] = React.useState({});
    const [errors, setError] = React.useState({});

    const handleChange = event => {
        console.log(event.target.name,'--',event.target.value)
        let userDetails = user;
        let err = errors;
        userDetails[event.target.name] = event.target.value;
        err[event.target.name] = (event.target.value) ? false : true;
        if(event.target.name === 'passwordConf') {
            err[event.target.name] = {}
            err[event.target.name].required = (event.target.value) ? false : true;
            err[event.target.name].equal = (userDetails.password === event.target.value) ? false : true;
        }
        setUser({ ...userDetails });
        setError({ ...err });
    };

    const onSubmit = () => {
        console.log(user)
        if(Object.keys(user).length === 0 || !user.email || !user.username || !user.password) {
            toaster.error('Enter all the mandatory fields')
        } else {
            homeService.createUser(user).then(res=>{
                console.log(res);
                if(res && res.success && res.message) {
                    toaster.success(res.message);
                    setUser({});
                } else if(res && !res.success && res.message) {
                    toaster.error(res.message);
                }
            }).catch(err=>{
                console.log(err);
            })
        }
    }

    return (
        <div className="create-user-container">
            <div className="user-label">
                Create new user
            </div>
            <div className="form-container">
                <div className="item">
                    <TextField
                        id="outlined-basic"
                        className="width-100"
                        autoComplete="off"
                        name="email"
                        onChange={handleChange}
                        label="E-mail"
                        variant="outlined"
                        error={errors.email}
                        helperText={errors.email ? "E-mail is required." : ''}
                        required />
                </div>
                <div className="item">
                    <TextField
                        id="outlined-basic"
                        className="width-100"
                        autoComplete="off"
                        name="username"
                        onChange={handleChange}
                        label="Username"
                        variant="outlined"
                        error={errors.username}
                        helperText={errors.username ? "Username is required." : ''}
                        required />
                </div>
                <div className="item">
                    <TextField
                        id="outlined-basic"
                        className="width-100"
                        autoComplete="off"
                        name="firstName"
                        onChange={handleChange}
                        label="First name"
                        variant="outlined" />
                </div>
                <div className="item">
                    <TextField
                        id="outlined-basic"
                        className="width-100"
                        autoComplete="off"
                        name="lastName"
                        onChange={handleChange}
                        label="Last name"
                        variant="outlined" />
                </div>
                <div className="item">
                    <TextField
                        id="outlined-basic"
                        className="width-100"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        label="Password"
                        variant="outlined"
                        error={errors.password}
                        helperText={errors.password ? "Password is required." : ''}
                        required />
                </div>
                <div className="item">
                    <TextField
                        id="outlined-basic"
                        className="width-100"
                        type="password"
                        name="passwordConf"
                        onChange={handleChange}
                        label="Confirm Password"
                        variant="outlined"
                        error={errors.passwordConf && (errors.passwordConf.required || errors.passwordConf.equal)}
                        helperText={errors.passwordConf ? errors.passwordConf.required ? "Confirm password is required" : errors.passwordConf.equal ? "Password and Confirm password must be same." : '' : ''}
                        required />
                </div>
                <div className={"item width-100"}>
                    <Button
                        className="btn-submit"
                        variant="contained"
                        color="primary"
                        onClick={onSubmit}>
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
}