import React, { Component } from 'react';
import { key, server, OK } from '../../../constants';
import { httpClient } from '../../../utils/HttpClient';
import _ from "lodash";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment';

class JobProcessMaster extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tableHeader: [],
      tableData: [],
      piorityList: [],
      jobProcess: '',
      jobWeight: 1,
      piority: 0,
    }
  }

  componentDidMount = async () => {
    this.doGetJobProcess()
    this.debounceSearch = _.debounce(this.findJobProcess, 500);
  }

  findJobProcess = async (e) => {
    if (e.target.value != '') {
      let result = await httpClient.get(server.JOB_PROCESS_URL + '/keyword/' + e.target.value)
      if (result.data.result.length > 0) {
        this.setState({
          tableData: result.data.result,
        })
      } else {
        this.setState({
          tableData: [],
        })
      }
    } else {
      this.doGetJobProcess()
    }

  }

  searchChanged = (e) => {
    e.persist();
    this.debounceSearch(e);
  };

  doGetJobProcess = async () => {
    let result = await httpClient.get(server.JOB_PROCESS_URL)
    if (result.data.result.length > 0) {
      let piorityList = []
      result.data.result.forEach(async item => {
        await piorityList.push(item.piority)
      });
      let tableHeader = Object.keys(result.data.result[0])
      tableHeader.push('Action')
      await this.setState({
        tableData: result.data.result,
        tableHeader,
        piorityList,
      })
    }

  }

  renderTableRow = () => {
    const generateTableData = (data) => {
      return this.state.tableHeader.map((header) => (
        <td>
          {renderRow(data, header)}
        </td>
      ))
    }

    const doDelete = async (jobProcess) => {
      try {
        Swal.fire({
          title: 'Are you sure to delete ' + jobProcess + '?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
          if (result.isConfirmed) {
            let response = await httpClient.delete(server.JOB_PROCESS_URL, { data: { jobProcess } })
            if (response.data.api_result === OK) {
              Swal.fire('Yeah!', 'Delete ' + jobProcess + ' completed!', 'success')
              this.doGetJobProcess()
            }
          }
        })
      } catch (error) {
        console.log(error);
        Swal.fire('Error!', error.message, 'error')
      }
    }

    const renderRow = (data, header) => {

      switch (header) {
        case 'createdAt':
          return moment(data[header]).format('DD-MMM-YYYY HH:mm:ss')

        case 'updatedAt':
          return moment(data[header]).format('DD-MMM-YYYY HH:mm:ss')

        case 'Action':
          return (
            <button onClick={(e) => {
              e.preventDefault()
              doDelete(data.jobProcess)
            }} className="btn btn-danger">Delete</button>
          )

        case 'jobWeight':
          return (
            <div>
              <b style={{ marginRight: 10 }}>{data[header]}</b>
              <button onClick={(e) => {
                e.preventDefault()
                Swal.mixin({
                  input: 'text',
                  confirmButtonText: 'Next &rarr;',
                  showCancelButton: true,
                  progressSteps: ['1']
                }).queue([
                  {
                    title: data.jobProcess,
                    text: 'Enter your job Weight'
                  },
                ]).then((result) => {
                  if (result.value) {
                    const answers = parseFloat(result.value)
                    doChangeWeight(answers, data.jobProcess)
                  }
                })
              }} className="btn btn-warning">Change</button>
            </div>
          )
        default:
          return data[header]
      }
    }

    const doChangeWeight = (jobWeight, jobProcess) => {
      Swal.fire({
        title: 'Do you want to change job weight?',
        showCancelButton: true,
        confirmButtonText: `Change`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const changedData = {
            jobWeight,
            jobProcess,
          }
          let response = await httpClient.put(server.JOB_PROCESS_URL, changedData)
          if (response.data.api_result === OK) {
            this.doGetJobProcess()
            Swal.fire('Changed!', '', 'success')
          } else {
            Swal.fire('Error!', '', 'error')
          }
        }
      })

    }

    const renderOptions = (levelUser, username) => {
      return (
        <select className="form-control" onChange={(e) => {
          // this.doChangeWeight(e.target.value, username)
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


  renderAddJobProcess = () => {
    const doAddJobProcess = async () => {
      try {
        if (this.state.jobProcess !== '' && this.state.jobProcess != null) {
          if (this.state.piorityList.includes(parseInt(this.state.piority))) {
            Swal.fire('Error!', 'Duplicate process piority', 'error')
          }
          else {
            let response = await httpClient.post(server.JOB_PROCESS_URL,
              {
                jobProcess: this.state.jobProcess,
                jobWeight: this.state.jobWeight,
                piority: this.state.piority,
              }
            )
            if (response.data.api_result === OK) {
              this.doGetJobProcess()
              Swal.fire('Yeah!', 'Create job process master completed', 'success')
            } else {
              Swal.fire('Error!', 'backend error please try again', 'error')
            }
          }
        } else {
          Swal.fire('Error!', 'Please input job process', 'error')
        }
      } catch (error) {
        console.log(error);
        Swal.fire('Error!', error.message, 'error')
      }
    }

    return (
      <div className="card card-default collapsed-card">
        <div className="card-header">
          <div className="input-group input-group-sm">
            <div style={{ marginRight: 10 }}>
              <button type="button" data-card-widget="collapse" className="btn btn-primary btn-sm">Add job process</button>
            </div>
            <input
              onChange={(e) => this.searchChanged(e)}
              type="search"
              className="form-control input-lg"
              placeholder="Enter search keyword"
              style={{ borderRadius: 10 }}
            />
            <div className="card-tools">
              <button type="button" className="btn btn-tool" data-card-widget="collapse"><i style={{ color: 'black' }} className="fas fa-plus"></i>
              </button>
            </div>
          </div>

          {/* /.card-tools */}
        </div>
        {/* /.card-header */}
        <div className="card-body">
          <div className="form-group">
            <label>Job Process</label>
            <input value={this.state.jobProcess} onChange={(e) => {
              this.setState({ jobProcess: e.target.value })
            }} type="text" className="form-control" placeholder="Enter jobProcess" />
          </div>
          <div className="form-group">
            <label>Job Weight</label>
            <input value={this.state.jobWeight} onChange={(e) => {
              this.setState({ jobWeight: e.target.value })
            }}
              type="number" className="form-control" min="1" step='0.05' placeholder="Enter weight" />
          </div>
          <div className="form-group">
            <label>Piority (0 is first process)</label>
            <input value={this.state.piority} onChange={(e) => {
              this.setState({ piority: e.target.value })
            }}
              type="number" className="form-control" min="0" step="1" placeholder="Enter Priority" />
          </div>
        </div>
        {/* /.card-body */}

        <div className="card-footer">
          <button onClick={(e) => {
            e.preventDefault()
            doAddJobProcess()
          }} type="submit" class="btn btn-primary">Submit</button>
          <button onClick={(e) => {
            e.preventDefault()
          }}
            data-card-widget="collapse"
            type="submit"
            className="btn btn-default float-right">
            Cancel
            </button>
        </div>
      </div>
    )
  }

  render() {
    return <div className='content-wrapper'>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Job Process Master</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">

              </ol>
            </div>
          </div>
        </div>{/* /.container-fluid */}
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card card-primary">
                <div className="card-header">
                </div>
                <div className="card-body">
                  <div>
                    {this.renderAddJobProcess()}
                  </div>
                  <div className="card card-default">
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
                </div>
                <div className='card-footer'></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
  }
}

export default JobProcessMaster;
