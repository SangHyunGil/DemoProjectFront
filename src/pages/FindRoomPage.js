import FindRoom from '../Components/Videos/FindRoom'
import { Link, useParams } from 'react-router-dom';

const FindRoomPage = () => {
    const {studyId} = useParams();
    return (
        <>
            <FindRoom />
            <Link to={`/study/${studyId}/board/create`}>화상채팅 생성</Link>
        </>
    )
}

export default FindRoomPage;