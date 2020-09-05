import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import React from "react";


export default function SelectField(props){
    const {variant, id, label, options, value, onChange} = props;
    return (
        <FormControl
            variant={variant?variant:null}
            fullWidth
        >
            <InputLabel id={id+"-label"}>
                {label}
            </InputLabel>
            <Select id={id}
                    labelId={id+"-label"}
                    label={label}
                    autoWidth
                value={value}
                onChange={onChange}
            >
                <ListSubheader>{label}:</ListSubheader>
                {options.map( i => {
                    return(
                        <MenuItem value={i.value}>{i.label}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )
}