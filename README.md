# Tours Project Client

A modern, responsive web application for flight booking and travel management, designed for travel agencies and airlines. Built with React, Redux, and Material-UI, the project provides a seamless user experience for searching, booking, and managing flights.

---

## Features

- **User Registration & Login:**  
  Multi-step registration, secure login, session management, and user profile.

- **Flight Search & Booking:**  
  Browse available flights, filter by class, date, and destination, and add flights to cart.

- **Calendar View:**  
  Visual monthly calendar with flight availability, highlighting current and out-of-month days.

- **Cart & Order Management:**  
  View, edit, and confirm flight orders. Integrated payment process with error handling.

- **Order Summary & PDF Export:**  
  Professional English PDF generation of order details for download or print.

- **ChatBot Assistant:**  
  Interactive chatbot for quick help, navigation, and FAQs.

- **Responsive Design:**  
  Fully optimized for desktop and mobile devices.

- **Admin Features:**  
  (Optional) System management for admins: manage flights, deals, and users.

---

## Technologies

- **Frontend:** React, Redux, React Router, Material-UI
- **State Management:** Redux Toolkit
- **Styling:** CSS, Material-UI theming
- **PDF Generation:** jsPDF
- **Session Management:** sessionStorage
---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Chevi-Koren/Tours-Project-Client.git
   cd tours-project-client
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
src/
  components/      # React components (Calendar, Cart, LogIn, Home, ChatBot, etc.)
  redux/           # Redux slices, thunks, and store configuration
  assets/          # Images, icons, and static files
  App.js           # Main app component and routing
  index.js         # Entry point
public/
  logo-globus.html # Static logo or branding
.gitignore         # Ignored files and folders
README.md          # Project documentation
```

---

## Customization

- **Branding:**  
  Update `public/logo-globus.html` and other assets for your agency.
- **API Integration:**  
  Connect to your backend for real-time flight data and user management.
- **Admin Panel:**  
  Extend admin features for flight and user management.

---

## Contact

For questions or support, please contact: chevi4564@gmail.com

---

**TOURS – Your Journey, Our Passion**

# Tours-Project-Client