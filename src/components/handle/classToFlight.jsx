import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loct } from "../../redux/slices/user/userSlice";
import { getAllClassToFlightThunk } from "../../redux/slices/flight/getAllClassToFlightThunk";
import { AddClassToFlight } from "./addClassToFlight";
import { updateClassToFlight } from "../../redux/slices/flight/updateClassToFlight";
import { getOrderDetailByClassToFlightIdThunk } from "../../redux/slices/flight/getOrderDetailByClassToFlightIdThunk";
import {
  Box,
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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  useTheme,
  useMediaQuery,
  Tooltip
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import PeopleIcon from '@mui/icons-material/People';
import CloseIcon from '@mui/icons-material/Close';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import DiscountIcon from '@mui/icons-material/Discount';

import './classToFlight.css';

export const ClassToFlight = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const dispatch = useDispatch();
    const classToFlight = useSelector(state => state.flights.classToFlight);
    const orderDetailByClassToFlight = useSelector(state => state.flights.orderDetailByClassToFlight);
    
    const [ctf, setCtf] = useState({ classId: "", thisflightId: "", price: "", hanacha: "", weightLoad: "", numberOfSeats: "" });
    const [classToFlightOpen, setClassToFlightOpen] = useState(false);
    const [detail, setDetail] = useState(false);
    const [thisFlt, setThisFlt] = useState({});
    const [loading, setLoading] = useState(true);
    const [saveId, setSaveId] = useState(0);

    
    useEffect(() => {
        setLoading(true);  
        dispatch(loct("/AllClassToFlight"));
        
        dispatch(getAllClassToFlightThunk())
            .then(() => {

                setLoading(false)
            })
            .catch(() => {
                setLoading(false);
            });
    }, [dispatch]);
    
    const addCTFlight = (addctf) => {
        setLoading(true);
        dispatch(updateClassToFlight(addctf))
            .then(() => {
                setLoading(false)
                closeCtf();
            })
            .catch(() => {
                setLoading(false);
                closeCtf();
            });
    }
    
    const closeCtf = () => {
        setClassToFlightOpen(false);
    }

    if (loading) {
        return (
            <Container className="class-to-flight-container">
                <Paper elevation={3} className="class-to-flight-paper">
                    <Box className="class-to-flight-header">
                        <Typography variant="h4" component="h1" className="class-to-flight-title">
                            ניהול מחלקות לטיסות
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
        <Container className="class-to-flight-container">
            <Paper elevation={3} className="class-to-flight-paper content-fade-in">
                <Box className="class-to-flight-header">
                    <Typography variant="h4" component="h1" className="class-to-flight-title">
                        ניהול מחלקות לטיסות
                    </Typography>
                </Box>

                <TableContainer component={Paper} className="table-container">
                    <Table aria-label="טבלת מחלקות לטיסות">
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
                                        <AirplaneTicketIcon fontSize="small" />
                                        <span>מחלקה</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right" className="table-header">
                                    <Box className="header-with-icon">
                                        <EventIcon fontSize="small" />
                                        <span>תאריך</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right" className="table-header">
                                    <Box className="header-with-icon">
                                        <AttachMoneyIcon fontSize="small" />
                                        <span>מחיר</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right" className="table-header">
                                    <Box className="header-with-icon">
                                        <AirlineSeatReclineNormalIcon fontSize="small" />
                                        <span>מושבים</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right" className="table-header">
                                    <Box className="header-with-icon">
                                        <AccessTimeIcon fontSize="small" />
                                        <span>הנחה</span>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {classToFlight?.length > 0 ? (
                                classToFlight.map(f => (
                                    <TableRow key={f.id} className="table-row">
                                        <TableCell align="right">
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Tooltip title="ערוך מחלקה" arrow>
                                                    <IconButton 
                                                        color="primary"
                                                        onClick={() => {
                                                            setCtf(f);
                                                            setThisFlt(f.thisflight);
                                                            setClassToFlightOpen(true);
                                                        }}
                                                        size="small"
                                                        className="edit-button"
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="לקוחות שהזמינו" arrow>
                                                    <IconButton 
                                                        color="secondary" 
                                                        size="small"
                                                        className="view-button"
                                                        onClick={() => {
                                                            setLoading(true); 
                                                            setDetail(true); 
                                                            setSaveId(f.id); 
                                                            dispatch(getOrderDetailByClassToFlightIdThunk(f.id))
                                                                .then(() => {
                                                                    setLoading(false); 
                                                                })
                                                                .catch(() => {
                                                                    setLoading(false); 
                                                                });
                                                        }}
                                                    >
                                                        <PeopleIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Chip 
                                                icon={<FlightTakeoffIcon />} 
                                                label={f.thisflight.flight.sourceNavigation.destination}
                                                variant="outlined"
                                                color="primary"
                                                className="flight-chip"
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Chip 
                                                icon={<FlightLandIcon />} 
                                                label={f.thisflight.flight.destinationNavigation.destination}
                                                variant="outlined"
                                                color="secondary"
                                                className="flight-chip"
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Chip 
                                                icon={<AirplaneTicketIcon />}
                                                label={f.class.description}
                                                variant="outlined"
                                                color={
                                                    f.class.description === 'ראשונה' ? 'success' : 
                                                    f.class.description === 'עסקים' ? 'primary' : 'default'
                                                }
                                                className="class-chip"
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Chip 
                                                icon={<EventIcon />} 
                                                label={f.thisflight.date}
                                                variant="outlined"
                                                className="flight-chip"
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Chip 
                                                icon={<AttachMoneyIcon />} 
                                                label={`₪${f.price}`}
                                                variant="outlined"
                                                className="price-chip"
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Chip 
                                                icon={<AirlineSeatReclineNormalIcon />} 
                                                label={`${f.numberOfSeats} (נמכרו: ${f.sold})`}
                                                variant="outlined"
                                                className="seats-chip"
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Chip 
                                                icon={<DiscountIcon />} 
                                                label={`₪${f.hanacha}`}
                                                variant="outlined"
                                                className="discount-chip"
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" className="no-data">
                                        לא נמצאו מחלקות לטיסות במערכת.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Dialog 
                open={detail} 
                onClose={() => setDetail(false)}
                maxWidth="md"
                fullWidth
                className="customers-dialog"
            >
                <DialogTitle className="dialog-title">
                    <Box className="dialog-title-content">
                        <Typography variant="h6">
                            לקוחות שהזמינו טיסה
                        </Typography>
                        <IconButton 
                            edge="start" 
                            color="inherit" 
                            onClick={() => setDetail(false)} 
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent dividers className="dialog-content">
                    {loading ? (
                        <Box className="customers-loading-container">
                            <Box className="customers-loading-spinner"></Box>
                        </Box>
                    ) : (
                        <TableContainer component={Paper} className="customers-table-container customers-fade-in">
                            <Table stickyHeader aria-label="טבלת לקוחות">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="table-header" align="right">שם</TableCell>
                                        <TableCell className="table-header" align="right">טלפון</TableCell>
                                        {!isMobile && <TableCell className="table-header" align="right">מייל</TableCell>}
                                        <TableCell className="table-header" align="right">כרטיסים</TableCell>
                                        {!isMobile && <TableCell className="table-header" align="right">משקל עודף</TableCell>}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderDetailByClassToFlight?.length > 0 ? (
                                        orderDetailByClassToFlight.map(o => 
                                            o.ordersDetails?.filter(od => od.idClassToFlight === saveId)?.map(od => (
                                                <TableRow key={od.id} className="table-row">
                                                    <TableCell align="right">
                                                        {o.idCustomerNavigation.firstName} {o.idCustomerNavigation.lastName}
                                                    </TableCell>
                                                    <TableCell align="right">{o.idCustomerNavigation.phone}</TableCell>
                                                    {!isMobile && <TableCell align="right">{o.idCustomerNavigation.email}</TableCell>}
                                                    <TableCell align="right">
                                                        <Chip 
                                                            icon={<AirplaneTicketIcon />} 
                                                            label={od.countTickets}
                                                            size="small"
                                                            variant="outlined"
                                                            color="primary"
                                                            className="flight-chip"
                                                        />
                                                    </TableCell>
                                                    {!isMobile && (
                                                        <TableCell align="right">
                                                            {od.countOverLoad > 0 ? (
                                                                <Chip 
                                                                    icon={<AttachMoneyIcon />} 
                                                                    label={`${od.countOverLoad} ק"ג`}
                                                                    size="small"
                                                                    variant="outlined"
                                                                    color="secondary"
                                                                    className="weight-chip"
                                                                />
                                                            ) : (
                                                                'אין'
                                                            )}
                                                        </TableCell>
                                                    )}
                                                </TableRow>)
                                          )
                                        )
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={isMobile ? 3 : 5} align="center" className="no-data">
                                                אין לקוחות שהזמינו טיסה זו
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </DialogContent>
            </Dialog>

            {classToFlightOpen && (
                <AddClassToFlight 
                    addCTFlight={addCTFlight} 
                    closeCtf={closeCtf} 
                    ctf={ctf} 
                    cls={ctf.class.description} 
                    thisFlt={thisFlt} 
                />
            )}
        </Container>
    );
};
