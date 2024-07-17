import { Itinerary } from '@/app/types/card-types';
import {Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, timelineItemClasses, TimelineSeparator} from '@mui/lab/';
import { Typography } from '@mui/material';

export function TripTimeline ({itinerary}: {itinerary: Itinerary[]}) {
    return itinerary.length > 0 ? (
        <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
        >
          {itinerary.map(({ day, location, description }: Itinerary, index: number) => (
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot sx={{ background: 'black', margin: 0}} />
                {index !== itinerary.length -1 && <TimelineConnector sx={{ background: 'black', overflow: 'visible'}} />}
              </TimelineSeparator>
              <TimelineContent sx={{ padding: '0px 16px' }}>
                <Typography variant='subtitle2'>Day {day}: {location}</Typography>
                <Typography variant='body2'>{description}</Typography>
              </TimelineContent>
            </TimelineItem>   
            ))}                
        </Timeline>
    ) : <Typography variant='subtitle2'>No data</Typography>
}