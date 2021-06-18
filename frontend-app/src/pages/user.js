import React from "react";
import { useQuery } from "react-query";
import api from "../config/api";

const getUser = async (id) => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};

const User = (props) => {
  const { isLoading, data: user } = useQuery(
    ["post", props.match.params.id],
    () => getUser(props.match.params.id)
  );

  //   const { isLoading, data: user } = useQuery(
  //     props.match.params.id && ["post", props.match.params.id],
  //     getUser
  //   );
  return (
    <React.Fragment>
      {isLoading ? <p>Loading....</p> : <p>{user.username}</p>}
      <p>hello from user route {props.match.params.id}</p>
    </React.Fragment>
  );
};

export default User;
