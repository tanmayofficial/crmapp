import {
  CSidebar,
  CSidebarNav,
  CSidebarToggler,
  CSidebarBrand,
  CNavItem,
  CNavTitle,
} from "@coreui/react";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { Link } from "react-router-dom";
// import { CNavTitle, CIcon, CBadge } from '@coreui/react/dist/components';

function Sidebar() {
  const backToLogin = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <CSidebar unfoldable className="bg-black vh-100">
      <CSidebarNav>
        <CNavItem className="bg-dark text-center d-flex">
          <i className="bi bi-bar-chart-fill m-2"></i>
          <h5 className="mx-5 my-1 fw-bolder">TETHERX</h5>
        </CNavItem>
        <CNavTitle className="">A CRM App for all your needs...</CNavTitle>
        <CNavItem className="d-flex">
          <i className="bi bi-box-arrow-left m-2"></i>
          <Link to="/admin" className="text-decoration-none">
            <span className="mx-5 my-1">Home</span>
          </Link>
        </CNavItem>
        <CNavItem className="d-flex">
          <i className="bi bi-box-arrow-left m-2"></i>
          <span className="mx-5 my-1" onClick={backToLogin}>
            Logout
          </span>
        </CNavItem>

        {/* {usertype && ()} */}
      </CSidebarNav>
    </CSidebar>
  );
}

export default Sidebar;
