import { Navigate, Route, Routes } from "react-router-dom"
import { LogIn } from "../logIn/logIn"
import { LogOn } from "../logIn/logOn"
import { Home } from "../home/home"
import { Flights } from "../flights/flights"
import { HomeAbout } from "../home/homeAbout"
import { Classes } from "../classes/classes"
import { Calendar } from "../calander/calendar"
import { Find } from "../find/find"
import { FullFlight } from "../flights/fullFlight"
import { AddFlight } from "../handle/addFlight"
import { FlightDetails } from "../flights/flightDetails"
import { Destnation } from "../handle/destnation"
import { Flight } from "../handle/flight"
import { ThisFlight } from "../handle/thisFlight"
import { ClassToFlight } from "../handle/classToFlight"
import { Handle } from "../handle/handle"
import { Cart } from "../cart/cart"
import { FlightsWhisHanach } from "../flights/flightsWhisHanach"
import { OrderDetail } from "../orderDetail/orderDetail"
import { Pay } from "../cart/pay"
import { Customer } from "../handle/customer"
import { Orders } from "../handle/orders"
import { Order } from "../cart/order"
import NotFound from "../notFound/notFound"


export const Routing = () => {
    return <>
    <Routes>
        <Route path={'/home'} element={<Home />}></Route>
        <Route path={'/about'} element={<HomeAbout />}></Route>
        <Route path={'/logIn'} element={<LogIn />}></Route>
        <Route path={'/flights'} element={<Flights />}></Route>
        <Route path={'/addFlight'} element={<AddFlight />}></Route>
        <Route path={'/logOn'} element={<LogOn />}></Route>
        <Route path={'/chooseClass'} element={<Classes />}></Route>
        <Route path={'/calendar'} element={<Calendar />}></Route>
        <Route path={'/find'} element={<Find/>}></Route>
        <Route path={'/handle'} element={<Handle/>}></Route>
        <Route path={'/AllDestination'} element={<Destnation/>}></Route>
        <Route path={'/flightsWhisHanach'} element={<FlightsWhisHanach/>}></Route>
        <Route path={'/Allflight'} element={<Flight/>}></Route>
        <Route path={'/AllThisFlight/:id'} element={<ThisFlight/>}></Route>
        <Route path={'/AllClassToFlight/:id'} element={<ClassToFlight/>}></Route>
        <Route path={'/orderDetail'} element={<OrderDetail />}></Route>
        <Route path={'/fullFlight/:id'} element={<FullFlight/>}></Route>
        <Route path={'/flightDetail/:classs/:id/:numberOfSeats'} element={<FlightDetails/>}></Route>
        <Route path={'/cart'} element={<Cart/>}></Route>
        <Route path={'/pay'} element={<Pay/>}></Route>
        <Route path={'/customer'} element={<Customer/>}></Route>
        <Route path={'/orders'} element={<Orders/>}></Route>
        <Route path={'/orderAfterPay'} element={<Order/>}></Route>
        <Route path="*" element={<NotFound />} />





        <Route path={''} element={<Navigate to="about"></Navigate>}></Route>
    </Routes>
    </>
}