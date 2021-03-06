import { useState, useEffect } from "react";
import { accessToken, logout, getCurrentUserProfile } from "./spotify";
import { BrowserRouter as Router, Switch, useLocation } from "react-router-dom";
import { catchErrors } from "./utils";
import styled from "styled-components/macro";
import { GlobalStyle } from "./styles";
import { Login } from "./pages";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        {!token ? (
          <Login />
        ) : (
          <Router>
            <ScrollToTop />
            <Switch>
              <Router path="/top-artists">
                <h1>Top Artists</h1>
              </Router>
              <Router path="/top-tracks">
                <h1>Top Tracks</h1>
              </Router>
              <Router path="/playlist/:id">
                <h1>Playlist</h1>
              </Router>
              <Router path="/playlist">
                <h1>Playlist Route</h1>
              </Router>
              <Router path="/">
                <>
                  <button onClick={logout}>Log Out</button>
                  {profile && (
                    <div>
                      <h1>{profile.display_name}</h1>
                      <p>{profile.followers.total} Followers</p>
                      {profile.followers.total && profile.images[0].url && (
                        <img src={profile.images[0].url} alt="Avatar" />
                      )}
                    </div>
                  )}
                </>
              </Router>
            </Switch>
          </Router>
        )}
      </header>
    </div>
  );
}

export default App;
