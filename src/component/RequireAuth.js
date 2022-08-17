import { useLocation, Outlet, Navigate } from "react-router-dom";

//admin, customer, engineer
const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();

  return (
    // wrap this condition with status = logged in
    localStorage.getItem("userTypes") === allowedRoles[0] ? ( // admin // customer // engineer
      //Outlet - A child route with no path that renders in the parent's outlet at the parent's URL or in other words, outlet will allow us to have any component on top of it like 'lorem ipsum'
      <Outlet />
    ) : localStorage.getItem("userTypes") ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    )
  );
};

// /admin
// /customer : replace => /unauthorised

export default RequireAuth;
