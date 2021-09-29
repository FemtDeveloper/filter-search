import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const response = axios.get(`https://api.github.com/users`).then((res) => {
      setData(res.data);
    });
    console.log(data);
  }, []);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search user..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <h1>{search}</h1>
      <main className="main-container">
        {data
          .filter((user) => {
            if (user === "") {
              return user;
            } else if (
              user.login.toLowerCase().includes(search.toLowerCase())
            ) {
              return user;
            }
          })
          .map((user) => (
            <div key={user.id} className="user-container">
              <img src={user.avatar_url} alt="avatar" className="user-image" />
              <h3>{user.login}</h3>
              <h4>Followers: {user.followers_url.length}</h4>
            </div>
          ))}
      </main>
    </div>
  );
}

export default App;
