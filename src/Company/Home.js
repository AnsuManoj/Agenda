import { useState, useEffect } from "react";
import { ExcelRenderer } from "react-excel-renderer";
import $ from "jquery";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import axios from "axios";
import EditPopup from "./EditPopup";
import Popup from "./Popup";
import Header from "./Header";

function Home() {
  const [cols, setcols] = useState([
    "ID",
    "FIRST_NAME",
    "LAST_NAME",
    "START_TIME",
    "END_TIMES",
    "START_DATE",
    "END_DATE",
    "DESCRIPTION",
  ]);
  const [remountCount, setRemountCount] = useState(0);
  // const refresh = () => setRemountCount(remountCount + 1);
  const [rows, setrows] = useState([]);
  const [show, setShow] = useState(false);
  const [newmModal, setnewModal] = useState(false);
  const [passeddata, setpasseddata] = useState([]);

  useEffect(() => {
    $("#addfile").hide();
    getAllData();
  }, []);

  const getAllData = () => {
    axios

      .get("http://64.227.162.73/api/get-data")

      .then((response) => {
        if (response.status === 200) {
          setrows(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteHandler = (dataid) => {
    console.log("delete handler calling", dataid);
    const data = {
      id: dataid,
    };
    axios
      .get("http://64.227.162.73/api/delete-data?id=" + dataid)

      .then((response) => {
        console.log("response success", response);
        if (response.status === 200) {
          console.log("response success");
          getAllData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editHandler = (dataid, i) => {
    setShow(true);
    setpasseddata(dataid);
  };

  const closeMOdalHandler = () => {
    setShow(false);
    getAllData();
  };

  const closenNewMOdalHandler = () => {
    setShow(false);
    setnewModal(false);
  };

  const fileHandler = (event) => {
    let fileObj = event.target.files[0];
    console.log("rowwssssss");
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        console.log("rowwssssss", resp.rows);
        if (resp.rows[0].length !== 8) {
          alert("PLease check your Sheet Content");
        } else {
          resp.rows.splice(0, 1);
          for (let i = 0; i < resp.rows.length; i++) {
            const data = {
              first_name: resp.rows[i][1],
              last_name: resp.rows[i][2],
              start_time: resp.rows[i][3],
              end_time: resp.rows[i][4],
              start_date: resp.rows[i][5],
              end_date: resp.rows[i][6],
              description: resp.rows[i][7],
            };
            addAxelData(data);
          }

          console.log("table data===>", rows);
          getAllData();
          $("#addfile").val("");
        }
      }
    });
  };

  const addAxelData = (data) => {
    axios
      .post("http://64.227.162.73/api/insert-data", data)
      // .get("http://64.227.162.73/api/get-data")

      .then((response) => {
        if (response.status === 200) {
          getAllData();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const importHandler = () => {
    $("#addfile").trigger("click");
  };

  return (
    <div>
      <Header getalldata={getAllData} />
      <>
        <div className="container home">
          <div className="row">
            <div className="col-md-9">
              <h3>Import and export</h3>
            </div>

            <div className="col-md-3" align="right">
              <button
                onClick={importHandler}
                type="button"
                class="btn btn-info"
              >
                Import
              </button>{" "}
              {/* <button addfile type="button" class="btn btn-warning">
                Export
              </button> */}
              <ReactHTMLTableToExcel
                className="btn btn-info"
                table="details"
                filename="ReportExcel"
                sheet="Sheet"
                buttonText="Export"
              />
              <input type="file" id="addfile" onChange={fileHandler} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <table class="table" id="details">
                <thead>
                  <tr>
                    {cols.map((data) => (
                      <th scope="col" key={data}>
                        {data}
                      </th>
                    ))}
               
                  </tr>
                </thead>
                <tbody>
                  {rows.map((data, i) => (
                    <tr>
                      {/* {data !== undefined
                        ? data.map((value) => <td key={value}>{value}</td>)
                        : ""} */}
                      <td>{data.id}</td>
                      <td>{data.first_name}</td>
                      <td>{data.last_name}</td>
                      <td>{data.start_time}</td>
                      <td>{data.end_time}</td>
                      <td>{data.start_date}</td>
                      <td>{data.end_date}</td>
                      <td>{data.description}</td>
                      <td>
                        <i
                          className="fa fa-edit"
                          onClick={() => editHandler(data)}
                        ></i>
                      </td>
                      <td>
                        <i
                          className="fa fa-trash"
                          onClick={() => deleteHandler(data.id)}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <EditPopup
                show={show}
                data={passeddata}
                closeMOdalHandler={closeMOdalHandler}
              />
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Home;
