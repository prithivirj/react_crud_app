import React from 'react';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    container:{
        marginTop: '150px'
    },
    titleSub: {
        fontSize: '40px',
        fontWeight: '500'
    }
}));

export default function Dashboard(props) {
    const classes = useStyles();

    

    return (
        <div align="center" className={classes.container}>
            <div className={classes.titleSub}>Welcome, user</div>
        </div>
    )
}