import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { chooseClass } from '../../redux/slices/flight/flightsSlice';
import { loct } from '../../redux/slices/user/userSlice';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Fade,
  Button,
  Chip,
  Divider,
  Tooltip,
  Zoom
} from '@mui/material';
import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import AirlineSeatLegroomExtraIcon from '@mui/icons-material/AirlineSeatLegroomExtra';
import WifiIcon from '@mui/icons-material/Wifi';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import TvIcon from '@mui/icons-material/Tv';
import PowerIcon from '@mui/icons-material/Power';
import LuggageIcon from '@mui/icons-material/Luggage';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import './classStyle.css';

export const Classes = () => {
  const flightsArr = useSelector(state => state.flights.class);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState(null);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    dispatch(loct("/chooseClass"));
    
    const handleScroll = () => {
      const parallaxElements = document.querySelectorAll('.parallax-bg');
      parallaxElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        element.style.transform = `translateY(${scrollPosition * 0.4}px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClassSelection = (classType) => {
    setSelectedClass(classType);
    setAnimateOut(true);
    dispatch(chooseClass(classType));
    navigate('/flights');
  };

  const classOptions = [
    {
      type: "ראשונה",
      label: "מחלקה ראשונה",
      image: "מחלקה ראשונה סופי.png",
      icon: <AirlineSeatFlatIcon />,
      description: "חווית טיסה יוקרתית עם מושבים הנפתחים למיטה שטוחה, אוכל גורמה ושירות VIP",
      features: [
        { icon: <AirlineSeatFlatIcon />, label: "מיטה שטוחה" },
        { icon: <RestaurantIcon />, label: "ארוחות שף" },
        { icon: <WifiIcon />, label: "WiFi חופשי" },
        { icon: <PriorityHighIcon />, label: "עלייה ראשונה" },
        { icon: <LuggageIcon />, label: "3 מזוודות" }
      ],
      color: "#8E24AA"
    },
    {
      type: "תיירים",
      label: "מחלקת תיירים",
      image: "רגילה.png",
      icon: <AirlineSeatReclineExtraIcon />,
      description: "חווית טיסה נוחה במחיר משתלם, כולל ארוחות ובידור במהלך הטיסה",
      features: [
        { icon: <AirlineSeatReclineExtraIcon />, label: "מושב נוח" },
        { icon: <RestaurantIcon />, label: "ארוחות" },
        { icon: <TvIcon />, label: "מערכת בידור" },
        { icon: <PowerIcon />, label: "שקעי חשמל" },
        { icon: <LuggageIcon />, label: "מזוודה אחת" }
      ],
      color: "#2196F3"
    },
    {
      type: "עסקים",
      label: "מחלקת עסקים",
      image: "עסקים.png",
      icon: <AirlineSeatLegroomExtraIcon />,
      description: "חווית טיסה מפנקת עם מושבים מרווחים, אוכל משובח ועלייה מועדפת למטוס",
      features: [
        { icon: <AirlineSeatLegroomExtraIcon />, label: "מושב מרווח" },
        { icon: <RestaurantIcon />, label: "ארוחות פרימיום" },
        { icon: <WifiIcon />, label: "WiFi מהיר" },
        { icon: <PriorityHighIcon />, label: "עלייה מועדפת" },
        { icon: <LuggageIcon />, label: "2 מזוודות" }
      ],
      color: "#FF5722"
    }
  ];

  return (
    <Box className={`class-selection-page ${animateOut ? 'fade-out' : ''}`}>
      <Box className="parallax-bg"></Box>
      
      <Container className="class-selection-container">
        <Fade in={!animateOut} timeout={1000}>
          <Box className="class-selection-content">
            <Typography variant="h2" className="main-title">
              בחר את חווית הטיסה שלך
              <Box className="title-decoration"></Box>
            </Typography>
            
            <Typography variant="h6" className="subtitle">
              אנו מציעים מגוון אפשרויות לטיסה נוחה ומהנה בהתאם לצרכים שלך
            </Typography>
            
            <Box className="class-options-container">
              <Grid container spacing={4} justifyContent="center">
                {classOptions.map((option, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Zoom in={true} style={{ transitionDelay: `${index * 200}ms` }}>
                      <Card 
                        className={`class-card ${selectedClass === option.type ? 'selected' : ''}`}
                        elevation={8}
                        style={{ 
                          '--card-color': option.color,
                          '--card-color-light': `${option.color}22`
                        }}
                      >
                        <Box className="card-badge">
                          <Typography variant="body2">
                            {option.type === "ראשונה" ? "פרימיום" : 
                             option.type === "עסקים" ? "פופולרי" : "חסכוני"}
                          </Typography>
                        </Box>
                        
                        <Box className="card-media-container">
                          <CardMedia
                            component="img"
                            image={option.image}
                            alt={option.label}
                            className="class-image"
                          />
                          <Box className="image-overlay"></Box>
                          <Box className="class-icon-container">
                            <Box className="class-icon" style={{ backgroundColor: option.color }}>
                              {option.icon}
                            </Box>
                          </Box>
                        </Box>
                        
                        <CardContent className="card-content">
                          <Typography variant="h4" className="class-title">
                            {option.label}
                          </Typography>
                          
                          <Typography variant="body1" className="class-description">
                            {option.description}
                          </Typography>
                          
                          <Divider className="feature-divider" />
                          
                          <Box className="features-container">
                            {option.features.map((feature, idx) => (
                              <Tooltip 
                                key={idx} 
                                title={feature.label} 
                                placement="top"
                                arrow
                              >
                                <Chip
                                  icon={feature.icon}
                                  label={feature.label}
                                  className="feature-chip"
                                  variant="outlined"
                                  style={{ borderColor: option.color, color: option.color }}
                                />
                              </Tooltip>
                            ))}
                          </Box>
                          
                          <Button 
                            variant="contained" 
                            className="select-button"
                            onClick={() => handleClassSelection(option.type)}
                            style={{ backgroundColor: option.color }}
                          >
                            בחר מחלקה זו
                          </Button>
                        </CardContent>
                      </Card>
                    </Zoom>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};