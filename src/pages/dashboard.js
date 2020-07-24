import React from 'react';
import Header from "../components/dashHeader";
import Container from "@material-ui/core/Container";
import RecentPapers from "../components/layoutDash_recentPapers";
import {useTranslation} from "react-multi-lang";

const Dashboard = (props) => {
    const t = useTranslation()
    return (
        <div>
            <Header {...props}/>
            <Container>
                <h1>{t("Dashboard.Main.Title")}</h1>
                <RecentPapers/>
            </Container>

        </div>
    );
}

export default Dashboard;
