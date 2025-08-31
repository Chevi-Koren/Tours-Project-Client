import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllClassToFlightThunk } from "../../redux/slices/flight/getAllClassToFlightThunk";
import { getFlightDetailsByIdThunk } from "../../redux/slices/flight/getFlightDetailsByIdThunk";
import { getFlightDetailsById, saveDesAndSrc } from "../../redux/slices/flight/flightsSlice";
import { getAllFlightThunk } from "../../redux/slices/flight/getAllFlightThunk";
import { loct } from "../../redux/slices/user/userSlice";
import { Handle } from "../handle/handle";
import './flights.css';

import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Button, 
  Paper,
  Divider,
  Fade,
  CircularProgress
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ExploreIcon from '@mui/icons-material/Explore';

export const Flights = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [handle, sethandle] = useState(false);
  const [flight, setFlight] = useState({});
 
  const flightsArr = useSelector(state => state.flights.flightsArr);
  const ClassToFlightThunk = useSelector(state => state.flights.ClassToFlightThunk);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    dispatch(loct("/flights"));
    dispatch(getAllFlightThunk()).then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
     <Paper 
  elevation={0} 
  sx={{ 
    p: 4, 
    mb: 4, 
    borderRadius: 2,
    background: 'linear-gradient(135deg, #1976d2 0%, #115293 100%)', 
    color: 'white',
    textAlign: 'center'
  }}
>
  <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
    <ExploreIcon sx={{ mr: 1, fontSize: 40, verticalAlign: 'middle' }} />
    יעדי הטיסות שלנו
  </Typography>
  <Typography variant="h6" sx={{ maxWidth: '700px', mx: 'auto', opacity: 0.9 }}>
    בחרו את היעד המועדף עליכם ותכננו את החופשה הבאה שלכם
  </Typography>
</Paper>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress size={60} />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {flightsArr?.length > 0 ? (
            flightsArr.map((flight) => (
              <Grid item xs={12} sm={6} md={4} key={flight.id}>
                <Fade in={true} timeout={500}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      borderRadius: 2,
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 20px rgba(0,0,0,0.2)',
                        cursor: 'pointer'
                      }
                    }}
                    onClick={() => navigate(`/fullFlight/${flight.id}`)}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={`/תמונות מדינות/${flight.destinationNavigation.path}.png`}
                      alt={flight.destinationNavigation.path}
                      sx={{ 
                        objectFit: 'cover',
                        objectPosition: 'center',
                        filter: 'brightness(0.9)'
                      }}
                    />
                    
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        mb: 2
                      }}>
                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                            <FlightTakeoffIcon color="primary" sx={{ mr: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                              מוצא
                            </Typography>
                          </Box>
                          <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                            {flight.sourceNavigation.destination}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          mx: 1
                        }}>
                          <ArrowRightAltIcon 
                            sx={{ 
                              fontSize: 30, 
                              color: 'primary.main',
                              transform: 'rotate(180deg)' 
                            }} 
                          />
                        </Box>
                        
                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                            <FlightLandIcon color="primary" sx={{ mr: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                              יעד
                            </Typography>
                          </Box>
                          <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                            {flight.destinationNavigation.destination}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Button 
                        variant="contained" 
                        fullWidth
                        sx={{ 
                          mt: 2,
                          py: 1,
                          fontWeight: 'bold',
                          borderRadius: 2
                        }}
                      >
                        הצג פרטים
                      </Button>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))
          ) : (
            <Box 
              sx={{ 
                width: '100%', 
                textAlign: 'center', 
                py: 8,
                opacity: 0.7
              }}
            >
              <Typography variant="h5">
                לא נמצאו טיסות זמינות
              </Typography>
            </Box>
          )}
        </Grid>
      )}
    </Container>
  );
};