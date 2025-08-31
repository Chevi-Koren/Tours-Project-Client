import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  IconButton, 
  Fab, 
  Avatar, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Collapse,
  Zoom,
  Divider
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import "./ChatBot.css";

export const ChatBot = () => {
  const flightsArr = useSelector(state => state.flights.flightsArr);
  const destinations = useSelector(state => state.flights.destinitions);
  const classes = useSelector(state => state.classs.classes);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "שלום! אני הצ'אטבוט של חברת התעופה. איך אוכל לעזור לך היום?", sender: "bot" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  
  const getBotResponse = (msg) => {
    const text = msg.trim().toLowerCase();
    if (text.includes("טיסה") || text.includes("טיסות")) {
      if (flightsArr && flightsArr.length > 0) {
        return {
          text: `יש לנו ${flightsArr.length} טיסות זמינות. רוצה לראות את כולן? לחץ כאן.`,
          action: () => navigate('/flights')
        };
      } else {
        return { text: "כרגע אין טיסות זמינות." };
      }
    }
    if (text.includes("שעה") || text.includes("זמן") || text.includes("מתי")) {
      return { text: "אתה יכול לראות את שעות הטיסות בדף הטיסות. רוצה לעבור לשם?", action: () => navigate('/flights') };
    }
    if (text.includes("יעד") || text.includes("יעדים") || text.includes("לאן")) {
      if (destinations && destinations.length > 0) {
        const destList = destinations.slice(0,5).map(d => d.destination).join(", ");
        return { text: `היעדים הפופולריים שלנו: ${destList}. רוצה לראות את כל היעדים? לחץ כאן.`, action: () => navigate('/AllDestination') };
      } else {
        return { text: "כרגע אין יעדים זמינים." };
      }
    }
    if (text.includes("מבצע") || text.includes("הנחה") || text.includes("מחיר")) {
      return { text: "תוכל לראות את כל המבצעים בדף המבצעים. רוצה לעבור לשם?", action: () => navigate('/flightsWhisHanach') };
    }
    if (text.includes("אתר") || text.includes("מידע") || text.includes("עזרה") || text.includes("איך")) {
      return { text: "זהו אתר להזמנת טיסות, מחלקות, מבצעים ויעדים. רוצה עזרה נוספת?" };
    }
    if (text.includes("מחלקה") || text.includes("מחלקות")) {
      if (classes && classes.length > 0) {
        const classList = classes.slice(0,3).map(c => c.className).join(", ");
        return { text: `המחלקות שלנו: ${classList}. רוצה לראות את כולן? לחץ כאן.`, action: () => navigate('/chooseClass') };
      } else {
        return { text: "כרגע אין מחלקות זמינות." };
      }
    }
    return { text: "לא הבנתי את השאלה, נסה לשאול על טיסות, יעדים, שעות, מחלקות או מבצעים." };
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user"
    };
    setMessages([...messages, userMessage]);
    setNewMessage("");
    setTimeout(() => {
      const botRes = getBotResponse(userMessage.text);
      const botMessage = {
        id: messages.length + 2,
        text: botRes.text,
        sender: "bot",
        action: botRes.action || null
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 700);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Box className="chatbot-container">
      <Zoom in={!isOpen}>
        <Fab 
          color="primary" 
          aria-label="chat"
          className="chat-toggle-button"
          onClick={toggleChat}
        >
          <ChatIcon />
        </Fab>
      </Zoom>
      
      <Collapse in={isOpen} className="chat-window-collapse">
        <Paper elevation={3} className="chat-window">
          <Box className="chat-header">
            <Box className="header-title">
              <SmartToyIcon className="header-icon" />
              <Typography variant="h6">צ'אטבוט גלובוס</Typography>
            </Box>
            <IconButton 
              size="small" 
              onClick={toggleChat}
              className="close-button"
            >
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Divider />
          
          <List className="chat-messages">
            {messages.map((message) => (
              <ListItem 
                key={message.id} 
                className={`message-item ${message.sender === "bot" ? "bot-message" : "user-message"}`}
                onClick={() => message.action && message.action()}
                style={message.action ? { cursor: 'pointer', background: '#e3f2fd' } : {}}
              >
                <ListItemAvatar className="message-avatar">
                  <Avatar className={message.sender === "bot" ? "bot-avatar" : "user-avatar"}>
                    {message.sender === "bot" ? <SmartToyIcon /> : <PersonIcon />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={
                    <Typography 
                      variant="body1" 
                      className="message-text"
                      style={message.action ? { textDecoration: 'underline', color: '#1976d2' } : {}}
                    >
                      {message.text}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
          
          <Divider />
          
          <Box className="chat-input">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="הקלד הודעה..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              size="small"
              InputProps={{
                className: "input-field"
              }}
            />
            <IconButton 
              color="primary" 
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ""}
              className="send-button"
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Collapse>
    </Box>
  );
};