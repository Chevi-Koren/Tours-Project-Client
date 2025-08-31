import { useDispatch, useSelector } from "react-redux";
import { loct } from "../../redux/slices/user/userSlice";
import { useEffect, useState } from "react";
import { getAllFlightThunk } from "../../redux/slices/flight/getAllFlightThunk";
import { addFlightThunk } from "../../redux/slices/flight/addFlightThunk";
import { updateFlightThunk } from "../../redux/slices/flight/updateFlightThunk";
import { AddFlight } from "./addFlight";
import { 
  Button, 
  Container, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  Box,
  Tooltip,
  Chip
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import "./flight.css";

export const Flight = () => {
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);
  const [flit, setFlt] = useState({
    source: "", 
    destination: "", 
    timeOfFlight: "", 
    sold: 0
  });
  const [loading, setLoading] = useState(true);
  const flightsArr = useSelector(state => state.flights.flightsArr);

  useEffect(() => {
    setLoading(true);
    dispatch(loct("/flights"));
    dispatch(getAllFlightThunk())
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const addFlight = (addFlt) => {
    setLoading(true); 
    dispatch(addFlightThunk(addFlt))
      .then(() => {
        setLoading(false)
        close();
      })
      .catch(() => {
        setLoading(false);
        close();
      });
  };

  const update = (update) => {
    setLoading(true);
    dispatch(updateFlightThunk(update))
      .then(() => {
        setLoading(false)
        close();
      })
      .catch(() => {
        setLoading(false);
        close();
      });
  };

  const close = () => {
    setFlt({source: "", destination: "", timeOfFlight: "", sold: 0});
    setAdd(false);
  };

  const formatFlightTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours}ש' ` : ''}${mins}ד'`;
  };

  if (loading) {
    return (
      <Container className="flight-container">
        <Paper elevation={3} className="flight-paper">
          <Box className="flight-header">
            <Typography variant="h4" component="h1" className="flight-title">
              ניהול טיסות
            </Typography>
          </Box>
          <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
          </div>
        </Paper>
      </Container>
    );
  }

  return (
    <Container className="flight-container">
      <Paper elevation={3} className="flight-paper content-fade-in">
        <Box className="flight-header">
          <Typography variant="h4" component="h1" className="flight-title">
            ניהול טיסות
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={() => setAdd(true)}
            className="add-button"
          >
            הוסף טיסה
          </Button>
        </Box>

        <TableContainer component={Paper} className="table-container">
          <Table aria-label="flights table">
            <TableHead>
              <TableRow>
                <TableCell align="right" className="table-header">פעולות</TableCell>
                <TableCell align="right" className="table-header">
                  <Box className="header-with-icon">
                    <FlightTakeoffIcon fontSize="small" />
                    <span>מקור</span>
                  </Box>
                </TableCell>
                <TableCell align="right" className="table-header">
                  <Box className="header-with-icon">
                    <FlightLandIcon fontSize="small" />
                    <span>יעד</span>
                  </Box>
                </TableCell>
                <TableCell align="right" className="table-header">
                  <Box className="header-with-icon">
                    <AccessTimeIcon fontSize="small" />
                    <span>משך זמן טיסה</span>
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {flightsArr?.map((f) => (
                <TableRow key={f.id} className="table-row">
                  <TableCell align="right">
                    <Tooltip title="ערוך טיסה" arrow>
                      <IconButton 
                        color="primary"
                        onClick={() => {
                          setFlt(f);
                          setAdd(true);
                        }}
                        size="small"
                        className="edit-button"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <Chip 
                      icon={<FlightTakeoffIcon />} 
                      label={f.sourceNavigation.destination}
                      variant="outlined"
                      color="primary"
                      className="flight-chip"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Chip 
                      icon={<FlightLandIcon />} 
                      label={f.destinationNavigation.destination}
                      variant="outlined"
                      color="secondary"
                      className="flight-chip"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Chip 
                      icon={<AccessTimeIcon />} 
                      label={formatFlightTime(f.timeOfFlight)}
                      variant="outlined"
                      className="time-chip"
                    />
                  </TableCell>
                </TableRow>
              ))}
              {(!flightsArr || flightsArr.length === 0) && (
                <TableRow>
                  <TableCell colSpan={4} align="center" className="no-data">
                    לא נמצאו טיסות. לחץ על "הוסף טיסה" כדי להוסיף טיסה חדשה.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {add && (
        <AddFlight 
          addFlight={addFlight} 
          update={update} 
          close={close} 
          flit={flit}
        />
      )}
    </Container>
  );
};