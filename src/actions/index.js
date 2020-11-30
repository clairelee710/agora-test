export const setUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}

export const setLoading = () => {
    return {
        type: 'SET_LOADING'
    }
}

export const setVideoState = (data) => {
    return { 
      type: 'SET_VIDEO_STATE', 
      payload: data 
    }
}

export const setPage = (index) => {
    return { 
      type: 'SET_CURRENTPAGE', 
      payload: index 
    }
}

export const setClient = (client) => {
    return { 
      type: 'SET_CLIENT', 
      payload: client 
    }
}

export const setLocalStream = (stream) => {
    return { 
      type: 'SET_LOCAL_STREAM', 
      payload: stream 
    }
}

export const setJoinLeaveBtn = (isJoin) => {
    return {
        type: 'SET_JOIN_LEAVE',
        payload: isJoin
    }
}

export const setAudioMute = (isAudioMute) => {
    return {
        type: 'SET_AUDIO_MUTE',
        payload: isAudioMute
    }
}

export const setVideoMute = (isVideoMute) => {
    return {
        type: 'SET_VIDEO_MUTE',
        payload: isVideoMute
    }
}