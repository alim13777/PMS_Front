import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Copyright from "./copyright";
import {makeStyles} from "@material-ui/core/styles";
import Background from "../images/signInSide.jpg";
import Logo from "../images/logo.jpg";
import {useTranslation} from "react-multi-lang";

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
        margin: theme.spacing(4, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    footer: {
        position: "absolute",
        bottom: "0",
        padding: theme.spacing(2)
    }
}));

export default function SignInSideFrame (props) {
    const t = useTranslation()
    const classes = useStyles();
    const {title} = props;
    return(
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <img src={Logo} width="60px"/>
                    <Typography component="h1" variant="h5" className="mt-3">
                        {t("Home.Title")}
                    </Typography>
                    <Typography component="h1" variant="h6" className="mt-3 mb-4">
                        {title}
                    </Typography>

                    {props.children}

                    <div className={classes.footer}>
                        <Copyright />
                    </div>
                </div>
            </Grid>
        </Grid>
    );
}