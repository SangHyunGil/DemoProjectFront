import React, {useState} from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';

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
    position: relative;
    &:hover {
        color: #ffc107;
    }
    &.active {
        /*border-bottom: 2px solid #ffc107;*/
        &:hover {
            color: #13C6DC;
        }
    }
    & + & {
        margin-left: 1rem;
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

const LineVariants = {
    start: {
        opacity: 0,
        x: -100
    },
    onGoing: {
        opacity: 1,
        x: 0
    },
};

function Categories() {
    const isLogin = useSelector(state => state.users.isLogin);
    const [IsSelected, setIsSelected] = useState('all');
    return (
        <> 
            <CategoryWrapper>
                {category.map(c => (
                    <Category key={c.name} 
                    activeclassname="active"
                    onClick={() => setIsSelected(c.name)}
                    to = {c.name === 'all'? '/':`/${c.name}`}>{c.title}{IsSelected === c.name ? (<UnderLine variants={LineVariants} initial="start" animate="onGoing" layoutId='underline'/>) : null}</Category>
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