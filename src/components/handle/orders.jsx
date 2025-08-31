import { useEffect, useState } from "react";
import { getAllOrdersThunk } from "../../redux/slices/flight/getAllOrdersThunk";
import { useDispatch, useSelector } from "react-redux";
import { 
  Container, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Chip,
  Divider,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  CircularProgress
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import EventIcon from '@mui/icons-material/Event';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LuggageIcon from '@mui/icons-material/Luggage';
import PaidIcon from '@mui/icons-material/Paid';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import "./orders.css";

export const Orders = () => {
  const dispatch = useDispatch();
  const ordersFromServer = useSelector(state => state.flights.ordersFromServer);
  const [orderDetailOpen, setOrderDetailOpen] = useState(false);
  const [orderDetail, setOrderDetail] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
     
        await dispatch(getAllOrdersThunk());
      setLoading(false);
    };
    fetchOrders();
  }, [dispatch]);

  const handleOpenDetails = (order) => {
    setOrderDetail(order.ordersDetails);
    setSelectedOrder(order);
    setOrderDetailOpen(true);
  };

  const handleCloseDetails = () => {
    setOrderDetailOpen(false);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('he-IL', options);
  };

  return (
    <Container className="orders-container">
      <Paper elevation={3} className="orders-paper">
        <Typography variant="h4" component="h1" className="orders-title">
          ניהול הזמנות
        </Typography>
        <Divider className="orders-divider" />

        {loading ? (
              <Container className="class-to-flight-container">
                      
                      <div className="loading-spinner-container">
                          <div className="loading-spinner"></div>
                      </div>
              </Container>
        ) : (
          <TableContainer component={Paper} className="table-container">
            <Table aria-label="orders table">
              <TableHead>
                <TableRow>
                  <TableCell align="right" className="table-header">
                    <Box className="header-with-icon">
                      <PersonIcon fontSize="small" />
                      <span>שם לקוח</span>
                    </Box>
                  </TableCell>
                  <TableCell align="right" className="table-header">
                    <Box className="header-with-icon">
                      <CalendarTodayIcon fontSize="small" />
                      <span>תאריך</span>
                    </Box>
                  </TableCell>
                  <TableCell align="right" className="table-header">
                    <Box className="header-with-icon">
                      <PaidIcon fontSize="small" />
                      <span>מחיר</span>
                    </Box>
                  </TableCell>
                  <TableCell align="right" className="table-header">פעולות</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ordersFromServer?.map((order) => (
                  <TableRow key={order.id} className="table-row">
                    <TableCell align="right" className="customer-name-cell">
                      <Chip 
                        icon={<PersonIcon />} 
                        label={`${order.idCustomerNavigation.firstName} ${order.idCustomerNavigation.lastName}`}
                        variant="outlined"
                        className="customer-chip"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Chip 
                        icon={<CalendarTodayIcon />} 
                        label={formatDate(order.date)}
                        variant="outlined"
                        className="date-chip"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Chip 
                        icon={<PaidIcon />} 
                        label={`₪${order.price}`}
                        color="primary"
                        variant="outlined"
                        className="price-chip"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="צפייה בפרטי הזמנה" arrow>
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<VisibilityIcon />}
                          onClick={() => handleOpenDetails(order)}
                          className="view-details-button"
                        >
                          פרטי הזמנה
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
                {(!ordersFromServer || ordersFromServer.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={4} align="center" className="no-data">
                      לא נמצאו הזמנות במערכת.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Dialog
        open={orderDetailOpen}
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
        className="order-dialog"
      >
        <DialogTitle className="dialog-title">
          <Box className="dialog-title-content">
            <Typography variant="h6">
              פרטי הזמנה
              {selectedOrder && (
                <Chip 
                  label={`מספר הזמנה: ${selectedOrder.id}`}
                  color="primary"
                  size="small"
                  className="order-id-chip"
                />
              )}
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseDetails}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent className="dialog-content">
          {selectedOrder && (
            <Box className="order-summary">
              <Typography variant="subtitle1" className="summary-title">
                פרטי לקוח:
              </Typography>
              <Box className="summary-content">
                <Chip 
                  icon={<PersonIcon />} 
                  label={`${selectedOrder.idCustomerNavigation.firstName} ${selectedOrder.idCustomerNavigation.lastName}`}
                  variant="outlined"
                  className="summary-chip"
                />
                <Chip 
                  icon={<CalendarTodayIcon />} 
                  label={formatDate(selectedOrder.date)}
                  variant="outlined"
                  className="summary-chip"
                />
                <Chip 
                  icon={<PaidIcon />} 
                  label={`סה"כ: ₪${selectedOrder.price}`}
                  color="primary"
                  className="summary-chip"
                />
              </Box>
            </Box>
          )}
          
          <Typography variant="subtitle1" className="details-title">
            פרטי כרטיסים:
          </Typography>
          
          {orderDetail.length > 0 ? (
            <Grid container spacing={3}>
              {orderDetail.map((detail) => (
                <Grid item xs={12} key={detail.id}>
                  <Card className="detail-card">
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Box className="detail-item">
                            <FlightTakeoffIcon color="primary" className="detail-icon" />
                            <Typography variant="body1">
                              <strong>טיסה:</strong> {detail.idClassToFlightNavigation.thisflight.flight.sourceNavigation.destination} - {detail.idClassToFlightNavigation.thisflight.flight.destinationNavigation.destination}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box className="detail-item">
                            <EventIcon color="primary" className="detail-icon" />
                            <Typography variant="body1">
                              <strong>תאריך ושעה:</strong> {detail.idClassToFlightNavigation.thisflight.time}, {detail.idClassToFlightNavigation.thisflight.date}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box className="detail-item">
                            <AirlineSeatReclineNormalIcon color="primary" className="detail-icon" />
                            <Typography variant="body1">
                              <strong>מחלקה:</strong> {detail.idClassToFlightNavigation.class.description}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box className="detail-item">
                            <ConfirmationNumberIcon color="primary" className="detail-icon" />
                            <Typography variant="body1">
                              <strong>מספר כרטיסים:</strong> {detail.countTickets}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box className="detail-item">
                            <LuggageIcon color="primary" className="detail-icon" />
                            <Typography variant="body1">
                              <strong>משקל עודף:</strong> {detail.countOverLoad} ק"ג
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box className="detail-item">
                            <PaidIcon color="primary" className="detail-icon" />
                            <Typography variant="body1">
                              <strong>מחיר:</strong> ₪{detail.price}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" align="center" className="no-details">
              אין פרטי הזמנה זמינים
            </Typography>
          )}
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button 
            onClick={handleCloseDetails} 
            color="primary" 
            variant="contained"
            className="close-dialog-button"
          >
            סגור
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};