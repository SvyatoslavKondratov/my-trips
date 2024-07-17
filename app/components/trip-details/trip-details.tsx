import { AllTripsCardType, CardStatus, Itinerary } from "@/app/types/card-types";
import { ButtonBase, Grid, Modal, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { TripTimeline } from "../triptimeline/trip-timeline";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


type TripDetails = {
    open: boolean,
    openTripId?: string,
    handleClose: () => void
}

export function TripDetails ({ open, handleClose, openTripId}: TripDetails) {
    const queryClient = useQueryClient()
    const {data} = useQuery<AllTripsCardType[]>({ queryKey: ['getAllTrips'] }) 
    
    //TODO use hooks!
    const mutation = useMutation({ 
        mutationFn: async (data: {id: number, status: CardStatus}) => { 
        const { id, status } = data
        //TODO move to config
        const response = await fetch(`https://my-json-server.typicode.com/mariosanz92/dream-travels-data/travels/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                status,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
        return response.json()
        },
        onSuccess: (response) => {
            queryClient.setQueriesData(
                {queryKey: ['getAllTrips']},
                data?.map(({ id, ...rest }: AllTripsCardType) => id === response.id ? response : ({id, rest })),
            )            
        },
        onError : (error) => {
            // TODO log error
            console.log('Error', error)
        }}) 

    if (!data) {
        //TODo add error handling
        return;
    }

    const trip = data.find(({ id, title }) => id + title === openTripId)

    if(!trip) {
        //TODO handle this
        return;
    }
    
    const { photo_url, title, description, itinerary } = trip;

   return (
        <Modal
            open={open}
            onClose={() => {
                // TODO consider something better than this hack, since really there is no update happens
                queryClient.invalidateQueries({
                    queryKey: ['getAllTrips'],
                    type: 'all'
                });
                handleClose()
            }}
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
                            onClick={
                            () => {
                                    mutation.mutate({
                                        id: trip.id,
                                        status: trip.status === CardStatus.done ? CardStatus.todo : CardStatus.done,
                                    })
                                }
                            }
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
            </Grid>
        </Modal>
    );
}