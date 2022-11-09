import React, { useState } from "react";
import HeadMenu from "../Components/layout/HeadMenu";
import styled from "styled-components";
import Dialog from "../Components/common/Dialog";
import FooterMenu from "../Components/layout/FooterMenu";

const AppLayoutStyle = styled.div`
  /* 앱의 Background */
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #eeeeee;
  overflow: hidden;
`;

const AppBodyWrapperStyle = styled.div`
  /* 앱의 Body */
  width: 500px;

  height: 700px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
`;

const AppBodyStyle = styled.div`
  /* 앱의 Body */
  width: 500px;

  height: 100%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const AppLayout = ({ children }) => {
  const [dialog, setDialog] = useState(false);

  const onConfirm = () => {
    console.log("확인");
    setDialog(false);
  };

  const onCancel = () => {
    console.log("취소");
    setDialog(false);
  };

  return (
    <AppLayoutStyle>
      <AppBodyWrapperStyle>
        <AppBodyStyle>
          <HeadMenu></HeadMenu>
          {children}
          <FooterMenu></FooterMenu>
        </AppBodyStyle>
        <Dialog
          title="정말로 삭제하시겠습니까?"
          visible={dialog}
          onCancel={onCancel}
          onConfirm={onConfirm}
        >
          데이터를 정말로 삭제하시겠습니까?
        </Dialog>
      </AppBodyWrapperStyle>
    </AppLayoutStyle>
  );
};

export default AppLayout;
