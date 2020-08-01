import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PageLogo from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Background from '../images/signInSide.jpg';
import Copyright from '../components/copyright'
import {useTranslation} from "react-multi-lang";
import apiClient from "../services/api";
import {Redirect} from "react-router-dom";

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
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignInSide(probs) {
    const t = useTranslation()
    const classes = useStyles();
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password2, setPassword2] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        apiClient.get('/sanctum/csrf-cookie')
            .then(response => {
                apiClient.post('api/register', {
                    "firstName":firstName,
                    "lastName":lastName,
                    "email":email,
                    "password":password,
                    "password_confirmation":password2,
                    "account":"normal",
                    "language":"fa"
                }).then(response => {
                    console.log("response data:",response.data);
                    if (response.status === 200) {
                        return (<Redirect to='/' />)
                    }
                }).catch(error => {
                    // if (error.response && error.response.status === 422) {
                    //     setAuthError(true);
                    // } else {
                    //     setUnknownError(true);
                        console.error(error);
                    // }
                });
            });
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <PageLogo />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {t("SignUp.Title")}
                    </Typography>
                    <form className="w-100 mt-4" noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} >
                                <TextField id="email"
                                           name="email"
                                           autoComplete="email"
                                           variant="outlined" margin="none"
                                           required fullWidth autoFocus
                                           label={t("Login.Email")}
                                           onChange={e => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <TextField id="name"
                                           type="text"
                                           name="name"
                                           variant="outlined" margin="none"
                                           required fullWidth
                                           label={t("User.Name")}
                                           onChange={e => setFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="name"
                                           type="text"
                                           name="name"
                                           variant="outlined" margin="none"
                                           required fullWidth
                                           label={t("User.Surname")}
                                           onChange={e => setLastName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <TextField id="password"
                                           type="password"
                                           name="password"
                                           variant="outlined" margin="none"
                                           required fullWidth
                                           label={t("Login.Password")}
                                           onChange={e => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <TextField id="passwordR"
                                           type="password"
                                           name="password"
                                           variant="outlined" margin="none"
                                           required fullWidth
                                           label={t("SignUp.RepeatPass")}
                                           onChange={e => setPassword2(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {t("SignUp.SignUpButton")}
                        </Button>
                        <Grid container justify={"flex-end"}>
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    {t("SignUp.BackToLogin")}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>

                    <Box  mt={1} p={5} pb={0}>
                        <Copyright />
                    </Box>
                </div>
            </Grid>
        </Grid>
    );
}
