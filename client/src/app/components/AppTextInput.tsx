import { TextField } from "@mui/material"
import { useController, UseControllerProps } from "react-hook-form"

interface Props extends UseControllerProps {
    label: string;
    mutliline?: boolean;
    rows?: number;
    type?: string;
}

function AppTextInput(props: Props) {
 
  const {fieldState, field} = useController({ ...props, defaultValue: '' });

  return (
    <TextField
        {...props}
        {...field}
        multiline={props.mutliline}
        rows={props.rows}
        type={props.type}
        fullWidth
        variant='outlined'
        error={!!fieldState.error}
        helperText={fieldState.error?.message} 
    />
  )
}

export default AppTextInput