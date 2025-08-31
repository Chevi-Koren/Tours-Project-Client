import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loct, setUserId } from "../../redux/slices/user/userSlice";
import { getAllCustomersThunk } from "../../redux/slices/flight/getAllCustomersThunk";
import { OrderDetail } from "../orderDetail/orderDetail";
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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import "./customer.css";

export const Customer = () => {
  const dispatch = useDispatch();
  const [ord, setOrd] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  const customers = useSelector(state => state.flights.customers);

  useEffect(() => {
    setLoading(true); 
    dispatch(loct("/customer"));
    dispatch(getAllCustomersThunk())
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const filteredCustomers = customers?.filter(customer => 
    customer.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.includes(searchTerm)
  );

  const handleOpenOrders = (customerId) => {
    dispatch(setUserId(customerId));
    setOrd(true);
  };

  const handleRefresh = () => {
    setLoading(true);
    dispatch(getAllCustomersThunk())
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <Container className="customer-container">
        <Paper elevation={3} className="customer-paper">
          <Box className="customer-header">
            <Typography variant="h4" component="h1" className="customer-title">
              ניהול לקוחות
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
    <Container className="customer-container">
      <Paper elevation={3} className="customer-paper content-fade-in">
        <Box className="customer-header">
          <Typography variant="h4" component="h1" className="customer-title">
            ניהול לקוחות
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="חיפוש לקוח..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-field"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button 
              variant="outlined" 
              color="primary" 
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              className="add-button"
            >
              רענן
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper} className="table-container">
          <Table aria-label="customers table">
            <TableHead>
              <TableRow>
                <TableCell align="right" className="table-header">פעולות</TableCell>
                <TableCell align="right" className="table-header">
                  <Box className="header-with-icon">
                    <PersonIcon fontSize="small" />
                    <span>שם מלא</span>
                  </Box>
                </TableCell>
                <TableCell align="right" className="table-header">
                  <Box className="header-with-icon">
                    <PhoneIcon fontSize="small" />
                    <span>טלפון</span>
                  </Box>
                </TableCell>
                <TableCell align="right" className="table-header">
                  <Box className="header-with-icon">
                    <EmailIcon fontSize="small" />
                    <span>אימייל</span>
                  </Box>
                </TableCell>
                <TableCell align="right" className="table-header">
                  <Box className="header-with-icon">
                    <VpnKeyIcon fontSize="small" />
                    <span>סיסמה</span>
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers?.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} className="table-row">
                    <TableCell align="right">
                      <Tooltip title="צפה בהזמנות" arrow>
                        <IconButton 
                          color="primary"
                          onClick={() => handleOpenOrders(customer.id)}
                          size="small"
                          className="view-button"
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="right">
                      <Chip 
                        icon={<PersonIcon />} 
                        label={`${customer.firstName} ${customer.lastName}`}
                        variant="outlined"
                        color="primary"
                        className="customer-chip"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Chip 
                        icon={<PhoneIcon />} 
                        label={customer.phone}
                        variant="outlined"
                        className="phone-chip"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Chip 
                        icon={<EmailIcon />} 
                        label={customer.email}
                        variant="outlined"
                        className="email-chip"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Chip 
                        icon={<VpnKeyIcon />} 
                        label={customer.password}
                        variant="outlined"
                        color="secondary"
                        className="customer-chip"
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" className="no-data">
                    {customers?.length > 0 ? 'לא נמצאו לקוחות התואמים לחיפוש' : 'אין לקוחות להצגה'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog 
        open={ord} 
        onClose={() => setOrd(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle className="dialog-title">
          <Typography variant="h6">פרטי הזמנות</Typography>
        </DialogTitle>
        <DialogContent className="dialog-content">
          <OrderDetail />
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setOrd(false)}
          >
            סגור
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};