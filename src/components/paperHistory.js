import {getLanguage, useTranslation} from "react-multi-lang";
import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import {timestamp2Str, timestamp2Obj} from "../services/tools";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {paperStatusList} from '../components/lexicon'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
import TableFooter from "@material-ui/core/TableFooter";
import InputLabel from "@material-ui/core/InputLabel";
import ListSubheader from "@material-ui/core/ListSubheader";


function TableNewRow() {
    const t = useTranslation()
    const [newRow, setNewRow] = React.useState(false);
    const [publisher, setPublisher] = React.useState(null);
    const [status, setStatus] = React.useState(null);
    const [date, setDate] = React.useState(timestamp2Obj(null));

    const renderDateInput = ({ ref }) => (
        <TextField id="paper-date"
                   size="small" fullWidth
                   value={date ? date.year+'/'+date.month+'/'+date.day : ''}
                   ref={ref}
        />
    )

    return (
        <TableFooter>
            {
                newRow ?
                    <TableRow>
                        <TableCell component="th" scope="row" className="py-0">
                            <FormControl size="small" fullWidth>
                                <Select id="publisher"
                                        label={t("Dashboard.Paper.Publisher")}
                                        labelId="publisher-label"
                                        autoWidth
                                        value={publisher}
                                        onChange={e => setPublisher(e.target.value)}
                                >
                                    <ListSubheader>{t("Dashboard.Paper.Publisher")}:</ListSubheader>
                                    {/*<MenuItem value=""></MenuItem>*/}
                                </Select>
                            </FormControl>
                        </TableCell>
                        <TableCell className="py-0">
                            <FormControl size="small" fullWidth>
                                <Select id="paper-status"
                                        label={t("Dashboard.Paper.Status")}
                                        labelId="paper-status-label"
                                        autoWidth
                                        value={status}
                                        onChange={e=> setStatus(e.target.value)}
                                >
                                    {paperStatusList.map( i => {
                                        return(
                                            <MenuItem value={i}>{t("Lexicons.PaperStatus."+i)}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </TableCell>
                        <TableCell className="py-0">
                            <DatePicker
                                value={date}
                                onChange={setDate}
                                renderInput={renderDateInput}
                                shouldHighlightWeekends
                                locale={getLanguage()}
                                calendarClassName="responsive-calendar"
                                className="w-100"
                            />
                        </TableCell>
                        <TableCell align="right" className="py-0">
                            <Tooltip title={t("Action.Cancel")}>
                                <IconButton onClick={() => setNewRow(false)}>
                                    <CloseIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={t("Action.Save")}>
                                <IconButton onClick={() => setNewRow(false)}>
                                    <DoneIcon/>
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                    :
                    <TableRow>
                        <TableCell colSpan={4} align="right" className="py-0">
                            <Tooltip title={t("Action.Add")}>
                                <IconButton onClick={()=>setNewRow(true)}>
                                    <AddIcon/>
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
            }
        </TableFooter>
    )
}

function Row(props) {
    const t = useTranslation()
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = React.useState(row.status);
    const [date, setDate] = React.useState(timestamp2Obj(row.date));

    const renderDateInput = ({ ref }) => (
        <TextField id="paper-date"
                   size="small" fullWidth
                   value={date ? date.year+'/'+date.month+'/'+date.day : ''}
                   ref={ref}
        />
    )

    return (
        <React.Fragment>
            <TableRow key={row.partyId}>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell className="py-0">
                    {open
                        ?<FormControl size="small" fullWidth>
                            <Select id="paper-status"
                                    label={t("Dashboard.Paper.Status")}
                                    labelId="paper-status-label"
                                    autoWidth
                                    value={status}
                                    onChange={e=> setStatus(e.target.value)}
                            >
                                {paperStatusList.map( i => {
                                    return(
                                        <MenuItem value={i}>{t("Lexicons.PaperStatus."+i)}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        :t("Lexicons.PaperStatus."+row.status)
                    }
                </TableCell>
                <TableCell className="py-0">
                    {open
                        ?<DatePicker
                            value={date}
                            onChange={setDate}
                            renderInput={renderDateInput}
                            shouldHighlightWeekends
                            locale={getLanguage()}
                            calendarClassName="responsive-calendar"
                            className="w-100"
                        />
                        :timestamp2Str(row.date)
                    }
                </TableCell>
                <TableCell className="py-0" align="right">
                    {open
                        ?<React.Fragment>
                            <Tooltip title={t("Action.Cancel")}>
                                <IconButton onClick={() => setOpen(false)}>
                                    <CloseIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={t("Action.Save")}>
                                <IconButton onClick={() => setOpen(false)}>
                                    <DoneIcon/>
                                </IconButton>
                            </Tooltip>
                        </React.Fragment>
                        :<Tooltip title={t("Action.Edit")}>
                            <IconButton onClick={() => setOpen(true)}>
                                <EditIcon/>
                            </IconButton>
                        </Tooltip>
                    }
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export default function EnhancedTable(props) {
    const { paper } = props;
    const t = useTranslation()

    return (
        <Card variant={"outlined"} className="w-100">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{width:"unset"}}>{t("Dashboard.Paper.Publisher")}</TableCell>
                        <TableCell style={{width:"20%"}}>{t("Dashboard.Paper.Status")}</TableCell>
                        <TableCell style={{width:"20%"}}>{t("Dashboard.Paper.Date")}</TableCell>
                        <TableCell style={{width:"140px"}}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paper.publishers.map((historyRow) => (
                        <Row row={historyRow}/>
                    ))}
                </TableBody>
                <TableNewRow/>
            </Table>
        </Card>
    )
}