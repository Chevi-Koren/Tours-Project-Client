import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByCustomerThunk } from "../../redux/slices/flight/getAllOrdersByCustomerThunk";
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
  Alert,
  Tooltip
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import EventIcon from '@mui/icons-material/Event';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LuggageIcon from '@mui/icons-material/Luggage';
import PaidIcon from '@mui/icons-material/Paid';
import CloseIcon from '@mui/icons-material/Close';
import "./orderDetail.css";

export const OrderDetail = () => {
  const ordersByCustomer = useSelector(state => state.flights.ordersByCustomer);
  const userId = useSelector(state => state.users.userId);
  const [orderDetailOpen, setOrderDetailOpen] = useState(false);
  const [orderDetail, setOrderDetail] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true); 
  const dispatch = useDispatch();

  useEffect(() => {

    setLoading(true); 
    dispatch(getAllOrdersByCustomerThunk(userId))
      .then(() => {
        setTimeout(() => setLoading(false), 800);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch, userId]);

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

  if (loading) {
    return (
      <Container className="order-detail-container">
        <Paper elevation={3} className="order-paper">
          <Typography variant="h4" component="h1" className="order-title">
            ההזמנות שלי
          </Typography>
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        </Paper>
      </Container>
    );
  }

  return (
    <Container className="order-detail-container">

      <Paper elevation={3} className="order-paper fade-in">
        <Typography variant="h4" component="h1" className="order-title">
          ההזמנות שלי
        </Typography>

        {ordersByCustomer.length === 0 ? (
          <Alert severity="info" className="no-orders-alert">
            אין הזמנות רלוונטיות
          </Alert>
        ) : (
          <TableContainer component={Paper} className="table-container">
            <Table aria-label="orders table">
              <TableHead>
                <TableRow>
                  <TableCell align="right" className="table-header">שם לקוח</TableCell>
                  <TableCell align="right" className="table-header">תאריך</TableCell>
                  <TableCell align="right" className="table-header">מחיר</TableCell>
                  <TableCell align="right" className="table-header">פעולות</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ordersByCustomer?.map((order) => (
                  <TableRow key={order.id} className="table-row">
                    <TableCell align="right">
                      {order.idCustomerNavigation.firstName} {order.idCustomerNavigation.lastName}
                    </TableCell>
                    <TableCell align="right">{formatDate(order.date)}</TableCell>
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
            <Typography variant="body1" align="center">

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