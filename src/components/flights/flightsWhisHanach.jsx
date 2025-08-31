    import React, { useEffect, useState, useMemo } from "react";
    import { loct } from "../../redux/slices/user/userSlice";
    import { useDispatch, useSelector } from "react-redux";
    import { getAllFlightsWhisHanacahThunk } from "../../redux/slices/flight/getAllFlightsWhisHanacahThunk";
    import { useNavigate } from "react-router-dom";
    import './flightsWhisHanach.css';

    import {
      Box,
      Button,
      Card,
      CardContent,
      CardMedia,
      CardActions,
      Chip,
      Container,
      Grid,
      Typography,
      Rating,
      Skeleton,
      Divider,
      IconButton,
      Tooltip,
      useMediaQuery,
      useTheme,
      Paper,
      LinearProgress,
      Tabs,
      Tab,
      Fade,
      Zoom,
      Slider,
      FormControlLabel,
      Switch,
      Menu,
      MenuItem,
      Badge,
      CircularProgress
    } from '@mui/material';

    import {
      FlightTakeoff,
      FlightLand,
      AccessTime,
      EventSeat,
      LocalOffer,
      Favorite,
      FavoriteBorder,
      Share,
      FilterList,
      Sort,
      Search,
      TrendingUp,
      Public,
      CalendarMonth,
      ArrowDropDown,
      Star,
      StarBorder,
      Bookmark,
      BookmarkBorder,
      Notifications,
      NotificationsActive
    } from '@mui/icons-material';

    export const FlightsWhisHanach = () => {
        const theme = useTheme();
        const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
        const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    
        const dispatch = useDispatch();
        const flightsWhisHanachaArr = useSelector(state => state.flights.flightsWhisHanachaArr);
        const navigate = useNavigate();
        const [loading, setLoading] = useState(true);
        const [favorites, setFavorites] = useState([]);
        const [sortOption, setSortOption] = useState('discount'); 
    
        const [activeTab, setActiveTab] = useState(0);
        const [priceRange, setPriceRange] = useState([0, 10000]);
        const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
        const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);
        const [selectedDestinations, setSelectedDestinations] = useState([]);
        const [viewMode, setViewMode] = useState('grid'); 
        const [notifyDeals, setNotifyDeals] = useState(false);
    
        useEffect(() => {
            dispatch(loct(`/flightsWhisHanach`));
            dispatch(getAllFlightsWhisHanacahThunk())
                .then(() => setLoading(false))
                .catch(() => setLoading(false));
        }, [dispatch]);
    
        const toggleFavorite = (id) => {
            if (favorites.includes(id)) {
                setFavorites(favorites.filter(fav => fav !== id));
            } else {
                setFavorites([...favorites, id]);
            }
        };
    
        const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
            return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
        };
    
        const getSortedFlights = () => {
            if (!flightsWhisHanachaArr) return [];
        
            const flights = [...flightsWhisHanachaArr];
        
            switch (sortOption) {
                case 'discount':
                    return flights.sort((a, b) => {
                        const discountA = a.price - (a.price - a.hanacha);
                        const discountB = b.price - (b.price - b.hanacha);
                        return discountB - discountA;
                    });
                case 'price':
                    return flights.sort((a, b) => (a.price - a.hanacha) - (b.price - b.hanacha));
                case 'popularity':
                    return flights.sort((a, b) => b.sold - a.sold);
                default:
                    return flights;
            }
        };
    
        const getPopularityLevel = (sold, total) => {
            if (total - sold === 0) return 5;
            if (sold === 0) return 0;
            if (sold > 15) return 4;
            if (sold > 10) return 3;
            if (sold > 5) return 2;
            return 1;
        };
    
        const getClassIcon = (classType) => {
            switch(classType) {
                case 'תיירים':
                    return <EventSeat />;
                case 'עסקים':
                    return <EventSeat color="primary" />;
                case 'ראשונה':
                    return <EventSeat color="secondary" />;
                default:
                    return <EventSeat />;
            }
        };
    
        const formatDate = (dateString) => {
            try {
                const date = new Date(dateString);
                return new Intl.DateTimeFormat('he-IL', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }).format(date);
            } catch (e) {
                return dateString;
            }
        };
    
        const handleTabChange = (event, newValue) => {
            setActiveTab(newValue);
        };
    
        const handlePriceRangeChange = (event, newValue) => {
            setPriceRange(newValue);
        };
    
        const handleFilterMenuOpen = (event) => {
            setFilterMenuAnchor(event.currentTarget);
        };
    
        const handleFilterMenuClose = () => {
            setFilterMenuAnchor(null);
        };
    
        const toggleDestinationFilter = (destination) => {
            if (selectedDestinations.includes(destination)) {
                setSelectedDestinations(selectedDestinations.filter(d => d !== destination));
            } else {
                setSelectedDestinations([...selectedDestinations, destination]);
            }
        };
    
        const getFilteredFlights = () => {
            const sortedFlights = getSortedFlights();
        
            return sortedFlights.filter(flight => {
                const discountedPrice = flight.price - flight.hanacha;
                if (discountedPrice < priceRange[0] || discountedPrice > priceRange[1]) {
                    return false;
                }
            
                if (showOnlyAvailable && flight.sold === flight.numberOfSeats) {
                    return false;
                }
            
                if (selectedDestinations.length > 0 && 
                    !selectedDestinations.includes(flight.thisflight.flight.destinationNavigation.destination)) {
                    return false;
                }
            
                if (activeTab === 1 && !favorites.includes(flight.id)) {
                    return false;
                } else if (activeTab === 2 && calculateDiscountPercentage(flight.price, flight.price - flight.hanacha) < 30) { 
                }
            
                return true;
            });
        };
    
        const getUniqueDestinations = () => {
            if (!flightsWhisHanachaArr) return [];
        
            const destinations = flightsWhisHanachaArr.map(
                flight => flight.thisflight.flight.destinationNavigation.destination
            );
        
            return [...new Set(destinations)];
        };
    
        const filteredFlights = getFilteredFlights();
        const uniqueDestinations = getUniqueDestinations();
    
        const getMinMaxPrice = () => {
            if (!flightsWhisHanachaArr || flightsWhisHanachaArr.length === 0) {
                return [0, 10000];
            }
        
            const prices = flightsWhisHanachaArr.map(flight => flight.price - flight.hanacha);
            return [Math.min(...prices), Math.max(...prices)];
        };
    
        const [minPrice, maxPrice] = getMinMaxPrice();

        return (
            <Container className="deals-container" maxWidth={false} disableGutters={true}>
                <Paper 
                    elevation={0} 
                    className="deals-header"
                    sx={{
                        background: 'linear-gradient(135deg, #1976d2, #0d47a1)', 
                        color: 'white'
                    }}
                >
                    <Typography variant="h4" component="h1" className="deals-title">
                        מבצעי טיסות מיוחדים
                    </Typography>
                
                    <Typography variant="subtitle1" className="deals-subtitle">
                        הנחות בלעדיות על טיסות לכל העולם במחירים שלא תמצאו במקום אחר
                    </Typography>
                
                    <Button 
                        variant="contained" 
                        color="primary"
                        className="header-search-button"
                        startIcon={<Search />}
                        onClick={() => navigate('/find')}
                        sx={{ 
                            mt: 3, 
                            bgcolor: 'rgba(255,255,255,0.2)', 
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                            borderRadius: '30px',
                            padding: '12px 32px',
                            fontWeight: 600,
                            minWidth: '200px',
                            width: 'auto',
                            color: 'white' 
                        }}
                    >
                        חיפוש טיסות נוספות
                    </Button>
                </Paper>
            
                <Box className="deals-toolbar">
                    <Box className="sort-options">
                        <Typography variant="body2" className="sort-label">
                            מיון לפי:
                        </Typography>
                        <Button 
                            variant={sortOption === 'discount' ? "contained" : "outlined"}
                            size="medium"
                            onClick={() => setSortOption('discount')}
                            startIcon={<LocalOffer />}
                            className={`sort-button ${sortOption === 'discount' ? 'active' : ''}`}
                        >
                            הנחה
                        </Button>
                        <Button 
                            variant={sortOption === 'price' ? "contained" : "outlined"}
                            size="medium"
                            onClick={() => setSortOption('price')}
                            startIcon={<Sort />}
                            className={`sort-button ${sortOption === 'price' ? 'active' : ''}`}
                        >
                            מחיר
                        </Button>
                        <Button 
                            variant={sortOption === 'popularity' ? "contained" : "outlined"}
                            size="medium"
                            onClick={() => setSortOption('popularity')}
                            startIcon={<Favorite />}
                            className={`sort-button ${sortOption === 'popularity' ? 'active' : ''}`}
                        >
                            פופולריות
                        </Button>
                    </Box>
                
                    <Tooltip title="סינון מתקדם">
                        <IconButton 
                            className="filter-button"
                            onClick={handleFilterMenuOpen}
                        >
                            <FilterList />
                        </IconButton>
                    </Tooltip>
                
                    <Menu
                        anchorEl={filterMenuAnchor}
                        open={Boolean(filterMenuAnchor)}
                        onClose={handleFilterMenuClose}
                        className="filter-menu"
                        PaperProps={{
                            style: {
                                width: '320px',
                                padding: '24px',
                                maxHeight: '70vh',
                                borderRadius: '16px'
                            }
                        }}
                    >
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1976d2' }}>
                            סינון מתקדם
                        </Typography>
                        
                        <Typography variant="subtitle2" gutterBottom sx={{ mt: 2, fontWeight: 600, color: '#1976d2' }}>
                            טווח מחירים:
                        </Typography>
                        <Box sx={{ px: 2, pb: 2 }}>
                            <Slider
                                value={priceRange}
                                onChange={handlePriceRangeChange}
                                valueLabelDisplay="auto"
                                min={minPrice}
                                max={maxPrice}
                                sx={{ color: '#1976d2' }}
                                marks={[
                                    { value: minPrice, label: `₪${minPrice}` },
                                    { value: maxPrice, label: `₪${maxPrice}` }
                                ]}
                            />
                        </Box>
                        
                        <Divider sx={{ my: 3 }} />
                        
                        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: '#1976d2' }}>
                            יעדים:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                            {uniqueDestinations.map((destination) => (
                                <Chip
                                    key={destination}
                                    label={destination}
                                    onClick={() => toggleDestinationFilter(destination)}
                                    color={selectedDestinations.includes(destination) ? "primary" : "default"}
                                    variant={selectedDestinations.includes(destination) ? "filled" : "outlined"}
                                    sx={{ 
                                        m: 0.5, 
                                        bgcolor: selectedDestinations.includes(destination) ? '#1976d2' : 'transparent',
                                        borderColor: '#1976d2',
                                        color: selectedDestinations.includes(destination) ? 'white' : '#1976d2'
                                    }}
                                />
                            ))}
                        </Box>
                        
                        <Divider sx={{ my: 3 }} />
                        
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={showOnlyAvailable}
                                    onChange={(e) => setShowOnlyAvailable(e.target.checked)}
                                    color="primary"
                                    sx={{
                                        '& .MuiSwitch-switchBase.Mui-checked': {
                                            color: '#1976d2',
                                        },
                                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                            backgroundColor: '#1976d2',
                                        }
                                    }}
                                />
                            }
                            label={<Typography sx={{ color: '#1976d2' }}>הצג רק טיסות זמינות</Typography>}
                            sx={{ mb: 2 }}
                        />
                        
                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button 
                                variant="contained" 
                                onClick={handleFilterMenuClose}
                                sx={{ 
                                    borderRadius: '24px',
                                    padding: '8px 24px',
                                    bgcolor: '#1976d2', 
                                    '&:hover': {
                                        bgcolor: '#0d47a1',
                                    }
                                }}
                            >
                                החל סינון
                            </Button>
                        </Box>
                    </Menu>
                </Box>
            
                {loading ? (
                    <Box className="loading-container" sx={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center', 
                        justifyContent: 'center',
                        padding: '64px 0'
                    }}>
                        <CircularProgress 
                            size={60} 
                            thickness={4} 
                            sx={{ color: '#1976d2' }} 
                        />
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                mt: 3, 
                                color: '#1976d2',
                                fontWeight: 600 
                            }}
                        >
                            טוען מבצעי טיסות...
                        </Typography>
                    </Box>
                ) : (
                    <>
                        {filteredFlights.length === 0 ? (
                            <Box sx={{ 
                                textAlign: 'center', 
                                padding: '64px 24px',
                                backgroundColor: '#f5f9fc',
                                borderRadius: '16px',
                                marginTop: '24px'
                            }}>
                                <Typography variant="h5" sx={{ fontWeight: 700, color: '#0288d1', mb: 2 }}>
                                    אין מבצעים זמינוים לפי הסינון שבחרת
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 4, color: '#546e7a' }}>
                                    נסה לשנות את הגדרות הסינון או לחפש טיסות רגילות
                                </Typography>
                                <Box sx={{ mt: 4, display: 'flex', gap: 3, justifyContent: 'center' }}>
                                    <Button 
                                        variant="outlined" 
                                        color="primary"
                                        onClick={() => {
                                            setActiveTab(0);
                                            setPriceRange([minPrice, maxPrice]);
                                            setShowOnlyAvailable(false);
                                            setSelectedDestinations([]);
                                        }}
                                        sx={{ 
                                            borderRadius: '24px',
                                            padding: '10px 24px',
                                            borderColor: '#03a9f4',
                                            color: '#03a9f4'
                                        }}
                                    >
                                        נקה סינון
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        startIcon={<Search />}
                                        onClick={() => navigate('/find')}
                                        sx={{ 
                                            borderRadius: '24px',
                                            padding: '10px 24px',
                                            bgcolor: '#03a9f4'
                                        }}
                                    >
                                        חיפוש טיסות
                                    </Button>
                                </Box>
                            </Box>
                        ) : (
                            <Grid container spacing={4} className="deals-grid">
                                {filteredFlights.map((flight) => {
                                    const discountedPrice = flight.price - flight.hanacha;
                                    const discountPercentage = calculateDiscountPercentage(flight.price, discountedPrice);
                                    const popularityLevel = getPopularityLevel(flight.sold, flight.numberOfSeats);
                                    const isFavorite = favorites.includes(flight.id);
                                    
                                    return (
                                        <Grid item xs={12} sm={6} md={6} lg={4} key={flight.id}>
                                            <Card className="deal-card">
                                                <Box 
                                                    sx={{ 
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        backgroundColor: '#f5f9fc',
                                                        padding: '12px',
                                                        borderBottom: '1px solid #e0e0e0'
                                                    }}
                                                >
                                                    <Typography variant="body1" sx={{ mr: 1, fontWeight: 600, color: '#546e7a' }}>
                                                        פופולריות:
                                                    </Typography>
                                                    <Rating 
                                                        value={popularityLevel} 
                                                        readOnly 
                                                        size="medium"
                                                        icon={<Star fontSize="inherit" sx={{ color: '#ffc107' }} />}
                                                        emptyIcon={<StarBorder fontSize="inherit" />}
                                                    />
                                                </Box>
                                                
                                                <CardMedia
                                                    component="img"
                                                    height="220"
                                                    image={`/תמונות מדינות/${flight.thisflight.flight.destinationNavigation.path}.png`}
                                                    alt={flight.thisflight.flight.destinationNavigation.destination}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = '/תמונות מדינות/default.png';
                                                    }}
                                                    className="deal-image"
                                                />
                                                
                                                <CardContent className="deal-content">
                                                    <Typography variant="h5" component="h2" className="deal-route">
                                                        {flight.thisflight.flight.sourceNavigation.destination} - {flight.thisflight.flight.destinationNavigation.destination}
                                                    </Typography>
                                                    
                                                    <Box className="deal-details">
                                                        <Box className="deal-date-enhanced">
                                                            <CalendarMonth fontSize="small" className="detail-icon-enhanced" sx={{ color: '#1976d2' }} />
                                                            <Typography variant="body1">
                                                                {formatDate(flight.thisflight.date)}
                                                            </Typography>
                                                        </Box>
                                                        
                                                        <Box className="deal-time-enhanced">
                                                            <AccessTime fontSize="small" className="detail-icon-enhanced" sx={{ color: '#1976d2' }} />
                                                            <Typography variant="body1">
                                                                {flight.thisflight.time}
                                                            </Typography>
                                                        </Box>
                                                        
                                                        <Box className="deal-class-enhanced">
                                                            {React.cloneElement(getClassIcon(flight.class.description), { sx: { color: '#1976d2' } })}
                                                            <Typography variant="body1">
                                                                {flight.class.description}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                    
                                                    <Divider className="deal-divider" />
                                                    
                                                    <Box className="deal-price">
                                                        <Box>
                                                            <Typography variant="h4" component="p" className="discounted-price">
                                                                ₪{discountedPrice}
                                                            </Typography>
                                                            <Typography variant="body1" className="original-price">
                                                                במקום ₪{flight.price}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                    <Box className="seats-availability">
                                                        <Typography variant="body2" sx={{ color: flight.numberOfSeats - flight.sold < 5 ? '#d32f2f' : '#546e7a' }}>
                                                            {flight.numberOfSeats - flight.sold} מקומות נותרו
                                                        </Typography>
                                                        <LinearProgress 
                                                            variant="determinate" 
                                                            value={(flight.sold / flight.numberOfSeats) * 100}
                                                            className="seats-progress"
                                                            color={flight.numberOfSeats - flight.sold < 5 ? "error" : "primary"}
                                                        />
                                                    </Box>
                                                </CardContent>
                                        
                                                <CardActions className="deal-actions">
                                                    <Button 
                                                        variant="contained" 
                                                        onClick={() => navigate(`/flightDetail/${flight.class.description}/${flight.thisflightId}/${1}`)}
                                                        className="view-button-enhanced"
                                                        fullWidth
                                                        size="large"
                                                        disabled={flight.sold === flight.numberOfSeats}
                                                        sx={{
                                                            backgroundColor: '#1976d2 !important',
                                                            color: 'white !important',
                                                            '&:hover': {
                                                                backgroundColor: '#0d47a1 !important', 
                                                            },
                                                            borderRadius: '30px',
                                                            padding: '12px 24px',
                                                            fontWeight: 600,
                                                            textTransform: 'none',
                                                            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.25)',
                                                            minWidth: '180px',
                                                            width: '100%'
                                                        }}
                                                    >
                                                        {flight.sold === flight.numberOfSeats ? "אזל מהמלאי" : "לצפייה והזמנה"}
                                                    </Button>
                                                </CardActions>
                                                
                                                {flight.sold === flight.numberOfSeats && (
                                                    <Box className="sold-out-badge">
                                                        <Typography variant="body1" className="sold-out-text">
                                                            אזל מהמלאי
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Card>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        )}
                    </>
                )}
            </Container>
        );
    };