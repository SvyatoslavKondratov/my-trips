import { AllTripsCardType } from "@/app/types/card-types";
import { Grid, Link, Typography } from "@mui/material";
import Image from "next/image";

export default function AllTripsCard(data: Pick<AllTripsCardType, "title" | "description" | "photo_url">) {
    const { title, description, photo_url } = data
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
                maxHeight: 206,
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
            <Grid alignItems="flex-start" flexDirection="column" container item md={8} ml={2} sm={8} xs={5}>
                <Typography variant="h5" mb={2}>{title}</Typography>
                <Typography variant="body2">{description}</Typography>
                <Grid flexDirection="row" container justifyContent="space-between" alignItems="center" mt={2} gap={1}>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => {}}
                        underline='always'
                        >
                        See trip details
                    </Link>
                        <Grid flexDirection="row" justifyContent="flex-end" alignItems="center">
                            <Link
                            component="button"
                            variant="body2"
                            onClick={() => {}}
                            underline='always'
                            sx={{ marginRight: 2}}
                            >
                            Edit
                            </Link>
                            <Link
                                component="button"
                                variant="body2"
                                onClick={() => {}}
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