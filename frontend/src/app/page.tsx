'use client'

import styles from './page.module.css'

export default function Home() {
 

  return (
    <div className={styles.page}>
      <a href='http://localhost:3001/auth/spotify'>sign in with spotify</a>
      <a href='http://localhost:3001/auth/github'>sign in with github</a>
    </div>
  )
}
