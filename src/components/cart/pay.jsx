import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./pay.css";

import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
  Alert,
  Snackbar,
  InputAdornment
} from "@mui/material";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LockIcon from '@mui/icons-material/Lock';
import PaymentIcon from '@mui/icons-material/Payment';
import AppleIcon from '@mui/icons-material/Apple';
import PublicIcon from '@mui/icons-material/Public';
import SecurityIcon from '@mui/icons-material/Security';
import EventIcon from '@mui/icons-material/Event';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import { addOrderThunk } from "../../redux/slices/flight/addOrderThunk";

export const Pay = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const order = useSelector(state => state.flights.orders);
    const price = useSelector(state => state.flights.price);
    const userName = useSelector(state => state.users.user);
    
    const [creditCardNum, setCreditCardNum] = useState("");
    const [date, setDate] = useState("");
    const [cvc, setCvc] = useState("");
    const [cardholderName, setCardholderName] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("creditCard");
    const [installments, setInstallments] = useState("1");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    
    const formatCreditCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        
        for (let i = 0; i < match.length; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        
        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    const handleCreditCardChange = (e) => {
        const formattedValue = formatCreditCardNumber(e.target.value);
        setCreditCardNum(formattedValue);
    };

    const toPay = () => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

        setIsProcessing(true);
        let ordersDetailToPay = [];
        order.forEach(element => {
            ordersDetailToPay.push({
                idOrder: 0, 
                idClassToFlight: element.id, 
                countTickets: element.nOS, 
                countOverLoad: element.overWight, 
                price: element.price * element.nOS + element.overWight * element.priceToOverLoad,
            });
        });
        let orderToPay = {
            idCustomer: userName.id, 
            price: price, 
            date: formattedDate, 
            ordersDetails: ordersDetailToPay
        };

        dispatch(addOrderThunk(orderToPay))
            .unwrap()
            .then(() => {
                setIsProcessing(false);
                setSnackbarOpen(true);
                navigate("/orderAfterPay");
            })
            .catch(() => {
                setIsProcessing(false);
                setSnackbarOpen(true);
            });
    };

    const isValidCreditCard = creditCardNum.replace(/\s/g, '').length === 16;
    const isValidDate = date !== "";
    const isValidCvc = cvc.length === 3;
    const isValidName = cardholderName.trim().length > 3;
    
    const isFormValid = 
        paymentMethod === "creditCard" 
            ? (isValidCreditCard && isValidDate && isValidCvc && isValidName) 
            : true;
            
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container className="payment-container">
            <Paper className="payment-paper">
                <Typography variant="h4" component="h1" className="payment-title">
                    <PaymentIcon className="payment-title-icon" />
                    תשלום
                </Typography>
                
                <Card className="order-summary-card">
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            סיכום הזמנה
                        </Typography>
                        <Box className="summary-row">
                            <Typography variant="body1">סה"כ לתשלום:</Typography>
                            <Typography variant="h6" color="primary" className="summary-price">
                                {price} ₪
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
                
                <Typography variant="h6" gutterBottom>
                    בחר אמצעי תשלום
                </Typography>
                
                <Grid container spacing={2} className="payment-methods-grid">
                    <Grid item xs={12} sm={4}>
                        <Paper 
                            className={`payment-method-option ${paymentMethod === "creditCard" ? "method-selected" : ""}`}
                            onClick={() => setPaymentMethod("creditCard")}
                        >
                            <CreditCardIcon className="method-icon credit-card-icon" />
                            <Typography variant="body1">כרטיס אשראי</Typography>
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={12} sm={4}>
                        <Paper 
                            className={`payment-method-option ${paymentMethod === "paypal" ? "method-selected" : ""}`}
                            onClick={() => setPaymentMethod("paypal")}
                        >
                            <PublicIcon className="method-icon paypal-icon" />
                            <Typography variant="body1">PayPal</Typography>
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={12} sm={4}>
                        <Paper 
                            className={`payment-method-option ${paymentMethod === "applepay" ? "method-selected" : ""}`}
                            onClick={() => setPaymentMethod("applepay")}
                        >
                            <AppleIcon className="method-icon apple-icon" />
                            <Typography variant="body1">Apple Pay</Typography>
                        </Paper>
                    </Grid>
                </Grid>
                
                {paymentMethod === "creditCard" && (
                    <Box className="credit-card-form">
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    label="שם בעל הכרטיס"
                                    fullWidth
                                    value={cardholderName}
                                    onChange={(e) => setCardholderName(e.target.value)}
                                    placeholder="ישראל ישראלי"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CreditScoreIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    error={cardholderName !== "" && !isValidName}
                                    helperText={cardholderName !== "" && !isValidName ? "יש להזין שם מלא" : ""}
                                    className="form-field"
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField
                                    label="מספר כרטיס אשראי"
                                    fullWidth
                                    value={creditCardNum}
                                    onChange={handleCreditCardChange}
                                    placeholder="XXXX XXXX XXXX XXXX"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CreditCardIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    error={creditCardNum !== "" && !isValidCreditCard}
                                    helperText={creditCardNum !== "" && !isValidCreditCard ? "מספר כרטיס לא תקין" : ""}
                                    className="form-field"
                                />
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="תוקף"
                                    type="month"
                                    fullWidth
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EventIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    error={date !== "" && !isValidDate}
                                    className="form-field"
                                />
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="CVC/CVV"
                                    fullWidth
                                    value={cvc}
                                    onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, ''))}
                                    placeholder="123"
                                    variant="outlined"
                                    inputProps={{ maxLength: 3 }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    error={cvc !== "" && !isValidCvc}
                                    helperText={cvc !== "" && !isValidCvc ? "קוד אבטחה לא תקין" : ""}
                                    className="form-field"
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined" className="form-field">
                                    <InputLabel id="installments-label">תשלומים</InputLabel>
                                    <Select
                                        labelId="installments-label"
                                        value={installments}
                                        onChange={(e) => setInstallments(e.target.value)}
                                        label="תשלומים"
                                    >
                                        <MenuItem value="1">תשלום אחד</MenuItem>
                                        <MenuItem value="3">3 תשלומים</MenuItem>
                                        <MenuItem value="6">6 תשלומים</MenuItem>
                                        <MenuItem value="12">12 תשלומים</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                )}
                
                {paymentMethod === "paypal" && (
                    <Box className="alternative-payment">
                        <Typography variant="body1" gutterBottom>
                            לחץ על הכפתור למטה כדי להמשיך לתשלום באמצעות PayPal
                        </Typography>
                        <PublicIcon className="alternative-payment-icon paypal-large-icon" />
                    </Box>
                )}
                
                {paymentMethod === "applepay" && (
                    <Box className="alternative-payment">
                        <Typography variant="body1" gutterBottom>
                            לחץ על הכפתור למטה כדי להמשיך לתשלום באמצעות Apple Pay
                        </Typography>
                        <AppleIcon className="alternative-payment-icon apple-large-icon" />
                    </Box>
                )}
                
                <Box className="security-note">
                    <SecurityIcon className="security-icon" />
                    <Typography variant="body2" color="textSecondary">
                        כל פרטי התשלום שלך מאובטחים ומוצפנים
                    </Typography>
                </Box>
                
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={toPay}
                    disabled={!isFormValid || isProcessing}
                    className={`payment-button ${!isFormValid || isProcessing ? "button-disabled" : ""}`}
                >
                    {isProcessing ? (
                        <Box className="loading-container" onClick={() => toPay()}>
                            <CircularProgress size={24} color="inherit" className="loading-spinner" />
                            <span>מעבד תשלום...</span>
                        </Box>
                    ) : (
                        `לתשלום ${price} ₪`
                    )}
                </Button>
            </Paper>
            
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    התשלום בוצע בהצלחה!
                </Alert>
            </Snackbar>
        </Container>
    );
};