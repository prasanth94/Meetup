import classes from './main-header.module.css'

import Link from 'next/link'
export default function MainHeader(props) {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">Next Events</Link>
      </div>
      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link href="/events">Browse All Events </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
