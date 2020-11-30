const initialState = {
  appId: "",
  channel: "",
  uid: "",
  token: undefined,
  cameraId: "",
  microphoneId: "",
  mode: "rtc",
  codec: "h264"
};

export const videoDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_VIDEO_STATE':{
            return action.payload
        }
        default:
            return state
    }
}

export const clientReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CLIENT':{
            return action.payload
        }
        default:
            return state
    }
}

export const localStreamReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_LOCAL_STREAM':{
            return action.payload
        }
        default:
            return state
    }
}
