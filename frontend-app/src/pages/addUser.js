import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import api from "../config/api";

const saveUser = async (user) => {
  const { data } = await api.post("/users", user);
  return data;
};

const AddUser = () => {
  const queryClient = useQueryClient();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [state, setState] = useState({})

  const mutation = useMutation(saveUser, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("users");
      //queryClient.setQueryData("users", data.user);
      const result = queryClient.getQueryData("users");
      console.log("result", result);
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

  return (
    <React.Fragment>
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
      <div className="form-group">
        <input
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Add User
        </button>
      </div>
    </React.Fragment>
  );
};

export default AddUser;
