import { PublicKey } from "@solana/web3.js";
import { Select, TextField, Stack, Typography, Box, Button, MenuItem } from "@mui/material";
import { useState, createRef, FC } from "react";
import { EscrowConstraintType, EscrowConstraint } from "../js/src/generated";

type EscrowConstraintFormProps = {
    onSubmit: (constraint: EscrowConstraint, pubkeys: PublicKey[]) => Promise<void>
}

const nameInputRef = createRef<HTMLInputElement>();
const pubkeyInputRef = createRef<HTMLInputElement>();
const tokenLimitRef = createRef<HTMLInputElement>();

export const EscrowConstraintForm: FC<EscrowConstraintFormProps> = ({ onSubmit }) => {
    const [selectedConstraintType, setSelectedConstraintType] = useState<EscrowConstraintType>(EscrowConstraintType.None);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const name = nameInputRef.current?.value as string;
        const tokenLimit = Number(tokenLimitRef.current?.value as string);
        const pubkeysInput = pubkeyInputRef.current?.value as string;
        let pubkeys: PublicKey[] = [];
        if (selectedConstraintType !== EscrowConstraintType.None) { pubkeys = pubkeysInput.split(",").map((p) => new PublicKey(p.trim())) }
        await onSubmit({
            name,
            tokenLimit,
            constraintType: selectedConstraintType
        } as EscrowConstraint,
            pubkeys);
    }

    const handleSelectedConstraintTypeChange = (e: any) => {
        setSelectedConstraintType(e.target.value);
    }

    return <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2}>
            <Typography>New Constraint Name</Typography>
            <TextField inputRef={nameInputRef} variant="outlined" name="Name" />
            <Typography>Constraint Type</Typography>
            <Select value={selectedConstraintType} onChange={handleSelectedConstraintTypeChange} name="Constraint Type">
                <MenuItem value={EscrowConstraintType.None}>None</MenuItem>
                <MenuItem value={EscrowConstraintType.Collection}>Collection</MenuItem>
                <MenuItem value={EscrowConstraintType.Tokens}>Tokens</MenuItem>
            </Select>
            {selectedConstraintType === EscrowConstraintType.None ? null : <>
                <Typography>Pubkey{selectedConstraintType === EscrowConstraintType.Tokens ? "s" : null}</Typography>
                <TextField variant="outlined" name="Pubkey(s)" inputRef={pubkeyInputRef} />
            </>}
            <Button variant="outlined" type="submit">Submit</Button>
        </Stack>
    </Box >
}

export default EscrowConstraintForm;