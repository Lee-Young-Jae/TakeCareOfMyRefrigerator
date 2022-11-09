import "./App.css";
import AppLayout from "./Style/AppLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Main from "./Pages/Main";
import { ThemeProvider } from "styled-components";
import theme from "./Style/theme";
import SignUp from "./Pages/SignUp";
import CheckList from "./Pages/CheckList";
// import GlobalStyle from "./Style/GlobalStyle.js";

const App = () => {
  return (
    <div className="App">
      {/* <GlobalStyle /> */}
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Main></Main>}></Route>
              <Route path="/login" element={<Login></Login>}></Route>
              <Route path="/signup" element={<SignUp></SignUp>}></Route>
              <Route
                path="/checklist"
                element={<CheckList></CheckList>}
              ></Route>

              <Route path="/*" element={<NotFound></NotFound>}></Route>
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
