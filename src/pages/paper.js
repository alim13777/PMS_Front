import React from 'react';
import Header from "../components/dashHeader";
import Container from "@material-ui/core/Container";
import {useTranslation} from "react-multi-lang";
import Footer from "../components/dashFooter";

const PaperPage = (props) => {
    const t = useTranslation()
    return (
        <div className={"frame-dashboard"}>
            <Header {...props}/>
            <Container>
                <h1>{t('Dashboard.Paper.Title',{'new':t("Action.New"),'add':"",'edit':""})}</h1>

            </Container>
            <Footer/>
        </div>
    );
}

export default PaperPage;
