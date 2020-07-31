import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";
import NumberFormat from "react-number-format";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired
};

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

const riskProfileList = [
  { title: "Very Low", year: 1994 },
  { title: "Low", year: 1994 },
  { title: "Mid", year: 1972 },
  { title: "High", year: 1974 },
  { title: "Very High", year: 2008 }
];

const managerList = [
  { title: "Jacky" },
  { title: "Suran" },
  { title: "Suzy" },
  { title: "Micheal" },
  { title: "George" }
];

const JobLocationList = [
  { title: "North" },
  { title: "South" },
  { title: "East" },
  { title: "West" }
];

const YearEndList = [
  { title: "2019" },
  { title: "2020" },
  { title: "2021" },
  { title: "2022" }
];

const GroupNameList = [
  { title: "Coca Cola" },
  { title: "Pepsi" },
  { title: "F&N" },
  { title: "7Eleven" }
];

const ClientCodeList = [
  { title: "AATT1123" },
  { title: "LSN131" },
  { title: "BBTA13" },
  { title: "CC131" }
];

function BudgetAmountField() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    textmask: "(1  )    -    ",
    numberformat: "1000"
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <TextField
      style={{ width: 300, marginTop: 20 }}
      label="Audit Fees"
      onChange={handleChange}
      name="numberformat"
      id="formatted-numberformat-input"
      variant="outlined"
      InputProps={{
        inputComponent: NumberFormatCustom
      }}
    />
  );
}
function ClientCode() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={ClientCodeList}
      getOptionLabel={option => option.title}
      style={{ width: 300, marginTop: 20 }}
      renderInput={params => (
        <TextField {...params} label="Job Code" variant="outlined" />
      )}
    />
  );
}
function GroupName() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={GroupNameList}
      getOptionLabel={option => option.title}
      style={{ width: 300, marginTop: 20 }}
      renderInput={params => (
        <TextField {...params} label="Group Name" variant="outlined" />
      )}
    />
  );
}

function YearEnd() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={YearEndList}
      getOptionLabel={option => option.title}
      style={{ width: 300, marginTop: 20 }}
      renderInput={params => (
        <TextField {...params} label="Year of Engagement" variant="outlined" />
      )}
    />
  );
}

function JobLocation() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={JobLocationList}
      getOptionLabel={option => option.title}
      style={{ width: 300, marginTop: 20 }}
      renderInput={params => (
        <TextField {...params} label="Job Location" variant="outlined" />
      )}
    />
  );
}

function RiskProfile() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={riskProfileList}
      getOptionLabel={option => option.title}
      style={{ width: 300, marginTop: 20 }}
      renderInput={params => (
        <TextField {...params} label="Risk Profile" variant="outlined" />
      )}
    />
  );
}

function ManagerInCharge() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={managerList}
      getOptionLabel={option => option.title}
      style={{ width: 300, marginTop: 20 }}
      renderInput={params => (
        <TextField {...params} label="Manager In Charge" variant="outlined" />
      )}
    />
  );
}

function PartnerInCharge() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={managerList}
      getOptionLabel={option => option.title}
      style={{ width: 300, marginTop: 20 }}
      renderInput={params => (
        <TextField {...params} label="Partner In Charge" variant="outlined" />
      )}
    />
  );
}

function SeniorInCharge() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={managerList}
      getOptionLabel={option => option.title}
      style={{ width: 300, marginTop: 20 }}
      renderInput={params => (
        <TextField {...params} label="Senior In Charge" variant="outlined" />
      )}
    />
  );
}

function NewJobRequest(props) {
  const handleClose = () => {
    props.setOpen(false);
  };
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const handleStartDateChange = date => {
    setStartDate(date);
  };
  const handleEndDateChange = date => {
    setEndDate(date);
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Form</DialogTitle>
        <DialogContent>
          <ClientCode />
          <GroupName />
          <YearEnd />
          <JobLocation />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              // format="dd/MM/yyyy"
              margin="normal"
              id="time-picker"
              label="Start time"
              value={startDate}
              onChange={handleStartDateChange}
              KeyboardButtonProps={{
                "aria-label": "change time"
              }}
            />

            <KeyboardDatePicker
              // format="dd/MM/yyyy"
              value={endDate}
              onChange={handleEndDateChange}
              margin="normal"
              id="time-picker"
              label="End time"
              KeyboardButtonProps={{
                "aria-label": "change time"
              }}
            />
          </MuiPickersUtilsProvider>

          <RiskProfile />
          <BudgetAmountField />
          <ManagerInCharge />
          <PartnerInCharge />
          <SeniorInCharge />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Request
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function JobRequest() {
  const [newOpen, setNewOpen] = React.useState(false);

  const openModal = () => {
    setNewOpen(true);
  };
  return (
    <div style={{ maxWidth: "100%" }}>
      <Button variant="outlined" color="primary" onClick={openModal}>
        Open dialog
      </Button>
      <NewJobRequest open={newOpen} setOpen={setNewOpen} />
    </div>
  );
}
