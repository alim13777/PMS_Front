import React from "react";
import Header from "../dashHeader";
import Container from "@material-ui/core/Container";
import Footer from "../dashFooter";

export default function FrameDashboard(props) {
    return (
        <div className={"frame-dashboard"}>
            <Header {...props}/>
            <Container>
                {props.children}
            </Container>
            <Footer/>
        </div>
    )
}
