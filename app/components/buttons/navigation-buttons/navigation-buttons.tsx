"use client"
import { routes } from "@/app/constants/routes";
import { Button, ButtonGroup, Grid } from "@mui/material";
import { redirect, useRouter } from "next/navigation";

export default function NavigationButtons() {
    const router = useRouter();
    return (
        <Grid container flexDirection="row" justifyContent="center">
        <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button onClick={() => router.push(routes.landing)}>All</Button>
            <Button onClick={() => router.push(routes.upcoming)}>Upcoming</Button>
            <Button onClick={() => router.push(routes.completed)}>Completed</Button>
        </ButtonGroup>
        </Grid>
    )
}