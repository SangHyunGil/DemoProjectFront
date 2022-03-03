import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MemberLink = styled(Link)`
  text-decoration: none;
  color: black;
  padding: 3px 5px;
  &:hover {
    background-color: rgba(116, 185, 255,.8);
    border-radius: 5px;
  }
`;