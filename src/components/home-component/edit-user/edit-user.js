import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import homeService from '../home.service';
import TextField from '@material-ui/core/TextField';
import toaster from '../../../core/toaster';
import './edit-user.scss';



const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function EditUser(props) {

    const [user, setUser] = React.useState({});
    const [errors, setError] = React.useState({});

    useEffect(() => {
        console.log('dialog',props)
        homeService.getUserByEmail(props.match.params.email).then(res=>{
            console.log(res)
            if(res.success) {
                let userDetais = {
                    id: res.data._id,
                    username: res.data.username,
                    email: res.data.email,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName
                }
                console.log('userDetais',userDetais)
                setUser({...userDetais});
                console.log('--->',user)
            }
           
        }).catch(err=>{
            console.log(err)
        });
    }, []);

    const goBack = event => {
        props.history.push(`/view-all-users`);
    }
    

    const handleChange = event => {
        console.log(event.target.name,'--',event.target.value)
        let userDetails = user;
        let err = errors;
        userDetails[event.target.name] = event.target.value;
        err[event.target.name] = (event.target.value) ? false : true;
        setUser({ ...userDetails });
        setError({ ...err });
    };

    const update = () =>{
        console.log('upate',user)
        homeService.updateUserData(user).then(res=>{
            if(res && res.success) {
                toaster.success(res.message)
            }
            //props.onClose();
        }).catch(err=>{
            console.log('err',err)
        })
    }

    return (
        <div>
            {/* <Dialog onClose={props.onClose} open={props.open && props.email === user.email}>
                <DialogTitle id="customized-dialog-title" onClose={props.onClose}>
                    Update User
                </DialogTitle>
                <DialogContent dividers> */}
            <Button  onClick={goBack} color="primary">
            Go back
            </Button>
            <div className="label"> Update User </div>
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
                        value={user.email || ''}
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
                        value={user.username || ''}
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
                        value={user.firstName || ''}
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
                        value={user.lastName || ''}
                        onChange={handleChange}
                        label="Last name"
                        variant="outlined" />
                </div>

            </div>
            <div className="btn">
                <Button autoFocus variant="contained" onClick={update} color="primary">
                    Update
                </Button>
            </div>

            
            {/* </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={update} color="primary">
                       Update
                    </Button>
                </DialogActions>
            </Dialog> */}
        </div>
    );
}