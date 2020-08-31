import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import {getLanguage, useTranslation} from "react-multi-lang";
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
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import {paperStatusList} from "../components/lexicon";
import DatePicker from "react-modern-calendar-datepicker";
import SearchAuthors from "../components/searchAuthors";
import ManageAuthors from "../components/manageAuthors";
import Box from "@material-ui/core/Box";
import apiClient from "../services/api";

const user = JSON.parse(sessionStorage.getItem('user'));

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginBottom: theme.spacing(1),
        minWidth: 300,
    },
    // selectEmpty: {
    //     marginTop: theme.spacing(2),
    // },
    tabs: {

    }
}));

function createData(partyId, firstName, lastName, email) {
    return { partyId, firstName, lastName, email };
}

const PaperPage = (props) => {
    const classes = useStyles();
    const t = useTranslation()
    const [value, setValue] = React.useState("1");
    const [authors, setAuthors] = React.useState(null);
    const [paperLocalId, setPaperLocalId] = React.useState("");
    const [paperType, setPaperType] = React.useState("");
    const [paperTitle, setPaperTitle] = React.useState("");
    const [paperDesc, setPaperDesc] = React.useState("");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    async function getPaper(){
        const res2 = await apiClient.get('api/paper/party/' + props.location.state.paperId)
        console.log("rec paper:", res2)
        const res = {
            id: props.location.state.paperId,
            title: "Wind turbine torque oscillation reduction using soft switching multiple model predictive control based on the gap metric and Kalman filter estimator",
            type: "foreignJour",
            description: "",
            localId: props.location.state.paperId,
        }
        setPaperTitle(res.title)
        setPaperType(res.type)
        setPaperDesc(res.description)
        setPaperLocalId(res.localId)
        setAuthors([
            createData(1,'مجتبی', 'فاضلی نیا', 'mfazelinia@gmail.com')
        ])
    }
    useEffect( () => {
        async function fetchData() {
            await apiClient.get('/sanctum/csrf-cookie')
                .then(async () => {
                    try{
                        await getPaper()
                    }catch (e) {
                        console.log("error:", e)
                    }
                });
        }
        fetchData()
    }, []);

    const addAuthors = (newAuthors) => {
        newAuthors.map( r => {
            let pos = authors.map(function(e) { return e.partyId; }).indexOf(r.partyId);
            if(pos<0) authors.push(r)
            return false
        })
        setAuthors(authors)
    }

    const postPaper = ()=> {
        let packet = {
            paper: {
                title: paperTitle,
                type: paperType,
                description: paperDesc,
                localId: paperLocalId
            },
            // publisher: {
            //     publisher: paperPublisher,
            //     status: paperStatus,
            //     date: date
            // },
            // authors: authors
        }
        console.log('packet:',packet)
    }

    return (
        <div className={"frame-dashboard"}>
            <Header {...props}/>
            <Container>
                <h1 className={"frame-dashboard-title"}>{t('Dashboard.Paper.Title')}</h1>
                <Card>
                    <TabContext value={value}>
                        <Tabs onChange={handleChange}
                              value={value}
                              indicatorColor="primary"
                              textColor="primary"
                              className="border-bottom"
                              aria-label="simple tabs example">
                            <Tab label={t('Dashboard.Paper.Info')} value="1" />
                            <Tab label={t('Dashboard.Paper.Authors')} value="2" />
                        </Tabs >
                        <TabPanel value="1">
                            <form noValidate autoComplete="off">
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <TextField id="paper-code"
                                                   label={t("Dashboard.Paper.PaperCode")}
                                                   fullWidth variant="outlined"
                                                   value={paperLocalId}
                                                   onChange={e => setPaperLocalId(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl variant="outlined" fullWidth>
                                            <InputLabel id="paper-type-label">
                                                {t("Dashboard.Paper.PaperType")}
                                            </InputLabel>
                                            <Select id="paper-type"
                                                    label={t("Dashboard.Paper.PaperType")}
                                                    labelId="paper-type-label"
                                                    autoWidth
                                                    value={paperType}
                                                    onChange={e => setPaperType(e.target.value)}
                                            >
                                                <ListSubheader>{t("Dashboard.Paper.PaperType")}:</ListSubheader>
                                                <MenuItem value="domesticJour">{t("Dashboard.Paper.Types.domesticJour")}</MenuItem>
                                                <MenuItem value="domesticConf">{t("Dashboard.Paper.Types.domesticConf")}</MenuItem>
                                                <MenuItem value="foreignJour">{t("Dashboard.Paper.Types.foreignJour")}</MenuItem>
                                                <MenuItem value="foreignConf">{t("Dashboard.Paper.Types.foreignConf")}</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField id="paper-title"
                                                   label={t("Dashboard.Paper.PaperTitle")}
                                                   fullWidth variant="outlined"
                                                   value={paperTitle}
                                                   onChange={e => setPaperTitle(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField id="paper-desc"
                                                   label={t("Dashboard.Paper.PaperDescription")}
                                                   multiline rows={3} fullWidth
                                                   variant="outlined"
                                                   value={paperDesc}
                                                   onChange={e => setPaperDesc(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <hr/>
                                        <Box className="d-flex flex-row-reverse">
                                            <Button type="button" variant="contained" color="primary" className="width-medium" onClick={postPaper}>
                                                {t("Action.Edit")}
                                            </Button>
                                        </Box>
                                    </Grid>

                                </Grid>

                            </form>
                        </TabPanel>

                        <TabPanel value="2">
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <SearchAuthors addAuthors={addAuthors}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <ManageAuthors authors={authors} setAuthors={setAuthors}/>
                                </Grid>
                            </Grid>
                        </TabPanel>
                    </TabContext>
                </Card>
            </Container>
            <Footer/>
        </div>
    );
}

export default PaperPage;
