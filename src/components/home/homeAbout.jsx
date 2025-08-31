import React, { useEffect, useState, useRef } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Button,
  useMediaQuery,
  useTheme,
  Paper,
  Divider,
  Avatar,
  IconButton,
  Fade,
  Zoom,
  Rating,
  Chip,
  Stack
} from '@mui/material';

import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StarIcon from '@mui/icons-material/Star';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ExploreIcon from '@mui/icons-material/Explore';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MuseumIcon from '@mui/icons-material/Museum';
import CodeIcon from '@mui/icons-material/Code';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

import './HomeAbout.css';
import { useNavigate } from 'react-router-dom';


const placeholderImage = (name, color) => {
  const letter = name.charAt(0);
  const svg = `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}" />
      <text x="50%" y="50%" dy=".3em" font-size="80" text-anchor="middle" fill="white" font-family="Arial, sans-serif">${letter}</text>
    </svg>
  `;
  
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};






export const HomeAbout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const destinationsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const statsRef = useRef(null);
  const partnersRef = useRef(null);
  
  const [aboutVisible, setAboutVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [destinationsVisible, setDestinationsVisible] = useState(false);
  const [testimonialsVisible, setTestimonialsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [partnersVisible, setPartnersVisible] = useState(false);
  
  const [currentDestination, setCurrentDestination] = useState(0);
  
  const destinations = [
    {
      city: "פריז",
      country: "צרפת",
      image: "/תמונות מדינות/צרפת.png",
      description: "עיר האורות, הרומנטיקה והאמנות",
      price: "החל מ-499€",
      rating: 4.8,
      tags: ["רומנטי", "תרבות", "אוכל"],
      color: "#3f51b5"
    },
    {
      city: "טוקיו",
      country: "יפן",
      image:"/תמונות מדינות/סין.png",
      description: "שילוב מושלם של מסורת וטכנולוגיה",
      price: "החל מ-799€",
      rating: 4.9,
      tags: ["אסיה", "טכנולוגיה", "תרבות"],
      color: "#e91e63"
    },
    {
      city: "ניו יורק",
      country: "ארה״ב",
      image: "/תמונות מדינות/ארצות הברית.png",
      description: "העיר שאף פעם לא ישנה",
      price: "החל מ-599€",
      rating: 4.7,
      tags: ["קניות", "אורבני", "תרבות"],
      color: "#ff9800"
    },

    {
      city: "רומא",
      country: "איטליה",
      image: "/תמונות מדינות/איטליה.png",
      description: "עיר נצחית עם היסטוריה עשירה",
      price: "החל מ-399€",
      rating: 4.7,
      tags: ["היסטוריה", "אוכל", "אמנות"],
      color: "#4caf50"
    },
    {
      city: "אתונה",
      country: "יוון",
      image: "/תמונות מדינות/יון.png",
      description: "ערש התרבות המערבית עם היסטוריה עשירה ונופים מרהיבים",
      price: "החל מ-379€",
      rating: 4.6,
      tags: ["היסטוריה", "איים", "ים"],
      color: "#2196f3"
    },
    {
      city: "תל אביב",
      country: "ישראל",
      image: "/תמונות מדינות/ישראל.png",
      description: "עיר ללא הפסקה עם חופים מדהימים ותרבות תוססת",
      price: "החל מ-299€",
      rating: 4.7,
      tags: ["חופים", "קולינריה", "מורשת"],
      color: "#9c27b0"
    },
    {
      city: "קהיר",
      country: "מצרים",
      image: "/תמונות מדינות/מצרים.png",
      description: "בירת מצרים העתיקה, בית לפירמידות ולאוצרות היסטוריים",
      price: "החל מ-329€",
      rating: 4.5,
      tags: ["היסטוריה", "פירמידות", "תרבות עתיקה"],
      color: "#ff5722"
    },
    {
      city: "ציריך",
      country: "שוויץ",
      image: "/תמונות מדינות/שוויץ.png",
      description: "שילוב מושלם של נופי אלפים, אגמים ותרבות אירופאית",
      price: "החל מ-449€",
      rating: 4.8,
      tags: ["הרים", "טבע", "שוקולד"],
      color: "#795548"
    },
    {
      city: "תחנת המחקר",
      country: "אנטארקטיקה",
      image: "/תמונות מדינות/אנטרטיקה.png",
      description: "חוויה ייחודית ביבשת הקפואה, פינגווינים ונופי קרח מרהיבים",
      price: "החל מ-4999€",
      rating: 4.9,
      tags: ["הרפתקה", "טבע פראי", "קרח"],
      color: "#607d8b"
    },
    {
      city: "וינה",
      country: "אוסטריה",
      image: "/תמונות מדינות/אוסטריה.png",
      description: "עיר המוזיקה הקלאסית, ארמונות מפוארים ותרבות קפה עשירה",
      price: "החל מ-389€",
      rating: 4.7,
      tags: ["מוזיקה", "ארכיטקטורה", "תרבות"],
      color: "#e53935"
    },
    {
      city: "לונדון",
      country: "אנגליה",
      image: "/תמונות מדינות/אנגליה.png",
      description: "בירה קוסמופוליטית עם היסטוריה עשירה, מוזיאונים ותרבות תוססת",
      price: "החל מ-359€",
      rating: 4.6,
      tags: ["היסטוריה", "תרבות", "קניות"],
      color: "#1e88e5"
    },
    {
      city: "אמסטרדם",
      country: "הולנד",
      image: "/תמונות מדינות/הולנד.png",
      description: "עיר התעלות, האופניים והמוזיאונים המפורסמים בעולם",
      price: "החל מ-329€",
      rating: 4.7,
      tags: ["תעלות", "אופניים", "אמנות"],
      color: "#fb8c00"
    },
    {
      city: "ונציה",
      country: "איטליה",
      image: "/תמונות מדינות/וינציה.png",
      description: "עיר התעלות הרומנטית, גונדולות ואדריכלות איטלקית מרהיבה",
      price: "החל מ-369€",
      rating: 4.8,
      tags: ["רומנטיקה", "תעלות", "אדריכלות"],
      color: "#26a69a"
    }
  ];
  
  const features = [
    {
      icon: <FlightTakeoffIcon fontSize="large" />,
      title: "יעדים גלובליים",
      description: "גישה ליותר מ-500 חברות תעופה ו-10,000+ יעדים ברחבי העולם. מצא את הטיסה המושלמת להרפתקה הבאה שלך.",
      color: "#3f51b5"
    },
    {
      icon: <LocalOfferIcon fontSize="large" />,
      title: "הבטחת המחיר הטוב ביותר",
      description: "אנו מבטיחים את התעריפים הטובים ביותר. מצאת מחיר טוב יותר במקום אחר? נשווה אותו וניתן לך הנחה נוספת.",
      color: "#e91e63"
    },
    {
      icon: <SupportAgentIcon fontSize="large" />,
      title: "תמיכה 24/7",
      description: "צוות התמיכה המסור שלנו זמין סביב השעון כדי לסייע בכל שאלה או בעיה הקשורה להזמנה שלך.",
      color: "#ff9800"
    },
    {
      icon: <SecurityIcon fontSize="large" />,
      title: "הזמנה מאובטחת",
      description: "המידע האישי ופרטי התשלום שלך מוגנים באמצעות טכנולוגיית הצפנה מתקדמת.",
      color: "#4caf50"
    }
  ];
  
  const testimonials = [
    {
      name: "שרה כהן",
      location: "תל אביב",
      avatar: "/images/avatars/avatar1.jpg",
      text: "תהליך ההזמנה היה חלק להפליא. מצאתי עסקה נהדרת על הטיסה שלי לברצלונה ושירות הלקוחות היה יוצא מן הכלל כשהייתי צריכה לשנות את ההזמנה שלי.",
      rating: 5,
      color: "#3f51b5"
    },
    {
      name: "מיכאל לוי",
      location: "חיפה",
      avatar: "/images/avatars/avatar2.jpg",
      text: "אני משתמש בשירות הזה לכל נסיעות העסקים שלי בשנה האחרונה. הממשק אינטואיטיבי, המחירים תחרותיים, ואני אוהב את התראות הדוא\"ל על ירידות מחירים.",
      rating: 4.5,
      color: "#e91e63"
    },
    {
      name: "עדי פרץ",
      location: "ירושלים",
      avatar: "/images/avatars/avatar3.jpg",
      text: "מציאת טיסות לחופשת המשפחה שלנו הייתה קלה מאוד. המסננים עזרו לי למצוא את זמני הטיסה המושלמים ותכונת השוואת המחירים חסכה לנו הרבה כסף!",
      rating: 5,
      color: "#ff9800"
    }
  ];

  const aboutContent = {
    title: "אודות חברת התיירות שלנו",
    subtitle: "גלובוס - מובילים את עולם התיירות מאז 2010",
    description: "חברת התיירות שלנו נוסדה מתוך אהבה לטיולים וחקר העולם. אנו מאמינים שכל אחד צריך לחוות את הפלא של גילוי מקומות חדשים, תרבויות מרתקות וליצור זיכרונות שיישארו לכל החיים. המשימה שלנו היא להפוך את החלום של טיול מושלם למציאות עבור כל לקוח.",
    points: [
      "יותר מ-12 שנות ניסיון בענף התיירות",
      "צוות מומחים עם ידע נרחב על יעדים ברחבי העולם",
      "שירות אישי ומותאם לצרכים הייחודיים של כל לקוח",
      "מחויבות לאיכות, אמינות ושקיפות מלאה"
    ],
    image: "/images/about/company.jpg"
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.target === aboutRef.current && entry.isIntersecting) {
          setAboutVisible(true);
        } else if (entry.target === featuresRef.current && entry.isIntersecting) {
          setFeaturesVisible(true);
        } else if (entry.target === destinationsRef.current && entry.isIntersecting) {
          setDestinationsVisible(true);
        } else if (entry.target === testimonialsRef.current && entry.isIntersecting) {
          setTestimonialsVisible(true);
        } else if (entry.target === statsRef.current && entry.isIntersecting) {
          setStatsVisible(true);
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    if (aboutRef.current) observer.observe(aboutRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (destinationsRef.current) observer.observe(destinationsRef.current);
    if (testimonialsRef.current) observer.observe(testimonialsRef.current);
    if (statsRef.current) observer.observe(statsRef.current);
    
    return () => {
      if (aboutRef.current) observer.unobserve(aboutRef.current);
      if (featuresRef.current) observer.unobserve(featuresRef.current);
      if (destinationsRef.current) observer.unobserve(destinationsRef.current);
      if (testimonialsRef.current) observer.unobserve(testimonialsRef.current);
      if (statsRef.current) observer.unobserve(statsRef.current);
    };
  }, []);
  

  const nextDestination = () => {
    setCurrentDestination((prev) => 
      prev === destinations.length - (isTablet ? 1 : isLargeScreen ? 4 : 3) ? 0 : prev + 1
    );
  };
  
  const prevDestination = () => {
    setCurrentDestination((prev) => 
      prev === 0 ? destinations.length - (isTablet ? 1 : isLargeScreen ? 4 : 3) : prev - 1
    );
  };
  

  const visibleDestinations = isTablet 
    ? destinations.slice(currentDestination, currentDestination + 1)
    : isLargeScreen
      ? destinations.slice(currentDestination, currentDestination + 4)
      : destinations.slice(currentDestination, currentDestination + 3);


const navigate = useNavigate();

  return (
    <Box className="home-about-container">
      <Box className="hero-section">
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center" className="hero-grid">
            <Grid item xs={12} md={6} className="hero-content">
              <Fade in={true} timeout={1000}>
                <Box>
                  <Typography 
                    variant={isMobile ? "h3" : "h1"} 
                    component="h1" 
                    className="hero-title"
                    gutterBottom
                  >
                    <span className="text-gradient">המסע שלך</span> מתחיל עם גלובוס
                  </Typography>
                  
                  <Typography 
                    variant="h6" 
                    className="hero-subtitle"
                    sx={{ mb: 4 }}
                  >
                    גלה את העולם עם חווית הזמנת טיסות חלקה. 
                    מחירים משתלמים, אפשרויות גמישות ושירות יוצא מן הכלל.
                  </Typography>
                  
                  <Button 
                  size="large" 
                  variant="contained" 
                  className="cta-button"
                  onClick={() => navigate('/find')}
                  endIcon={<FlightTakeoffIcon />}
                >
                  חפש טיסות 
                </Button>
                </Box>
              </Fade>
            </Grid>
            
            <Grid item xs={12} md={6} >
              <Zoom in={true} timeout={1000}>
                <Box className="hero-image-wrapper">
                  <Box className="floating-card-container">
                    <Paper elevation={6} className="floating-card">
                      <Box className="floating-card-content">
                        <Box className="floating-card-icon">
                          <VerifiedUserIcon />
                        </Box>
                        <Box>
                          <Typography variant="body2" className="floating-card-title">
                            הבטחת מחיר
                          </Typography>
                          <Typography variant="caption" className="floating-card-subtitle">
                            המחירים הטובים ביותר מובטחים
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                    
                    <Paper elevation={6} className="floating-card">
                      <Box className="floating-card-content">
                        <Box className="floating-card-icon secondary">
                          <SupportAgentIcon />
                        </Box>
                        <Box>
                          <Typography variant="body2" className="floating-card-title">
                            תמיכה 24/7
                          </Typography>
                          <Typography variant="caption" className="floating-card-subtitle">
                            זמינו תמיד לעזור לך
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
                </Box>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box className="stats-banner" ref={statsRef}>
        <Container maxWidth="xl">
          <Fade in={statsVisible} timeout={800}>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={6} sm={3}>
                <Box className="stat-item">
                  <ExploreIcon className="stat-icon" />
                  <Typography variant="h3" className="stat-number">500+</Typography>
                  <Typography variant="body2" className="stat-label">חברות תעופה</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box className="stat-item">
                  <EmojiEventsIcon className="stat-icon" />
                  <Typography variant="h3" className="stat-number">10K+</Typography>
                  <Typography variant="body2" className="stat-label">יעדים</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box className="stat-item">
                  <GroupIcon className="stat-icon" />
                  <Typography variant="h3" className="stat-number">2M+</Typography>
                  <Typography variant="body2" className="stat-label">לקוחות מרוצים</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box className="stat-item">
                  <SupportAgentIcon className="stat-icon" />
                  <Typography variant="h3" className="stat-number">24/7</Typography>
                  <Typography variant="body2" className="stat-label">תמיכת לקוחות</Typography>
                </Box>
              </Grid>
            </Grid>
          </Fade>
        </Container>
      </Box>

      <Box className="about-section" ref={aboutRef}>
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={aboutVisible} timeout={800}>
                <Box>
                  <Typography variant="h2" component="h2" className="section-title" gutterBottom>
                    <span className="text-gradient">{aboutContent.title}</span>
                  </Typography>
                  <Typography variant="h5" className="about-subtitle" gutterBottom>
                    {aboutContent.subtitle}
                  </Typography>
                  <Typography variant="body1" className="about-description" paragraph>
                    {aboutContent.description}
                  </Typography>
                  
                  <Box className="about-points">
                    {aboutContent.points.map((point, index) => (
                      <Box key={index} className="about-point">
                        <CheckCircleIcon className="about-point-icon" />
                        <Typography variant="body1">{point}</Typography>
                      </Box>
                    ))}
                  </Box>

                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box className="features-section" ref={featuresRef}>
        <Container maxWidth="xl">
          <Box className="section-header">
            <Typography 
              variant="h2" 
              component="h2" 
              className="section-title"
            >
              למה <span className="text-gradient">לבחור בנו</span>
            </Typography>
            <Typography 
              variant="h6" 
              className="section-subtitle"
            >
              אנו מחויבים להפוך את חווית הנסיעה שלך ליוצאת מן הכלל מההתחלה ועד הסוף
            </Typography>
          </Box>

          <Grid container spacing={4} className="features-grid">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Zoom in={featuresVisible} timeout={500 + index * 200}>
                  <Card className="feature-card" elevation={3}>
                    <CardContent className="feature-card-content">
                      <Box 
                        className="feature-icon-wrapper"
                        sx={{ background: `linear-gradient(135deg, ${feature.color}22 0%, ${feature.color}44 100%)` }}
                      >
                        <Box sx={{ color: feature.color }}>{feature.icon}</Box>
                      </Box>
                      <Typography variant="h5" component="h3" className="feature-title">
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" className="feature-description">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box className="destinations-section" ref={destinationsRef}>
        <Container maxWidth="xl">
          <Box className="section-header">
            <Typography 
              variant="h2" 
              component="h2" 
              className="section-title"
            >
              יעדים 
            </Typography>
            <Typography 
              variant="h6" 
              className="section-subtitle"
            >
              גלה את היעדים המבוקשים ביותר שלנו
              ונסה את הטיול המושלם שלך
              
            </Typography>
          </Box>
          
          <Box className="destinations-carousel-container">
            <Box className="destinations-carousel-controls">
              <IconButton 
                className="carousel-control prev" 
                onClick={prevDestination}
                disabled={currentDestination === 0}
              >
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton 
                className="carousel-control next" 
                onClick={nextDestination}
                disabled={currentDestination === destinations.length - (isTablet ? 1 : isLargeScreen ? 4 : 3)}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>
            
            <Box className="destinations-carousel">
              {visibleDestinations.map((destination, index) => (
                <Fade in={destinationsVisible} timeout={500 + index * 200} key={index}>
                  <Card className="destination-card" elevation={3}>
                    <Box className="destination-image-container">
                      <CardMedia
                        component="img"
                        height="220"
                         image={destination.image}
                        alt={destination.city}
                        className="destination-image"
                      />
                      <Box 
                        className="destination-price"
                        sx={{ background: `linear-gradient(90deg, ${destination.color} 0%, ${destination.color}dd 100%)` }}
                      >
                        <Typography variant="body2">
                          {destination.price}
                        </Typography>
                      </Box>
                    </Box>
                    <CardContent className="destination-content">
                      <Box className="destination-rating">
                        <Rating 
                          value={destination.rating} 
                          readOnly 
                          precision={0.1}
                          size="small"
                          icon={<StarIcon fontSize="inherit" sx={{ color: destination.color }} />}
                        />
                        <Typography variant="body2" className="rating-value" sx={{ color: destination.color }}>
                          {destination.rating}
                        </Typography>
                      </Box>
                      <Typography variant="h5" component="h3" className="destination-title">
                        {destination.city}
                      </Typography>
                      <Typography variant="body2" className="destination-country">
                        {destination.country}
                      </Typography>
                      <Typography variant="body2" className="destination-description">
                        {destination.description}
                      </Typography>
                      <Box className="destination-tags">
                        {destination.tags.map((tag, idx) => (
                          <Chip 
                            key={idx} 
                            label={tag} 
                            size="small" 
                            className="destination-tag"
                            sx={{ 
                              backgroundColor: `${destination.color}22`, 
                              color: destination.color,
                              '&:hover': {
                                backgroundColor: `${destination.color}44`
                              }
                            }}
                          />
                        ))}
                      </Box>
                      <Button 
                        variant="outlined" 
                        className="destination-button"
                        onClick={() => navigate(`/chooseClass`)}
                        endIcon={<ArrowForwardIcon />}
                        sx={{ 
                          borderColor: destination.color, 
                          color: destination.color,
                          '&:hover': {
                            borderColor: destination.color,
                            backgroundColor: `${destination.color}11`
                          }
                        }}
                      >
                        גלה עוד
                      </Button>
                    </CardContent>
                  </Card>
                </Fade>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      <Box className="cta-section">
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={8} textAlign="center">
              <Typography 
                variant="h2" 
                component="h2" 
                className="cta-title"
                gutterBottom
              >
                מוכנים להרפתקה הבאה שלכם?
              </Typography>
              <Typography 
                variant="h6" 
                className="cta-subtitle"
                sx={{ mb: 4 }}
              >
                הצטרפו לאלפי נוסעים מרוצים שמצאו את הטיסות המושלמות שלהם איתנו
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>

                
                <Button 
                  size="large" 
                  variant="contained" 
                  className="contact-button"
                  onClick={() => navigate('/logIn')}
                  endIcon={<SupportAgentIcon />}
                  sx={{ 
                    backgroundColor: 'white', 
                    color: '#1976d2',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                      color: '#1565c0'
                    }
                  }}
                >
                  צור קשר עכשיו
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box className="testimonials-section" ref={testimonialsRef}>
        <Container maxWidth="xl">
          <Box className="section-header">
            <Typography 
              variant="h2" 
              component="h2" 
              className="section-title"
            >
              מה <span className="text-gradient">הלקוחות שלנו</span> אומרים
            </Typography>
            <Typography 
              variant="h6" 
              className="section-subtitle"
            >
              אל תסתמכו רק על המילה שלנו
            </Typography>
          </Box>

          <Grid container spacing={4} className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Fade in={testimonialsVisible} timeout={500 + index * 200}>
                  <Card className="testimonial-card" elevation={3}>
                    <CardContent className="testimonial-content">
                      <Box 
                        className="testimonial-quote-icon"
                        sx={{ color: `${testimonial.color}33` }}
                      >
                        <FormatQuoteIcon fontSize="large" />
                      </Box>
                      <Typography variant="body1" className="testimonial-text">
                        {testimonial.text}
                      </Typography>
                      <Box className="testimonial-rating">
                        <Rating 
                          value={testimonial.rating} 
                          readOnly 
                          precision={0.5}
                          size="small"
                          sx={{ color: testimonial.color }}
                        />
                      </Box>
                      <Divider className="testimonial-divider" />
                      <Box className="testimonial-author">
                        <Avatar 
                        
                          className="testimonial-avatar"
                          sx={{ bgcolor: testimonial.color }}
                        />
                        <Box>
                          <Typography variant="subtitle1" className="testimonial-name">
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" className="testimonial-location">
                            {testimonial.location}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

    

   
     </Box>
  );
};

export default HomeAbout;