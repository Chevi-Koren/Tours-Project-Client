import { Outlet, useNavigate } from "react-router-dom";
import { Routing } from "../routing/routing";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loct, setUserId, signOut } from "../../redux/slices/user/userSlice";
import { getAllFlightThunk } from "../../redux/slices/flight/getAllFlightThunk";
import { getAllDestinationThunk } from "../../redux/slices/flight/getAllDestinationThunk";
import './home.css';

// MUI imports
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  Divider,
  useMediaQuery,
  useTheme,
  Fade,
  Paper,
  Backdrop,
  Tooltip
} from "@mui/material";

// MUI icons
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import FlightIcon from '@mui/icons-material/Flight';
import PublicIcon from '@mui/icons-material/Public';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import BookIcon from '@mui/icons-material/Book';
import CloseIcon from '@mui/icons-material/Close';

export const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const cartItems = useSelector(state => state.flights.orders || []);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    // State for mobile drawer
    const [drawerOpen, setDrawerOpen] = useState(false);
    
    // State for user menu
    const [userMenuAnchor, setUserMenuAnchor] = useState(null);
    
    useEffect(() => {
        dispatch(loct("/about"));
    }, [dispatch]);
    
    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };
    
    const handleUserMenuOpen = (event) => {
        setUserMenuAnchor(event.currentTarget);
    };
    
    const handleUserMenuClose = () => {
        setUserMenuAnchor(null);
    };
    
    const handleLogout = () => {
        handleUserMenuClose();
        dispatch(signOut());
    };
    
    // Drawer content for mobile
    const drawerContent = (
        <Box className="drawer-content">
            <Box className="drawer-header">
                <Box className="drawer-logo-container">
                    <Box className="drawer-logo-inner">
                        <PublicIcon className="drawer-logo-globe" />
                    </Box>
                </Box>
                <Box className="drawer-title-container">
                    <Typography variant="h6" className="drawer-title">גלובוס</Typography>
                    <Typography variant="caption" className="drawer-subtitle">לטוס באמת עם הלב</Typography>
                </Box>
                <IconButton onClick={handleDrawerToggle} className="drawer-close">
                    <CloseIcon />
                </IconButton>
            </Box>
            
            <Box className="drawer-user-section">
                {user ? (
                    <Box className="drawer-user-info">
                        <Avatar className="drawer-user-avatar">
                            {user.firstName.charAt(0)}
                        </Avatar>
                        <Box>
                            <Typography variant="subtitle1" className="drawer-user-name">
                                {user.firstName} {user.lastName}
                            </Typography>
                            <Typography variant="body2" className="drawer-user-email">
                                {user.email}
                            </Typography>
                        </Box>
                    </Box>
                ) : (
                    <Button 
                        variant="contained" 
                        fullWidth
                        startIcon={<PersonIcon />}
                        onClick={() => { navigate('/logIn'); setDrawerOpen(false); }}
                        className="drawer-login-button"
                    >
                        התחברות / הרשמה
                    </Button>
                )}
            </Box>
            
            <Divider className="drawer-divider" />
            
            <List className="drawer-nav-list">
                <ListItem button onClick={() => { navigate('/chooseClass'); setDrawerOpen(false); }} className="drawer-nav-item">
                    <ListItemIcon><FlightIcon className="drawer-nav-icon" /></ListItemIcon>
                    <ListItemText primary="טיסות" className="drawer-nav-text" />
                </ListItem>
                
                <ListItem button onClick={() => { navigate('/flightsWhisHanach'); setDrawerOpen(false); }} className="drawer-nav-item">
                    <ListItemIcon><LocalOfferIcon className="drawer-nav-icon" /></ListItemIcon>
                    <ListItemText primary="מבצעים" className="drawer-nav-text" />
                </ListItem>
                
                <ListItem button onClick={() => { navigate('/find'); setDrawerOpen(false); }} className="drawer-nav-item">
                    <ListItemIcon><SearchIcon className="drawer-nav-icon" /></ListItemIcon>
                    <ListItemText primary="חיפוש טיסה" className="drawer-nav-text" />
                </ListItem>
            </List>
            
            <Divider className="drawer-divider" />
            
            {user && (
                <List className="drawer-nav-list">
                    <ListItem button onClick={() => { navigate('/orderDetail'); setDrawerOpen(false); }} className="drawer-nav-item">
                        <ListItemIcon><BookIcon className="drawer-nav-icon" /></ListItemIcon>
                        <ListItemText primary="ההזמנות שלי" className="drawer-nav-text" />
                    </ListItem>
                    
                    {user.isManager === 1 && (
                        <ListItem button onClick={() => { navigate('/handle'); setDrawerOpen(false); }} className="drawer-nav-item">
                            <ListItemIcon><ManageAccountsIcon className="drawer-nav-icon" /></ListItemIcon>
                            <ListItemText primary="ניהול" className="drawer-nav-text" />
                        </ListItem>
                    )}
                    
                    <ListItem button onClick={() => { handleLogout(); setDrawerOpen(false); }} className="drawer-nav-item logout-item">
                        <ListItemIcon><LogoutIcon className="drawer-nav-icon" /></ListItemIcon>
                        <ListItemText primary="התנתק" className="drawer-nav-text" />
                    </ListItem>
                </List>
            )}
            
            <Box className="drawer-footer">
                <Typography variant="body2" className="drawer-footer-text">
                    © {new Date().getFullYear()} גלובוס - לטוס באמת עם הלב
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Box className="app-container">
            <AppBar position="fixed" className="app-bar" elevation={0}>
                <Toolbar className="toolbar">
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className="menu-button"
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    
                    <Tooltip title="גלובוס - לטוס באמת עם הלב" arrow>
                        <Box 
                            className="logo-container"
                            onClick={() => navigate('/about')}
                        >
                            <Box className="logo-icon-container">
                                <Box className="logo-icon-inner">
                                    <PublicIcon className="logo-globe" />
                                </Box>
                            </Box>
                            <Box className="logo-text">
                                <Typography variant="h6" className="app-title">
                                    גלובוס
                                </Typography>
                                <Typography variant="caption" className="app-subtitle">
                                    לטוס באמת עם הלב
                                </Typography>
                            </Box>
                        </Box>
                    </Tooltip>
                    
                    {!isMobile && (
                        <Box className="nav-buttons">
                            <Button
                                className="nav-button"
                                onClick={() => navigate('/chooseClass')}
                            >
                                טיסות
                            </Button>
                            
                            <Button
                                className="nav-button"
                                onClick={() => navigate('/flightsWhisHanach')}
                            >
                                מבצעים
                            </Button>
                            
                            <Button
                                className="nav-button"
                                onClick={() => navigate('/find')}
                            >
                                חיפוש טיסה
                            </Button>
                        </Box>
                    )}
                    
                    <Box className="toolbar-actions">
                        <IconButton
                            className="action-button cart-button"
                            onClick={() => navigate('/cart')}
                        >
                            <Badge badgeContent={cartItems.length} color="error" className="cart-badge">
                                <ShoppingCartIcon className="action-icon" />
                            </Badge>
                        </IconButton>
                        
                        {user ? (
                            <>
                                <Box 
                                    className="user-profile"
                                    onClick={handleUserMenuOpen}
                                >
                                    <Avatar className="user-avatar">
                                        {user.firstName.charAt(0)}
                                    </Avatar>
                                    {!isMobile && (
                                        <Typography variant="body2" className="user-name">
                                            {user.firstName}
                                        </Typography>
                                    )}
                                </Box>
                                
                                <Menu
                                    anchorEl={userMenuAnchor}
                                    open={Boolean(userMenuAnchor)}
                                    onClose={handleUserMenuClose}
                                    className="user-menu"
                                    TransitionComponent={Fade}
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{
                                        timeout: 500,
                                    }}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                >
                                    <Paper className="user-menu-paper" elevation={0}>
                                        <Box className="user-menu-header">
                                            <Avatar className="user-menu-avatar">
                                                {user.firstName.charAt(0)}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="subtitle1" className="user-menu-name">
                                                    {user.firstName} {user.lastName}
                                                </Typography>
                                                <Typography variant="body2" className="user-menu-email">
                                                    {user.email}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        
                                        <Box className="user-menu-content">
                                            <MenuItem onClick={() => { dispatch(setUserId(user.id)); navigate('/orderDetail'); handleUserMenuClose(); }} className="menu-item">
                                                <ListItemIcon>
                                                    <BookIcon className="menu-icon" />
                                                </ListItemIcon>
                                                <ListItemText primary="ההזמנות שלי" />
                                            </MenuItem>
                                        
                                            {user.isManager === 1 && (
                                                <MenuItem onClick={() => { navigate('/handle'); handleUserMenuClose(); }} className="menu-item">
                                                    <ListItemIcon>
                                                        <ManageAccountsIcon className="menu-icon" />
                                                    </ListItemIcon>
                                                    <ListItemText primary="ניהול מערכת" />
                                                </MenuItem>
                                            )}
                                        </Box>
                                        
                                        <Box className="user-menu-footer">
                                            <Button 
                                                variant="outlined" 
                                                fullWidth
                                                startIcon={<LogoutIcon />}
                                                onClick={handleLogout}
                                                className="logout-button"
                                            >
                                                התנתק
                                            </Button>
                                        </Box>
                                    </Paper>
                                </Menu>
                            </>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={() => navigate('/logIn')}
                                className="login-button"
                                disableElevation
                            >
                                התחברות
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            
            <Box className="toolbar-spacer" />
            
            <Drawer
                variant="temporary"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                className="mobile-drawer"
                PaperProps={{
                    className: "drawer-paper"
                }}
            >
                {drawerContent}
            </Drawer>
            
            {/* Main content */}
            <Container className="main-content">
                <Routing />
                <Outlet />
            </Container>
            
            {/* Footer */}
            <Box component="footer" className="footer">
                <Container>
                    <Box className="footer-content">
                        <Box className="footer-brand-section">
                            <Box className="footer-logo">
                                <Box className="footer-logo-icon-container">
                                    <Box className="footer-logo-icon-inner">
                                        <PublicIcon className="footer-logo-globe" />
                                        <FavoriteIcon className="footer-logo-heart" />
                                    </Box>
                                </Box>
                                <Box className="footer-brand-text">
                                    <Typography variant="h5" className="footer-brand-name">
                                        גלובוס
                                    </Typography>
                                    <Typography variant="body2" className="footer-brand-slogan">
                                        לטוס באמת עם הלב
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography variant="body2" className="footer-description">
                                אנו מאמינים שטיסה היא הרבה מעבר להגעה ממקום למקום – זו חוויה שמתחילה ברגע ההזמנה, ונמשכת הרבה אחרי הנחיתה. אנחנו כאן כדי להפוך את החלום שלך למציאות, לדאוג לכל פרט, ולהעניק לך שקט נפשי ושירות מכל הלב. הלב שלנו איתך – בכל שלב בדרך.
                            </Typography>
                        </Box>
                        
                        <Box className="footer-links-section">
                            <Typography variant="h6" className="footer-title">
                                ניווט מהיר
                            </Typography>
                            <Divider className="footer-section-divider" style={{height: 3, margin: '8px 0 16px 0' }} />
                            <Box className="footer-links" style={{ marginTop: 8 }}>
                                <Typography variant="body2" className="footer-link" onClick={() => navigate('/about')}>
                                    דף הבית
                                </Typography>
                                <Typography variant="body2" className="footer-link" onClick={() => navigate('/chooseClass')}>
                                    טיסות
                                </Typography>
                                <Typography variant="body2" className="footer-link" onClick={() => navigate('/flightsWhisHanach')}>
                                    מבצעים
                                </Typography>
                                <Typography variant="body2" className="footer-link" onClick={() => navigate('/find')}>
                                    חיפוש טיסה
                                </Typography>
                            </Box>
                        </Box>

                        <Box className="footer-contact-section">
                            <Typography variant="h6" className="footer-title">
                                צור קשר
                            </Typography>
                            <Divider className="footer-section-divider" style={{height: 3, margin: '8px 0 16px 0' }} />
                            <Box className="footer-contact-info" style={{ marginTop: 8 }}>
                                <Typography variant="body2" className="footer-contact-item">
                                    טלפון: 03-1234567
                                </Typography>
                                <Typography variant="body2" className="footer-contact-item">
                                    דוא"ל: info@globus.co.il
                                </Typography>
                                <Typography variant="body2" className="footer-contact-item">
                                    כתובת: רחוב הטיסות 123, תל אביב
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    
                    <Divider className="footer-divider" />
                    
                    <Box className="footer-bottom">
                        <Typography variant="body2" className="copyright">
                            © {new Date().getFullYear()} גלובוס - לטוס באמת עם הלב | כל הזכויות שמורות
                        </Typography>
                        <Box className="social-icons">
                            <Box className="social-icon"></Box>
                            <Box className="social-icon"></Box>
                            <Box className="social-icon"></Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};