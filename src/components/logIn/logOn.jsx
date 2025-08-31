import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUserThunk } from "../../redux/slices/user/addUserThunk";


import './logOn.css';

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Divider,
  Alert,
  Snackbar,
  CircularProgress,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';

import {
  Visibility,
  VisibilityOff,
  Close as CloseIcon,
  Person as PersonIcon,
  Lock as LockIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { setStatus, signOut } from "../../redux/slices/user/userSlice";

export const LogOn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const user = useSelector(state => state.users.userWithoutOutId);
    const loction = useSelector(state => state.users.loction);
    
    const [thisUser, setUser] = useState(user || { 
        firstName: '', 
        lastName: '', 
        password: '', 
        email: '',
        phone: '' 
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
    const [activeStep, setActiveStep] = useState(0);
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    
    const refDailog = useRef();
    
    useEffect(() => {
        refDailog.current.showModal();
    }, []);
    
    const steps = ['פרטים אישיים', 'פרטי התחברות', 'סיום'];
    
    const validateStep = (step) => {
        const newErrors = {};
        
        if (step === 0) {
            if (!thisUser.firstName.trim()) {
                newErrors.firstName = 'חובה להזין שם משתמש';
            }
            
            if (!thisUser.lastName.trim()) {
                newErrors.lastName = 'חובה להזין שם משפחה';
            }
            
            if (thisUser.phone && !/^\d{10}$/.test(thisUser.phone)) {
                newErrors.phone = 'מספר טלפון לא תקין (10 ספרות)';
            }
        }
        
        if (step === 1) {
            if (!thisUser.email) {
                newErrors.email = 'חובה להזין כתובת מייל';
            } else if (!/\S+@\S+\.\S+/.test(thisUser.email)) {
                newErrors.email = 'כתובת אימייל לא תקינה';
            }
            
            if (!thisUser.password) {
                newErrors.password = 'חובה להזין סיסמא';
            } else if (thisUser.password.length < 6) {
                newErrors.password = 'הסיסמא חייבת להכיל לפחות 6 תווים';
            }
            
            if (passwordConfirm !== thisUser.password) {
                newErrors.passwordConfirm = 'הסיסמאות אינן תואמות';
            }
        }
        
        if (step === 2 && !termsAccepted) {
            newErrors.terms = 'יש לאשר את תנאי השימוש';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleNext = () => {
        if (validateStep(activeStep)) {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };
    
    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };
    
    const handleRegister = () => {
        if (validateStep(activeStep)) {
            setLoading(true);
            
            try {
                dispatch(addUserThunk(thisUser));
                setSnackbar({
                    open: true,
                    message: 'ההרשמה בוצעה בהצלחה!',
                    severity: 'success'
                });
                
                setTimeout(() => {
                    navigate(loction);
                }, 1500);
            } catch (error) {
                setSnackbar({
                    open: true,
                    message: 'ההרשמה נכשלה. אנא נסה שנית.',
                    severity: 'error'
                });
                setLoading(false);
            }
            dispatch(setStatus());
        }
    };
    
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSnackbarClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };
    
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box className="step-content">
                        <TextField
                            fullWidth
                            label="שם משתמש"
                            name="firstName"
                            value={thisUser.firstName}
                            onChange={handleInputChange}
                            error={!!errors.firstName}
                            helperText={errors.firstName}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                ),
                            }}
                            className="form-field"
                        />
                        
                        <TextField
                            fullWidth
                            label="שם משפחה"
                            name="lastName"
                            value={thisUser.lastName}
                            onChange={handleInputChange}
                            error={!!errors.lastName}
                            helperText={errors.lastName}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                ),
                            }}
                            className="form-field"
                        />
                        
                        <TextField
                            fullWidth
                            label="מספר טלפון"
                            name="phone"
                            value={thisUser.phone}
                            onChange={handleInputChange}
                            error={!!errors.phone}
                            helperText={errors.phone}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneIcon />
                                    </InputAdornment>
                                ),
                            }}
                            className="form-field"
                        />
                    </Box>
                );
            case 1:
                return (
                    <Box className="step-content">
                        <TextField
                            fullWidth
                            label="כתובת מייל"
                            name="email"
                            type="email"
                            value={thisUser.email}
                            onChange={handleInputChange}
                            error={!!errors.email}
                            helperText={errors.email}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                            className="form-field"
                        />
                        
                        <TextField
                            fullWidth
                            label="סיסמא"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={thisUser.password}
                            onChange={handleInputChange}
                            error={!!errors.password}
                            helperText={errors.password}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleTogglePasswordVisibility}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            className="form-field"
                        />
                        
                        <TextField
                            fullWidth
                            label="אימות סיסמא"
                            type={showPassword ? 'text' : 'password'}
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            error={!!errors.passwordConfirm}
                            helperText={errors.passwordConfirm}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                            }}
                            className="form-field"
                        />
                    </Box>
                );
            case 2:
                return (
                    <Box className="step-content summary-step">
                        <Typography variant="h6" className="summary-title">
                            סיכום פרטי הרשמה
                        </Typography>
                        
                        <Box className="summary-item">
                            <Typography variant="body2" color="textSecondary">שם מלא:</Typography>
                            <Typography variant="body1">{`${thisUser.firstName} ${thisUser.lastName}`}</Typography>
                        </Box>
                        
                        <Box className="summary-item">
                            <Typography variant="body2" color="textSecondary">כתובת מייל:</Typography>
                            <Typography variant="body1">{thisUser.email}</Typography>
                        </Box>
                        
                        {thisUser.phone && (
                            <Box className="summary-item">
                                <Typography variant="body2" color="textSecondary">מספר טלפון:</Typography>
                                <Typography variant="body1">{thisUser.phone}</Typography>
                            </Box>
                        )}
                        
                        <Box className="terms-container">
                            <Box className="remember-me">
                                <input 
                                    type="checkbox" 
                                    id="termsAccepted" 
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                />
                                <label htmlFor="termsAccepted">
                                    אני מאשר/ת את <span className="terms-link">תנאי השימוש</span> ואת <span className="terms-link">מדיניות הפרטיות</span>
                                </label>
                            </Box>
                            {errors.terms && (
                                <Typography variant="caption" color="error" className="terms-error">
                                    {errors.terms}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                );
            default:
                return 'שלב לא ידוע';
        }
    };

    return (
        <dialog ref={refDailog} className="logon-dialog">
            <Container component="main" maxWidth="md" className="logon-container">
                <Card className="logon-card">
                    <CardContent className="logon-card-content">
                        <Grid container>
                            <Grid item xs={12} md={6} className="logon-form-container">
                                <Box className="logon-form">
                                    <Box className="logon-header">
                                        <Typography variant="h4" component="h1" className="logon-title">
                                            הרשמה
                                        </Typography>
                                        <IconButton 
                                            aria-label="close" 
                                            className="close-button"
                                            onClick={() => {dispatch(signOut()); dispatch(setStatus()); navigate(loction)}}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Box>
                                    
                                    <Stepper activeStep={activeStep} alternativeLabel className="registration-stepper">
                                        {steps.map((label) => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                    
                                    {getStepContent(activeStep)}
                                    
                                    <Box className="step-buttons">
                                        <Button
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            className="back-button"
                                            startIcon={<ArrowForwardIcon />}
                                        >
                                            חזרה
                                        </Button>
                                        
                                        {activeStep === steps.length - 1 ? (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleRegister}
                                                className="next-button"
                                                disabled={loading}
                                                endIcon={loading ? <CircularProgress size={20} /> : <CheckCircleIcon />}
                                            >
                                                {loading ? 'מבצע הרשמה...' : 'סיום הרשמה'}
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                                className="next-button"
                                                endIcon={<ArrowBackIcon />}
                                            >
                                                המשך
                                            </Button>
                                        )}
                                    </Box>
                                

                                    <Box className="login-link">
                                        <Button variant="body2" onClick={() => {dispatch(signOut()); dispatch(setStatus()); navigate(`/logIn`);}}>
                                            כבר יש לך חשבון?
                                        </Button>
                                        
                                        <Button 
                                            color="primary" 
                                            onClick={() => {navigate(`/logIn`)
                                                dispatch(setStatus());
                                            }}
                                            className="login-button-link"
                                        >
                                            התחברות
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                            
                            {!isMobile && (
                                <Grid item md={6} className="logon-info-container">
                                    <Box className="logon-info">
                                        <Typography variant="h4" component="h2" className="info-title">
                                            הצטרפו אלינו
                                        </Typography>
                                        <Typography variant="body1" className="info-text">
                                            הרשמה למערכת תאפשר לכם להזמין טיסות, לעקוב אחר ההזמנות שלכם ולקבל הצעות מיוחדות.
                                        </Typography>
                                        <Box className="info-features">
                                            <Box className="feature">
                                                <Box className="feature-icon">✓</Box>
                                                <Typography variant="body1">הזמנת טיסות בקלות ובמהירות</Typography>
                                            </Box>
                                            <Box className="feature">
                                                <Box className="feature-icon">✓</Box>
                                                <Typography variant="body1">שמירת היסטוריית הזמנות</Typography>
                                            </Box>
                                            <Box className="feature">
                                                <Box className="feature-icon">✓</Box>
                                                <Typography variant="body1">קבלת עדכונים על מבצעים</Typography>
                                            </Box>
                                            <Box className="feature">
                                                <Box className="feature-icon">✓</Box>
                                                <Typography variant="body1">תמיכה אישית ומהירה</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                    </CardContent>
                </Card>
                
                <Snackbar 
                    open={snackbar.open} 
                    autoHideDuration={6000} 
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert 
                        onClose={handleSnackbarClose} 
                        severity={snackbar.severity}
                        variant="filled"
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Container>
        </dialog>
    );
};