import Head from 'next/head'
import dynamic from 'next/dynamic'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'
import VoxelDogLoader from '../voxel-ball-loader'

const LazyVoxelDog = dynamic(() => import('../voxel-ball'), {
  ssr: false,
  loading: () => <VoxelDogLoader />
})

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Nandan Patel" />
        <meta name="author" content="nandanjp" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="twitter:title" content="Nandan Patel" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@nandanjp" />
        <meta property="og:site_name" content="Nandan Patel" />
        <meta name="og:title" content="Nandan Patel" />
        <meta property="og:type" content="website" />
        <title>Nandan Patel - Homepage</title>
      </Head>

      <NavBar path={router.asPath} />

      <Container maxW="container.md" pt={14}>
        <LazyVoxelDog />

        {children}

        <Footer />
      </Container>
    </Box>
  )
}

export default Main
