import React, { Component } from "react";
import { Animated } from "react-animated-css";
import { key, YES, server, OK } from "../../constants/index";
import axios from "axios";
import { Link } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import { Zoom } from "react-slideshow-image";
import { connect } from "react-redux";
import { httpClient } from '../../utils/HttpClient'
import ReactTooltip from 'react-tooltip';
import Swal from "sweetalert2";
import _ from "lodash";

class home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countOnGoing: 0,
      countSuccess: 0,
      countOpen: 0,
      allianceWebsiteList: [],
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    // console.log(localStorage.getItem(key.TOKEN));
    this.doLoadJob()
    this.doGetAllianceWebsite()
  }

  doLoadJob = async () => {
    let response = await httpClient.get(server.MIC_JOB_URL + '_group_status')
    console.log(response.data.result);
    response.data.result.forEach(item => {
      switch (item.jobStatus) {
        case 'open':
          this.setState({ countOpen: item.JobCount })
          break;
        case 'success':
          this.setState({ countSuccess: item.JobCount })
          break;
        case 'onGoing':
          this.setState({ countOnGoing: item.JobCount })
          break;

        default:
          break;
      }
    });
  }

  isMember = () => {
    if (localStorage.getItem(key.LOGIN_PASSED) === YES) {
      document.getElementById("wrapper").className = "content-wrapper";
    } else {
      document.getElementById("wrapper").className = "";
    }
  };

  isPermissionToUpdateJob = () => {
    if (localStorage.getItem(key.USER_LV) === 'MIC_Head' ||
      localStorage.getItem(key.USER_LV) === 'MIC_Member' ||
      localStorage.getItem(key.USER_LV) === 'admin') {
      return true
    } else {
      return false
    }
  }

  renderAllianceWebsite = () => {
    const randomType = () => {
      const randomList = ['warning', 'danger', 'success', 'primary']
      return _.sample(randomList)
    }

    const allianceWebsiteConsole = (item) => {
      if (this.isPermissionToUpdateJob) {
        return (
          <div className="card-tools">
            <button type="button" className="btn btn-tool" onClick={(e) => {
              e.preventDefault()
              this.doRemoveAllianceWebsite(item.websiteName)
            }}>
              <i className="fas fa-trash-alt" />
            </button>
            <button type="button" className="btn btn-tool" onClick={(e) => {
              e.preventDefault()
              this.doEditAllianceWebsite(item.websiteName)
            }}>
              <i className="fas fa-edit" />
            </button>
          </div>
        )
      }
    }

    const renderAllianceWebsiteItem = () => {
      if (this.state.allianceWebsiteList.length > 0) {
        return this.state.allianceWebsiteList.map((item) => (
          <div className="col-4">
            <div className={"card card-" + randomType()}>
              <div className="card-header">
                {allianceWebsiteConsole(item)}
                {/* /.card-tools */}
              </div>
              {/* /.card-header */}
              <div className="card-body">
                <h3 data-for={'ReactTooltip' + item.websiteName} data-tip={'ReactTooltip' + item.websiteName}>{item.websiteName}</h3>
                <p>{item.websiteDiscription}</p>
                <a className='' href={item.websiteLink} target="_blank">{item.websiteLink}</a>
                <ReactTooltip id={'ReactTooltip' + item.websiteName} type='light' clickable={true}>
                  <iframe width="200%" height="500" src={item.websiteLink} title="W3Schools Free Online Web Tutorials" />
                </ReactTooltip>
              </div>
              {/* /.card-body */}
            </div>
          </div>
        ))
      }
    }

    return (
      <div className="container-fluid h-100">
        <div className="card card-row card-primary">
          <div className="card-header">
            <h3 className="card-title">
              Alliance website
            </h3>
            {this.isPermissionToUpdateJob && <button onClick={(e) => {
              e.preventDefault()
              this.doCreateAllianceWebsite()
            }} className='btn btn-default btn-sm float-right'><b>Add web</b></button>}
          </div>
          <div className="card-body">
            <div className="row">
              {renderAllianceWebsiteItem()}
            </div>
          </div>
        </div>
      </div>

    )
  }

  doCreateAllianceWebsite = () => {
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2', '3']
    }).queue([
      {
        title: 'Create alliance website (1)',
        text: 'Enter website name (Not web address)'
      },
      {
        title: 'Create alliance website (2)',
        text: 'Enter website address (Ex. http://10.121.1.123:8000/)'
      },
      {
        title: 'Create alliance website (3)',
        text: 'Enter website description'
      },
    ]).then(async (result) => {
      if (result.value) {
        const data = {
          websiteName: result.value[0],
          websiteLink: result.value[1],
          websiteDiscription: result.value[2],
        }
        let response = await httpClient.post(server.AllianceWebsite_URL, data)
        if (response.data.api_result === OK) {
          this.doGetAllianceWebsite()
          Swal.fire('Yeah!',
            'Add alliance website completed.',
            'success')
        } else {
          Swal.fire('Error!',
            'Add alliance website failed!',
            'error')
        }
      }
    })
  }

  doRemoveAllianceWebsite = (websiteName) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await httpClient.delete(server.AllianceWebsite_URL, { data: { websiteName } })
        if (response.data.api_result === OK) {
          this.doGetAllianceWebsite()
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } else {
          Swal.fire(
            'Error!',
            'Something wrong!!!',
            'error'
          )
        }

      }
    })
  }

  doEditAllianceWebsite = () => {
    Swal.fire('do not finish yet', 'รอแปป', 'info')
  }

  doGetAllianceWebsite = async () => {
    let response = await httpClient.get(server.AllianceWebsite_URL)
    if (response.data.api_result === OK) {
      this.setState({ allianceWebsiteList: response.data.result })
      // console.log(response.data.result);
    }
  }

  render() {
    return (
      <div className="content-wrapper kanban" id="wrapper">
        <div class="col-sm-12" style={{ textAlign: "center" }}>
          <Animated animationIn="slideInDown">
            <h1>
              MIC<small> Job progressive</small>
            </h1>
          </Animated>
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6" style={{ textAlign: "left" }}>

                </div>
                {/* /.col */}

                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </div>
          <div className="content pb-3">
            {/* <div className="card">{this.Slideshow()}</div> */}
            <div className="container-fluid">
              <div className="row">
                <div class='col-lg-4'>
                  <div style={{ textAlign: 'center' }}>
                    <Link to={'/mic_jobs/jobs_request'}>
                      <img style={{ height: 120 }} src='/images/RequestNewJob.png' />
                    </Link>
                  </div>
                  <div className="card card-primary">
                    <div class="card-header border-0">
                      <Link to={'/mic_jobs/jobs_request'}>
                        <div class="d-flex justify-content-between">
                          <h3 class="card-title">Jobs request</h3>
                        </div>
                      </Link>
                    </div>
                    <div className="card-body">
                      <div style={{ textAlign: 'left', }}>
                        <p>Request MIC team to help or consult your job/project.</p>
                        <p >
                          <Link to={'/mic_jobs/jobs_request'}>
                            {`See more ${this.state.countOpen} items ...`}
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class='col-lg-4'>
                  <div style={{ textAlign: 'center' }}>
                    <Link to={'/mic_jobs/jobs_progressive'}>
                      <img style={{ height: 120 }} src='/images/OnGoingJob.png' />
                    </Link>
                  </div>
                  <div className="card card-primary">
                    <div className="card-header border-0" >
                      <Link to={'/mic_jobs/jobs_progressive'}>
                        <div class="d-flex justify-content-between">
                          <h3 class="card-title">Jobs progressive</h3>
                        </div>
                      </Link>
                    </div>
                    <div className="card-body">
                      <div style={{ textAlign: 'left', }}>
                        <p>On going job/project that MIC team handle.</p>
                        <p >
                          <Link to={'/mic_jobs/jobs_progressive'}>
                            {`See more ${this.state.countOnGoing} items ...`}
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class='col-lg-4'>
                  <div style={{ textAlign: 'center' }}>
                    <Link to={'/mic_jobs/success_story'}>
                      <img style={{ height: 120 }} src='/images/SuccessStory.png' />
                    </Link>
                  </div>
                  <div className="card card-primary">
                    <div class="card-header border-0">
                      <Link to={'/mic_jobs/success_story'}>
                        <div class="d-flex justify-content-between">
                          <h3 class="card-title">Success story</h3>
                        </div>
                      </Link>
                    </div>
                    <div className="card-body">
                      <div style={{ textAlign: 'left', }}>
                        <p>Show success job/project.</p>
                        <p >
                          <Link to={'/mic_jobs/success_story'}>
                            {`See more ${this.state.countSuccess} items ...`}
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {this.renderAllianceWebsite()}
          </div>
          {/* Info */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(home);
