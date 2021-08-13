import React, { useEffect, useState } from 'react';
import { httpClient } from '../../utils/HttpClient'
import { apiUrl, key, OK, server } from '../../constants'
import {
    Redirect,
} from "react-router-dom";
import moment from 'moment';
import Swal from 'sweetalert2';

export default function EditJobDetail(props) {
    const [job_id, setJob_id] = useState('')
    const [jobCategory, setJobCategory] = useState('')
    const [jobName, setJobName] = useState('')
    const [jobDetail, setJobDetail] = useState('')
    const [jobObjective, setJobObjective] = useState('')
    const [jobStatus, setJobStatus] = useState('')
    const [kickOffDate, setKickOffDate] = useState('')
    const [finishDate, setFinishDate] = useState('')
    const [divisionCode, setDivisionCode] = useState('')
    const [divisionName, setDivisionName] = useState('')
    const [requestBy, setRequestBy] = useState('')
    const [fileDetail, setFileDetail] = useState(null)
    const [fileType, setFileType] = useState(null)

    useEffect(() => {
        if (!isPermissionToUpdateJob()) {
            return <Redirect to="/Home" />;
        } else {
            loadJobDetails()
        }
    }, [])

    const loadJobDetails = async () => {
        let { job_id } = await props.match.params;
        setJob_id(job_id)
        let result = await httpClient.get(server.MIC_JOB_URL + '_detail/' + job_id)
        let division = await httpClient.get(server.DIVISIONNAME_URL + '/' + result.data.result.divisionCode)

        if (division.data.api_result === OK) {
            setDivisionName(division.data.result.divisionName)
            setJobCategory(result.data.result.jobCategory)
            setJobName(result.data.result.jobName)
            setJobDetail(result.data.result.jobDetail)
            setJobObjective(result.data.result.jobObjective)
            setJobStatus(result.data.result.jobStatus)
            setKickOffDate(result.data.result.KickOffDate)
            setFinishDate(result.data.result.FinishDate)
            setDivisionCode(result.data.result.divisionCode)
            setRequestBy(result.data.result.requestBy)
            setFileType(result.data.result.fileType)
        }
    }

    const isPermissionToUpdateJob = () => {
        if (localStorage.getItem(key.USER_LV) === 'MIC_Head' ||
            localStorage.getItem(key.USER_LV) === 'MIC_Member' ||
            localStorage.getItem(key.USER_LV) === 'admin' ||
            localStorage.getItem(key.USER_EMP) === requestBy) {
            return true
        } else {
            return false
        }
    }

    const selectColor = (text) => {
        switch (text) {
            case 'onGoing':
                return 'orange'

            case 'open':
                return 'blue'

            case 'success':
                return 'green'

            default:
                return 'red'
                break;
        }
    }

    const renderJobDetail = () => {
        const renderFileType = (fileType) => {
            if (fileType == null) {
                return <i className="fas fa-file-alt" />
            } else {
                if (fileType.includes('excel')) {
                    return 'excel'
                } else if (fileType.includes('image')) {
                    return 'image'
                } else if (fileType.includes('pdf')) {
                    return 'pdf'
                } else if (fileType.includes('presentation')) {
                    return 'powerpoint'
                } else if (fileType.includes('word')) {
                    return 'words'
                } else {
                    return 'other'
                }
            }
        }

        const renderFileDownload = () => {
            if (fileType) {
                return (
                    <p className="text-muted text-l">Current file detail :
                        <b>
                            <a target="_blank" href={apiUrl + 'getFiles/mic_job_file/' + job_id}>
                                Download ({renderFileType(fileType)})
                            </a>
                        </b>
                    </p>
                )
            }
        }

        if (jobDetail != null) {
            return (
                <div className="card bg-light">
                    <div className="card-header text-muted border-bottom-0">
                        <div className="row">
                            <div className="col-sm-3">
                                <h2>Job name:</h2>
                            </div>
                            <div className="col-sm-9">
                                <input onChange={(e) => {
                                    setJobName(e.target.value)
                                }} rows={1} value={jobName} type="text" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="card-body pt-0">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="text-muted text-l" >Job category:</p>
                                    </div>
                                    <div className="col-sm-8">
                                        <select value={jobCategory} className="form-control" onChange={(e) => {
                                            e.preventDefault()
                                            setJobCategory(e.target.value)
                                        }}>
                                            <option>Access door</option>
                                            <option>Production control</option>
                                            <option>Deep learning(AI)</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="text-muted text-l" >Job detail:</p>
                                    </div>
                                    <div className="col-sm-8">
                                        <textarea onChange={(e) => {
                                            setJobDetail(e.target.value)
                                        }} rows={1} value={jobDetail} type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="text-muted text-l" >Job objective:</p>
                                    </div>
                                    <div className="col-sm-8">
                                        <textarea onChange={(e) => {
                                            setJobObjective(e.target.value)
                                        }} rows={1} value={jobObjective} type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="text-muted text-l" >Job status:</p>
                                    </div>
                                    <div className="col-sm-8">
                                        <select
                                            style={{ color: selectColor(jobStatus) }}
                                            value={jobStatus}
                                            className="form-control" onChange={(e) => {
                                                e.preventDefault()
                                                setJobStatus(e.target.value)
                                            }}>
                                            <option style={{ color: 'blue' }}>open</option>
                                            <option style={{ color: 'orange' }}>onGoing</option>
                                            <option style={{ color: 'green' }}>success</option>
                                            <option style={{ color: 'red' }}>reject</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-sm-3">
                                        <p className="text-muted text-l">Project file detail :</p>
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="input-group">
                                            <div className="custom-file">
                                                <input onChange={
                                                    (e) => {
                                                        setFileDetail(e.target.files[0])
                                                        document.getElementById("chooseFile").innerHTML = e.target.files[0].name;
                                                    }
                                                } type="file" className="custom-file-input" id="exampleInputFile" />
                                                <label id="chooseFile" className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-sm-6">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="text-muted text-l" >Kick off date:</p>
                                    </div>
                                    <div className="col-sm-8">
                                        <input value={kickOffDate} onChange={(e) => {
                                            setKickOffDate(e.target.value)
                                        }} type="date" className="form-control" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="text-muted text-l" >Finish date:</p>
                                    </div>
                                    <div className="col-sm-8">
                                        <input value={finishDate} onChange={(e) => {
                                            setFinishDate(e.target.value)
                                        }} type="date" className="form-control" />
                                    </div>
                                </div>

                                <p className="text-muted text-l">Request by: <b>{requestBy}</b></p>
                                <p className="text-muted text-l">Division: <b>{divisionName}({divisionCode})</b></p>
                                <div>
                                    {renderFileDownload()}
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button onClick={(e) => {
                            e.preventDefault()
                            Swal.fire({
                                title: 'Are you sure?',
                                text: "Are you sure to edit this job",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, update it!'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    doUpdateJob()
                                }
                            })

                        }} className="btn btn-primary">Update</button>
                        <button onClick={(e) => {
                            e.preventDefault()
                            loadJobDetails()
                        }} className='btn btn-danger float-right'>Reset</button>
                    </div>
                </div>
            )
        }
    }

    const doUpdateJob = async () => {
        if (moment(kickOffDate).diff(moment(finishDate), 'days') > 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'kickOffDate more than finishDate',
            })
            return
        }
        var data = new FormData();

        data.append('job_id', job_id);
        data.append('jobName', jobName);
        data.append('jobCategory', jobCategory);
        data.append('jobDetail', jobDetail);
        data.append('jobObjective', jobObjective);
        data.append('jobStatus', jobStatus);
        data.append('kickOffDate', kickOffDate);
        data.append('finishDate', finishDate);
        data.append('fileDetail', fileDetail);
        data.append('updateBy', localStorage.getItem(key.USER_EMP));

        let result = await httpClient.put(server.MIC_JOB_URL, data)
        if (result.data.api_result === OK) {
            Swal.fire({
                icon: 'success',
                title: 'Yeah...',
                text: 'Request job completed',
            }).then(() => {
                props.history.push('/mic_jobs/job_detail/' + job_id)
            })

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Request job failed , please try again',
            })
        }


    }

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Edit job detail</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                {/* <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Widgets</li> */}
                            </ol>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>
            <section className="content">
                {renderJobDetail()}
            </section>

        </div>
    )
}
