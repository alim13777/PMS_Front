import React from 'react';
import Header from "./layoutDash_header";
import Container from "@material-ui/core/Container";
import RecentPapers from "./layoutDash_recentPapers";

const About = () => {
    return (
        <div>
            <Header/>
            <Container>
                <h1>داشبورد</h1>
                <RecentPapers/>
            </Container>

        </div>
    );
}

export default About;
