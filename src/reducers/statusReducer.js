export const startReducer = (state = true, action) => {
    switch (action.type) {
        case 'SET_JOIN_LEAVE':
            return !state
        default:
            return state
    }
}

export const audioMuteReducer = (state = false, action) => {
    switch (action.type) {
        case 'SET_AUDIO_MUTE':
            return !state
        default:
            return state
    }
}

export const videoMuteReducer = (state = false, action) => {
    switch (action.type) {
        case 'SET_VIDEO_MUTE':
            return !state
        default:
            return state
    }
}

export const loadingReducer = (state = false, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return !state
        default:
            return state
    }
}