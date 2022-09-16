import { Select, TextField, Stack, Typography, Box, Button } from "@mui/material";
import { useState, createRef, FC } from "react";
import { EscrowConstraintType, EscrowConstraint } from "../js/src/generated";

type EscrowConstraintFormState = {
}

type EscrowConstraintFormProps = {
    setFormVisible: (visible: boolean) => void
    onSubmit: (data: EscrowConstraintFormState) => Promise<void>
}

export const EscrowConstraintForm: FC<EscrowConstraintFormProps> = ({ setFormVisible, onSubmit }) => {
    const handleSubmit = async (e: any) => {
        await onSubmit({});
        setFormVisible(false);
    }

    const nameInputRef = createRef();

    return <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2}>
            <Typography>New Constraint</Typography>
            <TextField inputRef={nameInputRef} variant="outlined" />
            <Button variant="outlined" type="submit">Submit</Button>
        </Stack>
    </Box >
}

export default EscrowConstraintForm;