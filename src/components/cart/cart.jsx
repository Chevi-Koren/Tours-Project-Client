import { useEffect, useState } from "react";
import { loct } from "../../redux/slices/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { changeNOS, changeWight, deleteOrder, savePriceToPay } from "../../redux/slices/flight/flightsSlice";
import { useNavigate } from "react-router-dom";
import "./cart.css";

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Container, 
  Card, 
  CardContent,
  Divider,
  Alert,
  Snackbar
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import EventIcon from '@mui/icons-material/Event';
import LuggageIcon from '@mui/icons-material/Luggage';
import { AirplaneTicket } from "@mui/icons-material";

export const Cart = () => {
    const dispatch = useDispatch();
    const order = useSelector(state => state.flights.orders);

    const userName = useSelector(state => state.users.user);
    const navigate = useNavigate();
    
    const [price, setPrice] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    
    useEffect(() => {
        let p = 0;
        dispatch(loct("/cart"));
        order.forEach(element => {
            p += element.price * element.nOS + element.overWight * element.priceToOverLoad;
        });
        setPrice(p);
    }, [dispatch, order]);
    
    useEffect(() => {
        let p = 0;
        order.forEach(element => {
            p += element.price * element.nOS + element.overWight * element.priceToOverLoad;
        });
        setPrice(p);
    }, [order]);
    
    const updateNOs = (o, value) => {

       dispatch(changeNOS({ id: o.id, nOS: parseInt(value) }));
        setSnackbarMessage("כמות הכרטיסים עודכנה");
        setSnackbarOpen(true);
    };
    
    const deleteO = (o) => {
        dispatch(deleteOrder(o));
        setSnackbarMessage("הפריט הוסר מהסל");
        setSnackbarOpen(true);
    };
    
    const updateOverWight = (o, value) => {
        dispatch(changeWight({ id: o.id, overWight: parseInt(value) }));
        setSnackbarMessage("משקל עודף עודכן");
        setSnackbarOpen(true);
    };
    
    const Payment = () => {
        dispatch(savePriceToPay(price));
        if(userName === null) {
            navigate('/logIn');
        } else {
            navigate('/pay');
        }
    };
    
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container className="cart-container" maxWidth={false} disableGutters>
            <Typography variant="h4" component="h1" className="cart-title">
                <ShoppingCartIcon className="cart-icon" />
                סל הקניות שלי
            </Typography>
            
            {order.length === 0 ? (
                <Card className="empty-cart-card">
                    <CardContent className="empty-cart-content">
                        <ShoppingCartIcon className="empty-cart-icon" />
                        <Typography variant="h6">הסל שלך ריק</Typography>
                        <Typography variant="body2" color="textSecondary">
                            לא נמצאו פריטים בסל הקניות שלך
                        </Typography>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={() => navigate('/chooseClass')}
                            className="continue-shopping-btn"
                            size="large"
                            fullWidth={true}
                            startIcon={<FlightTakeoffIcon />}
                        >
                            המשך לחיפוש טיסות
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="cart-content">
                    <TableContainer component={Paper} className="cart-table-container">
                        <Table aria-label="cart table" className="cart-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right">
                                        <Box className="table-header-cell">
                                            <FlightTakeoffIcon fontSize="small" />
                                            <span>מקור</span>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box className="table-header-cell">
                                            <FlightLandIcon fontSize="small" />
                                            <span>יעד</span>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box className="table-header-cell">
                                            <EventIcon fontSize="small" />
                                            <span>תאריך</span>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box className="table-header-cell">
                                            < AirplaneTicket fontSize="small" />
                                            <span>מחלקה</span>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">מחיר לכרטיס</TableCell>
                                    <TableCell align="right">כמות כרטיסים</TableCell>
                                    <TableCell align="right">מחיר למשקל עודף</TableCell>
                                    <TableCell align="right">
                                        <Box className="table-header-cell">
                                            <LuggageIcon fontSize="small" />
                                            <span>משקל עודף</span>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">מחיר לתשלום</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order.map(o => (
                                    <TableRow key={o.id} className="cart-table-row">
                                        <TableCell align="right">
                                            <IconButton 
                                                aria-label="delete" 
                                                onClick={() => deleteO(o)}
                                                color="error"
                                                size="small"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="right" data-label="מקור">{o.src}</TableCell>
                                        <TableCell align="right" data-label="יעד">{o.des}</TableCell>
                                        <TableCell align="right" data-label="תאריך">{o.date} - {o.time}</TableCell>
                                        <TableCell align="right" data-label="מחלקה">{o.classs}</TableCell>

                                        <TableCell align="right" data-label="מחיר לכרטיס">{o.price} ₪</TableCell>
                                        <TableCell align="right" data-label="כמות כרטיסים">
                                            <TextField
                                                type="number"
                                                defaultValue={o.nOS}
                                                InputProps={{ inputProps: { min: 1 , max: o.maxCards} }}
                                                size="small"
                                                onChange={(e) => updateNOs(o, e.target.value)}
                                                className="quantity-input"
                                            />
                                        </TableCell>
                                        <TableCell align="right" data-label="מחיר למשקל עודף">{o.priceToOverLoad} ₪</TableCell>
                                        <TableCell align="right" data-label="משקל עודף">
                                            <TextField
                                                type="number"
                                                defaultValue={o.overWight}
                                                InputProps={{ inputProps: { min: 0 } }}
                                                size="small"
                                                onChange={(e) => updateOverWight(o, e.target.value)}
                                                className="quantity-input"
                                            />
                                        </TableCell>
                                        <TableCell align="right" data-label="מחיר לתשלום" className="item-total-price">
                                            {o.nOS * (o.price) + o.overWight * o.priceToOverLoad} ₪
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    
                    <Card className="order-summary-card">
                        <CardContent>
                            <Typography variant="h6" className="summary-title">
                                סיכום הזמנה
                            </Typography>
                            <Divider className="summary-divider" />
                            
                            <Box className="summary-row">
                                <Typography variant="body1">סה"כ פריטים:</Typography>
                                <Typography variant="body1">{order.length}</Typography>
                            </Box>
                            
                            <Box className="summary-row">
                                <Typography variant="body1">סה"כ כרטיסים:</Typography>
                                <Typography variant="body1">
                                    {order.reduce((sum, item) => sum + item.nOS, 0)}
                                </Typography>
                            </Box>
                            
                            <Box className="summary-row">
                                <Typography variant="body1">סה"כ משקל עודף:</Typography>
                                <Typography variant="body1">
                                    {order.reduce((sum, item) => sum + item.overWight, 0)} ק"ג
                                </Typography>
                            </Box>
                            
                            <Divider className="summary-divider" />
                            
                            <Box className="summary-row total-row">
                                <Typography variant="h6">סה"כ לתשלום:</Typography>
                                <Typography variant="h6" color="primary" className="total-price">
                                    {price} ₪
                                </Typography>
                            </Box>
                            
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                onClick={Payment}
                                className="checkout-button"
                                startIcon={<PaymentIcon />}
                            >
                                מעבר לתשלום
                            </Button>
                            
                            <Button
                                variant="outlined"
                                fullWidth
                                size="medium"
                                onClick={() => navigate('/flights')}
                                className="continue-shopping-button"
                            >
                                המשך בקניות
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}
            
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};
