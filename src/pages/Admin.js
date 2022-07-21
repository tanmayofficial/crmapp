import Sidebar from '../component/Sidebar';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import MaterialTable from '@material-table/core';
import { useState, useEffect } from 'react';
import { fetchTicket, ticketCreation, ticketUpdation } from '../api/tickets';
import { getAllUsers, updateUserData } from '../api/user';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import { ExportPdf, ExportCsv } from '@material-table/exporters';
import 'react-circular-progressbar/dist/styles.css';
import '../styles/admin.css'

// access: can view all users
// approve/decline/assign => change the status
// status/view of tickets

function Admin() {
  const [userModal, setUserModal] = useState(false);
  const [ticketList, setTicketList] = useState([])
  const [userDetails, setUserDetails] = useState([])
  const [ticketDetails, setTicketDetails] = useState({})
  const [selectedCurrTicket, setSelectedCurrTicket] = useState({})

  const openUserModal = () => {
    setUserModal(true);
  }
  const closeUserModal = () => {
    setUserModal(false);
  }
  const fetchAllTickets = () => {
    fetchTicket().then((res) => {
      if (res.status === 200) {
        console.log(res);
        setTicketList(res.data);
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  const fetchAllUsers = (userId) => {
    getAllUsers(userId).then((res) => {
      if (res.status === 200) {
        if (userId) {
          setUserDetails(res.data);
        } else {
          setUserDetails(res.data);
        }
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    (async () => {
      fetchAllTickets()
      fetchAllUsers()
    })()
  }, [])

  const updateTicket = () => {
    ticketUpdation(id, selectedCurrTicket).then((res) => {
      console.log('ticket updated succesfully');
    })
  }

  const editTicket = (ticketId) => {
    setUserModal(true)

    const ticket = {
      assignee: ticketDetails.assignee,
      description: ticketDetails.description,
      id: ticketDetails.id,
      reporter: ticketDetails.reporter,
      status: ticketDetails.status,
      title: ticketDetails.title,
      ticketPriority: ticketDetails.ticketPriority
    }

    setSelectedCurrTicket(ticket)
  }


  return (
    <div className='bg-dark vh-100'>

      <div className="row">
        <div className="col-1">
          <Sidebar />
        </div>
        <div className="container col">
          <h3 className="text-light text-center">Admin Aila</h3>
          <p className="text-center text-secodary">Look at your analytics</p>

          {/* Card Starts */}
          <div className="row">
            <div className="col">
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

            <div className="col">
              <div className="card bg-opacity-25 border-bottom-5 card-custom">
                <div className="carbody">
                  <h5 className="card-subtitle">
                    <i className="bi bi-pen text-primary mx-2"></i>
                    CLOSE
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

            <div className="col">
              <div className="card bg-opacity-25 border-bottom-5 card-custom">
                <div className="carbody">
                  <h5 className="card-subtitle">
                    <i className="bi bi-pen text-primary mx-2"></i>
                    IN_PROGRESS
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

            <div className="col">
              <div className="card bg-opacity-25 border-bottom-5 card-custom">
                <div className="carbody">
                  <h5 className="card-subtitle">
                    <i className="bi bi-pen text-primary mx-2"></i>
                    BLOCKED
                  </h5>
                  <hr />
                  <div className="row">
                    <div className="col text-center">5</div>
                    <div className="col">
                      <div style={{ width: 60, height: 70 }}>
                        <CircularProgressbar value={10} text={10 + '%'} styles={buildStyles({
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
          <div className="container">
            <MaterialTable
              onRowClick={(rowData) => { editTicket(rowData.userId) }}
              columns={[
                { title: 'Ticket Id', field: 'id' },
                { title: 'Title', field: 'title' },
                { title: 'Description', field: 'description' },
                { title: 'Reporter', field: 'reporter' },
                { title: 'Assignee', field: 'assignee' },
                { title: 'TicketPriority', field: 'ticketPriority' },
                {
                  title: 'Status', field: 'status',
                  lookup: {
                    'OPEN': 'OPEN',
                    'IN_PROGRESS': 'IN_PROGRESS',
                    'CLOSED': 'CLOSED',
                    'BLOCKED': 'BLOCKED'
                  }
                }
              ]}
              data={ticketList}

              options={{
                filtering: true,
                sorting: true,
                exportMenu: [{
                  label: 'Export PDF',
                  exportFunc: (cols, datas) => ExportPdf(cols, datas, 'UserRecords')
                }, {
                  label: 'Export CSV',
                  exportFunc: (cols, datas) => ExportCsv(cols, datas, 'userRecords')
                }],
                headerStyle: {
                  backgroundColor: 'darkblue',
                  color: '#FFF'
                },
                rowStyle: {
                  backgroundColor: '#EEE',
                }
              }}
              title="Ticket Details" />
          </div>

          <hr />

          <div className="container">
            <MaterialTable
              onRowClick={(rowData, userId) => updateTicket(rowData.userId)}
              columns={[
                { title: 'User Id', field: 'userId' },
                { title: 'Name', field: 'name' },
                { title: 'Email', field: 'email' },
                {
                  title: 'User Types', field: 'userTypes',
                  lookup: {
                    'APPROVED': 'APPROVED',
                    'PENDING': 'PENDING',
                    'REJECTED': 'REJECTED'
                  }
                },
                {
                  title: 'Status', field: 'userStatus',
                  lookup: {
                    'CUSTOMER': 'CUSTOMER',
                    'ENGINEER': 'ENGINEER',
                    'ADMIN': 'ADMIN'
                  }
                }
              ]}
              data={userDetails}

              options={{
                filtering: true,
                sorting: true,
                exportMenu: [{
                  label: 'Export PDF',
                  exportFunc: (cols, datas) => ExportPdf(cols, datas, 'UserRecords')
                }, {
                  label: 'Export CSV',
                  exportFunc: (cols, datas) => ExportCsv(cols, datas, 'userRecords')
                }],
                headerStyle: {
                  backgroundColor: 'darkblue',
                  color: '#FFF'
                },
                rowStyle: {
                  backgroundColor: '#EEE',
                }
              }}
              title="User Details" />
          </div>

          <div>
            <Button className="btn btn-primary" onClick={openUserModal}>Open Modals</Button>

            <Modal show={userModal}
              onHide={closeUserModal}
              centered
              backdrop="static"
              keyboard={false}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Details</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <form className="">
                  <div className="p-1">
                    <h5 className="text-primary">Ticket ID: {userDetails.userId}</h5>
                    <hr />
                    <div className="input-group">
                      <label className="label input-group-text label-md ">Name {userDetails.name}</label>
                      <input type="text" className="form-control" name="name" disabled onChange={onTicketUpdate}/>
                    </div>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Admin;