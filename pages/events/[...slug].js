import { useRouter } from 'next/router'
import { getFilteredEvents } from '../../dummy-data'
import EventList from '../../components/events/event-list'
import ResultTitle from '../../components/results-title/results-title'
import ErrorAlert from '../../components/error-alert/error-alert'

export default function FilteredEventsPage() {
  const router = useRouter()
  const filterData = router.query.slug

  if (!filterData) {
    return <div className="center">Loading....</div>
  }

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
    return (
      <ErrorAlert>
        <div className="center">Invalid filter values</div>
      </ErrorAlert>
    )
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  })

  if (!filteredEvents || filteredEvents.length === 0) {
    return <div className="center">No events found</div>
  }

  const date = new Date(numYear, numMonth - 1)

  return (
    <>
      <ResultTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  )
}
