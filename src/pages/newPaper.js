import React, {Fragment, useEffect} from 'react';
import Container from "@material-ui/core/Container";
import {useTranslation,getLanguage} from "react-multi-lang";
import Header from "../components/dashHeader";
import Footer from "../components/dashFooter";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import SearchAuthors from '../components/searchAuthors'
import ManageAuthors from '../components/manageAuthors'
import Box from "@material-ui/core/Box";
import {paperTypesList, paperStatusList} from '../components/lexicon'
import apiClient from "../services/api";
import {obj2Timestamp, timestamp2Obj} from "../services/tools";
import DateField from "../components/datepicker";
import SelectField from "../components/select";
import ButtonAdv from "../components/buttonAdv";
import {Link} from "react-router-dom";
import { useSnackbar } from 'notistack';
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

Number.prototype.pad = function(size) {
    let s = String(this);
    while (s.length < (size || 3)) {s = "0" + s;}
    return s;
}

const user = JSON.parse(sessionStorage.getItem('user'));

function createAuthor(partyId, firstName, lastName, email) {
    return { partyId, firstName, lastName, email };
}

const PaperPage = (props) => {
    const t = useTranslation()
    const { enqueueSnackbar,closeSnackbar } = useSnackbar();
    const [loading, setLoading] = React.useState(false);
    // const [open, setOpen] = React.useState(false);

    const [authors, setAuthors] = React.useState(
        [createAuthor(user.partyId, user.firstName, user.lastName, user.email)]
    );
    const [paperLocalId, setPaperLocalId] = React.useState('');
    const [paperType, setPaperType] = React.useState('');
    const [paperTitle, setPaperTitle] = React.useState('');
    const [paperDesc, setPaperDesc] = React.useState('');
    const [paperKeywords, setPaperKeywords] = React.useState('');
    const [paperStatus, setPaperStatus] = React.useState('');
    const [paperPublisher, setPaperPublisher] = React.useState('');
    const [date, setDate] = React.useState(timestamp2Obj(null,getLanguage()));
    const [pubs, setPubs] = React.useState({isReady:false,data:[]});

    const statusSelectOptions = paperStatusList.map( item=>{
        return {
            value: item,
            label: t("Lexicons.PaperStatus."+item)
        }
    })
    const typeSelectOptions = paperTypesList.map( item=>{
        return {
            value: item,
            label: t("Lexicons.PaperType."+item)
        }
    })

    useEffect(()=>{
        apiClient.get('api/paper/party' ).then((res)=>{
            const num = res.data.length + 1;
            setPaperLocalId("P"+num.pad())
        }).catch((err)=>{
            console.warn("get party papers err:",err)
        })
        apiClient.get('api/party/journal' ).then((res)=>{
            console.log("journal",res)
        }).catch((err)=>{
            console.warn("journal err..",err)
        })
        apiClient.get('api/party/person?firstName=م' ).then((res)=>{
            console.log("person",res)
        }).catch((err)=>{
            console.warn("person err..",err)
        })
        const sampleData = [
            {partyId:2001, name:"2001"},
            {partyId:2002, name:"2002"},
            {partyId:2003, name:"2003"},
            {partyId:2004, name:"2004"}
        ]
        setPubs({
            isReady: true,
            data: sampleData.map(item=>{
                return {
                    value: item.partyId,
                    label: item.name
                }
            })
        })
    },[])

    const addAuthors = (newAuthors) => {
        newAuthors.map( r => {
            let pos = authors.map(function(e) { return e.partyId; }).indexOf(r.partyId);
            if(pos<0) authors.push(r)
            return false
        })
        setAuthors(authors)
    }

    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //     setOpen(false);
    // };

    const postPaper = ()=> {
        setLoading(true)
        let packet = {
            paper: {
                title: paperTitle,
                type: paperType,
                description: paperDesc,
                localId: paperLocalId,
                keywords: paperKeywords
            },
            publisher: {
                partyId: paperPublisher,
                status: paperStatus,
                date: obj2Timestamp(date)
            },
            authors: authors.map(i=> {
                return {
                    partyId: i.partyId,
                    role: "coAuthor"
                }
            })
        }
        console.log("post paper:",packet)

        // setTimeout(() => {
        //     setLoading(false);
        //     const action = key => (
        //         <Fragment>
        //             <Link to={{
        //                 pathname: "/dashboard/paper",
        //                 state: {paper: 1}
        //             }}>
        //                 <Typography variant={"body2"} color={"textSecondary"}>{t("Dashboard.Paper.ShowPaperLink")}</Typography>
        //             </Link>
        //             <IconButton color={"inherit"} onClick={() => { closeSnackbar(key) }}>
        //                 <CloseIcon/>
        //             </IconButton>
        //         </Fragment>
        //     );
        //     enqueueSnackbar(t("Dashboard.Paper.SuccessAddPaper"), {
        //         variant: 'success',
        //         anchorOrigin: {
        //             vertical: 'bottom',
        //             horizontal: 'center',
        //         },
        //         autoHideDuration: 6000,
        //         action
        //     })
        //     // setOpen(true);
        // }, 2000);

        apiClient.post('api/paper', packet)
            .then(response => {
                console.log("response:",response);
                setLoading(false)
                if (response.status === 200) {
                    const action = key => (
                        <Fragment>
                            <Link to={{
                                pathname: "/dashboard/paper",
                                state: {paper: 1}
                            }}>
                                <Typography variant={"body2"} color={"textSecondary"}>{t("Dashboard.Paper.ShowPaperLink")}</Typography>
                            </Link>
                            <IconButton color={"inherit"} onClick={() => { closeSnackbar(key) }}>
                                <CloseIcon/>
                            </IconButton>
                        </Fragment>
                    );
                    enqueueSnackbar(t("Dashboard.Paper.SuccessAddPaper"), {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center',
                        },
                        autoHideDuration: 6000,
                        action
                    })
                }
            }).catch(error => {
                console.error(error);
                setLoading(false)
            });

    }

    return (
        <div className={"frame-dashboard"}>
            <Header {...props}/>
            <Container>
                <h1 className={"frame-dashboard-title"}>{t('Dashboard.Paper.TitleNew')}</h1>
                <Card className="p-4">

                    <form noValidate autoComplete="off">
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField id="paper-code"
                                           label={t("Dashboard.Paper.PaperCode")}
                                           fullWidth variant="outlined" required
                                           value={paperLocalId}
                                           onChange={e => setPaperLocalId(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <SelectField id="paper-type"
                                             label={t("Dashboard.Paper.PaperType")}
                                             variant="outlined" required
                                             options={typeSelectOptions}
                                             value={paperType}
                                             onChange={e => setPaperType(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={4}>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="paper-title"
                                           label={t("Dashboard.Paper.PaperTitle")}
                                           fullWidth variant="outlined" required
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
                                <TextField id="paper-keywords"
                                           label={t("Dashboard.Paper.PaperKeywords")}
                                           fullWidth variant="outlined"
                                           value={paperKeywords}
                                           onChange={e => setPaperKeywords(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>

                            </Grid>

                            <Grid item xs={4}>
                                <SelectField id="publisher"
                                             label={t("Dashboard.Paper.Publisher")}
                                             variant="outlined" required
                                             options={pubs.data}
                                             loaded={pubs.isReady.toString()}
                                             value={paperPublisher}
                                             onChange={e=> setPaperPublisher(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <SelectField id="user-status"
                                             label={t("Dashboard.Paper.Status")}
                                             variant="outlined" required
                                             options={statusSelectOptions}
                                             value={paperStatus}
                                             onChange={e=> setPaperStatus(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <DateField id="paper-date"
                                           label={t("Dashboard.Paper.Date")}
                                           variant="outlined" required
                                           value={date}
                                           onChange={setDate}
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
                            <Grid item xs={12}>
                                <hr/>
                                <Box className="d-flex flex-row-reverse">
                                    <ButtonAdv type="button" variant="contained" color="primary" className="width-medium" loading={loading.toString()} onClick={postPaper}>
                                        {t("Action.Add")}
                                    </ButtonAdv>
                                </Box>
                            </Grid>
                        </Grid>

                    </form>

                </Card>

            </Container>
            <Footer/>
        </div>
    );
}

export default PaperPage;
