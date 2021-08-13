import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getDivCode } from "./../../actions/division_code.action";
import { set_modal } from "./../../actions/setModal.action";
import { doGetJobs } from "./../../actions/mic_jobs.action";

import { useDispatch, useSelector } from 'react-redux'
import './create_jobs_request.css'
import Swal from 'sweetalert2';
import { httpClient } from '../../utils/HttpClient'
import { key, OK, server } from '../../constants'
import moment from 'moment';

export default function Modal_jobs_request(props) {
    const setModalReducer = useSelector(({ setModalReducer }) => setModalReducer)
    const divcodeReducer = useSelector(({ divcodeReducer }) => divcodeReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDivCode())
    }, [])

    const [jobCategory, setJobCategory] = useState('')
    const [jobName, setJobName] = useState('')
    const [jobDetail, setJobDetail] = useState('')
    const [jobObjective, setJobObjective] = useState('')
    const [kickOffDate, setKickOffDate] = useState('')
    const [finishDate, setFinishDate] = useState('')
    const [divisionCode, setDivisionCode] = useState('')
    const [fileDetail, setFileDetail] = useState(null)
    const [requestBy, setRequestBy] = useState(localStorage.getItem(key.USER_EMP))

    const closeModal = () => {
        dispatch(doGetJobs('open'))
        return (dispatch(set_modal(false)))
    }

    const doCreateJob = async () => {
        if (jobCategory === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please select jobCategory',
            })
            return
        }
        if (jobName === '' || jobObjective === '' || jobObjective === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please complete you job detail',
            })
            return
        }
        if (kickOffDate === '' || finishDate === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please select kick off date and finish date',
            })
            return
        }
        if (divisionCode === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please select divisionCode',
            })
            return
        }
        if (moment(kickOffDate).diff(moment(finishDate), 'days') > 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'kickOffDate more than finishDate',
            })
            return
        }

        var data = new FormData();
        data.append('jobCategory', jobCategory);
        data.append('jobName', jobName);
        data.append('jobDetail', jobDetail);
        data.append('jobObjective', jobObjective);
        data.append('kickOffDate', kickOffDate);
        data.append('finishDate', finishDate);
        data.append('divisionCode', divisionCode);
        data.append('fileDetail', fileDetail);
        data.append('requestBy', requestBy);

        let result = await httpClient.post(server.MIC_JOB_URL, data)
        if (result.data.api_result === OK) {
            Swal.fire({
                icon: 'success',
                title: 'Yeah...',
                text: 'Request job completed',
            }).then(() => {
                closeModal()
            })

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Request job failed , please try again',
            })
        }
    }

    const divisionCodeReander = () => {
        const { result, isFetching } = divcodeReducer;
        if (!isFetching) {
            try {
                const myResult = result.result;
                return myResult.map((item) => (
                    <option value={item.divisionCode}>{item.divisionName}</option>
                ));
            } catch (error) { }
        }
    };

    return (
        <Modal
            isOpen={setModalReducer.isOpen}
            style={{
                content: {
                    transform: 'translate(0%, 0%)',
                    overlfow: 'scroll' // <-- This tells the modal to scrol
                },
            }}
            className="content-wrapper"
            contentLabel="Example Modal"
        >
            <div style={{ margin: '10%', padding: '5%', backgroundColor: 'rgba(0,0,0,0)', overflow: 'auto' }}>
                <div className="card card-primary" style={{}}>
                    <div className="card-header">
                        <div className='d-flex justify-content-between'>
                            <h3 className='card-title"'>Request new job</h3>
                            {/* <button type="submit" class="btn btn-default float-right" onClick={(e) => {
                  e.preventDefault();
                  this.closeModal()
                }}>Cancel</button> */}
                            <div class="card-tools">
                                <button type="button" class="btn btn-tool" onClick={(e) => {
                                    e.preventDefault()
                                    closeModal();
                                }}><i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className='col-lg-6'>
                                <div className="form-group">
                                    <label>Job category</label>
                                    <select class="form-control" onChange={(e) => {
                                        e.preventDefault()
                                        setJobCategory(e.target.value)
                                    }}>
                                        <option value=''>--Please select job category--</option>
                                        <option>Access door</option>
                                        <option>Production control</option>
                                        <option>Deep learning(AI)</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Job objective</label>
                                    <textarea rows="4" onChange={(e) => {
                                        setJobObjective(e.target.value)
                                    }} type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter Job objective" />
                                </div>
                                <div className="form-group">
                                    <label>Kick off date</label>
                                    <input onChange={(e) => {
                                        setKickOffDate((e.target.value))
                                    }} type="date" className="form-control" id="exampleInputEmail1" placeholder="Enter Kick off date" />
                                </div>
                                <div className="form-group">
                                    <label>Division Code</label>
                                    <select
                                        class="form-control"
                                        onChange={(e) => {
                                            setDivisionCode(e.target.value)
                                        }}
                                        name="divisionCode"
                                        type="text"
                                        className="form-control"
                                    >
                                        <option>--Please select division code--</option>
                                        {divisionCodeReander()}
                                    </select>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className="form-group">
                                    <label>Job name</label>
                                    <input onChange={(e) => {
                                        setJobName(e.target.value)
                                    }} type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter Job name" />
                                </div>
                                <div className="form-group">
                                    <label>Job detail</label>
                                    <textarea rows="4" onChange={(e) => {
                                        setJobDetail(e.target.value)
                                    }} type="text" className="form-control" placeholder="Enter Job detail" />
                                </div>
                                <div className="form-group">
                                    <label>Finish date</label>
                                    <input onChange={(e) => {
                                        setFinishDate((e.target.value))
                                    }} type="date" className="form-control" placeholder="Enter Finish date" />
                                </div>
                                <div className='form-group'>
                                    <label>Project file detail</label>
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
                    </div>
                    <div class="card-footer">
                        <button type="submit" class="btn btn-primary" onClick={(e) => {
                            e.preventDefault()
                            doCreateJob()
                        }} >Submit</button>
                        <button type="submit" class="btn btn-default float-right" onClick={(e) => {
                            e.preventDefault();
                            closeModal();
                        }}>Cancel</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}