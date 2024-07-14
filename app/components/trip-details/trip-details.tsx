import { AllTripsCardType } from "@/app/types/card-types";
import { Grid, Modal, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";


type TripDetails = {
    open: boolean,
    openTripId?: string,
    handleClose: () => void
}

export function TripDetails ({ open, handleClose, openTripId}: TripDetails) {
    const {data} = useQuery<AllTripsCardType[]>({ queryKey: ['getAllTrips'] })  
    if (!data) {
        //TODo add error handling
        return;
    }

    const trip = data.find(({ id, title }) => id + title === openTripId)

    if(!trip) {
        //TODO handle this
        return;
    }
    const { photo_url, title, description } = trip;
   return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
        >
            <Grid container sx={{ backgroundColor: 'white', borderRadius: 2}} justifyContent="center" maxWidth={640}>
                <Grid
                    container
                    item
                    position="relative"
                    height={250}
                >
                    <Image
                        fill
                        src={photo_url}                  
                        alt="Portugal"
                        style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8}}
                    />
                </Grid>  
                <Grid container item  pr={2} pl={2}>
                    <Typography variant="h3">{title}</Typography>
                    <Typography variant="body2">{description}</Typography>
                </Grid>
            </Grid>
        </Modal>
    );
}