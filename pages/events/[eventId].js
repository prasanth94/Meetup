import { useRouter } from 'next/router'
import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import { getEventById } from '../../dummy-data'

export default function EventDetailsPage() {
  const router = useRouter()

  const event = getEventById(router.query.eventId)

  if (!event) {
    return <p>No event found</p>
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  )
}
