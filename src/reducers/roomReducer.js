import produce from "immer";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";

// initailState
const initialState = {
    room: "",
    creator: "",
    useAudio: true,
    useVideo: true,
    isVideoOff: false,
    isAudioOff: false,
    isScreenSharingOff: true,
    isRoomEnd: true,
    publishFeed: {},
    subscribeFeeds: [],
    chatData: [],
    fileData: [],
    mainFeed: {stream: null, display: null}
}

// action
export const GET_ROOM_INFO = "GET_ROOM_INFO";
export const JOIN_ROOM = "JOIN_ROOM";
export const SUBSCRIBE_FEED = "SUBSCRIBE_FEED";
export const ADD_PUBLISH_STREAM = "ADD_PUBLISH_STREAM";
export const ADD_SUBSCRIBER_STREAM = "ADD_SUBSCRIBER_STREAM";
export const REMOVE_SUBSCRIBER = "REMOVE_SUBSCRIBER";
export const USE_VIDEO_AUDIO = "USE_VIDEO_AUDIO";
export const TOGGLE_VIDEO = "TOGGLE_VIDEO";
export const TOGGLE_AUDIO = "TOGGLE_AUDIO";
export const SEND_CHAT = "SEND_CHAT";
export const SEND_FILE = "SEND_FILE";
export const RECEIVE_CHAT = "RECEIVE_CHAT";
export const TOGGLE_SCREEN_SHARING = "TOGGLE_SCREEN_SHARING";
export const CHANGE_MAIN_FEED = "CHANGE_MAIN_FEED";
export const EXIT_ROOM = "EXIT_ROOM";
export const ROOM_COMPLETELY_EXIT = "ROOM_COMPLETELY_EXIT";

// actionCreator
export const getRoomInfo = (payload) => ({
    type: GET_ROOM_INFO,
    payload
});

export const joinRoom = (payload) => ({
    type: JOIN_ROOM,
    payload
});

export const subscribeFeed = (payload) => ({
    type: SUBSCRIBE_FEED,
    payload
});

export const addPublishStream = (payload) => ({
    type: ADD_PUBLISH_STREAM,
    payload
});

export const addSubscribeStream = (payload) => ({
    type: ADD_SUBSCRIBER_STREAM,
    payload
});

export const removeSubscriber = (payload) => ({
    type: REMOVE_SUBSCRIBER,
    payload
});

export const useVideoAndAudio = (payload) => ({
    type: USE_VIDEO_AUDIO,
    payload
});

export const toggleVideo = (payload) => ({
    type: TOGGLE_VIDEO,
    payload
});

export const toggleAudio = (payload) => ({
    type: TOGGLE_AUDIO,
    payload
});

export const sendChat = (payload) => ({
    type: SEND_CHAT,
    payload
});

export const sendFile = (payload) => ({
    type: SEND_FILE,
    payload
})

export const receiveChat = (payload) => ({
    type: RECEIVE_CHAT,
    payload
});

export const toggleScreenSharing = (payload) => ({
    type: TOGGLE_SCREEN_SHARING,
    payload
});

export const changeMainFeed = (payload) => ({
    type: CHANGE_MAIN_FEED,
    payload
});

export const exitRoom = (payload) => ({
    type: EXIT_ROOM,
    payload
});

export const roomCompletelyExit = (payload) => ({
    type: ROOM_COMPLETELY_EXIT,
    payload
});


// reducer
const roomReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case GET_ROOM_INFO:
                draft.room = action.payload.room;
                draft.creator = action.payload.creator;
                break;

            case JOIN_ROOM:
                draft.room = action.payload.room;
                draft.publishFeed.id = action.payload.id;
                draft.publishFeed.display = action.payload.display;
                draft.publishFeed.pvtid = action.payload.pvtid;
                //draft.isRoomEnd = false;
                break;

            case SUBSCRIBE_FEED:
                draft.subscribeFeeds.push({ id : action.payload.id, 
                                            display: action.payload.display })
                break;

            case ADD_PUBLISH_STREAM:
                draft.publishFeed.stream = action.payload.stream;
                break;
            
            case ADD_SUBSCRIBER_STREAM:
                const subscribeFeed = draft.subscribeFeeds.find((feed) => feed.id === action.payload.rfid);
                if (subscribeFeed) {
                    subscribeFeed.stream = action.payload.stream;
                    subscribeFeed.hark = action.payload.hark;
                }
                break;

            case REMOVE_SUBSCRIBER:
                draft.subscribeFeeds = draft.subscribeFeeds.filter((feed) => feed.id != action.payload.rfid);
                break;

            case USE_VIDEO_AUDIO:
                draft.useVideo = action.payload.useVideo;
                draft.useAudio = action.payload.useAudio;
                break;

            case TOGGLE_VIDEO:
                draft.isVideoOff = !draft.isVideoOff;
                break;

            case TOGGLE_AUDIO:
                draft.isAudioOff = !draft.isAudioOff;
                break;

            case SEND_CHAT:
                draft.chatData.push({ text: action.payload.text, display: action.payload.display,
                                      time: action.payload.time, isPrivateMessage: action.payload.isPrivateMessage });
                break;

            case SEND_FILE:
                draft.fileData.push({ file: action.payload.file, filename: action.payload.filename,
                                      display: action.payload.display, time: action.payload.time });
                break;

            case RECEIVE_CHAT:
                draft.chatData.push({ text: action.payload.text, display: action.payload.display,
                                        time: action.payload.time, isPrivateMessage: action.payload.isPrivateMessage });
                break;

            case CHANGE_MAIN_FEED:
                draft.mainFeed.stream = action.payload.stream;
                draft.mainFeed.display = action.payload.display;
                break;

            case TOGGLE_SCREEN_SHARING:
                draft.isScreenSharingOff = !draft.isScreenSharingOff
                break;

            case EXIT_ROOM:
                draft.isVideoOff = false;
                draft.isAudioOff = false;
                draft.isScreenSharingOff = true;
                draft.publishFeed = {};
                draft.subscribeFeeds = [];
                draft.chatData = [];
                draft.mainFeed = {stream: null, display: null};
                break;
            
            case ROOM_COMPLETELY_EXIT:
                draft.isRoomEnd = action.payload;
                break;

            default:
                draft.isScreenSharingOff = draft.isScreenSharingOff;
                break;
        }
    }
)

export default roomReducer;
