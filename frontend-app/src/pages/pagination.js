import React, { useState } from "react";
import { useQuery } from "react-query";

const getPassangers = async (page, size) => {
  const passangers = await fetch(
    `https://api.instantwebtools.net/v1/passenger?page=${page}&size=${size}`
  );
  return await passangers.json();
};

const Pagination = () => {
  const [page, setPage] = useState(1);

  const { isLoading, data: users } = useQuery(["passangers", page, 20], () =>
    getPassangers(page, 20)
  );

  return (
    <React.Fragment>
      <div className="text-center mb-5">
        <button
          className="btn btn-primary mr-2"
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        >
          Previous
        </button>
        <button className="btn btn-primary" onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>

      <ul className="list-group">
        {users &&
          users.data.map((item, idx) => (
            <li className="list-group-item" key={idx}>
              {item.name}
            </li>
          ))}
      </ul>
    </React.Fragment>
  );
};
export default Pagination;
