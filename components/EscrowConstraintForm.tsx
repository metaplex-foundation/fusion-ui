import { PublicKey } from "@solana/web3.js";
import { Select, TextField, Stack, Typography, Box, Button, MenuItem } from "@mui/material";
import { useState, createRef, FC } from "react";
import { EscrowConstraintType, EscrowConstraint } from "../trifle_js/src/generated";
import { ConstraintType } from "../helpers/constraintType";
import { toast } from "react-toastify";

type EscrowConstraintFormProps = {
    onSubmit: (name: string, tokenLimit: number, pubkeys: PublicKey[], constraintType: ConstraintType) => Promise<void>
}


const nameInputRef = createRef<HTMLInputElement>();
const pubkeyInputRef = createRef<HTMLInputElement>();
const tokenLimitRef = createRef<HTMLInputElement>();

export const EscrowConstraintForm: FC<EscrowConstraintFormProps> = ({ onSubmit }) => {
    const [selectedConstraintType, setSelectedConstraintType] = useState<ConstraintType>(ConstraintType.None);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const name = nameInputRef.current?.value as string;
        const tokenLimit = Number(tokenLimitRef.current?.value as string);
        const pubkeys = cleanPubkeys(pubkeyInputRef.current?.value as string || "");


        await onSubmit(name, tokenLimit, pubkeys, selectedConstraintType);
    }

    const cleanPubkeys = (input: string) => {
        const split = input.split(",")
            .map((s) => s.trim())
            .filter((s) => s.length > 0);

        try {
            return split.map(s => new PublicKey(s));
        } catch (e) {
            toast.error(`invalid pubkey${split.length > 1 ? "s" : ""}`);
            return [];
        }
    }

    const handleSelectedConstraintTypeChange = (e: any) => {
        setSelectedConstraintType(e.target.value);
    }

    return <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2}>
            <Typography>New Constraint Name</Typography>
            <TextField inputRef={nameInputRef} variant="outlined" name="Name" />
            <Typography>Token Limit</Typography>
            <TextField type="number" inputRef={tokenLimitRef} variant="outlined" name="TokenLimit" />
            <Typography>Constraint Type</Typography>
            <Select value={selectedConstraintType} onChange={handleSelectedConstraintTypeChange} name="Constraint Type">
                <MenuItem value={ConstraintType.None}>None</MenuItem>
                <MenuItem value={ConstraintType.Collection}>Collection</MenuItem>
                <MenuItem value={ConstraintType.Tokens}>Tokens</MenuItem>
            </Select>
            {selectedConstraintType === ConstraintType.None ? null : <>
                <Typography>Pubkey{selectedConstraintType === ConstraintType.Tokens ? "s" : null}</Typography>
                <TextField variant="outlined" name="Pubkey(s)" inputRef={pubkeyInputRef} />
            </>}
            <Button variant="outlined" type="submit">Submit</Button>
        </Stack>
    </Box >
}

export default EscrowConstraintForm;