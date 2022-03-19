import { useSelector } from "react-redux";
import Video from "./Video"
import styled from "styled-components";

const VideoWrapper = styled.div`
  flex-basis: 55%;
  max-width: 60%;
  flex: 2;
`;

const MainVideo = () => {
    const { mainFeed } = useSelector((state) => state.roomReducer);

    return (
        <VideoWrapper>
            {mainFeed && (
            <Video
              stream={mainFeed.stream}
              username={mainFeed.display}
              muted={true}
              isMain={true}
            />
          )}
        </VideoWrapper>
    )
}

export default MainVideo;