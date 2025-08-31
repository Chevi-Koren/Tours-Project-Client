import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logInUserThunk } from "../../redux/slices/user/logInUserThunk";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../redux/slices/user/userSlice";
import { signOut } from "../../redux/slices/user/userSlice";
import './logIn.css';

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
  useTheme
} from '@mui/material';

import {
  Visibility,
  VisibilityOff,
  Close as CloseIcon,
  Person as PersonIcon,
  Lock as LockIcon,
  Email as EmailIcon,
  Facebook as FacebookIcon,
  Google as GoogleIcon
} from '@mui/icons-material';

export const LogIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const user = useSelector(state => state.users.userWithoutOutId);
    const userName = useSelector(state => state.users.user);
    const status = useSelector(state => state.users.status);
    const statusUser = useSelector(state => state.users.statusUser);
    const loction = useSelector(state => state.users.loction);
    
    const [thisUser, setUser] = useState(user || { firstName: '', lastName: '', password: '', email: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
    const [rememberMe, setRememberMe] = useState(false);
    
    const validateForm = () => {
        const newErrors = {};
        
        if (!thisUser.firstName.trim()) {
            newErrors.firstName = 'חובה להזין שם משתמש';
        }
        
        if (!thisUser.lastName.trim()) {
            newErrors.lastName = 'חובה להזין שם משפחה';
        }
        
        if (!thisUser.password) {
            newErrors.password = 'חובה להזין סיסמא';
        } else if (thisUser.password.length < 6) {
            newErrors.password = 'הסיסמא חייבת להכיל לפחות 6 תווים';
        }
        
     
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleLogin = async () => {
        if (validateForm()) {
            setLoading(true);
            
            try {
                dispatch(logIn(thisUser));
                await dispatch(logInUserThunk({ 
                    name: thisUser.firstName, 
                    lastName: thisUser.lastName, 
                    pass: thisUser.password 
                }));
                
                if (rememberMe) {
                    localStorage.setItem('rememberedUser', JSON.stringify({
                        firstName: thisUser.firstName,
                        lastName: thisUser.lastName
                    }));
                } else {
                    localStorage.removeItem('rememberedUser');
                }
                
            } catch (error) {
                setSnackbar({
                    open: true,
                    message: 'התחברות נכשלה. אנא בדוק את פרטי ההתחברות שלך.',
                    severity: 'error'
                });
            } finally {
                setLoading(false);
            }
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
    
    useEffect(() => {
        const rememberedUser = localStorage.getItem('rememberedUser');
        if (rememberedUser) {
            const parsedUser = JSON.parse(rememberedUser);
            setUser(prev => ({ 
                ...prev, 
                firstName: parsedUser.firstName || '', 
                lastName: parsedUser.lastName || '' 
            }));
            setRememberMe(true);
        }
    }, []);
    
    useEffect(() => {
        console.log(status);
        if (status) {
            navigate(`/logOn`);
        }
    }, [status, navigate]);
    
    useEffect(() => {
        if (userName !== null) {
            navigate(loction);
        }
    }, [statusUser, userName, navigate, loction]);

    return (
        <Container component="main" maxWidth="md" className="login-container">
            <Card className="login-card">
                <CardContent className="login-card-content">
                    <Grid container>
                        <Grid item xs={12} md={6} className="login-form-container">
                            <Box className="login-form">
                                <Box className="login-header">
                                    <Typography variant="h4" component="h1" className="login-title">
                                        התחברות
                                    </Typography>
                                    <IconButton 
                                        aria-label="close" 
                                        className="close-button"
                                        onClick={() => {dispatch(signOut());navigate(loction)}}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                                
                                <Typography variant="body2" color="textSecondary" className="login-subtitle">
                                    ברוכים הבאים! אנא הזינו את פרטי ההתחברות שלכם
                                </Typography>
                                
                                <Box className="form-fields">
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
                                </Box>
                                
                                <Box className="form-options">
                                    <Box className="remember-me">
                                        <input 
                                            type="checkbox" 
                                            id="rememberMe" 
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />
                                        <label htmlFor="rememberMe">זכור אותי</label>
                                    </Box>
                                    <Typography 
                                        variant="body2" 
                                        color="primary" 
                                        className="forgot-password"
                                        onClick={() => setSnackbar({
                                            open: true,
                                            message: 'שחזור סיסמה יתאפשר בקרוב',
                                            severity: 'info'
                                        })}
                                    >
                                        שכחתי סיסמא
                                    </Typography>
                                </Box>
                                
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={handleLogin}
                                    disabled={loading}
                                    className="login-button"
                                >
                                    {loading ? <CircularProgress size={24} /> : 'התחברות'}
                                </Button>
                                
                                <Box className="register-link">
                                    <Typography variant="body2">
                                        אין לך חשבון עדיין?
                                    </Typography>
                                    <Button 
                                        color="primary" 
                                        onClick={() => navigate(`/logOn`)}
                                        className="register-button"
                                    >
                                        הרשמה
                                    </Button>
                                </Box>
                                
                                <Divider className="divider">
                                    <Typography variant="body2" color="textSecondary">
                                        או התחבר באמצעות
                                    </Typography>
                                </Divider>
                                
                                <Box className="social-login">
                                    <Button
                                        variant="outlined"
                                        startIcon={<GoogleIcon />}
                                        onClick={() => setSnackbar({
                                            open: true,
                                            message: 'התחברות באמצעות Google תתאפשר בקרוב',
                                            severity: 'info'
                                        })}
                                        className="social-button google"
                                    >
                                        Google
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<FacebookIcon />}
                                        onClick={() => setSnackbar({
                                            open: true,
                                            message: 'התחברות באמצעות Facebook תתאפשר בקרוב',
                                            severity: 'info'
                                        })}
                                        className="social-button facebook"
                                    >
                                        Facebook
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                        
                        {!isMobile && (
                            <Grid item md={6} className="login-info-container">
                                <Box className="login-info">
                                    <Typography variant="h4" component="h2" className="info-title">
                                        ברוכים הבאים למערכת הזמנת הטיסות
                                    </Typography>
                                    <Typography variant="body1" className="info-text">
                                        התחברו כדי להזמין טיסות, לצפות בהיסטוריית ההזמנות שלכם ולקבל הצעות מיוחדות.
                                    </Typography>
                                    <Box className="info-features">
                                        <Box className="feature">
                                            <Box className="feature-icon">✓</Box>
                                            <Typography variant="body1">הזמנת טיסות בקלות ובמהירות</Typography>
                                        </Box>
                                        <Box className="feature">
                                            <Box className="feature-icon">✓</Box>
                                            <Typography variant="body1">מעקב אחר ההזמנות שלך</Typography>
                                        </Box>
                                        <Box className="feature">
                                            <Box className="feature-icon">✓</Box>
                                            <Typography variant="body1">מבצעים והנחות בלעדיות</Typography>
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
    );
};