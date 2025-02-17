import { useSelector, useDispatch } from "react-redux";
import Video from "./Video"
import { changeMainFeed } from "../../reducers/roomReducer";

const SubscribeVideo = () => {
    const dispatch = useDispatch();
    const { mainFeed, subscribeFeeds } = useSelector((state) => state.roomReducer);

    const changeMainFeedHandler = (stream, display) => {
      if (mainFeed.display === subscribeFeeds.display) return;
      dispatch(changeMainFeed({
          stream: stream,
          display: display,
      }))
    }

    const renderRemoteVideos = subscribeFeeds.map((feed, idx) => (
        <Video
          key = {idx}
          stream={feed.stream}
          username={feed.display}
          muted={false}
          onClick={changeMainFeedHandler}
        />
    ));

    return (
      <>
        {renderRemoteVideos}
      </>
    )
}

export default SubscribeVideo;
