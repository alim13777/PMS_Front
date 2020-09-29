import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import apiClient from './services/api';
import {lighten, ThemeProvider} from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import 'bootstrap-v4-rtl/dist/css/bootstrap.css';
import 'bootstrap-v4-rtl/dist/css/bootstrap-rtl.css';

// Import pages:
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import SignUp from './pages/signUp';
import Error from './pages/error';
import PaperPage from "./pages/paper";
import NewPaperPage from "./pages/newPaper";
import PapersListPage from './pages/papersList';
import ProfilePage from "./pages/profile";
// Import fonts
import Vazir from './fonts/Vazir-FD-WOL.woff';
// Import translations:
import { setTranslations, setDefaultLanguage } from 'react-multi-lang'
import fa from './langs/fa.json'
import en from './langs/en.json'
import './App.css';
import {faIR} from "@material-ui/core/locale";
import VerifyRegister from "./pages/verifyRegister";
import {SnackbarProvider} from "notistack";

setTranslations({fa, en})
setDefaultLanguage('fa')

const fontVazir = {
    fontFamily: 'Vazir',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
    local('Vazir'),
    local('Vazir-Regular'),
    url(${Vazir}) format('woff2')
  `,
    // unicodeRange:
    //     'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const theme = createMuiTheme({
    direction: 'rtl',
    typography: {
        fontFamily: 'Vazir, Arial',
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [fontVazir],
            },
        },
        MuiTableCell: {
            head: {
                fontWeight: 700
            }
        }
    },
    'hr': {
        borderWidth: "1px",

    }
},faIR);

theme.overrides = {
    ...theme.overrides,
    MuiTableRow: {
        root:{
            "&$selected": {
                backgroundColor: lighten(theme.palette.info.light, 0.85),
            },
            "&$selected:hover": {
                backgroundColor: lighten(theme.palette.info.light, 0.65),
            },
        }

    }
}

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
function RTL(props) {
    return (
        <StylesProvider jss={jss}>
            {props.children}
        </StylesProvider>
    );
}

const App = () => {
    const [loggedIn, setLoggedIn] = React.useState(
        sessionStorage.getItem('loggedIn') === 'true' || false
    );
    // const [user, setUser] = React.useState({});
    const login = (data) => {
        // console.log("login...")
        // console.log("data:",data)

        // setUser(JSON.stringify(data));
        sessionStorage.setItem('user', JSON.stringify(data));

        // console.log("user:",user)
        // console.log("stored user:",sessionStorage.getItem('user'))

        setLoggedIn(true);
        sessionStorage.setItem('loggedIn', true);
    };
    const logout = () => {
        apiClient.post('/logout').then(response => {
            if (response.status === 204) {
                setLoggedIn(false);
                sessionStorage.setItem('loggedIn', false);
                sessionStorage.removeItem('user');
            }
        })
    };

    const verifyEmail = ()=> {
        console.log("verifying...")
        return <Redirect to='/login' />
    }

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <RTL>
                    <SnackbarProvider maxSnack={3}>

                    {/*<div className="container mt-5 pt-5">*/}
                        <Switch>
                            <Route path='/' exact render={props => (
                                <Home {...props} loggedIn={loggedIn} logout={logout} />
                            )} />
                            <Route path='/login' render={props => (
                                (loggedIn)
                                    ? <Redirect to='/dashboard' />
                                    : <Login {...props} login={login}/>
                            )} />
                            {/*<Route path='/signUp' render={props => (*/}
                            {/*    (loggedIn)*/}
                            {/*        ? <Redirect to='/dashboard' />*/}
                            {/*        : <SignUp {...props} />*/}
                            {/*)} />*/}
                            <Route
                                path="/signUp"
                                render={({ match: { url } }) => (
                                    <>
                                        <Route path={`${url}/`} exact render={(props)=>(
                                            (loggedIn)
                                                ? <Redirect to='/dashboard' />
                                                : <SignUp {...props} />
                                        )}/>
                                        <Route path={`${url}/verify`} render={(props)=>(
                                            <VerifyRegister/>
                                        )}/>
                                    </>
                                )}
                            />
                            <Route
                                path="/dashboard"
                                render={({ match: { url } }) => (
                                    <>
                                        <Route path={`${url}/`} exact render={(props)=>(
                                            (loggedIn)
                                                ? <Dashboard {...props} loggedIn={loggedIn} logout={logout}/>
                                                : <Redirect to='/login' />
                                        )}/>
                                        <Route path={`${url}/paper`} render={(props)=>(
                                            (loggedIn)
                                                ? <PaperPage {...props} loggedIn={loggedIn} logout={logout}/>
                                                : <Redirect to='/login' />
                                        )}/>
                                        <Route path={`${url}/newPaper`} render={(props)=>(
                                            (loggedIn)
                                                ? <NewPaperPage {...props} loggedIn={loggedIn} logout={logout}/>
                                                : <Redirect to='/login' />
                                        )}/>
                                        <Route path={`${url}/papersList`} render={(props)=>(
                                            (loggedIn)
                                                ? <PapersListPage {...props} loggedIn={loggedIn} logout={logout}/>
                                                : <Redirect to='/login' />
                                        )}/>
                                    </>
                                )}
                            />
                            <Route path='/profile' render={props => (
                                (loggedIn)
                                    ? <ProfilePage {...props} loggedIn={loggedIn} logout={logout}/>
                                    : <Redirect to='/login' />
                            )} />
                            <Route component={Error}/>
                        </Switch>
                    {/*</div>*/}
                    </SnackbarProvider>
                </RTL>
            </ThemeProvider>
        </Router>
    );
};

export default App;