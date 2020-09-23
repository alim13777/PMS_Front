import React, {Fragment} from 'react';
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
import ButtonAdv from "../components/buttonAdv";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {useSnackbar} from "notistack";
import Alert from "@material-ui/lab/Alert";
import SignInFrame from "../components/signInSideFrame";
import {getLanguage} from "react-multi-lang/lib";

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
    link2Login: {
        margin: "16px 34px 8px 0"
    }
}));

export default function SignInSide(probs) {
    const t = useTranslation()
    const classes = useStyles();
    // const { enqueueSnackbar,closeSnackbar } = useSnackbar();
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password2, setPassword2] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        const packet = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password,
            "password_confirmation": password2,
            "account": "free",
            "language": getLanguage()
        };
        apiClient.post('api/register', packet
        ).then(res => {
            console.log("response:",res);
            setLoading(false)
            if (res.status === 200) {
                setSuccess(true)
            }
        }).catch(err => {
            console.error(err);
            setLoading(false)
        });
    }

    return (
        <SignInFrame title={t("SignUp.Title")}>
            {!success?
                <form className="w-100" noValidate onSubmit={handleSubmit}>
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
                            <TextField id="lastName"
                                type="text"
                                name="lastName"
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

                    <ButtonAdv type="submit" variant="contained" color="primary"
                        fullWidth className={classes.submit}
                        disabled={loading}
                        loading={loading.toString()}
                    >
                        {t("SignUp.SignUpButton")}
                    </ButtonAdv>

                    <Grid container justify={"flex-end"}>
                        <Grid item>
                            <Link href="/login" variant="body2">
                                {t("SignUp.BackToLogin")}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
                :null
            }

            <Box className="w-100">
                {success ?
                    <Alert severity="success" classes={{message:"w-100"}}>{t("SignUp.SuccessSignUp")}<br/>
                        {/*<Typography align={"center"} className={classes.link2Login}><Link href={"/login"}>{t("Login.Title")}</Link></Typography>*/}
                        <Typography align={"center"} className={classes.link2Login}><Button href={"/login"} variant={"outlined"} color={"inherit"}>{t("Login.Title")}</Button></Typography>
                    </Alert> : null
                }
                {/*{unknownError ? <Alert severity="error">{t("Login.UnknownError")}</Alert> : null}*/}
            </Box>
        </SignInFrame>

        // <Grid container component="main" className={classes.root}>
        //     <CssBaseline />
        //     <Grid item xs={false} sm={4} md={7} className={classes.image} />
        //     <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        //         <div className={classes.paper}>
        //             <Avatar className={classes.avatar}>
        //                 <PageLogo />
        //             </Avatar>
        //             <Typography component="h1" variant="h5">
        //                 {t("SignUp.Title")}
        //             </Typography>
        //             {!success?
        //                 <form className="w-100 mt-4" noValidate onSubmit={handleSubmit}>
        //                     <Grid container spacing={3}>
        //                         <Grid item xs={12} >
        //                             <TextField id="email"
        //                                        name="email"
        //                                        autoComplete="email"
        //                                        variant="outlined" margin="none"
        //                                        required fullWidth autoFocus
        //                                        label={t("Login.Email")}
        //                                        onChange={e => setEmail(e.target.value)}
        //                             />
        //                         </Grid>
        //                         <Grid item xs={6} >
        //                             <TextField id="name"
        //                                        type="text"
        //                                        name="name"
        //                                        variant="outlined" margin="none"
        //                                        required fullWidth
        //                                        label={t("User.Name")}
        //                                        onChange={e => setFirstName(e.target.value)}
        //                             />
        //                         </Grid>
        //                         <Grid item xs={6}>
        //                             <TextField //id="name"
        //                                 type="text"
        //                                 //name="name"
        //                                 variant="outlined" margin="none"
        //                                 required fullWidth
        //                                 label={t("User.Surname")}
        //                                 onChange={e => setLastName(e.target.value)}
        //                             />
        //                         </Grid>
        //                         <Grid item xs={6} >
        //                             <TextField id="password"
        //                                        type="password"
        //                                        name="password"
        //                                        variant="outlined" margin="none"
        //                                        required fullWidth
        //                                        label={t("Login.Password")}
        //                                        onChange={e => setPassword(e.target.value)}
        //                             />
        //                         </Grid>
        //                         <Grid item xs={6} >
        //                             <TextField id="passwordR"
        //                                        type="password"
        //                                        name="password"
        //                                        variant="outlined" margin="none"
        //                                        required fullWidth
        //                                        label={t("SignUp.RepeatPass")}
        //                                        onChange={e => setPassword2(e.target.value)}
        //                             />
        //                         </Grid>
        //                     </Grid>
        //                     {/*<Button*/}
        //                     {/*    type="submit"*/}
        //                     {/*    fullWidth*/}
        //                     {/*    variant="contained"*/}
        //                     {/*    color="primary"*/}
        //                     {/*    className={classes.submit}*/}
        //                     {/*    disabled={loading}*/}
        //                     {/*>*/}
        //                     {/*    {t("SignUp.SignUpButton")}*/}
        //                     {/*</Button>*/}
        //                     <ButtonAdv
        //                         type="submit"
        //                         fullWidth
        //                         variant="contained"
        //                         color="primary"
        //                         className={classes.submit}
        //                         disabled={loading}
        //                         loading={loading}
        //                     >
        //                         {t("SignUp.SignUpButton")}
        //                     </ButtonAdv>
        //
        //                     <Grid container justify={"flex-end"}>
        //                         <Grid item>
        //                             <Link href="/login" variant="body2">
        //                                 {t("SignUp.BackToLogin")}
        //                             </Link>
        //                         </Grid>
        //                     </Grid>
        //                 </form>
        //             :null}
        //
        //
        //             <Box className="w-100 mt-4">
        //                 {success ?
        //                     <Alert severity="success" classes={{message:"w-100"}}>{t("SignUp.SuccessSignUp")}<br/>
        //                         <Typography align={"center"} className={classes.link2Login}><Link href={"/login"}>{t("Login.Title")}</Link></Typography>
        //                     </Alert> : null
        //                 }
        //                 {/*{unknownError ? <Alert severity="error">{t("Login.UnknownError")}</Alert> : null}*/}
        //             </Box>
        //             <Box className={"text-center"} mt={1} p={5} pb={0}>
        //                 <Copyright />
        //             </Box>
        //         </div>
        //     </Grid>
        // </Grid>
    );
}
