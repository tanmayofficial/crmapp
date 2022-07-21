import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import Login from "./pages/Login";
import Customer from './pages/Customer';
import Engineer from './pages/Engineer';
import Admin from './pages/Admin';
import NotFound from './component/NotFound';
import Unauthorized from './component/Unauthorized';
import RequireAuth from './component/RequireAuth';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import './App.css';

const ROLES = {
  'CUSTOMER': 'CUSTOMER',
  'ENGINEER': 'ENGINEER',
  'ADMIN': 'ADMIN'
}

function App() {
  return (

    <Router>
      <Routes>
        <Route exact path='/' element={
          <Suspense fallback={<div><Spinner animation="grow" /></div>}>
            <Login />
          </Suspense>
        } />

        {/* <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />} > */}
          <Route path='/admin' exact element={<Admin />} />
        {/* </Route> */}

        <Route element={<RequireAuth allowedRoles={[ROLES.ENGINEER]} />} >
          <Route path='/engineer' element={<Engineer />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.CUSTOMER]} />} >
          <Route path='/Customer' element={<Customer />} />
        </Route>

        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </Router>

  )
}
export default App;