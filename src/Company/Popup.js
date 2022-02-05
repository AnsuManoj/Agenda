import React from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

class Popup extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      first_name: "",
      last_name: "",
      start_time: "",
      end_time: "",
      start_date: "",
      end_date: "",
      description: "",
    };
  }

  handleChange = (event) => {
    console.log("caling handle change");
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleModal() {
    this.setState({ show: !this.state.show });
    this.props.getalldata();
  }

  submithandler = () => {
    console.log("send data", this.state);


    if(this.state.first_name == '' || this.state.first_name == [] || this.state.first_name == null || this.state.first_name == 'null') alert('Enter First Name')
else if(this.state.last_name == '' || this.state.last_name == [] || this.state.last_name == null || this.state.last_name == 'null') alert('Enter Last Name')
else if(this.state.start_time == '' || this.state.start_time == [] || this.state.start_time == null || this.state.start_time == 'null') alert('Enter Start Time')
else if(this.state.end_time == '' || this.state.end_time == [] || this.state.end_time == null || this.state.end_time == 'null') alert('Enter End Time')
else if(this.state.start_date == '' || this.state.start_date == [] || this.state.start_date == null || this.state.start_date == 'null') alert('Select Start Date')
else if(this.state.end_date == '' || this.state.end_date == [] || this.state.end_date == null || this.state.end_date == 'null') alert('Select End Date')
else if(this.state.description == '' || this.state.description == [] || this.state.description == null || this.state.description == 'null') alert('Select Description')
else {

    const data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      start_time: this.state.start_time,
      end_time: this.state.end_time,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      description: this.state.description,
    };
    axios
      .post("http://64.227.162.73/api/insert-data", data)
      // .get("http://64.227.162.73/api/get-data")

      .then((response) => {
        console.log("response success", response);
        if (response.status === 200) {
          console.log("response success");
          this.handleModal();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    };
  };

  render() {
    return (
      <>
        <button
          type="button"
          className="btn btn-primary crud"
          onClick={() => this.handleModal()}
        >
          CREATE CRUD
        </button>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.show}
          onHide={() => this.handleModal()}
          // onEntered={this.test}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              CRUD Operations
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form autocomplete="off" onSubmit={this.submithandler}>
              <div className="container page">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        value={this.state.first_name}
                        name="first_name"
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Enter first name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        value={this.state.last_name}
                        name="last_name"
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Enter last name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Start Time</label>
                      <input
                        type="time"
                        value={this.state.start_time}
                        name="start_time"
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Enter start date"
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>End Time</label>
                      <input
                        type="time"
                        value={this.state.end_time}
                        name="end_time"
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Enter start date"
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Start Date</label>
                      <input
                        type="date"
                        value={this.state.start_date}
                        name="start_date"
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Enter start date"
                        required
                      ></input>
                      {/* <input
                        type="text"
                        value={this.state.start_date}
                        name="start_date"
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Enter start date"
                        required
                      /> */}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>End Date</label>
                      <input
                        type="date"
                        value={this.state.end_date}
                        name="end_date"
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Enter start date"
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      value={this.state.description}
                      name="description"
                      onChange={this.handleChange}
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  <br />
                  <div className="mx-auto">
                    <button
                      type="button"
                      onClick={this.submithandler}
                      className="btn btn-primary text-right"
                    >
                      CREATE CRUD
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => this.handleModal()}
              className="btn btn-danger
                       "
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Popup;
