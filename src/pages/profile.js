import Header from "../components/dashHeader";
import Container from "@material-ui/core/Container";
import RecentPapers from "../components/recentPapers";
import Footer from "../components/dashFooter";
import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Tableau from "../images/profileTableau.jpg"
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import PaperHistory from "../components/paperHistory";
import TabContext from "@material-ui/lab/TabContext";
import {useTranslation} from "react-multi-lang";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import ListSubheader from "@material-ui/core/ListSubheader";
import {prefixList, genderList, educationDegreeList} from "../components/lexicon";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {getLanguage} from "react-multi-lang/lib";
import SelectField from "../components/select";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import DatePicker from "react-modern-calendar-datepicker";
import DateField from "../components/datepicker";
import {obj2Timestamp} from "../services/tools";
import PassField from "../components/passwordField";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        margin: "auto",
        marginTop: -theme.spacing(5),
        marginBottom: theme.spacing(4),
        width: theme.spacing(10),
        height: theme.spacing(10),
        border: "4px solid white"
    },
    tabItem: {
        // alignItems: "start"
    }
}));

const user = JSON.parse(sessionStorage.getItem('user'));

function username (){
    return user.firstName + " " + user.lastName
}

export default function ProfilePage(props) {
    const classes = useStyles();
    const t = useTranslation()
    const [tabValue, setTabValue] = React.useState("edit");
    const [firstName, setFirstName] = React.useState(user.firstName);
    const [lastName, setLastName] = React.useState(user.lastName);
    const [gender, setGender] = React.useState(null);
    const [prefix, setPrefix] = React.useState(null);
    const [degree, setDegree] = React.useState(null);
    const [birthDate, setBirthDate] = React.useState(null);
    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
    };
    const prefixSelectOptions = prefixList(getLanguage()).map( item=>{
        return {
            value: item,
            label: t("Lexicons.Prefix."+item)
        }
    })
    const genderSelectOptions = genderList.map( item=>{
        return {
            value: item,
            label: t("Lexicons.Gender."+item)
        }
    })
    const degreeSelectOptions = educationDegreeList.map( item=>{
        return {
            value: item,
            label: t("Lexicons.EduDegree."+item)
        }
    })

    const TabPanel_Edit = ()=>{
        return(
            <TabPanel value="edit">
                <Typography className="card-title" component={"h6"}>{t('Profile.Edit')}</Typography>
                <Grid container spacing={3}>
                    <Grid item sm={12} md={6}>
                        <SelectField id="user-prefix"
                                     label={t("User.Prefix")}
                                     variant="outlined"
                                     options={prefixSelectOptions}
                                     value={prefix}
                                     onChange={e=> setPrefix(e.target.value)}
                        />
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <SelectField id="user-gender"
                                     label={t("User.Gender")}
                                     variant="outlined"
                                     options={genderSelectOptions}
                                     value={gender}
                                     onChange={e=> setGender(e.target.value)}
                        />
                    </Grid>

                    <Grid item sm={12} md={6}>
                        <TextField id="user-firstName"
                                   label={t("User.Name")}
                                   fullWidth variant="outlined"
                                   value={firstName}
                                   onChange={e => setFirstName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField id="user-lastName"
                                   label={t("User.Surname")}
                                   fullWidth variant="outlined"
                                   value={lastName}
                                   onChange={e => setLastName(e.target.value)}
                        />
                    </Grid>

                    <Grid item sm={12} md={6}>
                        <DateField id="user-birthDate"
                                   label={t("User.BirthDate")}
                                   variant="outlined"
                                   value={birthDate}
                                   onChange={setBirthDate}
                        />
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <SelectField id="user-degree"
                                     label={t("User.Degree")}
                                     variant="outlined"
                                     options={degreeSelectOptions}
                                     value={degree}
                                     onChange={e=> setDegree(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} className="pt-0">
                        <hr/>
                        <Box className="d-flex flex-row-reverse">
                            <Button type="button" variant="contained" color="primary" className="width-medium" onClick={putPerson}>
                                {t("Action.Edit")}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </TabPanel>
        )
    }

    const TabPanel_Pass = ()=> {
        const [oldPass, setOldPass] = React.useState(null);
        const [newPass, setNewPass] = React.useState(null);
        const [newPass2, setNewPass2] = React.useState(null);
        function putPassword() {
            let packet = {
                partyId: user.partyId,
                oldPass: oldPass,
                newPass: newPass,
                repeatedNewPass: newPass2,
            }
            console.log('putPassword',packet)
        }
        return (
            <TabPanel value="pass">
                <Typography className="card-title" component={"h6"}>{t('Profile.ChangePass')}</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <PassField id="user-oldPass"
                                   label={t("Profile.OldPass")}
                                   value={oldPass}
                                   onChange={e => setOldPass(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <PassField id="user-newPass"
                                   label={t("Profile.NewPass")}
                                   value={newPass}
                                   onChange={e => setNewPass(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <PassField id="user-newPass2"
                                   label={t("Profile.RepeatNewPass")}
                                   value={newPass2}
                                   onChange={e => setNewPass2(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} className="pt-0">
                        <hr/>
                        <Box className="d-flex flex-row-reverse">
                            <Button type="button" variant="contained" color="primary" className="width-medium" onClick={putPassword}>
                                {t("Action.Edit")}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </TabPanel>
        )
    }

    const TabPanel_Upgrade = ()=> {
        return (
            <TabPanel value="upgrade">
                <Typography className="card-title" component={"h6"}>{t('Profile.Upgrade')}</Typography>

            </TabPanel>
        )
    }

    function putPerson() {
        let packet = {
            partyId: user.partyId,
            firstName: firstName,
            lastName: lastName,
            prefix: prefix,
            gender: gender,
            degree: degree,
            birthDate: obj2Timestamp(birthDate)
        }
        console.log('putPerson',packet)
    }

    return (
        <div className={"frame-dashboard"}>
            <Header {...props}/>
            <Container>
                <TabContext value={tabValue}>
                    <div className="row mt-4">
                        <div className="col-sm-12 col-md-4 col-lg-3">
                            <Card>
                                <CardMedia
                                    className={classes.media}
                                    image={Tableau}
                                />
                                <CardContent className="text-center pt-0">
                                    <Avatar className={classes.avatar} src="/broken-image.jpg" />
                                    <Typography align={"center"}>{username()}</Typography>
                                    <Tabs onChange={handleChangeTab}
                                          value={tabValue}
                                          orientation="vertical"
                                          indicatorColor="primary"
                                          textColor="primary"
                                          className="border-bottom border-top mt-3"
                                          aria-label="profile tabs">
                                        <Tab classes={{wrapper: classes.tabItem}} label={t('Profile.Edit')} value="edit" />
                                        <Tab classes={{wrapper: classes.tabItem}} label={t('Profile.ChangePass')} value="pass" />
                                        <Tab classes={{wrapper: classes.tabItem}} label={t('Profile.Upgrade')} value="upgrade" />
                                    </Tabs >
                                </CardContent>
                            </Card>
                        </div>
                        <div className="col">
                            <Card>
                                <TabPanel_Edit/>
                                <TabPanel_Pass/>
                                <TabPanel_Upgrade/>
                            </Card>
                        </div>
                    </div>
                </TabContext>
                {/*<RecentPapers/>*/}
            </Container>
            <Footer/>
        </div>
    )
}