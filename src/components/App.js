import React, { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import "./../styles/App.css";
import UserDetails from "./UserDetails";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCurrentRequest = true;

    const fetchUsers = async () => {
      try {
        const response = await fetch(USERS_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (isCurrentRequest) {
          setUsers(result);
        }
      } catch (err) {
        if (isCurrentRequest) {
          setError(err.message);
        }
      } finally {
        if (isCurrentRequest) {
          setLoading(false);
        }
      }
    };

    fetchUsers();

    return () => {
      isCurrentRequest = false;
   };
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => (
  <div>
    {/* Do not remove the main div */}
    <Switch>
      <Route exact path="/" component={UserList} />
      <Route path="/user/:id" component={UserDetails} />
    </Switch>
  </div>
);

export default App;
