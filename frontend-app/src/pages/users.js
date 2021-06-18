import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import api from "../config/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getUsers = async () => {
  const { data } = await api.get("/users");
  return data;
};

const addUser = async (user) => {
  return await api.post("/users", user);
};

const updateUser = async (payload) => {
  const { data } = await api.put(`/users/${payload.id}`, payload.body);
  return data;
};

const deleteUser = async (id) => {
  return await api.delete(`/users/${id}`);
};

const Users = () => {
  const queryClient = useQueryClient();
  const [hide, setHide] = useState(true);
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, data: users, isSuccess } = useQuery("users", getUsers);

  const mutation = useMutation(addUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("users");
      //   queryClient.setQueryData("users", (current) => [data, ...current]);
      toast.info("User added successfully");
      setUsername("");
      setEmail("");
      setPassword("");
    },
    onError: (data) => {
      console.log("onError", data.response);
    },
  });

  const updateMutation = useMutation(updateUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("users");
      //   queryClient.setQueryData(["user", { id }], data[1][0]);
      console.log("On Success", data[1][0]);
      toast.success("User info updated successfully");
      setEmail("");
      setUsername("");
      setId("");
      setHide(true);
    },
  });

  const deleteMutation = useMutation(deleteUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("users");
      toast.warning(data.data.message);
    },
  });

  const handleSubmit = () => {
    const data = {
      username,
      email,
      password,
    };
    mutation.mutate(data);
  };

  const populateForm = (data) => {
    setHide(false);
    setUsername(data.username);
    setEmail(data.email);
    setId(data.id);
  };

  const handleUpdate = () => {
    const data = {
      id,
      body: {
        username,
        email,
      },
    };
    updateMutation.mutate(data);
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const handleCancel = () => {
    setHide(true);
    setUsername("");
    setEmail("");
    setId("");
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {hide && (
            <div className="form-group">
              <input
                type="password"
                value={password}
                className="form-control"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}
          <div className="form-group">
            <button
              className="btn btn-primary"
              onClick={hide ? handleSubmit : handleUpdate}
            >
              {hide ? "Add User" : "Update User"}
            </button>
            {!hide && (
              <button className="btn btn-warning ml-2" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
        </div>

        <div className="col-md-8">
          {isLoading ? (
            <p>Loading....</p>
          ) : (
            <>
              {/* <Link to="/users/add-new-user" className="btn btn-primary mb-5">
                Add New User
              </Link> */}
              <ul className="list-group">
                {users &&
                  users.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <li className="list-group-item">
                        <Link to={`/users/${item.id}`}>{item.username}</Link>
                        <button
                          className="btn btn-danger ml-2 float-right btn-sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-primary float-right btn-sm"
                          onClick={() => populateForm(item)}
                        >
                          Edit
                        </button>
                      </li>
                    </React.Fragment>
                  ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default Users;
