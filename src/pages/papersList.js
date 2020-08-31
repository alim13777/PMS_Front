import React, {useEffect} from 'react';
import Container from "@material-ui/core/Container";
import {useTranslation,getLanguage} from "react-multi-lang";
import Header from "../components/dashHeader";
import Footer from "../components/dashFooter";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import EditIcon from '@material-ui/icons/Edit';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import { lighten, makeStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Collapse from "@material-ui/core/Collapse";
import apiClient from "../services/api";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import {timestamp2Str} from "../services/tools";

const user = JSON.parse(sessionStorage.getItem('user'));


const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    tableTitle: {
        padding: "16px"
    }
});

function createData(id, title, type, history) {
    return { id, title, type,
        code: id,
        history//: [
        //     { publisherId: '10001', publisherName: 'IEEE Industrial Electronic', status: 'underReview', date: 1318781876406 },
        //     { publisherId: '10002', publisherName: 'IEEE Sensors', status: 'rejected', date: 1218741276400 },
        // ],
    };
}



function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function detectLang(text) {
    if (/^[a-zA-Z]+$/.test(text[0])) {
        return "en";
    } else {
        return "fa";
    }
}

// const headCells = [
//     { id: 'lastName', numeric: false, disablePadding: true, label: t("User.Surname") },
//     // { id: 'firstName', numeric: false, disablePadding: true, label: useTranslation("User.Name") },
//     // { id: 'email', numeric: false, disablePadding: true, label: useTranslation("User.Email") },
//     { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
//     { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
//     { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
//     // { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
// ];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    const t = useTranslation()
    const headCells = [
        { id: 'code', width: '10%', disablePadding: false, label: t("Dashboard.Paper.PaperCode") },
        { id: 'title', width: '50%', disablePadding: false, label: t("Dashboard.Paper.PaperTitle") },
        { id: 'type', width: '15%', disablePadding: false, label: t("Dashboard.Paper.PaperType") },
        { id: 'status', width: '15%', disablePadding: false, label: t("Dashboard.Paper.Status") },
    ];

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="none"></TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        style={{width:headCell.width}}
                        key={headCell.id}
                        // align={headCell.numeric ? 'right' : 'left'}
                        // padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell style={{width:"60px"}}></TableCell>
            </TableRow>
        </TableHead>
    );
}

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
    searchbar:{
        border: "1px solid #ddd",
        borderRadius: "100px",
        margin: "14px",
        marginBottom: "0",
        minHeight: "50px"
    }
}));

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        //minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

function StatusBadge({status}) {
    const t = useTranslation()
    return (
        <span className={"badge badge-pill badge-normal "
        + (status==='accepted'?"badge-success":"")
        + (status==='rejected'?"badge-danger":"")
        + (status==='underReview'?"badge-primary":"")
        + (status==='submitted'?"badge-primary":"")
        + (status==='underEdit'?"badge-warning":"")
        + (status==='readySubmit'?"badge-warning":"")
        + (status==='submitting'?"badge-warning":"")
        + (status==='canceled'?"badge-secondary":"")
        }>
            {t('Lexicons.PaperStatus.'+status)}
        </span>
    )
}

