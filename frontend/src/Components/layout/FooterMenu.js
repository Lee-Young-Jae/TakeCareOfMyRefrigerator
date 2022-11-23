import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styled from "styled-components";
import shopping_cart_checkoutSVG from "../../SVG/shopping_cart_checkout.svg";
import browse_activitySVG from "../../SVG/browse_activity.svg";
import loginSVG from "../../SVG/login.svg";
import homeSVG from "../../SVG/home.svg";

const FooterMenuStyle = styled.div`
  /* 공통 Layout */

  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 500px;
  height: 75px;
  background-color: #eeeeee80;
  backdrop-filter: blur(10px);
`;

const FooterMenuList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  flex-grow: 1;
`;

const FooterMenuListItem = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  cursor: pointer;
  width: 24%;
`;

const FooterMenuLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  font-size: 12px;
  color: #000000;
  opacity: 0.4;
  transition: 0.5s;

  &:hover {
    opacity: 1;
    transition: 0.5s;
  }
`;

const FooterMenuImage = styled.img`
  width: 25px;
  height: 25px;
`;

const FooterMenu = () => {
  const { me } = useSelector((state) => state.user);

  return (
    <FooterMenuStyle>
      <FooterMenuList>
        <FooterMenuListItem to="/">
          <FooterMenuLinkWrapper>
            <FooterMenuImage src={homeSVG} alt={"homeSVG"}></FooterMenuImage>
            <span>홈</span>
          </FooterMenuLinkWrapper>
        </FooterMenuListItem>
        <FooterMenuListItem to="/shopcart">
          <FooterMenuLinkWrapper>
            <FooterMenuImage
              src={shopping_cart_checkoutSVG}
              alt={"shopping_cart_checkoutSVG"}
            ></FooterMenuImage>
            <span>나의 쇼핑</span>
          </FooterMenuLinkWrapper>
        </FooterMenuListItem>

        <FooterMenuListItem to="/myrefrigerator">
          <FooterMenuLinkWrapper>
            <FooterMenuImage src={browse_activitySVG} alt={"browse_activitySVG"}></FooterMenuImage>
            <span>내 냉장고</span>
          </FooterMenuLinkWrapper>
        </FooterMenuListItem>

        <FooterMenuListItem to={me?.id ? "/logout" : "/login"}>
          <FooterMenuLinkWrapper>
            <FooterMenuImage src={loginSVG} alt={"loginSVG"}></FooterMenuImage>
            {me?.id ? <span>로그아웃</span> : <span>로그인</span>}
          </FooterMenuLinkWrapper>
        </FooterMenuListItem>
      </FooterMenuList>
    </FooterMenuStyle>
  );
};

export default FooterMenu;
