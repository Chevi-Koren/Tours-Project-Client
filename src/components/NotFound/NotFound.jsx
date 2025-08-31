import React from 'react';
import { 
    Box, 
    Typography, 
    Button, 
    Container, 
    Paper 
} from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';
import FlightIcon from '@mui/icons-material/Flight';
import './notFound.css';

const NotFound = () => {
    return (
        <Container className="not-found-container">
            <Paper elevation={3} className="not-found-paper">
                <Box className="not-found-content">
                    <Box className="not-found-icon-container">
                        <ErrorOutlineIcon className="not-found-icon" />
                        <Box className="plane-animation">
                            <FlightIcon className="plane-icon" />
                        </Box>
                    </Box>
                    
                    <Typography variant="h2" component="h1" className="not-found-title">
                        404
                    </Typography>
                    
                    <Typography variant="h4" component="h2" className="not-found-subtitle">
                        העמוד לא נמצא
                    </Typography>
                    
                    <Typography variant="body1" className="not-found-message">
                        מצטערים, הניתוב שביקשת אינו קיים במערכת.
                        <br />
                        ייתכן שהכתובת הוקלדה באופן שגוי או שהעמוד הוסר.
                    </Typography>
                    
                    <Box className="not-found-actions">
                        <Button 
                            variant="contained" 
                            color="primary" 
                            component={Link} 
                            to="/" 
                            startIcon={<HomeIcon />}
                            className="home-button"
                        >
                            חזרה לדף הבית
                        </Button>
                        
                        <Button 
                            variant="outlined" 
                            color="primary" 
                            component={Link} 
                            to="/flights" 
                            startIcon={<FlightIcon />}
                            className="flights-button"
                        >
                            חיפוש טיסות
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default NotFound;