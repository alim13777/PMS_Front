import React, {useEffect} from 'react';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from "@material-ui/core/Link";
import {getLanguage, useTranslation} from "react-multi-lang";
import apiClient from "../services/api";
import CircularProgress from "@material-ui/core/CircularProgress";
import {detectLang, timestamp2Str} from "../services/tools";

function createData(paperId, title, type, publishers) {
    return {
        paper: {
            paperId, title, type, description: "", keywords: "", localId: paperId
        },
        publishers
    };
}

function DataRow(props) {
    const { row } = props;
    const t = useTranslation()
    return (
        <TableRow>
            <TableCell component="th" scope="row">{row.paper.localId}</TableCell>
            <TableCell align={detectLang(row.paper.title)===getLanguage()?"left":"right"} dir={detectLang(row.paper.title)==='en'?"ltr":"rtl"}>
                <Typography noWrap>
                    {row.paper.title}
                </Typography>
            </TableCell>
            <TableCell>{t('Lexicons.PaperType.'+row.paper.type)}</TableCell>
            <TableCell>{row.publishers[0].status}</TableCell>
            <TableCell>{timestamp2Str(row.publishers[0].date)}</TableCell>
        </TableRow>

    );
}

const TableHeader = (probs)=>{
    const {classname} = probs;
    const t = useTranslation()
    const headCells = [
        { id: 'localId', width: '13%', label: t("Dashboard.Paper.PaperCode") },
        { id: 'title', width: '45%',  label: t("Dashboard.Paper.PaperTitle") },
        { id: 'type', width: '14%',  label: t("Dashboard.Paper.PaperType") },
        { id: 'status', width: '14%',  label: t("Dashboard.Paper.Status") },
        { id: 'date', width: '14%',  label: t("Dashboard.Paper.Date") },
    ];
    return(
        <TableHead>
            <TableRow>
                {headCells.map(headCell=>(
                    <TableCell
                        component={"th"}
                        style={{width:headCell.width}}
                        key={headCell.id}
                        className={classname}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

const LoadingRow = ()=>{
    const t = useTranslation()
    return(
        <TableRow>
            <TableCell colSpan={5} align={"center"} className="p-4 text-secondary">
                <CircularProgress color={"inherit"}/>
                <Box>{t("Action.LoadingData")}</Box>
            </TableCell>
        </TableRow>
    )
}

const EmptyRow = ()=>{
    const t = useTranslation()
    return(
        <TableRow>
            <TableCell colSpan={5} align={"center"} className="p-4 text-secondary">
                <Box>{t("Dashboard.Paper.NoPaper")}</Box>
            </TableCell>
        </TableRow>
    )
}

export default function RecentPaperTable() {
    const t = useTranslation()
    const [loadFlag, setLoadFlag] = React.useState(false);
    const [rows, setRows] = React.useState([]);

    useEffect(()=>{
        apiClient.get('api/paper/party').then((res)=>{
            console.log("get papers response",res)
            setLoadFlag(true)
            let data = [
                createData('01', 'Wind turbine torque oscillation reduction using soft switching multiple model predictive control based on the gap metric and Kalman filter estimator', 'foreignJour', [
                    { partyId: '10001', name: 'IEEE Industrial Electronic', status: 'accepted', date: 1518741276400 },
                    { partyId: '10002', name: 'IEEE Sensors', status: 'rejected', date: 1418741276400 },
                    { partyId: '10003', name: 'Measurements', status: 'rejected', date: 1218741236400 },
                ]),
                createData('02', 'Wi-Fi RSS-based Indoor Localization Using Reduced Features Second Order Discriminant Function', 'foreignConf', [
                    { partyId: '10002', name: 'IEEE Sensors', status: 'readySubmit', date: 1418741276400 },
                    { partyId: '10003', name: 'Measurements', status: 'rejected', date: 1218741236400 },
                ]),
                createData('06', ' استفاده از الگوریتم‌ یادگیری ژرف برای پیش‌بینی تشنج‌های صرعی  استفاده از الگوریتم‌ یادگیری ژرف برای پیش‌بینی تشنج‌های صرعی', 'domesticJour', [
                    { partyId: '10003', name: 'Measurements', status: 'submitted', date: 1218741236400 },
                ]),
                createData('03', 'Augmented State Approach for Simultaneous Estimation of Sensor Biases in Attitude Determination System', 'foreignJour', [
                    { partyId: '10003', name: 'Measurements', status: 'rejected', date: 1218741236400 },
                ]),
                createData('04', 'Augmented State Approach for Simultaneous Estimation of Sensor Biases in Attitude Determination System', 'foreignJour', [
                    { partyId: '10003', name: 'Measurements', status: 'writing', date: 1218741236400 },
                ]),
                createData('05', ' استفاده از الگوریتم‌ یادگیری ژرف برای پیش‌بینی تشنج‌های صرعی  استفاده از الگوریتم‌ یادگیری ژرف برای پیش‌بینی تشنج‌های صرعی', 'domesticJour', [
                    { partyId: '20003', name: 'کنترل تربیت مدرس', status: 'canceled', date: 1218741236400 },
                ])
            ]
            setRows(data.slice(0,5))
        }).catch((err)=>{
            console.log("get papers error",err)
            setLoadFlag(true)
        })
    },[])

    return (
        <TableContainer component={Paper}>
            <Typography variant="h6" color="inherit" noWrap className="p-3">
                {t("Dashboard.Paper.RecentPapers")}
            </Typography>
            <Table size="small" style={{tableLayout:"fixed"}}>
                <caption><Link href="/dashboard/papersList">{t("Dashboard.Paper.FullPaperListLink")}</Link></caption>
                <TableHeader classname={(!loadFlag || (loadFlag && rows.length===0))?"text-secondary":""}/>
                <TableBody>
                    {loadFlag?
                        rows.length>0?
                            rows.map((row) => (
                                <DataRow key={row.paper.paperId} row={row} />
                            ))
                            :
                            <EmptyRow/>
                        :
                        <LoadingRow/>
                    }
                </TableBody>
            </Table>

        </TableContainer>
    );
}