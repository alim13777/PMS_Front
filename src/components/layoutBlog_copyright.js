import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'حق مالکیت © '}
            <Link color="inherit" href="/#/">
                گروه مهندسین جوان 1399
            </Link>{' '}
            {/*{new Date().getFullYear()}*/}
            {/*{'.'}*/}
        </Typography>
    );
}

export default Copyright;
