import React from 'react'
import { CSidebar, CSidebarBrand, CSidebarNav, CNavTitle, CNavItem, CSidebarToggler } from '@coreui/react'


function Sidebar() {
    return (
        <CSidebar unfoldabe className='bg-black vh-100'>
            <CSidebarBrand>Sidebar Brand</CSidebarBrand>
            <CSidebarNav>
                <CNavTitle>CRM APP</CNavTitle>
                <CNavItem className='bg-dark text-center d-flex' href="#">
                    <i className="bi bi-bar-chart-fill m-2"></i>
                    <h5 className='mx-5 my-1 fw-bolder'>TETHER</h5>
                    
                </CNavItem>

                <CNavItem className='d-flex' href="#">

                    <i className="bi bi-box-arrow-left m-2"></i>
                    <div className="mx-5 my-1">Logout</div>
                </CNavItem>

            </CSidebarNav>
            <CSidebarToggler />
        </CSidebar>
    )
}

export default Sidebar