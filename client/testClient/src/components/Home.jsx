
import { Container, Box, Typography } from '@mui/material'
import { useContext } from 'react'
import { UserContext } from '../Layout'



export const Home = () => {
  const user = useContext(UserContext)
 
  return (
    <Box>
      <Container>
        <Typography>Home</Typography>
        <Container>
                <Typography>{`Is user logged In? : ${user.isLoggedIn}`}</Typography>
          </Container>
      </Container>
    </Box>
  )
}
