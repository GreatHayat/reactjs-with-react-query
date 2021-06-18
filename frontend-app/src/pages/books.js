import React, { useState } from "react";
import Select from "react-select";
import { useQuery, useMutation, useQueryClient } from "react-query";
import api from "../config/api";
import { ToastContainer, toast } from "react-toastify";

const getBooks = async () => {
  return await api.get("/books");
};

const createBook = async (book) => {
  return await api.post("/books", book);
};

const deleteBook = async (id) => {
  return await api.delete(`/books/${id}`);
};

const _getUsers = async () => {
  const { data } = await api.get("/users");
  return data;
};

const Books = () => {
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState("");
  const [user, setUser] = useState("");

  const queryClient = useQueryClient();

  React.useEffect(() => {
    const users = queryClient.getQueryData("users");
    console.log(users);
  });
  const { isLoading, data: books } = useQuery("books", getBooks);
  const { isLoading: loading, data: users } = useQuery("users", _getUsers);

  const mutation = useMutation(createBook, {
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries("books");
      setUser("");
      setTitle("");
      setPages("");
      toast.success(data.message);
    },
  });

  const deleteMutation = useMutation(deleteBook, {
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries("books");
      toast.error(data.message);
    },
  });

  //   if (isLoading) {
  //     return <p>Loading</p>;
  //   }
  const getUsers = () => {
    return (
      users &&
      users.length > 0 &&
      users.map((user) => {
        return {
          label: user.username,
          value: user.id,
        };
      })
    );
  };

  const handleSubmit = () => {
    const data = {
      title,
      pages,
      userId: user.value,
    };
    mutation.mutate(data);
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-4">
          <div className="form-group">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              placeholder="Book Title"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              className="form-control"
              placeholder="Book Pages"
            />
          </div>
          <div className="form-group">
            <Select
              options={getUsers()}
              placeholder="Select a book author..."
              onChange={(e) => setUser(e)}
            />
          </div>

          <div className="form-group">
            <button
              className="btn btn-primary btn-block"
              onClick={handleSubmit}
            >
              ADD BOOK
            </button>
          </div>
        </div>

        <div className="col-md-8">
          <ul className="list-group">
            {books &&
              books.data.map((item, idx) => (
                <li key={idx} className="list-group-item">
                  {item.title}

                  <button
                    className="btn btn-danger btn-sm float-right"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default Books;
