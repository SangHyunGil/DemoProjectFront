import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion/dist/framer-motion";
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import HomeIcon from '@mui/icons-material/Home';

const category = [
  { name: "all", title: "메인" },
  {name: 'aboutus', title: '소개'},
  { name: "study/depart/CSE", title: "스터디" },
];

export const CategoryWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px 18px 30px;
  //box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
  border-bottom: 2px solid #e6e6e6;
  @media (min-width:341px) and (max-width: 900px) {
    div {
      &:nth-child(2) {
        display: none;
      }
    }
  }
  @media (max-width: 340px) {
    flex-direction: column;
    a {
      transform: translateX(-50%);
    }
    div {
      &:nth-child(2) {
        display: none;
      }
    }
  }
`;

const CategoryMiddleWrapper = styled.div`
  
`;

export const Category = styled(NavLink)`
  cursor: pointer;
  color: black;
  white-space: pre;
  text-decoration: none;
  position: relative;
  font-size: 1.6rem;
  font-family: "OTWelcomeBA", sans-serif;
  &:hover {
    color: #ffc107;
  }
  &.active, &.StilActive {
    /*border-bottom: 2px solid #ffc107;*/
    color: #ffc107;
    padding-bottom: 5px;
    &:hover {
      color: #13c6dc;
    }
  }
  & + & {
    margin-left: 1.8rem;
  }
  @media (max-width: 900px) {
    & + & {
      margin-left: 10px;
    }
  }
  @media (max-width: 500px) {
    font-size: 1.1rem;
  }
`;

export const UnderLine = styled(motion.div)`
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: #ffc107;
`;

const MainLogoWrapper = styled.a`
  width: 110px;
  text-decoration: none;
  display: flex;
  align-items: center;
  img {
    width: 30%;
  }
  p {
    margin-left: 0.5rem;
    font-family: 'Rubik Mono One',sans-serif;
    font-size: 2rem;
    flex: 1;
    white-space: nowrap;
    color: #ffc107;
    span {
      color: #0049AF;
    }
  }
  @media  (max-width: 900px) {
    width: 30%;
    p {
      font-size: 1.5rem;
    }
  }
`;

const BottomNavBar = styled(Paper)`
  position: sticky;
  bottom: 0;
  width: 100%;
  display: none;
  z-index: 99;
  @media (max-width: 900px) {
    display: flex;
    justify-content: center;
  }
`;

const BottomNavBarAction = styled(BottomNavigationAction)`
  svg {
    padding-bottom: 6px;
  }
`;

const LineVariants = {
  start: {
    opacity: 0,
    x: -100,
  },
  onGoing: {
    opacity: 1,
    x: 0,
  },
};

function Categories(props) {
  const isLogin = useSelector((state) => state.users.isLogin);
  const location = useLocation();
  const [IsSelected, setIsSelected] = useState(
    location.pathname !== "/" ? location.pathname.split("/")[1] : "all"
  );
  useEffect(() => {
    setIsSelected(
      location.pathname !== "/" ? location.pathname.split("/")[1] : "all"
    );
  }, [location]);
  const navigate = useNavigate();
  return (
    <>
      <CategoryWrapper>
        <MainLogoWrapper href="/">
          <img src="/main-logo.png" alt="main logo" />
          <p><span>KO</span>NER</p>
        </MainLogoWrapper>
        <CategoryMiddleWrapper>
          {category.map((c) => (
            <Category
              key={c.name}
              activeclassname="active"
              onClick={() => setIsSelected(c.name.split("/")[0])}
              to={c.name === "all" ? "/" : `/${c.name}`}
              className={IsSelected === c.name.split("/")[0] ? "StilActive" : ""}
            >
              {c.title}
              {IsSelected === c.name.split("/")[0] ? (
                <UnderLine
                  variants={LineVariants}
                  initial="start"
                  animate="onGoing"
                  layoutId="underline"
                />
              ) : null}
            </Category>
          ))}
        </CategoryMiddleWrapper>
        <CategoryMiddleWrapper>
          {isLogin ? (
            <>
              <Category to="/logout" >
                로그아웃
              </Category>
              <Category to="/profile">
                마이페이지
                {IsSelected === "profile" ? (
                  <UnderLine
                    variants={LineVariants}
                    initial="start"
                    animate="onGoing"
                    layoutId="underline"
                  />
                ) : null}
              </Category>
            </>
          ) : (
            <>
              <Category to="/login">
                로그인
              </Category>
              <Category to="/signup">
                회원가입
              </Category>
            </>
          )}
        </CategoryMiddleWrapper>
      </CategoryWrapper>
      {props.children}
      <BottomNavBar elevation={2}>
          <BottomNavigation
            showLabels={true}
            value={IsSelected}
            onChange={(newValue) => {
              newValue = newValue === 0 ? 'all' : 'study';
              setIsSelected(newValue);
            }}
          >
            <BottomNavBarAction label="메인" value='all' onClick={()=>navigate('/')} icon={<HomeIcon />} />
            <BottomNavBarAction label="스터디" value='study' onClick={()=>navigate('/study/depart/cse')} icon={<BorderColorIcon />} />
          </BottomNavigation>
      </BottomNavBar>
    </>
  );
}

export default Categories;
