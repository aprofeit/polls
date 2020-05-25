import Link from 'next/link'
import { FaChevronLeft } from 'react-icons/fa'
import styles from './styles'

export default function BackButton ({label}) {
  return (
    <div style={styles.backButton}>
      <Link href="/">
        <a>
          <FaChevronLeft style={styles.chevronLeft} /> {label}
        </a>
      </Link>
    </div>
  )
}
