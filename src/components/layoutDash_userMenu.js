// import React from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import DraftsIcon from '@material-ui/icons/Drafts';
// import SendIcon from '@material-ui/icons/Send';
//
// const StyledMenu = withStyles({
//     paper: {
//         border: '1px solid #d3d4d5',
//     },
// })((props) => (
//     <Menu
//         elevation={0}
//         getContentAnchorEl={null}
//         anchorOrigin={{
//             vertical: 'bottom',
//             horizontal: 'center',
//         }}
//         transformOrigin={{
//             vertical: 'top',
//             horizontal: 'center',
//         }}
//         {...props}
//     />
// ));
//
// const StyledMenuItem = withStyles((theme) => ({
//     root: {
//         '&:focus': {
//             backgroundColor: theme.palette.primary.main,
//             '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
//                 color: theme.palette.common.white,
//             },
//         },
//     },
// }))(MenuItem);
//
// export default function CustomizedMenus() {
//     const [anchorEl, setAnchorEl] = React.useState(null);
//
//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };
//
//     const handleClose = () => {
//         setAnchorEl(null);
//     };
//
//     return (
//         <div>
//             <Button
//                 aria-controls="customized-menu"
//                 aria-haspopup="true"
//                 variant="contained"
//                 color="primary"
//                 onClick={handleClick}
//             >
//                 Open Menu
//             </Button>
//             <StyledMenu
//                 id="customized-menu"
//                 anchorEl={anchorEl}
//                 keepMounted
//                 open={Boolean(anchorEl)}
//                 onClose={handleClose}
//             >
//                 <StyledMenuItem>
//                     <ListItemIcon>
//                         <SendIcon fontSize="small" />
//                     </ListItemIcon>
//                     <ListItemText primary="Sent mail2" />
//                 </StyledMenuItem>
//                 <StyledMenuItem>
//                     <ListItemIcon>
//                         <DraftsIcon fontSize="small" />
//                     </ListItemIcon>
//                     <ListItemText primary="Drafts" />
//                 </StyledMenuItem>
//                 <StyledMenuItem>
//                     <ListItemIcon>
//                         <InboxIcon fontSize="small" />
//                     </ListItemIcon>
//                     <ListItemText primary="Inbox" />
//                 </StyledMenuItem>
//             </StyledMenu>
//         </div>
//     );
// }








import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

import UserIcon from '@material-ui/icons/AccountCircle';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import ProfileIcon from '@material-ui/icons/PersonOutline';
import PromotionIcon from '@material-ui/icons/LockOpen';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    zeroPad: {
        padding: "0",
    },
    username: {
        marginLeft: "6px"
    },
    userMenuIcon: {
        minWidth: "38px"
    }
}));

export default function MenuListComposition() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }


    function ListItemLink(props) {
        return <ListItem button component="a" {...props} />;
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root}>
            <div>

                <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <UserIcon/>
                    <Typography variant={"body1"} className={classes.username}>
                        مجتبی فاضلی نیا
                    </Typography>
                </Button>
                {/*<IconButton*/}
                {/*    ref={anchorRef}*/}
                {/*    aria-controls={open ? 'menu-list-grow' : undefined}*/}
                {/*    aria-haspopup="true"*/}
                {/*    onClick={handleToggle}*/}
                {/*>*/}
                {/*    <UserIcon/>*/}
                {/*</IconButton>*/}
                <Popper placement={'bottom-end'} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'end top' : 'end top' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} className={classes.zeroPad}>
                                        <List component="nav" dense={true} aria-label="user menu">
                                            <ListItemLink href="#">
                                                <ListItemIcon className={classes.userMenuIcon}>
                                                    <ProfileIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="حساب کاربری" />
                                            </ListItemLink>
                                            <ListItemLink divider={true} href="#">
                                                <ListItemIcon className={classes.userMenuIcon}>
                                                    <PromotionIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="ارتقای حساب" />
                                            </ListItemLink>
                                            <ListItemLink href="#/">
                                                <ListItemIcon className={classes.userMenuIcon}>
                                                    <LogoutIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="خروج" />
                                            </ListItemLink>
                                        </List>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
}
