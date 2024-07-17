import { AllTripsCardType } from "@/app/types/card-types";
import { Grid, Link, Typography } from "@mui/material";
import Image from "next/image";

export default function AllTripsCard(
    data: Pick<AllTripsCardType, "title" | "description" | "photo_url"> &  {openTripDetails: () => void, onDelete: () => void}) {
    const { title, description, photo_url, openTripDetails, onDelete } = data 
    return(
        <Grid
            flexDirection="row"
            container
            item
            sx={{
                borderWidth: 1,
                borderStyle: 'solid', 
                borderRadius: 2,
                borderColor: 'lightGray', 
                maxWidth: 928,        
            }}
        >
            <Grid
                container
                item
                md={3}
                sm={3}
                xs={4}
                position="relative"
            >
                <Image
                    fill
                    src={photo_url}                  
                    alt="Portugal"
                    style={{ borderTopLeftRadius: 8, borderBottomLeftRadius: 8}}
                />
            </Grid>     
            <Grid alignItems="flex-start" flexDirection="column" container item md={8} ml={2} sm={8} xs={5} gap={2} m={2}>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="subtitle2">{description}</Typography>
                <Grid flexDirection="row" container justifyContent="space-between" alignItems="center" gap={1}>
                    <Link
                        component="button"
                        variant="subtitle2"
                        onClick={openTripDetails}
                        underline='always'
                        >
                        See trip details
                    </Link>
                        <Grid flexDirection="row" justifyContent="flex-end" alignItems="center">
                            <Link
                            component="button"
                            variant="subtitle2"
                            onClick={() => {}}
                            underline='always'
                            sx={{ marginRight: 2}}
                            >
                            Edit
                            </Link>
                            <Link
                                component="button"
                                variant="subtitle2"
                                onClick={() => onDelete()}
                                underline='always'
                                >
                                Delete
                            </Link>
                        </Grid>                   
                </Grid>
            </Grid>
        </Grid>
    )   
}