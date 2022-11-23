import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import "./App.css";
import AppLayout from "./Style/AppLayout";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import NotFound from "./Pages/NotFound";
import Main from "./Pages/Main";
import theme from "./Style/theme";
import SignUp from "./Pages/SignUp";
import CheckList from "./Pages/CheckList";
import ShopCart from "./Pages/ShopCart";
import MyRefrigerator from "./Pages/MyRefrigerator";
import Dialog from "./Components/common/Dialog";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LOAD_ME_REQUEST } from "./modules/reducers/user";

const App = () => {
  const [dialog, setDialog] = useState(false);
  const onConfirm = () => {
    setDialog(false);
  };

  const onCancel = () => {
    setDialog(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_ME_REQUEST,
    });
  }, [dispatch]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Dialog
            onlyConfirm
            title="정말로 삭제하시겠습니까?"
            visible={dialog}
            onCancel={onCancel}
            onConfirm={onConfirm}
          >
            데이터를 정말로 삭제하시겠습니까?
          </Dialog>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Main></Main>}></Route>
              <Route path="/login" element={<Login></Login>}></Route>
              <Route path="/logout" element={<Logout></Logout>}></Route>
              <Route path="/signup" element={<SignUp></SignUp>}></Route>
              <Route path="/shopcart" element={<ShopCart></ShopCart>}></Route>
              <Route path="/checklist" element={<CheckList></CheckList>}></Route>
              <Route path="/myrefrigerator" element={<MyRefrigerator></MyRefrigerator>}></Route>

              <Route path="/*" element={<NotFound></NotFound>}></Route>
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
