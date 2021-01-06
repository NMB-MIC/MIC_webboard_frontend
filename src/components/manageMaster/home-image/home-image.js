import React, { Component } from "react";
import { key, server } from "../../../constants";
import { httpClient } from "./../../../utils/HttpClient";
import { Formik } from "formik";
import Moment from "react-moment";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

class HomeImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      updateBy: localStorage.getItem(key.USER_EMP),
    };
  }

  componentDidMount = async () => {
    this.getData();
  };

  getData = async () => {
    var data = await httpClient.get(server.HOME_IMAGE_URL);
    // alert(JSON.stringify(data.data.result));
    this.setState({ data: data.data.result });
  };
  
  bufferToBase64 = (fileData, fileType) => {
    var binary = "";
    var bytes = new Uint8Array(fileData);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return "data:" + fileType + ";base64," + window.btoa(binary);
  };

  deleteImageHome = async (id) => {
    await httpClient.delete(server.HOME_IMAGE_URL, { data: { id } });
    this.getData();
  };
  
  renderTableRow = () => {
    try {
      var data = this.state.data;

      if (data.length > 0) {
        return data.map((item) => (
          <tr key={item.id} role="row" className="odd">
            <td>{item.id}</td>
            <td>
              <Moment format="DD-MMM-YYYY">{item.createdAt}</Moment>
            </td>
            <td>
              <Moment format="DD-MMM-YYYY">{item.updatedAt}</Moment>
            </td>

            <td>{item.updateBy}</td>
            <td>
              <img
                src={this.bufferToBase64(item.fileData.data, item.fileType)}
                style={{ maxHeight: 100 }}
              />
            </td>
            <td>
              <span style={{ color: "grey" }}> | </span>
              <button
                onClick={() => {
                  MySwal.fire({
                    title: "Are you sure to delete?",
                    text: "You won't be able to revert this!",
                    type: "warning",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonColor: "#d33",
                    cancelButtonText: "No, cancel!",
                  }).then((result) => {
                    if (result.value) {
                      this.deleteImageHome(item.id);
                    }
                  });
                }}
                type="button"
                className="btn btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        ));
      }
    } catch (error) {}
  };

  showPreviewImage = (values) => {
    if (values.file_obj) {
      return <img src={values.file_obj} style={{ maxHeight: 200 }} />;
    }
  };

  showForm = ({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }) => {
    return (
      <form className="form-primary" onSubmit={handleSubmit}>
        <div className="card-body" style={{ marginTop: 5 }}>
          <div className="input-group" style={{ marginTop: 5 }}>
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span
                  class="iconify"
                  data-icon="cil:image-plus"
                  data-inline="ture"
                ></span>
                <span style={{ color: "#000000", marginLeft: 5 }}>
                  {" "}
                  Add Picture{" "}
                </span>
              </span>
            </div>
            {/* <label for="customFile">Custom File</label> */}
            <div className="custom-file">
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setFieldValue("file", e.target.files[0]); // for upload
                  setFieldValue(
                    "file_obj",
                    URL.createObjectURL(e.target.files[0])
                  ); // for preview image
                }}
                type="file"
                name="image"
                multiple
                accept="image/*"
                style={{ padding: "20px 0" }}
                className="custom-file-input"
              />
              <label className="custom-file-label" htmlFor="customFile">
                Choose file
              </label>
            </div>
          </div>

          {/* preview Image */}
          <div
            className="card-body"
            style={{ marginTop: 5, textAlign: "center" }}
          >
            {this.showPreviewImage(values)}
          </div>
        </div>
        <div className="card-footer" style={{ marginTop: 5 }}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-success pull-right"
          >
            Submit
          </button>
          <a
            onClick={() => {
              this.props.history.goBack();
            }}
            type="Button"
            className="btn btn-default float-right"
            style={{ marginRight: 10 }}
          >
            Cancel
          </a>
        </div>
      </form>
    );
  };

  addData = async (history, formData) => {
    await httpClient.post(server.HOME_IMAGE_URL, formData);
    window.location.reload(false);
  };

  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Manage home-image</h1>
              </div>
              <div className="col-sm-6"></div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        <section className="content">
          <div className="card card-primary">
            <div class="card-header">
              <h3 class="card-title">Add new image</h3>
            </div>
            <div>
              <Formik
                initialValues={{ name: "", stock: 0, price: 0 }}
                onSubmit={(values, { setSubmitting }) => {
                  let formData = new FormData();

                  formData.append("file", values.file);
                  this.addData(this.props.history, formData);
                  setSubmitting(true);
                  // setTimeout(() => {
                  //   setSubmitting(false);
                  // }, 200);
                }}
              >
                {(props) => this.showForm(props)}
              </Formik>
            </div>
          </div>
          <div className="card card-success">
            <div className="card-header">
              <h3 className="card-title">Home-image list</h3>
            </div>
            <div className="card-body">
              <div className="card-body table-responsive p-0">
                <table
                  id="example2"
                  className="table table-hover text-nowrap"
                  role="grid"
                  aria-describedby="example2_info"
                >
                  <thead>
                    <tr role="row">
                      <th
                        className="sorting_asc"
                        tabIndex={0}
                        aria-controls="example2"
                        rowSpan={1}
                        colSpan={1}
                        aria-sort="ascending"
                        aria-label="Rendering engine: activate to sort column descending"
                      >
                        id
                      </th>
                      <th
                        className="sorting_asc"
                        tabIndex={0}
                        aria-controls="example2"
                        rowSpan={1}
                        colSpan={1}
                        aria-sort="ascending"
                        aria-label="Rendering engine: activate to sort column descending"
                      >
                        Created
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="example2"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Browser: activate to sort column ascending"
                      >
                        updatedAt
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="example2"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Platform(s): activate to sort column ascending"
                      >
                        updateBy
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="example2"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Engine version: activate to sort column ascending"
                      >
                        Image
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="example2"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="CSS grade: activate to sort column ascending"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>{this.renderTableRow()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default HomeImage;
