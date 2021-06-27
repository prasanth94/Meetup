import { useRouter } from 'next/router'
import { getFilteredEvents } from '../../helpers/api-utils'
import EventList from '../../components/events/event-list'
import ResultTitle from '../../components/results-title/results-title'
import ErrorAlert from '../../components/error-alert/error-alert'

export default function FilteredEventsPage(props) {
  const router = useRouter()

  const filteredEvents = props.filteredEvents

  if (props.hasError) {
    return (
      <ErrorAlert>
        <div className="center">Invalid filter</div>
      </ErrorAlert>
    )
  }

  if (filteredEvents.length === 0) {
    return (
      <ErrorAlert>
        <div className="center">No events found</div>
      </ErrorAlert>
    )
  }

  const date = new Date(props.numYear, props.numMonth - 1)

  return (
    <>
      <ResultTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  )
}

export async function getServerSideProps(context) {
  const filterData = context.params.slug

  const filterYear = filterData[0]
  const filterMonth = filterData[1]

  const numYear = +filterYear
  const numMonth = +filterMonth

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear < 2021 ||
    numYear > 2030 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        hasError: true,
      },
    }
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  })

  return {
    props: {
      filteredEvents: filteredEvents,
      numYear: numYear,
      numMonth: numMonth,
    },
  }
}
