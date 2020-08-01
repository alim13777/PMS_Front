import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import {useTranslation} from "react-multi-lang";
import Header from "../components/dashHeader";
import Footer from "../components/dashFooter";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import Grid from "@material-ui/core/Grid";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Paper} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginBottom: theme.spacing(1),
        minWidth: 300,
    },
    // selectEmpty: {
    //     marginTop: theme.spacing(2),
    // },
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const PaperPage = (props) => {
    const classes = useStyles();
    const t = useTranslation()

    return (
        <div className={"frame-dashboard"}>
            <Header {...props}/>
            <Container>
                <h1 className={"frame-dashboard-title"}>{t('Dashboard.Paper.Title',{'new':t("Action.New"),'add':"",'edit':""})}</h1>
                <Card>
                    {/*<CardContent>*/}
                    {/*    */}
                    {/*    /!*<Button variant="contained" color="primary">*!/*/}
                    {/*    /!*    {t("Action.Add")}*!/*/}
                    {/*    /!*</Button>*!/*/}

                    {/*<CardActions>*/}
                    {/*    <Button variant="contained" color="primary">*/}
                    {/*        {t("Action.Add")}*/}
                    {/*    </Button>*/}
                    {/*</CardActions>*/}

                    <Grid container spacing={3} component={CardContent}>
                        <Grid item xs={12}>
                            <form noValidate autoComplete="off">
                                <TextField id="paper-title"
                                           label={t("Dashboard.Paper.PaperTitle")}
                                           fullWidth variant="outlined" margin="dense"
                                           className={classes.formControl}/>
                                <FormControl variant="outlined"  margin="dense" className={classes.formControl}>
                                    <InputLabel id="paper-type-label">
                                        {t("Dashboard.Paper.PaperType")}
                                    </InputLabel>
                                    <Select id="paper-type"
                                            label={t("Dashboard.Paper.PaperType")}
                                            labelId="paper-type-label"
                                            autoWidth
                                        // value={age}
                                        // onChange={handleChange}
                                    >
                                        <ListSubheader>{t("Dashboard.Paper.PaperType")}:</ListSubheader>
                                        <MenuItem value="domesticJour">{t("Dashboard.Paper.Types.domesticJour")}</MenuItem>
                                        <MenuItem value="domesticConf">{t("Dashboard.Paper.Types.domesticConf")}</MenuItem>
                                        <MenuItem value="foreignJour">{t("Dashboard.Paper.Types.foreignJour")}</MenuItem>
                                        <MenuItem value="foreignConf">{t("Dashboard.Paper.Types.foreignConf")}</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField id="paper-desc"
                                           label={t("Dashboard.Paper.PaperDescription")}
                                           multiline rows={3} fullWidth
                                           variant="outlined"
                                           margin="dense"
                                    // className={classes.formControl}
                                />
                            </form>
                        </Grid>
                        <Grid item xs={6}>

                        </Grid>
                        <Grid item xs={6}>
                            <Card variant="outlined">
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Dessert (100g serving)</TableCell>
                                            <TableCell align="right">Calories</TableCell>
                                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow key={row.name}>
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.calories}</TableCell>
                                                <TableCell align="right">{row.fat}</TableCell>
                                                <TableCell align="right">{row.carbs}</TableCell>
                                                <TableCell align="right">{row.protein}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <hr/>
                            <Button variant="contained" color="primary">
                                {t("Action.Add")}
                            </Button>
                        </Grid>

                    </Grid>
                    {/*</CardContent>*/}
                </Card>



            </Container>
            <Footer/>
        </div>
    );
}

export default PaperPage;
