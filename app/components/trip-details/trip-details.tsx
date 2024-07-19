import { AllTripsCardType, CardStatus } from "@/app/types/card-types";
import { ButtonBase, Grid, Modal, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { TripTimeline } from "../triptimeline/trip-timeline";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDialog } from "@/app/hooks/useDialog";
import { useTripDetailsMutation } from "@/app/hooks/useTripDetailsMutation";


type TripDetails = {
    open: boolean,
    openTripId?: string,
    handleClose: () => void
}

export function TripDetails ({ open, handleClose, openTripId}: TripDetails) { 
    const {data} = useQuery<AllTripsCardType[]>({ queryKey: ['getAllTrips'] })
    const {showDialog, hideDialog, DialogPopup} = useDialog();    
    const mutation = useTripDetailsMutation();

    if (!data) {
        //TODO add error handling
        return (<Typography variant="subtitle1">No Data!</Typography>);        
    }

    const trip = data.find(({ id, title }) => id + title === openTripId);
    
    if(!trip) {
        //TODO handle this
        return;
    }
    
    const { photo_url, title, description, itinerary } = trip;
    
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
                        alt={title}
                        style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8}}
                    />
                </Grid>  
                <Grid container item  p={4}>
                    <Grid
                        container
                        item
                        pb={4}
                        flexDirection="column"
                        sx={{ borderBottomStyle: 'solid', borderBottomWidth: 1, borderColor: 'gray'}}
                    >
                        <Typography variant="h3">{title}</Typography>
                        <ButtonBase
                            sx={{ marginBottom: 4}}
                            onClick={showDialog}
                        >
                        {trip.status === CardStatus.todo ? (
                            <Grid container item alignItems="flex-end" justifyContent="flex-start">
                                <CheckCircleOutlineIcon fontSize="small" htmlColor="gray" />
                                <Typography variant="subtitle2" ml={2} sx={{ textAlign: 'center' }}>Mark as completed</Typography>
                            </Grid> ): (
                                 <Grid container item alignItems="flex-end" justifyContent="flex-start">
                                    <CheckCircleIcon fontSize="small" htmlColor="green" />
                                    <Typography variant="subtitle2" ml={2} sx={{ textAlign: 'center' }}>Complete</Typography>
                                </Grid>
                            )}                           
                        </ButtonBase>
                        <Typography variant="subtitle2">{description}</Typography>
                    </Grid>                    
                </Grid>
                <Grid container item pr={4} pl={4} pb={4}>
                    <TripTimeline itinerary={itinerary}/>
                </Grid>
                {/* Add hooks and abstractions need to move content creation of dialog in separete file */}
                <DialogPopup
                    children={<Typography variant="body2">{'Clicking proceed will change trip status'}</Typography>}
                    title={'Are you sure?'}
                    actions={
                        [{
                            text: 'Close',
                            onClick: hideDialog,
                            color: 'secondary',
                            },
                            {
                                text: 'Proceed',
                                onClick: async () =>  {
                                    hideDialog()
                                    mutation.mutate({
                                        id: trip.id,
                                        status: trip.status === CardStatus.done ? CardStatus.todo : CardStatus.done,
                                    })
                                },
                                color: 'secondary',
                            },
                        ]
                    }
                />
            </Grid>            
        </Modal>
    );
}