import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";

const category = [
    {name: 'all', title: '메인'}, {name:'callvan', title: '콜밴'},
    {name: 'study', title: '스터디'}, {name: 'market', title: '장터'},
];

export const CategoryWrapper = styled.div`
    display: flex;
    padding: 1rem;
    //box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    border-bottom: 2px solid #e6e6e6;
`;

export const Category = styled(NavLink)`
    cursor: pointer;
    white-space: pre;
    text-decoration: none;
    &:hover {
        color: #ffc107;
    }
    &.active {
        border-bottom: 2px solid #ffc107;
        &:hover {
            color: #13C6DC;
        }
    }
    & + & {
        margin-left: 1rem;
    }
    
`;

function Categories() {
    const isLogin = useSelector(state => state.users.isLogin);
    return (
        <> 
            <CategoryWrapper>
                {category.map(c => (
                    <Category key={c.name} 
                    activeclassname="active"
                    to = {c.name === 'all'? '/':`/${c.name}`}>{c.title}</Category>
                ))}
                {isLogin?  <>
                            <Category to="/logout">로그아웃</Category>
                            <Category to="/profile">마이페이지</Category>
                           </> 
                          : 
                         (
                            <>
                             <Category to="/login">로그인</Category> 
                             <Category to="/signup">회원가입</Category>
                            </>
                         )}
                
            </CategoryWrapper> 
        </>
    )
}

export default Categories;