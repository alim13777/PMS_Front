// // require('./bootstrap');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch, HashRouter } from 'react-router-dom';
import {
    BrowserRouter as Router,
//     Switch,
//     Route,
//     Link
} from "react-router-dom";

import Home from './components/pageBlog_home';
import About from './components/pageBlog_about';
import Contact from './components/pageBlog_contact';
import SignIn from './components/pageBlog_signIn';
import SignUp from './components/pageBlog_signUp';
import Error from './components/pageBlog_error';
import Dashboard from './components/pageDash_dashboard';

import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';


import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

import Vazir from '../fonts/Vazir-FD-WOL.woff';

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
    },
});


// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
function RTL(props) {
    return (
        <StylesProvider jss={jss}>
            {props.children}
        </StylesProvider>
    );
}

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <div>
                        <RTL>
                            <HashRouter>
                                <Switch>
                                    <Route exact path="/" component={Home}/>
                                    <Route path="/about" component={About}/>
                                    <Route path="/contact" component={Contact}/>
                                    <Route path="/signIn" component={SignIn}/>
                                    <Route path="/signUp" component={SignUp}/>
                                    <Route path="/dashboard" component={Dashboard}/>
                                    <Route component={Error}/>
                                </Switch>
                            </HashRouter>
                        </RTL>
                    </div>
                </BrowserRouter>
            </ThemeProvider>

        );
    }
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}


//
// import React from "react";
// import ReactDOM from 'react-dom';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     HashRouter
// } from "react-router-dom";
//
// // This site has 3 pages, all of which are rendered
// // dynamically in the browser (not server rendered).
// //
// // Although the page does not ever refresh, notice how
// // React Router keeps the URL up to date as you navigate
// // through the site. This preserves the browser history,
// // making sure things like the back button and bookmarks
// // work properly.
//
// export default function BasicExample() {
//     return (
//         <HashRouter >
//             <div>
//                 <ul>
//                     <li>
//                         <Link to="/">Home</Link>
//                     </li>
//                     <li>
//                         <Link to="/about">About</Link>
//                     </li>
//                     <li>
//                         <Link to="/dashboard">Dashboard</Link>
//                     </li>
//                 </ul>
//
//                 <hr />
//
//                 {/*
//           A <Switch> looks through all its children <Route>
//           elements and renders the first one whose path
//           matches the current URL. Use a <Switch> any time
//           you have multiple routes, but you want only one
//           of them to render at a time
//         */}
//                 <Switch>
//                     <Route exact path="/">
//                         <Home />
//                     </Route>
//                     <Route path="/about">
//                         <About />
//                     </Route>
//                     <Route path="/dashboard">
//                         <Dashboard />
//                     </Route>
//                 </Switch>
//             </div>
//         </HashRouter >
//     );
// }
//
// // You can think of these components as "pages"
// // in your app.
//
// function Home() {
//     return (
//         <div>
//             <h2>Home</h2>
//         </div>
//     );
// }
//
// function About() {
//     return (
//         <div>
//             <h2>About</h2>
//         </div>
//     );
// }
//
// function Dashboard() {
//     return (
//         <div>
//             <h2>Dashboard</h2>
//         </div>
//     );
// }
//
// if (document.getElementById('root')) {
//     ReactDOM.render(<BasicExample />, document.getElementById('root'));
// }
