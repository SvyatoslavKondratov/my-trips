"use client"
import { routes } from "@/app/constants/routes";
import { CardStatus } from "@/app/types/card-types";
import { Button, ButtonGroup, Grid } from "@mui/material";
import { redirect, useRouter } from "next/navigation";

type NavigationButtons = {
    onClick: (status?: CardStatus) => void
}

export default function NavigationButtons({onClick }: NavigationButtons) {
    return (
        <Grid container flexDirection="row" justifyContent="center">
        <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button onClick={() => onClick()}>All</Button>
            <Button onClick={() => onClick(CardStatus.todo)}>Upcoming</Button>
            <Button onClick={() => onClick(CardStatus.done)}>Completed</Button>
        </ButtonGroup>
        </Grid>
    )
}