function Row(props) {
    const t = useTranslation()
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell scope="row">{row.code}</TableCell>
                <TableCell align={detectLang(row.title)==getLanguage()?"left":"right"} dir={detectLang(row.title)=='en'?"ltr":"rtl"}>
                    <Typography noWrap>
                        {row.title}
                    </Typography>
                </TableCell>
                <TableCell>{t('Lexicons.PaperType.'+row.type)}</TableCell>
                <TableCell>
                    <StatusBadge status={row.history[0].status}/>
                    {/*<span className={"badge badge-pill badge-normal "}>*/}
                    {/*    {t('Lexicons.PaperStatus.'+row.history[0].status)}*/}
                    {/*</span>*/}
                </TableCell>
                <TableCell padding="none">
                    <Tooltip title={t("Action.Edit")}>
                        <IconButton aria-label="edit" >
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="subtitle2" gutterBottom component="div">
                                {t("Dashboard.Paper.History")}:
                            </Typography>
                            <Table size="small" aria-label="history">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{t("Dashboard.Paper.Publisher")}</TableCell>
                                        <TableCell>{t("Dashboard.Paper.Status")}</TableCell>
                                        <TableCell>{t("Dashboard.Paper.Date")}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.publisherId}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.publisherName}
                                            </TableCell>
                                            <TableCell>{t("Lexicons.PaperStatus."+historyRow.status)}</TableCell>
                                            <TableCell>{timestamp2Str(historyRow.date)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const PapersListPage = (props) => {
    const classes = useStyles();
    const t = useTranslation()
    const [rows, setRows] = React.useState([]);
    useEffect(async () => {
        const papers = await apiClient.get('/sanctum/csrf-cookie')
            .then(async response => {
                return await apiClient.get('api/paper/' + user.partyId)
                    .then(response => {
                        console.log("response:", response)
                        if (response.status === 200) {
                            return [
                                createData('01', 'Wind turbine torque oscillation reduction using soft switching multiple model predictive control based on the gap metric and Kalman filter estimator', 'foreignJour', [
                                    { publisherId: '10001', publisherName: 'IEEE Industrial Electronic', status: 'accepted', date: 1518741276400 },
                                    { publisherId: '10002', publisherName: 'IEEE Sensors', status: 'rejected', date: 1418741276400 },
                                    { publisherId: '10003', publisherName: 'Measurements', status: 'rejected', date: 1218741236400 },
                                ]),
                                createData('02', 'Wi-Fi RSS-based Indoor Localization Using Reduced Features Second Order Discriminant Function', 'foreignConf', [
                                    { publisherId: '10002', publisherName: 'IEEE Sensors', status: 'readySubmit', date: 1418741276400 },
                                    { publisherId: '10003', publisherName: 'Measurements', status: 'rejected', date: 1218741236400 },
                                ]),
                                createData('06', ' استفاده از الگوریتم‌ یادگیری ژرف برای پیش‌بینی تشنج‌های صرعی  استفاده از الگوریتم‌ یادگیری ژرف برای پیش‌بینی تشنج‌های صرعی', 'domesticJour', [
                                    { publisherId: '10003', publisherName: 'Measurements', status: 'submitted', date: 1218741236400 },
                                ]),
                                createData('03', 'Augmented State Approach for Simultaneous Estimation of Sensor Biases in Attitude Determination System', 'foreignJour', [
                                    { publisherId: '10003', publisherName: 'Measurements', status: 'rejected', date: 1218741236400 },
                                ]),
                                createData('04', 'Augmented State Approach for Simultaneous Estimation of Sensor Biases in Attitude Determination System', 'foreignJour', [
                                    { publisherId: '10003', publisherName: 'Measurements', status: 'writing', date: 1218741236400 },
                                ]),
                                createData('05', ' استفاده از الگوریتم‌ یادگیری ژرف برای پیش‌بینی تشنج‌های صرعی  استفاده از الگوریتم‌ یادگیری ژرف برای پیش‌بینی تشنج‌های صرعی', 'domesticJour', [
                                    { publisherId: '20003', publisherName: 'کنترل تربیت مدرس', status: 'canceled', date: 1218741236400 },
                                ])
                            ]//response.data;
                        }
                    }).catch(error => {
                        console.log("error:", error)
                    });
            });
        setRows(papers);
    }, []);

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('code');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [emptyRows, setEmptyRows] = React.useState(
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)
    );

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setEmptyRows(rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage))

    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [open, setOpen] = React.useState(false);
    // const classes = useRowStyles();

    // const isSelected = (name) => selected.indexOf(name) !== -1;

    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={"frame-dashboard"}>
            <Header {...props}/>
            <Container>
                <h1 className={"frame-dashboard-title"}>{t('Dashboard.PapersList.Title')}</h1>
                <Card>
                    {/*<Grid container spacing={13} component={CardContent}>*/}
                    {/*    <Grid item xs={12}>*/}
                    {/*        <Card variant="outlined">*/}
                                {/*<EnhancedTableToolbar numSelected={selected.length} selectedData={selected} addAuthors={props.addAuthors} />*/}
                                <TableContainer>
                                    <Table
                                        className={classes.table}
                                        aria-labelledby="tableTitle"
                                        aria-label="enhanced table"
                                        style={{tableLayout:"fixed"}}
                                    >
                                        <EnhancedTableHead
                                            classes={classes}
                                            order={order}
                                            orderBy={orderBy}
                                            onRequestSort={handleRequestSort}
                                        />
                                        <TableBody>
                                            {stableSort(rows, getComparator(order, orderBy))
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row, index) => {
                                                    // const isItemSelected = isSelected(row.partyId);
                                                    const labelId = `enhanced-table-checkbox-${index}`;

                                                    return (
                                                        <Row key={row.id} row={row} />
                                                // <React.Fragment>
                                                //     <TableRow
                                                //             hover
                                                //             // onClick={(event) => handleClick(event, row.partyId)}
                                                //             role="checkbox"
                                                //             // aria-checked={isItemSelected}
                                                //             tabIndex={-1}
                                                //             key={row.partyId}
                                                //             // selected={isItemSelected}
                                                //         >
                                                //             {/*<TableCell padding="checkbox">*/}
                                                //             {/*    <Checkbox*/}
                                                //             {/*        checked={isItemSelected}*/}
                                                //             {/*        inputProps={{ 'aria-labelledby': labelId }}*/}
                                                //             {/*    />*/}
                                                //             {/*</TableCell>*/}
                                                //             <TableCell>
                                                //                 <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                                //                     {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                //                 </IconButton>
                                                //             </TableCell>
                                                //             <TableCell id={labelId} scope="row">{row.lastName}</TableCell>
                                                //             <TableCell>{row.firstName}</TableCell>
                                                //             <TableCell align="right">{row.email}</TableCell>
                                                //         </TableRow>
                                                //     <TableRow>
                                                //         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                //             <Collapse in={open} timeout="auto" unmountOnExit>
                                                //                 <Box margin={1}>
                                                //                     <Typography variant="h6" gutterBottom component="div">
                                                //                         History
                                                //                     </Typography>
                                                //                     <Table size="small" aria-label="purchases">
                                                //                         <TableHead>
                                                //                             <TableRow>
                                                //                                 <TableCell>Date</TableCell>
                                                //                                 <TableCell>Customer</TableCell>
                                                //                                 <TableCell align="right">Amount</TableCell>
                                                //                                 <TableCell align="right">Total price ($)</TableCell>
                                                //                             </TableRow>
                                                //                         </TableHead>
                                                //                         <TableBody>
                                                //                             {row.history.map((historyRow) => (
                                                //                                 <TableRow key={historyRow.date}>
                                                //                                     <TableCell component="th" scope="row">
                                                //                                         {historyRow.date}
                                                //                                     </TableCell>
                                                //                                     <TableCell>{historyRow.customerId}</TableCell>
                                                //                                     <TableCell align="right">{historyRow.amount}</TableCell>
                                                //                                     <TableCell align="right">
                                                //                                         {Math.round(historyRow.amount * row.price * 100) / 100}
                                                //                                     </TableCell>
                                                //                                 </TableRow>
                                                //                             ))}
                                                //                         </TableBody>
                                                //                     </Table>
                                                //                 </Box>
                                                //             </Collapse>
                                                //         </TableCell>
                                                //     </TableRow>
                                                // </React.Fragment>

                                                );
                                                })}
                                            {emptyRows > 0 && ( ()=> {
                                                    [...Array(emptyRows)].map((e,i) => {
                                                        console.log('emptyRows',emptyRows)
                                                        return(
                                                            <TableRow>
                                                                <TableCell key={i} colSpan={6}/>
                                                            </TableRow>
                                                        )
                                                    })
                                                }
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                    {/*        </Card>*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
                </Card>

            </Container>
            <Footer/>
        </div>
    );
}

export default PapersListPage;
