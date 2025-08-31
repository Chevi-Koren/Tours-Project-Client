import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loct } from "../../redux/slices/user/userSlice";
import { getClassToFlightbyClassthisFlightIdThunk } from "../../redux/slices/flight/getClassToFlightbyClassthisFlightIdThunk";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { savaClassToFlight } from "../../redux/slices/flight/flightsSlice";
import './flightDetails.css';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Rating,
  Snackbar,
  Typography,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';

import {
  AddShoppingCart,
  ShoppingCart,
  FlightTakeoff,
  FlightLand,
  AccessTime,
  Event,
  AirlineSeatReclineNormal,
  Luggage,
  AttachMoney,
  Add,
  Remove,
  Warning,
  Star,
  StarBorder
} from '@mui/icons-material';

export const FlightDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const [nOS, setNOS] = useState(0);
    const [overWight, setOverWight] = useState(0);
    const [flag1, setFlag1] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const yourClassToFlight = useSelector(state => state.flights.yourClassToFlight);
    const order = useSelector(state => state.flights.orders);
    const navigate = useNavigate();
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    useEffect(() => {
        dispatch(loct(`/flightDetail/${params.classs}/${params.id}/${params.numberOfSeats}`));
        dispatch(getClassToFlightbyClassthisFlightIdThunk({ classs: params.classs, thisflightId: params.id }));
        setNOS(parseInt(params.numberOfSeats));
    }, []);
    
    const addToCart = () => {
        let flag = false;
        order.forEach(element => {
            if(element.id === yourClassToFlight.id)
                flag = true;
        });
        if(!flag) {
            var flt = {
                src: yourClassToFlight.thisflight.flight.sourceNavigation.destination, 
                des: yourClassToFlight.thisflight.flight.destinationNavigation.destination,
                date: yourClassToFlight.thisflight.date, 
                time: yourClassToFlight.thisflight.time, 
                id: yourClassToFlight.id,
                price: yourClassToFlight.price - yourClassToFlight.hanacha, 
                priceToOverLoad: yourClassToFlight.thisflight.priceToOverLoad,
                nOS: nOS, 
                overWight: overWight,
                classs: params.classs,
                maxCards: yourClassToFlight.numberOfSeats - yourClassToFlight.sold,
            };
            dispatch(savaClassToFlight(flt));
            setOpenSnackbar(true);
        } else {
            setFlag1(true);
        }
    };
    
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    
    const calculateRating = () => {
        if (!yourClassToFlight) return 0;
        
        if (yourClassToFlight.sold === yourClassToFlight.numOfSeats) return 5;
        if (yourClassToFlight.sold === 0) return 0;
        if (yourClassToFlight.sold > 15) return 4;
        if (yourClassToFlight.sold > 10) return 3;
        if (yourClassToFlight.sold > 5) return 2;
        return 1;
    };
    

    const remainingSeats = yourClassToFlight ? 
        yourClassToFlight.numberOfSeats - yourClassToFlight.sold : 0;
    
    const calculateTotalPrice = () => {
        if (!yourClassToFlight) return 0;
        
        return (yourClassToFlight.price - yourClassToFlight.hanacha) * nOS + 
               yourClassToFlight.thisflight.priceToOverLoad * overWight;
    };
    
    if (!yourClassToFlight) {
        return (
            <Container className="loading-container">
                <Typography variant="h5" align="center">טוען פרטי טיסה...</Typography>
            </Container>
        );
    }
    
    return (
        <Container className="flight-details-container">
            <Paper elevation={3} className="flight-details-paper">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card className="flight-image-card">
                            <CardMedia
                                component="img"
                                height="300"
                                image={`/תמונות מדינות/${yourClassToFlight.thisflight.flight.destinationNavigation.path}.png`}
                                alt={yourClassToFlight.thisflight.flight.destinationNavigation.path}
                                className="flight-image"
                            />
                            <CardContent className="destination-name">
                                <Typography variant="h5" component="div">
                                    {yourClassToFlight.thisflight.flight.destinationNavigation.destination}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                        <Card className="flight-info-card">
                            <CardContent>
                                <Box className="flight-route">
                                    <Box className="route-point">
                                        <FlightTakeoff className="route-icon" />
                                        <Typography variant="h6">
                                            {yourClassToFlight.thisflight.flight.sourceNavigation.destination}
                                        </Typography>
                                    </Box>
                                    
                                    <Divider orientation="horizontal" flexItem className="route-divider" />
                                    
                                    <Box className="route-point">
                                        <FlightLand className="route-icon" />
                                        <Typography variant="h6">
                                            {yourClassToFlight.thisflight.flight.destinationNavigation.destination}
                                        </Typography>
                                    </Box>
                                </Box>
                                
                                <Box className="flight-details-info">
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Box className="info-item">
                                                <Event className="info-icon" />
                                                <Typography variant="body1">
                                                    {yourClassToFlight.thisflight.date}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        
                                        <Grid item xs={6}>
                                            <Box className="info-item">
                                                <AccessTime className="info-icon" />
                                                <Typography variant="body1">
                                                    {yourClassToFlight.thisflight.time}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        
                                        <Grid item xs={6}>
                                            <Box className="info-item">
                                                <AirlineSeatReclineNormal className="info-icon" />
                                                <Typography variant="body1">
                                                    מחלקה: {params.classs}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        
                                        <Grid item xs={6}>
                                            <Box className="info-item">
                                                <Luggage className="info-icon" />
                                                <Typography variant="body1">
                                                    משקל מותר: {yourClassToFlight.weightLoad} ק"ג
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                                
                                <Box className="flight-pricing">
                                    <Typography variant="h6" className="price-label">
                                        מחירים:
                                    </Typography>
                                    
                                    <Box className="price-item">
                                        <Typography variant="body1">
                                            מחיר לכרטיס:
                                        </Typography>
                                        <Chip 
                                            icon={<AttachMoney />} 
                                            label={`₪${yourClassToFlight.price - yourClassToFlight.hanacha}`} 
                                            color="primary" 
                                            variant="outlined"
                                        />
                                    </Box>
                                    
                                    <Box className="price-item">
                                        <Typography variant="body1">
                                            מחיר למשקל עודף (לק"ג):
                                        </Typography>
                                        <Chip 
                                            icon={<AttachMoney />} 
                                            label={`₪${yourClassToFlight.thisflight.priceToOverLoad}`} 
                                            color="primary" 
                                            variant="outlined"
                                        />
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Card className="booking-card">
                            <CardContent>
                                <Typography variant="h5" className="booking-title">
                                    הזמנת כרטיסים
                                </Typography>
                                
                                <Box className="seats-availability">
                                    <Typography variant="body1" className="availability-label">
                                        מספר הכרטיסים הנותרים:
                                    </Typography>
                                    <Chip 
                                        label={yourClassToFlight.numberOfSeats - yourClassToFlight.sold} 
                                        color={yourClassToFlight.numberOfSeats - yourClassToFlight.sold > 0 ? "success" : yourClassToFlight.numberOfSeats - yourClassToFlight.sold === 0 ? "warning" : "error"}
                                        className="availability-chip"
                                    />
                                </Box>
                                
                                {yourClassToFlight.numberOfSeats - yourClassToFlight.sold === 0 ? (
                                    <Alert severity="error" className="sold-out-alert">
                                        <Typography variant="body1">הכרטיסים אזלו</Typography>
                                    </Alert>
                                ) : (
                                    <Box className="booking-options">
                                        <Box className="quantity-selector">
                                            <Typography variant="body1" className="quantity-label">
                                                מספר כרטיסים:
                                            </Typography>
                                            <Box className="quantity-controls">
                                                <IconButton 
                                                    onClick={() => { nOS < Math.min(yourClassToFlight.numberOfSeats - yourClassToFlight.sold) && setNOS(nOS + 1) }}
                                                    color="primary"
                                                    disabled={nOS >= Math.min(yourClassToFlight.numberOfSeats - yourClassToFlight.sold)}
                                                >
                                                    <Add />
                                                </IconButton>
                                                <Typography variant="h6" className="quantity-value">
                                                    {nOS}
                                                </Typography>
                                                <IconButton 
                                                    onClick={() => { nOS > 0 && setNOS(nOS - 1) }}
                                                    color="primary"
                                                    disabled={nOS <= 0}
                                                >
                                                    <Remove />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        
                                        <Box className="weight-selector">
                                            <Typography variant="body1" className="weight-label">
                                                משקל עודף (ק"ג):
                                            </Typography>
                                            <Box className="weight-controls">
                                                <IconButton 
                                                    onClick={() => setOverWight(overWight + 1)}
                                                    color="primary"
                                                >
                                                    <Add />
                                                </IconButton>
                                                <Typography variant="h6" className="weight-value">
                                                    {overWight}
                                                </Typography>
                                                <IconButton 
                                                    onClick={() => { overWight > 0 && setOverWight(overWight - 1) }}
                                                    color="primary"
                                                    disabled={overWight <= 0}
                                                >
                                                    <Remove />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        
                                        <Box className="total-price">
                                            <Typography variant="h6" className="total-label">
                                                סה"כ לתשלום:
                                            </Typography>
                                            <Typography variant="h5" className="total-value">
                                                ₪{calculateTotalPrice()}
                                            </Typography>
                                        </Box>
                                        
                                        <Box className="action-buttons">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                startIcon={<AddShoppingCart />}
                                                onClick={addToCart}
                                                disabled={nOS < 1}
                                                fullWidth={isMobile}
                                                className="add-to-cart-button"
                                            >
                                                הוסף לסל
                                            </Button>
                                            
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                startIcon={<ShoppingCart />}
                                                onClick={() => navigate(`/cart`)}
                                                fullWidth={isMobile}
                                                className="view-cart-button"
                                            >
                                                למעבר לסל
                                            </Button>
                                        </Box>
                                        
                                        {flag1 && (
                                            <Alert severity="warning" className="already-in-cart">
                                                <Typography variant="body2">טיסה זו כבר קיימת בסל</Typography>
                                            </Alert>
                                        )}
                                    </Box>
                                   )}
                                   </CardContent>
                               </Card>
                           </Grid>
                       </Grid>
                   </Paper>
                   
                   <Snackbar
                       open={openSnackbar}
                       autoHideDuration={4000}
                       onClose={handleCloseSnackbar}
                       anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                   >
                       <Alert onClose={handleCloseSnackbar} severity="success" variant="filled">
                           הטיסה נוספה לסל בהצלחה!
                       </Alert>
                   </Snackbar>
               </Container>
           );
       };
       
                      