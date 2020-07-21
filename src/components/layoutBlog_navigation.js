import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink, useHistory } from 'react-router-dom';
import Container from "@material-ui/core/Container";
import PropTypes from 'prop-types';
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
        padding: "0"
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
        textDecoration: "none"
    }
}));
//
// function AppBarNavLink({label,to}) {
//     const classes = useStyles();
//     const history = useHistory();
//     function handleClick() {
//         history.push(to);
//     }
//     return (
//         <Link variant="button" color="textPrimary" href="#" onClick={handleClick} className={classes.link}>
//             {label}
//         </Link>
//     );
// }

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default function Header(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <ElevationScroll {...props}>
            <AppBar color="inherit" elevation={0} className={classes.appBar}>
                <Container>
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                            Company Name
                        </Typography>
                        <nav>
                            <Link variant="button" color="textPrimary" href="/#/" className={classes.link}>
                                خانه&nbsp;
                            </Link>
                            <Link variant="button" color="textPrimary"  className={classes.link}>
                                قیمت ها
                            </Link>
                            <Link variant="button" color="textPrimary" href="/#/about" className={classes.link}>
                                درباره ما
                            </Link>
                            <Link variant="button" color="textPrimary" href="/#/contact" className={classes.link}>
                                ارتباط با ما
                            </Link>
                            {/*<AppBarNavLink label="About" to="/about"/>*/}
                            {/*<AppBarNavLink label="Contact us" to="/contact"/>*/}
                            {/*<AppBarNavLink label="Home" to="/"/>*/}
                        </nav>
                        <NavLink to="/signIn" className={classes.link}>
                            <Button color="primary" variant="outlined">
                                ورود / عضویت
                            </Button>
                        </NavLink>
                    </Toolbar>
                </Container>
            </AppBar>
            </ElevationScroll>
        </React.Fragment>
    );
}
