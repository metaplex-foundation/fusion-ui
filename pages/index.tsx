import type { NextPage } from 'next'
import { List, ListItem } from "@mui/material"
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { Button, Stack } from "@mui/material"

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Fusion UI</title>
        <meta name="description" content="Fusion UI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <List className={styles.navList}>
        <ListItem sx={{ textAlign: 'center' }}>
          <Button variant='contained' size="large">
            <Link href="/constraints" >Create A Constraint Model</Link>
          </Button>
        </ListItem>
        <ListItem>
          <Button variant='contained' size="large">
            <Link href="/trifle" >Create A Token-Owned Escrow</Link>
          </Button>
        </ListItem>
        <ListItem>
          <Button variant='contained' size="large">
            <Link href="/setup" >Set up example NFTs</Link>
          </Button>
        </ListItem>
      </List>
    </div >
  )
}

export default Home
