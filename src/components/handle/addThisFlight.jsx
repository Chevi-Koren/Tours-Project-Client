import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFlightThunk } from "../../redux/slices/flight/getAllFlightThunk";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  IconButton,
  Box,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LuggageIcon from '@mui/icons-material/Luggage';
import "./addThisFlight.css";

export const AddThisFlight = (props) => {
    const { addFlight, update, close, thisFlt } = props;
    const flightsArr = useSelector(state => state.flights.flightsArr);
    const dispatch = useDispatch();
    const [tflt, setTFlt] = useState({ 
        priceToOverLoad: 0, 
        time: '', 
        date: '', 
        flightId: 0,
        id: 0
    });
    const [tf, setTf] = useState("");
    const [open, setOpen] = useState(false);
    const isEditMode = thisFlt.time !== "";

    useEffect(() => {
        dispatch(getAllFlightThunk());
        if (isEditMode) {
            setTFlt({
                priceToOverLoad: thisFlt.priceToOverLoad,
                time: thisFlt.time,
                date: thisFlt.date,
                flightId: thisFlt.flightId || thisFlt.flight?.id,
                id: thisFlt.id 
            });
        }
        setOpen(true);
    }, []);

    const handleClose = () => {
        setOpen(false);
        close();
    };

    const handleSubmit = () => {
        if (isEditMode) {
            const updateData = {
                ...tflt,
                id: thisFlt.id, 
                flightId: thisFlt.flightId || thisFlt.flight?.id,
                priceToOverLoad: parseInt(tflt.priceToOverLoad)
            };
            update(updateData);
        } else {
            let ti = tflt.time + ":00";
            let i = tf.indexOf("-");
            let src = tf.substring(0, i - 1);
            let des = tf.substring(i + 2);
            let ff = {...tflt};
            ff.time = ti;
            flightsArr.forEach(element => {
                if (element.sourceNavigation.destination === src && element.destinationNavigation.destination === des)
                    ff.flightId = element.id;
            });
            ff.priceToOverLoad = parseInt(ff.priceToOverLoad);
            addFlight(ff);
        }
    };

    const isFormValid = () => {
        if (isEditMode) {
            return tflt.date && tflt.time && tflt.priceToOverLoad !== undefined && tflt.priceToOverLoad !== null;
        } else {
            return tf && tflt.date && tflt.time && tflt.priceToOverLoad !== undefined && tflt.priceToOverLoad !== null;
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            className="flight-dialog"
        >
            <DialogTitle className="dialog-title">
                <Typography variant="h6" component="div" className="title-text">
                    {isEditMode ? "עריכת טיסה ספציפית" : "הוספת טיסה ספציפית"}
                </Typography>
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                    className="close-button"
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers className="dialog-content">
                <Box className="form-group">
                    <Typography variant="subtitle1" className="form-label">
                        <FlightTakeoffIcon style={{ marginLeft: '8px', verticalAlign: 'middle', color: '#1976d2' }} />
                        פרטי טיסה
                    </Typography>
                    {!isEditMode ? (
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            select
                            value={tf}
                            onChange={(e) => setTf(e.target.value)}
                            placeholder="בחר טיסה (מקור - יעד)"
                            InputProps={{
                                className: "rtl-input"
                            }}
                        >
                            {flightsArr?.map((f, index) => (
                                <MenuItem key={index} value={`${f.sourceNavigation.destination} - ${f.destinationNavigation.destination}`}>
                                    {f.sourceNavigation.destination} - {f.destinationNavigation.destination}
                                </MenuItem>
                            ))}
                        </TextField>
                    ) : (
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            value={thisFlt.flight.sourceNavigation.destination + " - " + thisFlt.flight.destinationNavigation.destination}
                            disabled
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FlightTakeoffIcon color="primary" />
                                    </InputAdornment>
                                ),
                                className: "rtl-input"
                            }}
                        />
                    )}
                </Box>

                <Box className="form-group">
                    <Typography variant="subtitle1" className="form-label">
                        <DateRangeIcon style={{ marginLeft: '8px', verticalAlign: 'middle', color: '#1976d2' }} />
                        תאריך טיסה
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="date"
                        value={tflt.date}
                        onChange={(e) => setTFlt(prev => ({ ...prev, date: e.target.value }))}
                        InputProps={{
                            className: "rtl-input"
                        }}
                    />
                </Box>

                <Box className="form-group">
                    <Typography variant="subtitle1" className="form-label">
                        <AccessTimeIcon style={{ marginLeft: '8px', verticalAlign: 'middle', color: '#1976d2' }} />
                        שעת טיסה
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="time"
                        value={tflt.time}
                        onChange={(e) => setTFlt(prev => ({ ...prev, time: e.target.value }))}
                        InputProps={{
                            className: "rtl-input"
                        }}
                    />
                </Box>

                <Box className="form-group">
                    <Typography variant="subtitle1" className="form-label">
                        <LuggageIcon style={{ marginLeft: '8px', verticalAlign: 'middle', color: '#1976d2' }} />
                        מחיר למשקל עודף (₪)
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="number"
                        value={tflt.priceToOverLoad}
                        onChange={(e) => setTFlt(prev => ({ ...prev, priceToOverLoad: e.target.value }))}
                        placeholder="הזן מחיר"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    ₪
                                </InputAdornment>
                            ),
                            className: "rtl-input"
                        }}
                    />
                </Box>
            </DialogContent>

            <DialogActions className="dialog-footer">
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={isEditMode ? <SaveIcon /> : <AddIcon />}
                    onClick={handleSubmit}
                    disabled={!isFormValid()}
                    className="submit-button"
                >
                    {isEditMode ? "עדכן טיסה" : "הוסף טיסה"}
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleClose}
                    className="cancel-button"
                >
                    ביטול
                </Button>
            </DialogActions>
        </Dialog>
    );
};