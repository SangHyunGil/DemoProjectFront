import FindRoom from '../Components/Videos/FindRoom'
import { useParams,useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import styled from 'styled-components';

const AddVideoButton = styled(AddCircleIcon)`
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    cursor: pointer;
    &:hover {
        transition: all 0.3s linear;
        color: #2ecc71;
    }
    z-index: 100;
`;

const FindRoomPage = () => {
    const {studyId} = useParams();
    const navigate = useNavigate();

    const addVideoRoomHandler = () => {
        navigate(`/study/${studyId}/board/create`);
    };

    return (
        <>
            <FindRoom />
            <AddVideoButton color='primary' sx={{ fontSize: 60 }} onClick={addVideoRoomHandler} />
        </>
    )
}

export default FindRoomPage;