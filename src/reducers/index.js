import { combineReducers } from 'redux'
import { audioMuteReducer, videoMuteReducer, startReducer, loadingReducer } from './statusReducer'
import { clientReducer, localStreamReducer, videoDataReducer } from './videoReducer'
import { pageReducer } from './pageReducer'
import { userReducer } from './userReducer'

const rootReducer = combineReducers({
    isLoading: loadingReducer,
    isStart: startReducer,
    isAudioMute: audioMuteReducer,
    isVideoMute: videoMuteReducer,
    user: userReducer,
    agoraClient: clientReducer,
    localStream: localStreamReducer,
    videoData: videoDataReducer,
    currentPage: pageReducer
})

export default rootReducer