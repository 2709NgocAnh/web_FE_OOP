import Cookies from "js-cookie";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { DataProvider } from "./customer/components/dataProvider/DataProvider";
import { PRIVATEROUTES, PUBLICROUTES, SHIPPERROUTES } from "./routes";

function App() {
  const role = Cookies.get("role");
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Routes>
            {PRIVATEROUTES.map((route, index) => {
              const Page = route.component;
              let Layout = route.layout;
              return (
                <>
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        {role === "admin" ? (
                          <Page />
                        ) : (
                          <Navigate to="/sign-in" />
                        )}
                      </Layout>
                    }
                  />
                </>
              );
            })}
            {SHIPPERROUTES.map((route, index) => {
              const Page = route.component;
              return (
                <>
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <>
                        {role === "shipper" ? (
                          <Page />
                        ) : (
                          <Navigate to="/sign-in" />
                        )}
                      </>
                    }
                  />
                </>
              );
            })}
            {PUBLICROUTES.map((route, index) => {
              const Page = route.component;
              let Layout = route.layout;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}
export default App;
