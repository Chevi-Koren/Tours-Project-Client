import { useState } from "react";
import { Destnation } from "./destnation";
import { ClassToFlight } from "./classToFlight";
import { Flight } from "./flight";
import { ThisFlight } from "./thisFlight";
import { Customer } from "./customer";
import { Orders } from "./orders";
import { 
  AppBar, 
  Tabs, 
  Tab, 
  Box, 
  Container, 
  Paper,
  Typography,
  Divider
} from "@mui/material";
import FlightIcon from '@mui/icons-material/Flight';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import "./handle.css";

export const Handle = () => {
  const [flt, setFlt] = useState(false);
  const [des, setDes] = useState(true);
  const [thisFlt, setThisFlt] = useState(false);
  const [classToFlt, setClassToFlt] = useState(false);
  const [customer, setCustomer] = useState(false);
  const [orders, setOrders] = useState(false);

  const getActiveTabIndex = () => {
    if (des) return 0;
    if (flt) return 1;
    if (thisFlt) return 2;
    if (classToFlt) return 3;
    if (customer) return 4;
    if (orders) return 5;
    return 0;
  };

  const handleTabChange = (event, newValue) => {
    setFlt(false);
    setDes(false);
    setThisFlt(false);
    setClassToFlt(false);
    setCustomer(false);
    setOrders(false);

    switch (newValue) {
      case 0:
        setDes(true);
        break;
      case 1:
        setFlt(true);
        break;
      case 2:
        setThisFlt(true);
        break;
      case 3:
        setClassToFlt(true);
        break;
      case 4:
        setCustomer(true);
        break;
      case 5:
        setOrders(true);
        break;
      default:
        setDes(true);
    }
  };

  return (
    <Container className="admin-container">
      <Paper elevation={3} className="admin-paper">
        <Typography variant="h4" component="h1" className="admin-title">
          ניהול מערכת
        </Typography>
        <Divider className="admin-divider" />
        
        <AppBar position="static" color="default" elevation={0} className="tabs-bar">
          <Tabs
            value={getActiveTabIndex()}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            indicatorColor="primary"
            textColor="primary"
            className="admin-tabs"
          >
            <Tab 
              icon={<LocationOnIcon />} 
              label="יעדים" 
              className="admin-tab" 
              id="tab-0"
              aria-controls="tabpanel-0"
            />
            <Tab 
              icon={<FlightIcon />} 
              label="טיסות" 
              className="admin-tab" 
              id="tab-1"
              aria-controls="tabpanel-1"
            />
            <Tab 
              icon={<AirplaneTicketIcon />} 
              label="טיסות ספציפיות" 
              className="admin-tab" 
              id="tab-2"
              aria-controls="tabpanel-2"
            />
            <Tab 
              icon={<AirlineSeatReclineNormalIcon />} 
              label="מחלקות טיסה" 
              className="admin-tab" 
              id="tab-3"
              aria-controls="tabpanel-3"
            />
            <Tab 
              icon={<PeopleIcon />} 
              label="לקוחות" 
              className="admin-tab" 
              id="tab-4"
              aria-controls="tabpanel-4"
            />
            <Tab 
              icon={<ReceiptIcon />} 
              label="הזמנות" 
              className="admin-tab" 
              id="tab-5"
              aria-controls="tabpanel-5"
            />
          </Tabs>
        </AppBar>
        
        <Box className="tab-content">
          {des && <Destnation />}
          {flt && <Flight />}
          {thisFlt && <ThisFlight />}
          {classToFlt && <ClassToFlight />}
          {customer && <Customer />}
          {orders && <Orders />}
        </Box>
      </Paper>
    </Container>
  );
};