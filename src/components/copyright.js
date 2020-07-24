import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";
import {getLanguage, setLanguage, useTranslation} from "react-multi-lang";

function Copyright() {
    const t = useTranslation()
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {t("Copyright.Title")+' © '}
            <Link color="inherit" href="/">
                {t("Header.Company")}
            </Link>{' '}
            {(getLanguage()==='en') ? new Date().getFullYear() : 1399}
            {'. '+t("Copyright.Statement",{company:t("Header.Company")})}
        </Typography>
    );
}

export default Copyright;
