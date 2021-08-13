import moment from 'moment';
import React, { Component } from 'react';
import { key, server, OK } from '../../../constants';
import { httpClient } from '../../../utils/HttpClient';
import _ from "lodash";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

class UserManage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tableHeader: [],
      tableData: [],
    }
  }

  componentDidMount = async () => {
    this.doGetUser()
    this.debounceSearch = _.debounce(this.findUserByKey, 500);
  }

  findUserByKey = async (e) => {
    if (e.target.value != '') {
      let result = await httpClient.get(server.FIND_USER_URL + '/' + e.target.value)
      if (result.data.result.length > 0) {
        this.setState({
          tableData: result.data.result,
          // tableHeader: Object.keys(result.data.result[0]),
        })
      } else {
        this.setState({
          tableData: [],
          // tableHeader: Object.keys(result.data.result[0]),
        })
      }
    } else {
      this.doGetUser()
    }

  }

  searchChanged = (e) => {
    e.persist();
    this.debounceSearch(e);
  };

  doGetUser = async () => {
    let result = await httpClient.get(server.USER_URL)
    if (result.data.result.length > 0) {
      let tableHeader = Object.keys(result.data.result[0])
      tableHeader.push('Action')
      this.setState({
        tableData: result.data.result,
        tableHeader,
      })
    }
  }

  doDeleteUser = async (username) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Delete user : " + username + ", You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = {
          updater: localStorage.getItem(key.USER_NAME),
          username
        }
        let response = await httpClient.delete(server.USER_URL, { data })
        Swal.fire(
          'Deleted!',
          username + ' has been deleted.',
          'success'
        ).then(() => this.doGetUser())
      }
    })
  }

  renderTableRow = () => {
    const generateTableData = (data) => {
      return this.state.tableHeader.map((header) => (
        <td>
          {renderRow(data, header)}
        </td>
      ))
    }

    const renderRow = (data, header) => {
      if (header == 'lastLogOn') {
        return moment(data[header]).format('DD-MMM-YYYY HH:mm:ss')
      } else {
        switch (header) {
          case 'levelUser':
            return renderOptions(data[header], data['username'])
          case 'Action':
            return <button onClick={(e) => {
              e.preventDefault()
              this.doDeleteUser(data.username)
            }} className='btn btn-danger'>Delete</button>

          default:
            return data[header]
        }
      }
    }

    const renderOptions = (levelUser, username) => {
      return (
        <select className="form-control" onChange={(e) => {
          this.doChangeLevel(e.target.value, username)
        }}>
          <option selected={levelUser == 'admin' ? true : false}>
            admin
          </option>
          <option selected={levelUser == 'MIC_Head' ? true : false}>
            MIC_Head
          </option>
          <option selected={levelUser == 'MIC_Member' ? true : false}>
            MIC_Member
          </option>
          <option selected={levelUser == 'user' ? true : false}>
            user
          </option>
        </select>
      )
    }

    return this.state.tableData.map((item) => (
      <tr>{generateTableData(item)}</tr>
    ))
  }

  renderTableHeader = () => {
    return this.state.tableHeader.map((item) => (
      <th className="sorting"
        rowSpan={1}
        colSpan={1}>
        {item}
      </th>
    ))
  }

  doChangeLevel = (levelUser, username) => {
    Swal.fire({
      title: 'Do you want to change user level?',
      showCancelButton: true,
      confirmButtonText: `Change`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const changedData = {
          levelUser,
          username,
          updater: localStorage.getItem(key.USER_NAME)
        }
        let response = await httpClient.put(server.CHANGE_LV_URL, changedData)
        if (response.data.api_result === OK) {
          Swal.fire('Changed!', '', 'success').then(() => this.doGetUser())
        } else {
          Swal.fire('Error!', response.data.error, 'error').then(() => this.doGetUser())
        }
      }
    })
  }

  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>User manage</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  {/* <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">General Form</li> */}
                </ol>
              </div>
            </div>
          </div>{/* /.container-fluid */}
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card card-primary">
                  <div className="card-header">

                  </div>
                  <div className="card-body">
                    <div className="input-group input-group-sm">
                      <input
                        onChange={(e) => this.searchChanged(e)}
                        type="search"
                        className="form-control input-lg"
                        placeholder="Enter search keyword"
                        style={{ borderRadius: 10 }}
                      />
                    </div>
                    <div className="card-body table-responsive p-0">
                      <table
                        id="example2"
                        className="table table-hover text-nowrap"
                        role="grid"
                        aria-describedby="example2_info"
                      >
                        <thead>
                          <tr role="row">
                            {this.renderTableHeader()}
                          </tr>
                        </thead>
                        <tbody>
                          {this.renderTableRow()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="card-footer">

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default UserManage;
