import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';

import CreateUser from './create-user/create-user';
import EditUser from './edit-user/edit-user';
import UsersGrid from './users-grid/users-grid';
import PageNotFound from '../../core/pageNotFound';
import Dashboard from './dashboard/dashboard';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    }
}));

function Home(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [menuList, setMenuList] = React.useState([]);

    const handleDrawer = () => {
        let flag = open;
        flag = !flag;
        setOpen(flag);
    };

    useEffect(() => {
        if (localStorage.getItem('jwt') == undefined) {
            props.history.push('');
        }
        setMenuList([{
            key: 'dashboard',
            label: 'Dashboard',
            icon: 'dashboard'
        }, {
            key: 'createUser',
            label: 'Create User',
            icon: 'group_add'
        }, {
            key: 'viewAllUser',
            label: 'View All User',
            icon: 'people'
        }]);
    }, []);

    const handleLogout = () => {
        props.history.push('');
    }

    const menuOnClick = (menu) => {
        switch (menu) {
            case 'dashboard':
                props.history.push(`/dashboard`);
                break;
            case 'createUser':
                props.history.push(`/create-user`);
                break;
            case 'viewAllUser':
                props.history.push(`/view-all-users`);
                break;
            default:
                break;
        }
    }

    return (
        <div id="home-container">
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawer}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        React CRUD 
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>LogOut</Button>
                </Toolbar>
            </AppBar>

            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawer}>
                        <MenuIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {menuList.map((menu) => (
                        <ListItem button key={menu.key} onClick={() => menuOnClick(menu.key)}>
                            <ListItemIcon><span className="material-icons">{menu.icon}</span></ListItemIcon>
                            <ListItemText primary={menu.label} />
                        </ListItem>
                    ))}
                </List>

            </Drawer>

            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <Switch>
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path='/create-user' component={CreateUser} />
                    <Route exact path='/edit-user/:email' component={EditUser} />
                    <Route exact path="/view-all-users" component={UsersGrid} />
                    <Route path="*" component={PageNotFound} />
                </Switch>
            </main>
        </div>
    );
}

export default Home;