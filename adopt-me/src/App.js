import { StrictMode, useState } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SearchParams from "./SearchParams";
import Details from "./Details";
import ThemeContext from "./ThemeContext";

const App = () => {
  const theme = useState("darkblue");
  /* createContext and it's Provider solves the problem of prop drilling (passing hella props down) */

  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <Router>
          <header>
            <Link to="/">
              <h1>Adopt Me!</h1>
            </Link>
          </header>
          <Switch>
            <Route path="/details/:id">
              <Details />
            </Route>
            <Route path="/">
              <SearchParams />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);

/* For development mode
Many tools (webpack) will need NODE_ENV=development for nice error messages
and NODE_ENV=production for an optimized version. 

With Parcel, it's automatic with a few small changes in scripts.
With webpack, there's plug-ins to make that happen semi-automatically.  
*/

/* Strict Mode 
  Doesn't allow use of "unsafe APIs" - typically being updated in new versions. Read his notes on this. 
*/

/* Router, Route, and Switch -Router v5
React router does partial matching of routes, from left to right. If the path matches multiple routes, React will render all of the routes. 

We need to use the Switch Component to only get the first matching path, and render one route. 

The 'useParams' hook can be used to get search parameters from the URL in React Router. 

The 'useLocation' hook can get the current location '/details/:id'
*/
