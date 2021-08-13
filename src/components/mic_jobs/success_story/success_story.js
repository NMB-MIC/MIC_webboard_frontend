import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { set_modal } from "./../../../actions/setModal.action";
import { httpClient } from '../../../utils/HttpClient'
import { OK, server } from '../../../constants'
import FlatList from 'flatlist-react';
import { Link } from 'react-router-dom';

class Success_story extends Component {

  constructor(props) {
    super(props)

    this.state = {
      jobsData: [],
      isLoadSuccess: false,
      //jobs data
    }
  }

  componentDidMount() {
    this.doGetJobs()
  }

  doGetJobs = async () => {
    let result = await httpClient.get(server.MIC_JOB_URL + '/success')
    if (result.data.api_result === OK) {
      this.setState({ jobsData: result.data.result, isLoadSuccess: true })
      console.log(result.data.result);
    }
  }

  renderJobs = (item, idx) => {
    const renderIcon = (fileType) => {
      if (fileType == null) {
        return <i className="fas fa-file-alt" />
      } else {
        if (fileType.includes('excel')) {
          return <i className="fas fa-file-excel" />
        } else if (fileType.includes('image')) {
          return <i className="fas fa-image" />
        } else if (fileType.includes('pdf')) {
          return <i className="fas fa-file-pdf" />
        } else if (fileType.includes('presentation')) {
          return <i className="fas fa-file-powerpoint" />
        } else if (fileType.includes('word')) {
          return <i className="fas fa-file-word" />
        } else {
          return <i className="fas fa-file-alt" />
        }
      }
    }

    return (

      <div className="col-lg-3 col-6">
        {/* small card */}
        <div className="small-box bg-success">
          <div className="inner">
            <h3>{item.jobName.length >= 10 ? item.jobName.substring(0, 10) + '...' : item.jobName.substring(0, 10)}</h3>
            <p>{item.jobName}</p>
            <p>{item.jobCategory}</p>
          </div>
          <div className="icon">
            {renderIcon(item.fileType)}
          </div>
          <Link to={'/mic_jobs/job_detail/' + item.job_id} className="small-box-footer">
            More info <i className="fas fa-arrow-circle-right" />
          </Link>
        </div>
      </div>
    );
  }

  loadingScreen() {
    if (this.state.data == null && !(this.state.isLoadSuccess)) {
      return (
        <div className="overlay">
          <i className="fas fa-3x fa-sync-alt fa-spin" />
          <div className="text-bold pt-2">Loading...</div>
        </div>
      );
    } else {
      return <div>No any job success story...</div>
    }
  }

  render() {
    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6" style={{ textAlign: "left" }}>
                <h1 class="m-0 text-dark">Success story</h1>
              </div>
              <div className="col-sm-6">
                <ol class="breadcrumb float-sm-right">

                </ol>
              </div>
              {/* /.col */}

              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div class='col-lg-12'>
                <div className="card card-success">
                  <div class="card-header border-0">
                    <div class="d-flex justify-content-between">
                      <h3 class="card-title">Success story</h3>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className='row'>
                      <FlatList
                        list={this.state.jobsData}
                        renderItem={this.renderJobs}
                        renderWhenEmpty={() => this.loadingScreen()}
                      />
                    </div>
                  </div>
                  <div className="card-footer">

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Success_story;
