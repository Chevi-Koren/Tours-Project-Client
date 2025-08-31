import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loct } from "../../redux/slices/user/userSlice";
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Grid, 
  Container,
  Chip,
  IconButton
} from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FlightIcon from '@mui/icons-material/Flight';
import './calendar.css';

export const Calendar = () => {
  const [months, setMonths] = useState(0);
  const [week, setWeek] = useState([]);
  const [monthOver, setMonthOver] = useState();
  const [day, setDay] = useState(0);
  const [isMonth, setIsMonth] = useState(false);
  
  const flightsDetailsArr = useSelector(state => state.flights.flightsDetailsArr);
  const classes = useSelector(state => state.flights.classes);
  const date = new Date();
  const dates = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dateTimeMonth = (m = 0) => {
    // Calculate the new month and year
    const today = new Date();
    const currentMonth = today.getMonth() + months + m;
    const currentYear = today.getFullYear();

    // First and last day of the month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    // Find the first Sunday before or on the first day of the month
    const startDay = new Date(firstDayOfMonth);
    startDay.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());

    // Find the last Saturday after or on the last day of the month
    const endDay = new Date(lastDayOfMonth);
    endDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));

    // Build the days array
    let days = [];
    let day = new Date(startDay);
    while (day <= endDay) {
      days.push(day.toLocaleDateString());
      day.setDate(day.getDate() + 1);
    }

    setWeek(days);
    setMonthOver(firstDayOfMonth);
    setMonths(months + m);
  };

  useEffect(() => {
    setIsMonth(true);
    dateTimeMonth(0);
    dispatch(loct("/calendar"));
  }, []);

  const getMonthName = (date) => {
    const monthNames = [
      "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
      "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
    ];
    return monthNames[date.getMonth()];
  };

  const getFlightsForDay = (day) => {
    if (!flightsDetailsArr?.length) return [];
    return flightsDetailsArr.filter(flight => 
      new Date(flight.date).toLocaleDateString() === day
    );
  };

  return (
    <Container className="calendar-container">
      <Paper elevation={3} className="calendar-paper">
        <Box className="calendar-header">
          <Typography variant="h4" className="calendar-title">
            {monthOver && `${getMonthName(monthOver)} ${monthOver.getFullYear()}`}
            <CalendarTodayIcon className="calendar-icon" />
          </Typography>
          
          <Box className="calendar-controls">
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => dateTimeMonth(0 - months)}
              className="current-month-btn"
            >
              חזרה לחודש נוכחי
            </Button>
            <Box className="navigation-buttons">
              <IconButton 
                color="primary" 
                onClick={() => dateTimeMonth(1)}
                className="nav-button"
              >
                <ArrowForwardIosIcon />
              </IconButton>
              <IconButton 
                color="primary" 
                onClick={() => dateTimeMonth(-1)}
                className="nav-button"
              >
                < ArrowBackIosNewIcon/>
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box className="calendar-body">
          <Grid container className="days-header">
            {dates.map((dayName, index) => (
              <Grid item key={index} className="day-name">
                <Typography variant="subtitle1">{dayName}</Typography>
              </Grid>
            ))}
          </Grid>

          {/* Render the days in rows of 7 */}
          {Array.from({ length: Math.ceil(week.length / 7) }).map((_, rowIdx) => (
            <Grid container className="days-grid" key={rowIdx}>
              {week.slice(rowIdx * 7, rowIdx * 7 + 7).map((day, index) => {
                const globalIndex = rowIdx * 7 + index;
                const isToday = day === date.toLocaleDateString();
                const isDifferentMonth = isMonth && parseInt(day.substring(0, 2)) !== monthOver.getMonth() + 1;
                const dayFlights = getFlightsForDay(day);
                return (
                  <Grid 
                    item 
                    key={globalIndex} 
                    className={`calendar-day ${isToday ? 'today' : ''} ${isDifferentMonth ? 'different-month' : ''}`}
                  >
                    <Box className="day-content">
                      <Typography className="day-number">{day}</Typography>
                      {dayFlights.length > 0 && (
                        <Box className="flights-container">
                          {dayFlights.map((flight, flightIndex) => (
                            <Chip
                              key={flightIndex}
                              icon={<FlightIcon />}
                              label={flight.time}
                              color="primary"
                              variant="outlined"
                              clickable
                              onClick={() => navigate(`/flightDetail/${classes}/${flight.id}/${1}`)}
                              className="flight-chip"
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};