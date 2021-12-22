import React, { useState } from 'react'
import Papa from "papaparse";
import { apiUrl, OK, server } from '../../../constants';
import { httpClient } from '../../../utils/HttpClient'
import Swal from 'sweetalert2';
import Chart from "react-apexcharts";

export default function X_bar_r_chart() {
  const [file, setfile] = useState(null)
  const [tableData, settableData] = useState([])
  const [chartData, setchartData] = useState(null)
  const [sampleSize, setsampleSize] = useState(5)
  const [stoke, setstoke] = useState('straight')
  const [usl, setusl] = useState('')
  const [lsl, setlsl] = useState('')
  const [processCapability, setProcessCapability] = useState(null)
  const [warningStatus, setwarningStatus] = useState(null)

  const doUpload = () => {
    if (file != null) {
      // Parse local CSV file
      Papa.parse(file, {
        header: true,
        complete: async (results) => {
          const response = await httpClient.post(server.X_bar_r_chart_URL, { data: results.data, n: sampleSize, usl, lsl })
          // console.log("Finished:", response.data);
          if (response.data.api_result === OK) {
            setchartData(response.data.chartData)
            settableData(response.data.summaryData)
            setProcessCapability(response.data.ProcessCapability)
            const warningStatus = await httpClient.post(server.Warning_Status_URL, { summaryData: response.data.summaryData, usl, lsl })
            console.log(warningStatus.data);
            setwarningStatus(warningStatus.data)
          }
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'กรุณาอัพไฟล์ด้วยจ้า',
      })
    }
  }

  const renderUploadCSV = () => {
    const SheetJSFT = ["csv"].map(function (x) { return "." + x; }).join(",");

    const handleChange = (e) => {
      const files = e.target.files;
      if (files && files[0]) {
        document.getElementById("fileLable").innerHTML = e.target.files[0].name;
        setfile(files[0])
      }
    };

    return (
      <div className="card-body">
        <div className="row">
          <div className="col-sm-12">
            <div className="input-group">
              <div className="custom-file">
                <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={handleChange} />
                <label className="custom-file-label" id="fileLable" htmlFor="file">Upload a csv file</label>
              </div>
              <div className="input-group-append">
                <button className="btn btn-primary" onClick={(e) => {
                  e.preventDefault();
                  doUpload()
                }}>Upload</button>
                <button className='btn btn-default'><a href={'/doc/sample_xbar_rchart.csv'}>Template</a></button>
              </div>
            </div>
          </div>
          <div className="col-sm-6" style={{ marginTop: 20 }}>
            <div className="form-group">
              <label>Chart stoke</label>
              <select className="custom-select" value={stoke} onChange={(e) => {
                setstoke(e.target.value)
              }}>
                <option value="straight">straight</option>
                <option value='smooth'>smooth</option>
                <option value='stepline'>stepline</option>
              </select>
            </div>
          </div>
          <div className="col-sm-6" style={{ marginTop: 20 }}>
            <div className="form-group">
              <label>Sample size</label>
              <input type='number' min={3} max={9} className="form-control" value={sampleSize} onChange={(e) => {
                setsampleSize(e.target.value)
              }} />


            </div>
          </div>
          <div className="col-sm-6" style={{ marginTop: 20 }}>
            <div className="form-group">
              <label>Upper Spec Limit, USL</label>
              <input type='number' className="form-control" value={usl} onChange={(e) => {
                setusl(e.target.value)
              }} />


            </div>
          </div>
          <div className="col-sm-6" style={{ marginTop: 20 }}>
            <div className="form-group">
              <label>Lower Spec Limit, LSL</label>
              <input type='number' className="form-control" value={lsl} onChange={(e) => {
                setlsl(e.target.value)
              }} />


            </div>
          </div>
        </div>



      </div>
    )
  }

  const renderTable = () => {
    if (tableData != null && tableData.length > 0 && warningStatus != null) {
      const rule3render = (index) => {
        for (let i = (index - 8) <= 0 ? 0 : (index - 8); i <= index; i++) {
          if (warningStatus.rule3Index.includes(i)) {
            return 'Warning'
          }
        }
        return ''
      }
      const rule4render = (index) => {
        for (let i = (index - 5) <= 0 ? 0 : (index - 5); i <= index; i++) {
          if (warningStatus.rule4Index.includes(i)) {
            return 'Warning'
          }
        }
        return ''
      }
      const renderTableBody = () => {
        return tableData.map((item, index) => (
          <tr>
            <td>
              {item.sample}
            </td>
            <td>
              {(item.X_bar).toFixed(2)}
              {item.X_bar > item.ucl_x ? <span style={{ marginLeft: 5 }} className="description-percentage text-danger"><i className="fas fa-caret-up"></i>{(item.X_bar - item.ucl_x).toFixed(2)}</span> : <></>}
              {item.X_bar < item.lcl_x ? <span style={{ marginLeft: 5 }} className="description-percentage text-danger"><i className="fas fa-caret-down"></i>{(item.lcl_x - item.X_bar).toFixed(2)}</span> : <></>}
            </td>
            <td>
              {(item.Range).toFixed(2)}
              {item.Range > item.ucl_r ? <span style={{ marginLeft: 5 }} className="description-percentage text-danger"><i className="fas fa-caret-up"></i>{(item.Range - item.ucl_r).toFixed(2)}</span> : <></>}
              {item.Range < item.lcl_r ? <span style={{ marginLeft: 5 }} className="description-percentage text-danger"><i className="fas fa-caret-down"></i>{(item.lcl_r - item.Range).toFixed(2)}</span> : <></>}

            </td>
            <td>
              {(item.ucl_x).toFixed(2)}
            </td>
            <td>
              {(item.cl_x).toFixed(2)}
            </td>
            <td>
              {(item.lcl_x).toFixed(2)}
            </td>
            <td>
              {(item.ucl_r).toFixed(2)}
            </td>
            <td>
              {(item.cl_r).toFixed(2)}
            </td>
            <td>
              {(item.lcl_r).toFixed(2)}
            </td>
            <td>
              {warningStatus.rule1Index.includes(index) ? 'Failed' : ''}
            </td>
            <td>
              {warningStatus.rule2Index.includes(index) ? 'Failed' : ''}
            </td>
            <td>
              {rule3render(index)}
            </td>
            <td>
              {rule4render(index)}
            </td>
          </tr>

        ))
      }

      return (
        <div className="card-body table-responsive p-0">
          <table className="table table-sm text-nowrap" >
            <thead>
              <tr>
                <th colspan="3" style={{ backgroundColor: '#0fffff', textAlign: 'center' }}>Data Table</th>
                <th colspan="3" style={{ backgroundColor: '#0fff70', textAlign: 'center' }}>X-bar Chart</th>
                <th colspan="3" style={{ backgroundColor: '#ffa0a0', textAlign: 'center' }}>R Chart</th>
                <th colspan="4" style={{ backgroundColor: '#ffC900', textAlign: 'center' }}>SPC rules</th>
              </tr>
              <tr>
                <th style={{ backgroundColor: '#0fffff' }}>Sample</th>
                <th style={{ backgroundColor: '#0fffff' }}>X_bar</th>
                <th style={{ backgroundColor: '#0fffff' }}>Range</th>
                <th style={{ backgroundColor: '#0fff70' }}>UCL</th>
                <th style={{ backgroundColor: '#0fff70' }}>CL</th>
                <th style={{ backgroundColor: '#0fff70' }}>LCL</th>
                <th style={{ backgroundColor: '#ffa0a0' }}>UCL</th>
                <th style={{ backgroundColor: '#ffa0a0' }}>CL</th>
                <th style={{ backgroundColor: '#ffa0a0' }}>LCL</th>
                <th style={{ backgroundColor: '#ffC900' }}>Case 1</th>
                <th style={{ backgroundColor: '#ffC900' }}>Case 2</th>
                <th style={{ backgroundColor: '#ffC900' }}>Case 3</th>
                <th style={{ backgroundColor: '#ffC900' }}>Case 4</th>
              </tr>
            </thead>
            <tbody>
              {renderTableBody()}
            </tbody>
          </table>

        </div>
      )
    }
  }

  const renderChart = () => {
    if (chartData != null) {
      return (
        <div className="app">
          <div className="mixed-chart" style={{ width: '100%', padding: '3%' }}>
            <Chart
              options={{
                title: {
                  text: 'X-bar Chart',
                  align: 'center',
                  style: {
                    fontSize: '30px',
                    fontWeight: 'bold',
                    color: '#263238',
                  },
                },
                fill: {
                  type: 'solid',
                  colors: ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#ffb000', '#d060f0'],
                  opacity: [0, 0, 0, 0, 0, 0, 0.5, 0.5],
                },
                dataLabels: {
                  enabled: false
                },
                xaxis: {
                  categories: chartData.xChart.categories
                },
                stroke: {
                  curve: stoke,  // smooth,straight,stepline
                  dashArray: [0, 8, 5, 5]
                },
                yaxis: {
                  labels: {
                    formatter: function (value) {
                      try {
                        return value.toFixed(2);
                      } catch (error) {
                        return value
                      }

                    }
                  },
                },
              }}
              series={chartData.xChart.series}
              type="area"
              height='400'
            />
            <br></br>
            <Chart
              options={{
                title: {
                  text: 'R Chart',
                  align: 'center',
                  style: {
                    fontSize: '30px',
                    fontWeight: 'bold',
                    color: '#263238',
                  },
                },
                xaxis: {
                  categories: chartData.rChart.categories
                },
                stroke: {
                  curve: stoke,  // smooth,straight,stepline
                  dashArray: [0, 8, 5, 5]
                },
                yaxis: {
                  labels: {
                    formatter: function (value) {
                      return value.toFixed(2);
                    }
                  },
                },

              }}
              series={chartData.rChart.series
              }
              type="line"
              height='400'
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <img style={{ width: '100%' }} src="/images/SPC_rules.png" />
          </div>
        </div>
      )
    }

  }

  const renderProcessCapability = () => {
    if (processCapability) {
      return (
        <div className="card card-primary card-outline">
          <div className="card-body box-profile">
            <h3 className="profile-username text-center">Process Capability</h3>
            {/* <p className="text-muted text-center">Software Engineer</p> */}
            <ul className="list-group list-group-unbordered mb-3">
              <li className="list-group-item">
                <b>Cp</b> <a className="float-right">{processCapability.cp ? (processCapability.cp).toFixed(2) : '-'}</a>
              </li>
              <li className="list-group-item">
                <b>CPU</b> <a className="float-right">{processCapability.cpu ? (processCapability.cpu).toFixed(2) : '-'}</a>
              </li>
              <li className="list-group-item">
                <b>CPL</b> <a className="float-right">{processCapability.cpl ? (processCapability.cpl).toFixed(2) : '-'}</a>
              </li>
              <li className="list-group-item">
                <b>Cpk</b> <a className="float-right">{processCapability.cpk ? (processCapability.cpk).toFixed(2) : '-'}</a>
              </li>
              <li className="list-group-item">
                <b>Percent Yield</b> <a className="float-right">{processCapability.PercentYield ? (processCapability.PercentYield).toFixed(2) : '-'}%</a>
              </li>
            </ul>
          </div>
          {/* /.card-body */}
        </div>
      )
    }

  }

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>X-bar , R-chart</h1>
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
                {renderUploadCSV()}
                {renderProcessCapability()}
                {renderChart()}
                {renderTable()}
                <div className='card-footer'>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
