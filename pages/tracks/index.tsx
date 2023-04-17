import { Button, Card, Grid } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import React from 'react'
import TrackList from '../../components/TrackList'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import MainLayout from '../../layouts/MainLayout'
import { NextThunkDispatch, wrapper } from '../../store'
import { fetchTracks } from '../../store/actions-creators/track'

const Index = () => {
  const router = useRouter()
  // const {tracks, error} = useTypedSelector(state => state.track)

  const tracks = [
    {_id: '1', name: 'name1', artist:"artist1", text: "text1", listens: 1, audio: "1", picture: "1", comments: []},
    {_id: '2', name: 'name2', artist:"artist2", text: "text2", listens: 2, audio: "2", picture: "2", comments: []}
  ]

  // if (error) {
  //   return 
  //     <MainLayout>
  //       <h1>{error}</h1>
  //     </MainLayout>
  // }

  return (
    <MainLayout>
      <Grid container justifyContent="center">
        <Card style={{width: 900}}>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1 className="m0">Список треков</h1>
              <Button variant="contained" onClick={() => router.push('/tracks/create')}>Загрузить</Button>
            </Grid>
          </Box>
          <TrackList tracks={tracks}/>
        </Card>
      </Grid>
      
    </MainLayout>
  )
}

export default Index

// export const getServerSideProps = wrapper.getServerSideProps(
//   store => async () =>
//   {
//     const dispatch = store.dispatch as NextThunkDispatch;
//     await dispatch(fetchTracks());

//     return { props: {} }
//   }
// );