import React, { Component } from 'react'
import Swal from "sweetalert2";
import _ from "lodash";
import moment from "moment"
import { httpClient } from '../../../utils/HttpClient';
import { key, OK } from '../../../constants';

class RfidMaskOrder extends Component {
  constructor(props) {
    super(props)

    this.state = {
      empNumber: '',
      orderReson: '',
      empData: {},
      isOrderYet: false,
      a: ''
    }
  }

  componentDidMount() {
    this.debounceSearch = _.debounce(this.getEmpImformation, 800);
  }

  onChange = (e) => {
    e.persist();
    this.debounceSearch(e);
  };

  getEmpImformation = async () => {
    try {
      if (this.state.empNumber != null && this.state.empNumber != '') {
        let result = await httpClient.get('/orderMask/employee_master/' + this.state.empNumber)
        if (result.data.api_result == OK) {
          let orderResult = await httpClient.get('/orderMask/find_order_mask/' + this.state.empNumber)
          let isOrderYet = false
          if (orderResult.data.result != null) {
            isOrderYet = true
          }
          await this.setState({ empData: result.data.result, isOrderYet })
          console.log(result.data.result);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  renderOrderResult = () => {
    if (this.state.empNumber == '') {
      return <div></div>
    }
    if (this.state.empData != null) {
      if (this.state.isOrderYet) {
        return (
          <div style={{ textAlign: "center", fontSize: 20 }}>
            <p style={{ color: 'red' }}>{this.state.empData.employee_name}</p>
            <p style={{ color: 'red' }}>คุณได้ทำการจองหน้ากากอนามัยไปแล้ว</p>
          </div>
        )
      } else {
        return (
          <div style={{ textAlign: "center", fontSize: 20 }}>
            <p style={{ color: 'blue' }}>{this.state.empData.employee_name}</p>
            <p style={{ color: 'green' }}>คุณมีสิทธิ์ในการจองหน้ากากอนามัย</p>
          </div>
        )
      }

    } else if (this.state.empNumber != '') {
      return (
        <div style={{ textAlign: "center", fontSize: 20 }}>
          <p style={{ color: 'red' }}>ไม่มีรายชื่อในระบบ โปรดติดต่อหัวหน้างาน</p>
        </div>
      )
    } else {
      return <div></div>
    }
  }

  submitMaskOrder = async () => {
    try {
      if (this.state.empNumber == '' || this.state.empNumber == null) {
        Swal.fire({
          icon: 'error',
          title: 'ผิดพลาด...',
          text: 'กรุณากรอกรหัสพนักงาน!',
        })
      } else {
        if (this.state.empData == null) {
          Swal.fire({
            icon: 'error',
            title: 'ผิดพลาด...',
            text: 'รหัสพนักงานนี้ไม่มีสิทธิ์ในการจอง',
          })
        } else {
          if (this.state.orderReson == '' || this.state.orderReson == null) {
            Swal.fire({
              icon: 'error',
              title: 'ผิดพลาด...',
              text: 'กรุณากรอกเหตุผลในการจอง!',
            })
          } else {
            if (this.state.isOrderYet) {
              Swal.fire({
                icon: 'error',
                title: 'ผิดพลาด...',
                text: 'คุณได้จองหน้ากากอนามัยไปแล้ว',
              })
            } else {
              let result = await httpClient.post('/orderMask/order_mask',
                { employee_number: this.state.empNumber, order_reason: this.state.orderReson })
              console.log(result.data);
              if (result.data.api_result == OK) {
                Swal.fire({
                  icon: 'success',
                  title: 'สำเร็จ...',
                  text: 'รหัสพนักงาน ' + this.state.empNumber + ' คุณสั่งจองหน้ากากอนามัยสำเร็จ!',
                  footer: 'สามารถแคปหน้าจอไว้เป็นหลักฐานได้'
                }).then(() => {
                  window.location.reload();
                })
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'ผิดพลาด...',
                  text: 'การสั่งจองหน้ากากอนามันผิดพลาด!',
                  footer: 'โปรดติดต่อหัวหน้างานของท่าน',
                })
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  isButtonDisabled = () => {
    if (this.state.isOrderYet || this.state.empNumber == '' || this.state.empData == null) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div className={ localStorage.getItem(key.USER_EMP) ? 'content-wrapper' : "login-page"} style={{ height: '100%' }}>
        <div
          className="login-box"
          style={{
            width: '95%',
            borderRadius: 8,
            backgroundColor: "WhiteSmoke",
            padding: 12,
          }}
        >
          <div className="card card-outline card-primary" style={{ marginTop: 10 }}>
            <div class="card-header text-center">
              <a href="#" class="h2">สั่งจองหน้ากากอนามัย<br></br> <b> มินีแบมิตซูมิ</b></a>
            </div>
            <div className="card-body login-card-body">
              <p style={{ fontSize: 23, textAlign: "center" }} className="login-box-msg">กรุณากรอกรหัสพนักงาน
                <p style={{ fontSize: 20, textAlign: "center" }}>เพื่อสั่งจองหน้ากากอนามัยมินีแบมิตซูมิจำนวน 1 กล่อง 50 ชิ้น  ราคา 120 บาท</p>
              </p>

              <form>
                <div className="input-group mb-3">
                  <input
                    style={{ fontSize: 18 }}
                    type="text"
                    className="form-control"
                    placeholder="สแกนบัตรพนักงาน"
                    onChange={async (e) => {
                      await this.setState({ empNumber: e.target.value });
                      this.onChange(e)
                    }}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user-friends" />
                    </div>
                  </div>
                </div>
                {this.renderOrderResult()}
                <div style={{ textAlign: "center", fontSize: 20 }}>

                  <div className="login-logo">
                    <img
                      style={{ textAlign: "center", maxWidth: "80%", }}
                      src='./images/PNG_Mask_01.png' />
                  </div>
                </div>
                <div className="input-group mb-3">
                  <select
                    class="form-control"
                    style={{ fontSize: 18 }}
                    onChange={async (e) => {
                      e.preventDefault();
                      await this.setState({ orderReson: e.target.value });
                    }}
                    name="divisionCode"
                    type="text"
                    className="form-control"
                  >
                    <option value="" selected>เหตุผลการจองสิทธิ์การสั่งซื้อ</option>
                    <option value="love company">1.รักและภาคภูมิใจในบริษัทของเรา</option>
                    <option value="Support company product">2.สนับสนุนสินค้าของบริษัท</option>
                    <option value="Trust in quality of product">3.เชื่อมั่นในคุณภาพของสินค้า</option>
                    <option value="Special promotion">4.โปรโมชั่นพิเศษสำหรับพนักงาน</option>
                  </select>
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-list-alt" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  {/* /.col */}
                  <div className="col-12">
                    <button style={{ fontSize: 18 }} disabled={this.isButtonDisabled()} onClick={(e) => {
                      e.preventDefault();
                      this.submitMaskOrder()

                    }} type="submit" className="btn btn-primary btn-block">ยืนยันการจองสิทธิ์</button>
                  </div>
                  {/* /.col */}
                </div>
              </form>

            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default RfidMaskOrder;
