import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";

import UserMenu from "./userMenu"
import {useTranslation} from "react-multi-lang";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    appMenu: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
        padding: "0"
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    appMenuToolbar: {
        minHeight: "45px",
        padding: "0"
    },
    appMenuLink: {
        margin: theme.spacing(1, 1.5),
        color: "cadetblue",
        '&:hover' :{
            color: "black"
        },
        '&:first-child' :{
            marginStart: "0"
        }
    }
}));

export default function Header(props) {
    const classes = useStyles();
    const t = useTranslation()
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="static" color="inherit" elevation={0} className={classes.appBar}>
                <Container>
                    <Toolbar className={classes.toolbar}>
                        <Link variant="h6" color="textPrimary" href="/" underline={"none"} className={classes.toolbarTitle}>
                            {t('Header.Company')}
                        </Link>
                        <UserMenu {...props} />
                    </Toolbar>
                </Container>
            </AppBar>
            <AppBar position="static" color="inherit" elevation={0} className={classes.appMenu}>
                <Container>
                    <Toolbar className={classes.appMenuToolbar}>
                        <Link variant="button" color="textPrimary" underline={"none"} href="/dashboard" className={classes.appMenuLink}>
                            {t('Dashboard.Main.Title')}
                        </Link>
                        <Link variant="button" color="textPrimary" underline={"none"} href="/dashboard/papersList" className={classes.appMenuLink}>
                            {t('Dashboard.PapersList.Title')}
                        </Link>
                        <Link variant="button" color="textPrimary" underline={"none"} href="/dashboard/paper" className={classes.appMenuLink}>
                            {t('Dashboard.Paper.Title',{'new':t("Action.New"),'add':"",'edit':""})}
                        </Link>
                    </Toolbar>
                </Container>
            </AppBar>
        </React.Fragment>
    );
}
