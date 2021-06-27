import EventList from '../components/events/event-list'
import { getFeaturedEvents } from '../helpers/api-utils'

export default function HomePage(props) {
  return <EventList items={props.events} />
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents()
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  }
}
