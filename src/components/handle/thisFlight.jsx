import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loct } from "../../redux/slices/user/userSlice";
import { getAllThisFlightThunk } from "../../redux/slices/flight/getAllThisFlightThunk";
import { useSelector } from "react-redux";
import { addThisFlightThunk } from "../../redux/slices/flight/addThisFlightThunk";
import { AddThisFlight } from "./addThisFlight";
import { updateThisFlightThunk } from "../../redux/slices/flight/updateThisFlightThunk";
import { AddClassToFlight } from "./addClassToFlight";
import { addClassToFlight } from "../../redux/slices/flight/addClassToFlight";
import { changeResponse } from "../../redux/slices/flight/flightsSlice";
import { deleteFlight } from "../../redux/slices/flight/deleteFlight";
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  Tooltip,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LuggageIcon from '@mui/icons-material/Luggage';
import RefreshIcon from '@mui/icons-material/Refresh';

import './thisFlight.css';

export const ThisFlight = () => {
    const dispatch = useDispatch();
    const flightsArr = useSelector(state => state.flights.AllThisFlight);
    const oneThisFlight = useSelector(state => state.flights.oneThisFlight);
    const response = useSelector(state => state.flights.response);
    const [add, setAdd] = useState(false);
    const [addCTF, setAddCTF] = useState(0);
    const [flit, setFlt] = useState({ priceToOverLoad: 0, time: '', date: '' });
    const [ctf, setCtf] = useState({ classId: 0, thisflightId: 0, price: 0, hanacha: 0, weightLoad: 0, numberOfSeats: 0 });
    const [thisFlt, setThisFlt] = useState({});
    const [loading, setLoading] = useState(true);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const addFlight = async (addFlt) => {
        try {
            await dispatch(addThisFlightThunk(addFlt))
            close()
            setAddCTF(1)
        } catch (error) {
        }
    }

    const addCTFlight = (addctf) => {
        dispatch(addClassToFlight(addctf))
    }

    const update = (update) => {
        dispatch(updateThisFlightThunk(update))
        close()
    }

    const close = () => {
        setFlt({ priceToOverLoad: 0, time: '', date: '', flightId: 0 })
        setAdd(false)
    }

    const closeCtf = () => {
        setAddCTF(0)
    }

    const handleRefresh = () => {
        setLoading(true);
        dispatch(getAllThisFlightThunk())
            .then(() => setLoading(false));
    };

    const handleDelete = (id) => {
        setConfirmDelete(id);
    };

    const confirmDeleteFlight = () => {
        if (confirmDelete) {
            dispatch(deleteFlight(confirmDelete));
            setConfirmDelete(null);
        }
    };

    useEffect(() => {
        dispatch(loct("/AllThisFlight"));
       
        dispatch(getAllThisFlightThunk())
            .then(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (response === true) {
            if (addCTF === 1) {
                setAddCTF(2)
            }
            if (addCTF === 2) {
                setAddCTF(3)
            }
            if (addCTF === 3) {
                setAddCTF(0)
            }
            dispatch(changeResponse(false));
        }
    }, [addCTF, dispatch, response]);

    return (
        <Container className="this-flight-container">
            <Paper elevation={3} className="this-flight-paper">
                <Box className="this-flight-header">
                    <Typography variant="h4" component="h1" className="this-flight-title">
                        ניהול טיסות ספציפיות
                    </Typography>
                    <Box className="action-buttons">
                        <Button 
                            variant="contained" 
                            color="primary" 
                            startIcon={<AddIcon />}
                            onClick={() => setAdd(true)}
                            className="add-button"
                        >
                            הוסף טיסה ספציפית
                        </Button>
                        <Button 
                            variant="outlined" 
                            color="primary" 
                            startIcon={<RefreshIcon />}
                            onClick={handleRefresh}
                            className="refresh-button"
                        >
                            רענן נתונים
                        </Button>
                    </Box>
                </Box>

                {loading ? (
                    <div className="loading-spinner-container">
                        <div className="loading-spinner"></div>
                    </div>
                ) : (
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
                                            <DateRangeIcon fontSize="small" />
                                            <span>תאריך</span>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right" className="table-header">
                                        <Box className="header-with-icon">
                                            <AccessTimeIcon fontSize="small" />
                                            <span>שעה</span>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right" className="table-header">
                                        <Box className="header-with-icon">
                                            <LuggageIcon fontSize="small" />
                                            <span>מחיר למשקל עודף</span>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {flightsArr?.length > 0 ? (
                                    flightsArr.map((f) => (
                                        <TableRow key={f.id} className="table-row">
                                            <TableCell align="right">
                                                <Box sx={{ display: 'flex', gap: 1 }}>
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
                                                    <Tooltip title="מחק טיסה" arrow>
                                                        <IconButton 
                                                            color="error"
                                                            onClick={() => handleDelete(f.id)}
                                                            size="small"
                                                            className="delete-button"
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Chip 
                                                    icon={<FlightTakeoffIcon />} 
                                                    label={f.flight.sourceNavigation.destination}
                                                    variant="outlined"
                                                    color="primary"
                                                    className="flight-chip"
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Chip 
                                                    icon={<FlightLandIcon />} 
                                                    label={f.flight.destinationNavigation.destination}
                                                    variant="outlined"
                                                    color="secondary"
                                                    className="flight-chip"
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Chip 
                                                    icon={<DateRangeIcon />} 
                                                    label={f.date}
                                                    variant="outlined"
                                                    className="flight-chip"
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Chip 
                                                    icon={<AccessTimeIcon />} 
                                                    label={f.time}
                                                    variant="outlined"
                                                    className="time-chip"
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Chip 
                                                    icon={<LuggageIcon />} 
                                                    label={`${f.priceToOverLoad} ₪`}
                                                    variant="outlined"
                                                    className="price-chip"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center" className="no-data">
                                            לא נמצאו טיסות ספציפיות. לחץ על "הוסף טיסה ספציפית" כדי להוסיף טיסה חדשה.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                <Fab 
                    color="primary" 
                    className="mobile-add-button"
                    onClick={() => setAdd(true)}
                >
                    <AddIcon />
                </Fab>
                <Dialog
                    open={confirmDelete !== null}
                    onClose={() => setConfirmDelete(null)}
                    className="delete-dialog"
                >
                    <DialogTitle>
                        אישור מחיקת טיסה
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant="body1">
                            האם אתה בטוח שברצונך למחוק את הטיסה הזו? פעולה זו אינה ניתנת לביטול.
                        </Typography>
                    </DialogContent>
                    <DialogActions className="dialog-actions">
                        <Button 
                            onClick={() => setConfirmDelete(null)} 
                            color="primary"
                        >
                            ביטול
                        </Button>
                        <Button 
                            onClick={confirmDeleteFlight} 
                            color="error" 
                            variant="contained"
                            autoFocus
                        >
                            מחק
                        </Button>
                    </DialogActions>
                </Dialog>

                {add && <AddThisFlight addFlight={addFlight} update={update} close={close} thisFlt={flit} />}
                
                {(addCTF === 1 && oneThisFlight !== null) && 
                    <AddClassToFlight 
                        addCTFlight={addCTFlight} 
                        closeCtf={closeCtf} 
                        ctf={ctf} 
                        cls={"תיירים"} 
                        thisFlt={oneThisFlight} 
                    />
                }
                {addCTF === 2 && 
                    <AddClassToFlight 
                        addCTFlight={addCTFlight} 
                        closeCtf={closeCtf} 
                        ctf={ctf} 
                        cls={"עסקים"} 
                        thisFlt={oneThisFlight} 
                    />
                }
                {addCTF === 3 && 
                    <AddClassToFlight 
                        addCTFlight={addCTFlight} 
                        closeCtf={closeCtf} 
                        ctf={ctf} 
                        cls={"ראשונה"} 
                        thisFlt={oneThisFlight} 
                    />
                }
            </Paper>
        </Container>
    );
};