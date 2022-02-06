import React from "react";
import koLocale from "date-fns/locale/ko";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import { useForm, Controller } from "react-hook-form";

function MuiTimePicker({name,control, setValue}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={koLocale}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <TimePicker {...field} views={['hours', 'minutes']}
            inputFormat="HH:mm" ampm={false} ampmInClock={false} renderInput={(params) => <TextField {...params} />} />
          )}
        />
    </LocalizationProvider>
  );
}

export default MuiTimePicker;
