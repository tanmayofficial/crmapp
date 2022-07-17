import { CSidebar, CSidebarNav, CSidebarToggler, CSidebarBrand, CNavItem, CNavTitle } from '@coreui/react';
import { isDisabled } from '@testing-library/user-event/dist/utils';
// import { CNavTitle, CIcon, CBadge } from '@coreui/react/dist/components';

function Sidebar() {
    const backToLogin = () =>{
        window.location.href = '/';
        localStorage.clear();
    }

    return (
        <div>
            <CSidebar unfoldable className='bg-black vh-100'>
                <CSidebarNav>
                    <CNavItem className='bg-dark text-center d-flex p-2'>
                        <i className='bi bi-bar-chart-fill m-2 p-2'></i>
                        <h5 className='mx-4 my-1 p-2 fw-bolder' >TETHERX</h5>
                    </CNavItem>
                    <CNavTitle className='text-center'>
                        A CRM App for all your needs..
                    </CNavTitle>
                    <CNavItem className='d-flex cursor-pointer p-2'>
                        <i className="bi bi-box-arrow-left m-2 p-2"></i>
                        <div className='mx-5 my-1 fw-bold p-2' onClick={backToLogin}>Logout</div>
                    </CNavItem>

                </CSidebarNav>
                <CSidebarToggler />
            </CSidebar>
        </div>
    )
}

export default Sidebar