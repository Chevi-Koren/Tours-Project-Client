import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClassThunk } from "../../redux/slices/class/getAllClassThunk";
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button, 
    TextField, 
    Typography, 
    IconButton,
    Box
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import "./addClassToFlight.css";

export const AddClassToFlight = (props) => {
    const { addCTFlight, closeCtf, ctf, cls, thisFlt } = props;
    const [ctflight, setCtflight] = useState({
      classId: 0, 
      thisflightId: 0, 
      price: 0, 
      hanacha: 0, 
      weightLoad: 0, 
      numberOfSeats: 0
    });
    const [open, setOpen] = useState(false);

    const classes = useSelector(state => state.classs.classes);
    const dispatch = useDispatch();

    useEffect(() => {
      if(classes === undefined || classes.length === 0)
        dispatch(getAllClassThunk());

      setCtflight(ctf);
      setOpen(true);
    }, []);

    const handleClose = () => {
      setOpen(false);
      closeCtf();
    };

    const handleSubmit = () => {
      if (ctflight.classId !== 0) {
        addCTFlight(ctflight);
      } else {
        let c = ctflight;
        c.thisflightId = thisFlt.id;
      
        let cl = classes.filter(c => c.description === cls);
        c.classId = cl[0].id;
      
        addCTFlight(c);
      }
    };

    const isFormValid = ctflight.price > 0 && ctflight.numberOfSeats > 0;

    return (
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        className="class-to-flight-dialog"
      >
        <DialogTitle className="dialog-title">
          <Typography variant="h6" component="div" className="title-text">
            {ctflight.classId === 0 ? "הוספת טיסה למחלקה" : "עריכת טיסה למחלקה"}
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
          {thisFlt && (
            <>
              <Box className="form-field">
                <Typography variant="subtitle1" className="field-label">
                  פרטי טיסה
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={thisFlt.flight.sourceNavigation.destination + " - " + thisFlt.flight.destinationNavigation.destination}
                  disabled
                  className="text-field"
                  InputProps={{
                    className: "rtl-input"
                  }}
                />
              </Box>
            
              <Box className="form-field">
                <Typography variant="subtitle1" className="field-label">
                  תאריך טיסה
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={thisFlt.date + " - " + thisFlt.time}
                  disabled
                  className="text-field"
                  InputProps={{
                    className: "rtl-input"
                  }}
                />
              </Box>
            
              <Box className="form-field">
                <Typography variant="subtitle1" className="field-label">
                  מחלקה
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={cls}
                  disabled
                  className="text-field"
                  InputProps={{
                    className: "rtl-input"
                  }}
                />
              </Box>
            
              <Box className="form-field">
                <Typography variant="subtitle1" className="field-label">
                  מספר מקומות
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  type="number"
                  value={ctflight.numberOfSeats}
                  onChange={(e) => setCtflight(prev => ({ ...prev, numberOfSeats: e.target.value }))}
                  className="text-field"
                  InputProps={{
                    className: "rtl-input"
                  }}
                />
              </Box>
            
              <Box className="form-field">
                <Typography variant="subtitle1" className="field-label">
                  מחיר
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  type="number"
                  value={ctflight.price}
                  onChange={(e) => setCtflight(prev => ({ ...prev, price: e.target.value }))}
                  className="text-field"
                  InputProps={{
                    className: "rtl-input"
                  }}
                />
              </Box>
            
              <Box className="form-field">
                <Typography variant="subtitle1" className="field-label">
                  הנחה
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  type="number"
                  value={ctflight.hanacha}
                  onChange={(e) => setCtflight(prev => ({ ...prev, hanacha: e.target.value }))}
                  className="text-field"
                  InputProps={{
                    className: "rtl-input"
                  }}
                />
              </Box>
            
              <Box className="form-field">
                <Typography variant="subtitle1" className="field-label">
                  משקל עודף
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  type="number"
                  value={ctflight.weightLoad}
                  onChange={(e) => setCtflight(prev => ({ ...prev, weightLoad: e.target.value }))}
                  className="text-field"
                  InputProps={{
                    className: "rtl-input"
                  }}
                />
              </Box>
            </>
          )}
        </DialogContent>
      
        <DialogActions className="dialog-actions">
          <Button 
            variant="contained" 
            color="primary"
            startIcon={ctflight.classId !== 0 ? <SaveIcon /> : <AddIcon />}
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="submit-button"
          >
            אישור
          </Button>
        </DialogActions>
      </Dialog>
    );
};