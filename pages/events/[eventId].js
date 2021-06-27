import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import { getEventById, getFeaturedEvents } from '../../helpers/api-utils'

export default function EventDetailsPage(props) {
  const event = props.selectedEvent

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

export async function getStaticProps(context) {
  const eventId = context.params.eventId
  const selectedEvent = await getEventById(eventId)

  return {
    props: {
      selectedEvent: selectedEvent,
    },
  }
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents()

  const paths = events.map((event) => ({ params: { eventId: event.id } }))

  return {
    paths: paths,
    fallback: 'blocking',
  }
}
