import React, { useEffect, useState } from "react";
import MockUserData from "../userData.json";
import "./Dashboard.scss";

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [userInModal, setUserInModal] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    setUserData(MockUserData);
    setCurrentUser(MockUserData[0]);
    setUserInModal(MockUserData[0]);
  }, []);

  const handleModalSave = () => {
    const { name, group, feature } = userInModal;
    if (name === "" || group.length === 0 || feature.length === 0) {
      setError(true);
    } else {
      setError(false);
      setCurrentUser(userInModal);
      const tempUserData = JSON.parse(JSON.stringify(userData));

      setUserData(
        tempUserData.map((item) => {
          if (item.id === userInModal.id) {
            item = userInModal;
          }
          return item;
        })
      );
    }
  };

  const handleListItemClick = (listItem) => {
    setCurrentUser(listItem);
    setUserInModal(listItem);
  };

  if (currentUser.length === 0) {
    return null;
  }

  return (
    <div className="container dashboard-container">
      <h1 className="mb-4">User management portal</h1>
      <div className="row">
        <div className="col">
          {userData.map((item, index) => {
            return (
              <div className="card mb-2 bg-light text-dark" id={index}>
                <h5 className="card-header">{item.id}</h5>
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h5 className="card-title">{item.name}</h5>

                      <p className="card-text">
                        <span className="me-2">
                          <b> Gender: </b>
                          {item.gender}
                        </span>
                        <span>
                          <b>Address: </b>
                          {item.address}
                        </span>
                      </p>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleListItemClick(item)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col">
          <div className="user-details bg-light text-dark">
            <p className="fs-2 heading">User Details: {currentUser.id}</p>
            <div className="user-info">
              <p className="fs-5">User Name: {currentUser.name}</p>
              <p className="fs-5">Gender: {currentUser.gender}</p>
              <p className="fs-5">Address: {currentUser.address}</p>
              <p className="fs-5">State: {currentUser.state}</p>
              <p className="fs-5">
                Group:{" "}
                {currentUser.group.map((item) => (
                  <span key={item}>&#8226;{item} </span>
                ))}
              </p>
              <p className="fs-5">
                Feature:{" "}
                {currentUser.feature.map((item) => (
                  <span key={item}>&#8226;{item} </span>
                ))}
              </p>
            </div>
            <button
              type="button"
              className="btn btn-primary mt-2"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => {
                setUserInModal(currentUser);
                setError(false);
              }}
            >
              Update User
            </button>

            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      User Details: {userInModal.id}
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div class="mb-3">
                        <label for="username" class="col-form-label">
                          User Name:
                        </label>
                        <input
                          type="text"
                          value={userInModal.name}
                          class="form-control"
                          id="username"
                          onChange={(e) =>
                            setUserInModal({
                              ...userInModal,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div class="mb-3">
                        <label for="group" class="col-form-label">
                          Group:
                        </label>
                        <input
                          type="text"
                          value={userInModal.group.toString()}
                          class="form-control"
                          id="group"
                          onChange={(e) =>
                            setUserInModal({
                              ...userInModal,
                              group: e.target.value.split(","),
                            })
                          }
                        />
                      </div>
                      <div class="mb-3">
                        <label for="username" class="col-form-label">
                          State:
                        </label>
                        <div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                              checked={
                                userInModal.state === "Active" ? true : false
                              }
                              onChange={(e) =>
                                setUserInModal({
                                  ...userInModal,
                                  state: "Active",
                                })
                              }
                            />
                            <label
                              class="form-check-label"
                              for="flexRadioDefault1"
                            >
                              Active
                            </label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault2"
                              checked={
                                userInModal.state === "Inactive" ? true : false
                              }
                              onChange={(e) =>
                                setUserInModal({
                                  ...userInModal,
                                  state: "Inactive",
                                })
                              }
                            />
                            <label
                              class="form-check-label"
                              for="flexRadioDefault2"
                            >
                              Inactive
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="mb-3">
                        <label for="features" class="col-form-label">
                          Features:
                        </label>
                        <input
                          type="text"
                          value={userInModal.feature.toString()}
                          class="form-control"
                          id="features"
                          onChange={(e) =>
                            setUserInModal({
                              ...userInModal,
                              feature: e.target.value.split(","),
                            })
                          }
                        />
                      </div>
                      {error && (
                        <span className="text-danger">
                          Kindly fill all the details
                        </span>
                      )}
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={() => handleModalSave()}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
