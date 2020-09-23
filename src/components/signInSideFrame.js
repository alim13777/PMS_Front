import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import PageLogo from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";

import Box from "@material-ui/core/Box";
import Copyright from "./copyright";
import {makeStyles} from "@material-ui/core/styles";
import Background from "../images/signInSide.jpg";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: "url(" + Background + ")",
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
}));

export default function SignInSideFrame (props) {
    const classes = useStyles();
    const {title} = props;
    return(
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PageLogo />
                    </Avatar>
                    <Typography component="h1" variant="h5" className="mb-4">
                        {title}
                    </Typography>

                    {props.children}

                    <Box className={"text-center"} mt={1} p={5} pb={0}>
                        <Copyright />
                    </Box>
                </div>
            </Grid>
        </Grid>
    );
}