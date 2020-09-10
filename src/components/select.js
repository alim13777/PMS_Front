import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";


export default function SelectField(props){
    const {variant, id, label, options, value, onChange, required, loaded} = props;
    // React.useEffect(() => {
    //     console.log("component updated",options,loaded);
    // });
    return (
        <FormControl
            variant={variant?variant:null}
            required={required?required:null}
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
                {loaded || typeof loaded==='undefined'
                    ?options.map( i => {
                        return(
                            <MenuItem value={i.value}>{i.label}</MenuItem>
                        )
                    })
                    :<CircularProgress className="mx-3" size="2rem"/>
                }
            </Select>
        </FormControl>
    )
}