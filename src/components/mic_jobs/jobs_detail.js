import React, { useEffect, useState } from 'react';
import { httpClient } from '../../utils/HttpClient'
import { apiUrl, key, OK, server } from '../../constants'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Stepper from 'react-stepper-horizontal'
import ProgressBar from 'react-bootstrap/ProgressBar'
import moment from 'moment';
import ImageZoom from 'react-medium-image-zoom'
import Zoom from "react-medium-image-zoom";

//create content import
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import ReactHtmlParser from "react-html-parser";

export default function Jobs_detail(props) {
    const [jobDetail, setJobDetail] = useState(null)
    const [divisionName, setDivisionName] = useState(null)
    const [listStep, setListStep] = useState([])
    const [currentStep, setCurrentStep] = useState(0)
    const [jobScore, setJobScore] = useState(0)
    const [jobProgressive, setJobProgressive] = useState([])
    const [timeLineDateList, setTimeLineDateList] = useState([])

    //progressive create
    const [editorState, setCreateEditorState] = useState(EditorState.createEmpty())
    const [progressiveName, setProgressiveName] = useState('')
    const [progressiveDetail, setProgressiveDetail] = useState('')
    const [progressiveFileDetail, setProgressiveFileDetail] = useState(null)

    useEffect(() => {
        loadJobDetails()
        loadJobProcess()

    }, [])

    const loadJobDetails = async () => {
        try {
            let { job_id } = await props.match.params;
            let result = await httpClient.get(server.MIC_JOB_URL + '_detail/' + job_id)
            let division = await httpClient.get(server.DIVISIONNAME_URL + '/' + result.data.result.divisionCode)
            let jobscore = await httpClient.get(server.JOB_SCORE_URL + '/' + job_id)

            if (division.data.api_result === OK) {
                setDivisionName(division.data.result.divisionName)
                setJobDetail(result.data.result)
                setCurrentStep(parseInt(result.data.result.jobProcess))
                setJobScore(jobscore.data.result)
                loadTimeLine(job_id)
                // const timeLineDate = await selectDistinctDate(jobProgressiveData.data.result, 'updatedAt')
                // setTimeLineDateList(timeLineDate);

                // let newJobProgressive = {}
                // timeLineDate.forEach(async element => {
                //     let listProgressiveDataOnThisDate = []
                //     for (let index = 0; index < jobProgressiveData.data.result.length; index++) {
                //         const item = jobProgressiveData.data.result[index];
                //         if (moment(item.updatedAt).format('DD MMM YYYY') === element) {
                //             listProgressiveDataOnThisDate.push(item)
                //         }

                //     }
                //     newJobProgressive[element] = listProgressiveDataOnThisDate
                // });

                // setJobProgressive(newJobProgressive);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const loadJobProcess = async () => {
        let result = await httpClient.get(server.JOB_PROCESS_URL)
        let listSteps = []
        if (result.data.result.length > 0) {
            for (let index = 0; index < result.data.result.length; index++) {
                const item = result.data.result[index];
                await listSteps.push({ title: item.jobProcess })
            }
            setListStep(listSteps)
        }
    }

    const loadTimeLine = async (job_id) => {
        //Rerender timeline
        let newJobProgressive = {}
        const jobProgressiveData = await httpClient.get(server.JOB_PROGRESSIVE_URL + '/' + job_id)

        const timeLineDate = await selectDistinctDate(jobProgressiveData.data.result, 'updatedAt')
        setTimeLineDateList(timeLineDate);

        timeLineDate.forEach(async element => {

            let listProgressiveDataOnThisDate = []
            for (let index = 0; index < jobProgressiveData.data.result.length; index++) {
                const item = jobProgressiveData.data.result[index];
                if (moment(item.updatedAt).format('DD MMM YYYY') === element) {
                    listProgressiveDataOnThisDate.push(item)
                }

            }
            newJobProgressive[element] = listProgressiveDataOnThisDate
        });
        setJobProgressive(newJobProgressive);
    }

    const isPermissionToUpdateJob = () => {
        if (localStorage.getItem(key.USER_LV) === 'MIC_Head' ||
            localStorage.getItem(key.USER_LV) === 'MIC_Member' ||
            localStorage.getItem(key.USER_LV) === 'admin' ||
            localStorage.getItem(key.USER_EMP) === jobDetail.updateBy) {
            return true
        } else {
            return false
        }
    }

    const renderApproveAction = () => {
        if (localStorage.getItem(key.USER_LV) === 'MIC_Head' && jobDetail.jobStatus === 'open') {
            return (
                <div className="card-footer">
                    <div className="row">
                        <div className="col-6">
                            <button className="btn btn-sm bg-success" onClick={() => {
                                doAppreoved(true)
                            }}>
                                <i className="fas fa-thumbs-up" /> Approve
                            </button>
                        </div>
                        <div className="col-6 text-right">
                            <button className="btn btn-sm btn-danger" onClick={() => {
                                doAppreoved(false)
                            }}>
                                <i className="fas fa-thumbs-down" /> Reject
                            </button>
                        </div>
                    </div>
                </div>
            )
        }

    }

    const renderJobDetail = () => {
        try {
            // console.log(jobDetail);
            const selectColor = (text) => {
                switch (text) {
                    case 'onGoing':
                        return 'orange'

                    case 'open':
                        return 'blue'

                    case 'success':
                        return 'green'

                    default:
                        break;
                }
            }

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
                if (jobDetail.fileType) {
                    return (
                        <p className="text-muted text-l">Request file detail :
                            <b>
                                <a target="_blank" href={apiUrl + 'getFiles/mic_job_file/' + jobDetail.job_id}>
                                    Download ({renderFileType(jobDetail.fileType)})
                            </a>
                            </b>
                        </p>
                    )
                }
            }

            if (jobDetail != null) {
                return (
                    <div>
                        <div className="card bg-light">
                            <div className="card-header text-muted border-bottom-0">
                                <h2>Job name: {jobDetail.jobName}</h2>
                            </div>
                            <div className="card-body pt-0">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <p className="text-muted text-l">Job category: <b>{jobDetail.jobCategory}</b></p>
                                        <p className="text-muted text-l">Job detail: <b>{jobDetail.jobDetail}</b></p>
                                        <p className="text-muted text-l">Job objective: <b>{jobDetail.jobObjective}</b></p>
                                        <p className="text-muted text-l">Status of job : <b style={{
                                            color: selectColor(jobDetail.jobStatus)
                                        }}>
                                            {jobDetail.jobStatus}</b></p>
                                        {isPermissionToUpdateJob() ? <Link to={'/mic_jobs/edit_job_detail/' + jobDetail.job_id} className="btn btn-primary btn-sm">Edit job detail</Link> : <></>}
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="text-muted text-l">Kick off date: <b>{moment(jobDetail.KickOffDate).format('DD MMM YYYY')}</b></p>
                                        <p className="text-muted text-l">Finish date: <b>{moment(jobDetail.FinishDate).format('DD MMM YYYY')}</b></p>
                                        <p className="text-muted text-l">Request by: <b>{jobDetail.requestBy}</b></p>
                                        <p className="text-muted text-l">Division: <b>{divisionName}({jobDetail.divisionCode})</b></p>
                                        {renderFileDownload()}
                                    </div>
                                </div>
                            </div>
                            {renderApproveAction()}
                        </div>
                    </div>
                )
            }
        } catch (error) {
            console.log(error);
        }
    }

    const renderJobProcess = () => {
        try {
            const setJobProcess = async (jobProcess) => {
                if (jobProcess >= 0 && jobProcess < listStep.length) {
                    try {
                        Swal.fire({
                            title: 'Update job process?',
                            text: "Are you sure to update job process to " + listStep[jobProcess].title + "?",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes!'
                        }).then(async (result) => {
                            if (result.isConfirmed) {

                                let data = {}
                                //Last process
                                if ((jobProcess + 1) === listStep.length) {
                                    data = {
                                        job_id: jobDetail.job_id,
                                        jobProcess,
                                        jobStatus: 'success'
                                    }
                                } else {
                                    data = {
                                        job_id: jobDetail.job_id,
                                        jobProcess,
                                        jobStatus: 'onGoing'
                                    }
                                }
                                let result = await httpClient.patch(server.MIC_JOB_URL, data)

                                //Update job progressive
                                const jobProgressiveObj = {
                                    job_id: parseInt(jobDetail.job_id),
                                    progressiveName: 'Update job process',
                                    progressiveType: 'web',
                                    progressiveDetail: 'Update job process to ' + listStep[jobProcess].title,
                                    updateBy: localStorage.getItem(key.USER_EMP),
                                }
                                await httpClient.post(server.JOB_PROGRESSIVE_URL, jobProgressiveObj)

                                if (result.data.api_result === OK) {
                                    loadJobDetails()
                                    Swal.fire(
                                        'Updated!',
                                        'Your project has been updated.',
                                        'success'
                                    )

                                } else {
                                    Swal.fire('Error!', '', 'error')
                                }

                            }
                        })
                    } catch (error) {
                        Swal.fire('Error!', error.message, 'error')
                        console.log(error);
                    }
                } else {
                    Swal.fire('Error!', 'Min or Max step', 'error')
                }
            }

            const renderJobPercentate = () => {
                return (
                    <div className="row" style={{ marginTop: 20 }}>
                        <div className="col-sm-12">
                            {/* <label>Job Percent</label> */}
                        </div>
                        <div className="col-sm-12">
                            <ProgressBar animated variant={jobScore >= 1 ? "success" : "primary"} now={jobScore * 100} label={`${jobScore * 100}%`} />
                        </div>
                    </div>
                )
            }

            const renderUpdateJobProcress = () => {
                if (isPermissionToUpdateJob()) {
                    return (
                        <div className="col-sm-2">
                            <button style={{ width: '100%' }} onClick={(e) => {
                                e.preventDefault()
                                setJobProcess(currentStep + 1)
                            }} className="btn btn-primary btn-sm">Step Next</button>
                            <div style={{ marginTop: 20 }}></div>
                            <button style={{ width: '100%' }} onClick={(e) => {
                                e.preventDefault()
                                setJobProcess(currentStep - 1)
                            }} className="btn btn-dark btn-sm">Step Back </button>
                        </div>
                    )
                }
            }

            if (jobDetail != null && (jobDetail.jobStatus === 'onGoing' || jobDetail.jobStatus === 'success')) {
                return (
                    <div>
                        <div className="card bg-light">
                            <div className="card-header text-muted border-bottom-0">
                            </div>
                            <div className="card-body pt-0">
                                <div className="row">
                                    <div className="col-sm-10">
                                        <div>
                                            <Stepper
                                                steps={listStep}
                                                activeStep={currentStep} />
                                        </div>
                                    </div>
                                    {renderUpdateJobProcress()}
                                    <div className="col-sm-12">
                                        {renderJobPercentate()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        } catch (error) {
            console.log(error);
        }
    }

    const doAppreoved = async (Approve) => {
        const textApprove = Approve ? 'approve' : 'reject'
        Swal.fire({
            title: 'Do you want to ' + textApprove + ' this project?',
            showCancelButton: true,
            confirmButtonText: Approve ? 'approve' : 'reject',
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                let jobStatus = 'open'
                if (Approve) {
                    jobStatus = 'onGoing'
                } else {
                    jobStatus = 'denied'
                }
                let result = await httpClient.patch(server.MIC_JOB_APPROVED_URL, { job_id: jobDetail.job_id, jobStatus })
                if (result.data.api_result == OK) {
                    Swal.fire(textApprove + '!', '', 'success')
                    loadJobDetails()
                } else {
                    Swal.fire('Error!', '', 'error')
                }
            }
        })
    }

    const selectDistinctDate = async (array, header) => {
        let results = []
        for (let index = 0; index < array.length; index++) {
            const item = array[index];
            if (!results.includes(moment(item[header]).format('DD MMM YYYY'))) {
                await results.push(moment(item[header]).format('DD MMM YYYY'))
            }
        }
        return results
    }

    const renderTimeLine = () => {
        const renderDeleteAction = (item) => {
            if ((isPermissionToUpdateJob() && item.progressiveType !== 'web') || localStorage.getItem(key.USER_LV) === 'admin') {
                return (
                    <i onMouseOver={(e) => {
                        e.preventDefault();
                        e.target.style.color = 'red'
                    }}
                        onMouseLeave={(e) => {
                            e.preventDefault();
                            e.target.style.color = 'gray'
                        }}
                        className="fas fa-trash-alt" onClick={(e) => {
                            e.preventDefault()
                            doDeleteJobProgressive(item.progressive_id)
                        }}
                    />
                )
            }
        }

        const renderTimeLineIcon = (item) => {
            if (item.progressiveType === 'web') {
                return "fas fa-bell bg-blue"
            } else if (item.fileType == null) {

            } else {
                if (item.fileType.includes('excel')) {
                    return "fas fa-file-excel bg-success"
                } else if (item.fileType.includes('image')) {
                    return "fas fa-image bg-warning"
                } else if (item.fileType.includes('pdf')) {
                    return "fas fa-file-pdf bg-danger"
                } else if (item.fileType.includes('presentation')) {
                    return "fas fa-file-powerpoint bg-orange"
                } else if (item.fileType.includes('word')) {
                    return "fas fa-file-word bg-blue"
                } else {
                    return "fas fa-file-alt bg-dark"
                }
            }
        }

        const renderFileDownload = (item) => {
            if (item.fileType.includes('image')) {
                return (
                    <div style={{ textAlign: 'center' }}>
                        <ImageZoom
                            image={{
                                src: apiUrl + 'getFiles/jobProgressiveFile/' + item.progressive_id,
                                alt: 'Golden Gate Bridge',
                                className: 'img',
                                style: { maxHeight: 200, maxWidth: '80%' }
                            }}
                            zoomImage={{
                                src: apiUrl + 'getFiles/jobProgressiveFile/' + item.progressive_id,
                            }}
                        />
                        {/* <img style={{ maxHeight: 600, maxWidth: '80%' }} src={apiUrl + 'getFiles/jobProgressiveFile/' + item.progressive_id} /> */}
                    </div>
                )
            } else if (item.fileType.includes('video')) {
                return (
                    <div style={{ textAlign: 'center', }}>
                        <video width="520" height="340" controls >
                            <source src={apiUrl + 'getFiles/jobProgressiveFile/' + item.progressive_id} />
                                Your browser does not support the video tag.
                        </video>
                    </div>

                )
            }
            else {
                return (
                    <div>
                        <a target="_blank" href={apiUrl + 'getFiles/jobProgressiveFile/' + item.progressive_id}>
                            Downlaod File
                        </a>
                    </div>
                )
            }

        }

        const renderTimeLineContent = (date) => {
            if (jobProgressive[date] != null) {
                return jobProgressive[date].map((item) => (
                    <div>
                        {/* <i className="fas fa-envelope bg-blue" /> */}
                        <i className={renderTimeLineIcon(item)} />

                        <div className="timeline-item">
                            <span className="time">
                                {renderDeleteAction(item)}
                            </span>
                            <h3 className="timeline-header"><b>{item.progressiveName}</b></h3>
                            <div className="timeline-body">
                                {ReactHtmlParser(item.progressiveDetail)}
                                {item.fileType ? renderFileDownload(item) : <></>}
                            </div>
                            <div className="timeline-footer">
                                <div className="btn-xs">
                                    Update by : <i className="fas fa-user-alt" /> {item.updateBy}
                                    <div className="float-right">
                                        <i className="fas fa-clock" />{' ' + moment(item.updatedAt).format('HH:mm:ss')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                )
            }
        }

        const renderTimeLineDate = () => {
            return timeLineDateList.map((item) => (
                <>
                    <div className="time-label">
                        <span className="bg-primary">{item}</span>
                    </div>
                    {renderTimeLineContent(item)}
                </>
            ))
        }

        const resetCreateTimeLine = () => {
            try {
                setCreateEditorState(EditorState.createEmpty())
                setProgressiveName('')
                setProgressiveDetail('')
                setProgressiveFileDetail(null)
                document.getElementById("chooseFile").innerHTML = 'Choose file...'
            } catch (error) {
                console.log(error);
            }
        }

        const doCreateJobProgressive = () => {
            if (progressiveName === '') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'Please input Progressive title',
                })
                return
            }
            if (progressiveDetail === '' || progressiveDetail === '<p></p>') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'Please input Progressive detail',
                })
                return
            }
            Swal.fire({
                title: 'Are you sure?',
                text: "Are you sure to create this job progressive?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
            }).then(async (result) => {
                if (result.isConfirmed) {

                    var data = new FormData();
                    data.append('job_id', jobDetail.job_id);
                    data.append('progressiveName', progressiveName);
                    data.append('progressiveDetail', progressiveDetail);
                    data.append('updateBy', localStorage.getItem(key.USER_EMP));
                    data.append('fileDetail', progressiveFileDetail);

                    let response = await httpClient.post(server.JOB_PROGRESSIVE_URL + 'User', data)
                    console.log(response.data);
                    if (response.data.api_result === OK) {
                        loadTimeLine(jobDetail.job_id)
                        resetCreateTimeLine()
                        Swal.fire(
                            'Yeah!',
                            'Your job progressive has been created.',
                            'success'
                        )
                    }
                }
            })
        }

        const doDeleteJobProgressive = (progressive_id) => {
            try {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        let response = await httpClient.delete(server.JOB_PROGRESSIVE_URL, { data: { progressive_id } })
                        if (response.data.api_result === OK) {
                            loadTimeLine(jobDetail.job_id)
                            Swal.fire(
                                'Deleted!',
                                'Your job progressive has been deleted.',
                                'success'
                            )
                        } else {
                            Swal.fire(
                                'Error!',
                                'Something wrong happened!',
                                'error'
                            )
                        }
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }

        const renderAddJobProgressive = () => {
            if (isPermissionToUpdateJob()) {
                return (
                    <div className="card card-default collapsed-card">
                        <div className="card-header" data-card-widget="collapse">
                            <button className="btn btn-primary">
                                <i className="far fa-calendar-plus" />
                                {' Add job progressive'}
                            </button>
                        </div>
                        <div class="card-body">
                            <div className="form-group">
                                <label>Progressive title :</label>
                                <input
                                    value={progressiveName}
                                    onChange={(e) => {
                                        setProgressiveName(e.target.value)
                                    }} type="text" className="form-control" placeholder="Enter progressive title" />
                            </div>
                            <div className="form-group" >
                                <label>Progressive detail :</label>
                                <div style={{ border: "1px solid", borderColor: '#cfcfcf', borderRadius: '3px' }}>
                                    <Editor
                                        editorState={editorState}
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                        onEditorStateChange={(e) => {
                                            setCreateEditorState(e)
                                            setProgressiveDetail(draftToHtml(convertToRaw(e.getCurrentContent())))
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='form-group'>
                                <label>Progressive file (optional):</label>
                                <div className="input-group">
                                    <div className="custom-file">
                                        <input onChange={
                                            (e) => {
                                                setProgressiveFileDetail(e.target.files[0])
                                                document.getElementById("chooseFile").innerHTML = e.target.files[0].name;
                                            }
                                        } type="file" className="custom-file-input" />
                                        <label id="chooseFile" className="custom-file-label">Choose file...</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button onClick={(e) => {
                                e.preventDefault()
                                doCreateJobProgressive()
                            }} className="btn btn-primary">Submit</button>
                            <button onClick={(e) => {
                                e.preventDefault()
                                resetCreateTimeLine()
                            }} className="btn btn-danger float-right">Reset</button>
                        </div>
                    </div>
                )
            }
        }

        if (jobDetail != null && (jobDetail.jobStatus === 'onGoing' || jobDetail.jobStatus === 'success')) {
            return (
                <>
                    <div className="card card-default">
                        <div className="card-header">
                            <h3 className="card-title"><b>Timeline of job</b></h3>
                            <div class="card-tools">
                                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                    <i class="fas fa-minus"></i>
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    {/* The time line */}
                                    <div className="timeline">
                                        {/* timeline time label */}
                                        {renderTimeLineDate()}
                                        <div>
                                            <i className="fas fa-clock bg-gray" />
                                        </div>
                                    </div>
                                </div>
                                {/* /.col */}
                            </div>
                        </div>
                    </div>
                    {renderAddJobProgressive()}
                </>
            )
        }
    }

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Job Detail</h1>
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
                {renderJobProcess()}
                {renderTimeLine()}
            </section>
        </div>
    )
}

