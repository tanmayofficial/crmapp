import Sidebar from '../component/Sidebar';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import MaterialTable from '@material-table/core';
import 'react-circular-progressbar/dist/styles.css';
import '../styles/admin.css'


// access: can view all users
// approve/decline/assign => change the status
// status/view of tickets


function Admin() {
  return (
    <div className='bg-dark vh-100'>
      <div className="row">
        <div className="col">
          <Sidebar />
        </div>
        <div className="container m-2">
          <h3 className="text-light text-center">Aila re Aila</h3>
          <p className="text-center text-secodary">Look at your analytics</p>

          {/* Card Starts */}
          <div className="row my-2 mx-2 text-center">
            <div className="col my-1">
              <div className="card bg-opacity-25 border-bottom-5 card-custom">
                <div className="carbody">
                  <h5 className="card-subtitle">
                    <i className="bi bi-pen text-primary mx-2"></i>
                    OPEN
                  </h5>
                  <hr />
                  <div className="row">
                    <div className="col text-center">8</div>
                    <div className="col">
                      <div style={{ width: 60, height: 70 }}>
                        <CircularProgressbar value={50} text={50 + '%'} styles={buildStyles({
                          textColor: 'blue',
                          pathColor: 'darkBlue',
                        })} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="col my-1">
              <div className="card bg-opacity-25 border-bottom-5 card-custom">
                <div className="carbody">
                  <h5 className="card-subtitle">
                    <i className="bi bi-pen text-primary mx-2"></i>
                    PENDING
                  </h5>
                  <hr />
                  <div className="row">
                    <div className="col text-center">2</div>
                    <div className="col">
                      <div style={{ width: 60, height: 70 }}>
                        <CircularProgressbar value={20} text={20 + '%'} styles={buildStyles({
                          textColor: 'blue',
                          pathColor: 'darkBlue',
                        })} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            <div className="col my-1">
              <div className="card bg-opacity-25 border-bottom-5 card-custom">
                <div className="carbody">
                  <h5 className="card-subtitle">
                    <i className="bi bi-pen text-primary mx-2"></i>
                    RESSOLVED
                  </h5>
                  <hr />
                  <div className="row">
                    <div className="col text-center">35</div>
                    <div className="col">
                      <div style={{ width: 60, height: 70 }}>
                        <CircularProgressbar value={90} text={90 + '%'} styles={buildStyles({
                          textColor: 'blue',
                          pathColor: 'darkBlue',
                        })} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          <hr />
          <MaterialTable columns={[
            { title: 'UserId', field: 'userId' },
            { title: 'Name', field: 'name' },
            {
              title: 'Status', field: 'status',
              lookup: {
                'APPROVED': 'APPROVED',
                'PENDING': 'PENDING',
                'REJECT': 'REJECT'
              }
            }
          ]}
            data={[{ name: 'Mehmet', status: 'PENDING' }]}
            title="User Details" />

        </div>
      </div>
    </div>
  )
}

export default Admin;