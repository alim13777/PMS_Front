import React from 'react';
import Navigation from "./layoutBlog_navigation";
import Footer from "./layoutBlog_footer";
import {makeStyles} from "@material-ui/core/styles";
import HeaderImage from '../../images/signInSide.jpg'
import {Link} from "react-router-dom";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        paddingTop: "65px"
    },
    header: {
        backgroundImage: "url(" + HeaderImage + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        height: "400px",

    }
}));

const home = () => {
    return (
        <div className={useStyles().root}>
            <Navigation />
            <div className={useStyles().header}>
                <Container>
                    <br/>
                    <h1>سامانه مدیریت مقالات پژوهشی</h1>
                </Container>
            </div>
            <Container>
                <h1>Home</h1>
                <p>Home page body content</p>
                <Link to={"dashboard"} underline={"hover"}>دموی داشبورد</Link>
            </Container>
            <Footer/>
        </div>
    );
}

export default home;
