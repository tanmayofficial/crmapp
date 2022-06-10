
import React from 'react'
import Sidebar from '../component/Sidebar'

function Admin() {
  return (
    <div>
      <div className="row">
        <div className="col-1">
          <Sidebar />
        </div>
        <div className="container m-1">
          <h3 className="text-primary text-center">
            Welcome Admin
          </h3>
          <p className="text-muted text-center">
            Take a look at your stats below
          </p>

          {/* STATS CARD STARTS HERE */}
          <div className="row my-3">

          </div>

        </div>
      </div>
    </div>
  )
}

export default Admin