import React from 'react';
import Container from "@material-ui/core/Container";
import {useTranslation,getLanguage} from "react-multi-lang";
import Header from "../components/dashHeader";
import Footer from "../components/dashFooter";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import Grid from "@material-ui/core/Grid";
import SearchAuthors from '../components/searchAuthors'
import ManageAuthors from '../components/manageAuthors'
import Box from "@material-ui/core/Box";

import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';

import {paperStatusList} from '../components/lexicon'

const user = JSON.parse(sessionStorage.getItem('user'));

function createAuthor(partyId, firstName, lastName, email) {
    return { partyId, firstName, lastName, email };
}

const PaperPage = (props) => {
    const t = useTranslation()
    const [authors, setAuthors] = React.useState(
        [createAuthor(user.partyId, user.firstName, user.lastName, user.email)]
    );
    const [paperLocalId, setPaperLocalId] = React.useState(null);
    const [paperType, setPaperType] = React.useState(null);
    const [paperTitle, setPaperTitle] = React.useState(null);
    const [paperDesc, setPaperDesc] = React.useState(null);
    const [paperStatus, setPaperStatus] = React.useState(null);
    const [paperPublisher, setPaperPublisher] = React.useState(null);
    const [date, setDate] = React.useState(null);

    const addAuthors = (newAuthors) => {
        newAuthors.map( r => {
            let pos = authors.map(function(e) { return e.partyId; }).indexOf(r.partyId);
            if(pos<0) authors.push(r)
            return false
        })
        setAuthors(authors)
    }

    const renderDateInput = ({ ref }) => (
        <TextField id="paper-date"
                   value={date ? date.year+'/'+date.month+'/'+date.day : ''}
                   ref={ref} // necessary
                   label={t("Dashboard.Paper.Date")}
                   fullWidth variant="outlined"/>
    )

    const postPaper = ()=> {
        let packet = {
            paper: {
                title: paperTitle,
                type: paperType,
                description: paperDesc,
                localId: paperLocalId
            },
            publisher: {
                publisher: paperPublisher,
                status: paperStatus,
                date: date
            },
            authors: authors
        }
        console.log('packet:',packet)
    }

    return (
        <div className={"frame-dashboard"}>
            <Header {...props}/>
            <Container>
                <h1 className={"frame-dashboard-title"}>{t('Dashboard.Paper.TitleNew')}</h1>
                <Card>
                    <Grid container spacing={13} component={CardContent}>
                        <Grid item xs={12}>
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

                                    </Grid>

                                    <Grid item xs={4}>
                                        <FormControl variant="outlined" fullWidth>
                                            <InputLabel id="publisher-label">
                                                {t("Dashboard.Paper.Publisher")}
                                            </InputLabel>
                                            <Select id="publisher"
                                                    label={t("Dashboard.Paper.Publisher")}
                                                    labelId="publisher-label"
                                                    autoWidth
                                                    value={paperPublisher}
                                                    onChange={e => setPaperPublisher(e.target.value)}
                                            >
                                                <ListSubheader>{t("Dashboard.Paper.Publisher")}:</ListSubheader>
                                                {/*<MenuItem value=""></MenuItem>*/}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl variant="outlined" fullWidth>
                                            <InputLabel id="paper-status-label">
                                                {t("Dashboard.Paper.Status")}
                                            </InputLabel>
                                            <Select id="paper-status"
                                                    label={t("Dashboard.Paper.Status")}
                                                    labelId="paper-status-label"
                                                    autoWidth
                                                    value={paperStatus}
                                                    onChange={e=> setPaperStatus(e.target.value)}
                                            >
                                                <ListSubheader>{t("Dashboard.Paper.Status")}:</ListSubheader>
                                                {paperStatusList.map( i => {
                                                    return(
                                                        <MenuItem value={i}>{t("Lexicons.paperStatus."+i)}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <DatePicker
                                            value={date}
                                            onChange={setDate}
                                            renderInput={renderDateInput}
                                            shouldHighlightWeekends
                                            locale={getLanguage()}
                                            calendarClassName="responsive-calendar"
                                            className="w-100"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        {/*<Typography variant={"h6"}>{t("Dashboard.Paper.Authors")}</Typography>*/}
                                    </Grid>

                                    <Grid item xs={6}>
                                        <SearchAuthors addAuthors={addAuthors}/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <ManageAuthors authors={authors} setAuthors={setAuthors}/>
                                    </Grid>
                                </Grid>

                            </form>
                        </Grid>
                        <Grid item xs={6}>

                        </Grid>
                        <Grid item xs={6}>

                        </Grid>
                        <Grid item xs={12}>
                            <hr/>
                            <Box className="d-flex flex-row-reverse">
                                <Button type="button" variant="contained" color="primary" className="width-medium" onClick={postPaper}>
                                    {t("Action.Add")}
                                </Button>
                            </Box>
                        </Grid>

                    </Grid>
                </Card>

            </Container>
            <Footer/>
        </div>
    );
}

export default PaperPage;
