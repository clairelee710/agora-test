import React from "react";
import AgoraRTC from "agora-rtc-sdk";
import { useSelector, useDispatch } from 'react-redux'
import { setLoading, setClient, setLocalStream, setJoinLeaveBtn, setAudioMute, setVideoMute } from '../actions'
import { Avatar, Layout, Row, Col, Button, Tooltip } from 'antd';
import {
    WhatsAppOutlined,
    PhoneOutlined,
    AudioMutedOutlined,
    AudioOutlined,
    VideoCameraOutlined,
    CloseSquareOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import "../App.css";

export const MainContainer = () => {
    const isStart = useSelector(state => state.isStart)
    const isAudioMute = useSelector(state => state.isAudioMute)
    const isVideoMute = useSelector(state => state.isVideoMute)
    const userData = useSelector(state => state.user)
    const videoData = useSelector(state => state.videoData)
    const dispatch = useDispatch()
    const { Content, Header } = Layout;

    let userName;
    if (userData.username) {
        userName = userData.username;
        userName = userName.charAt(0).toUpperCase();
    }

    const handleError = function(err) {
        console.log("Error: ", err);
    };

    const startLocalStream = async () => {

        const client = AgoraRTC.createClient({ mode: videoData.mode, codec: videoData.codec });

        dispatch(setLoading(true));
        dispatch(setClient(client));
        dispatch(setJoinLeaveBtn(true))

        await client.init(videoData.appId);

        await client.join(videoData.token, videoData.channel, null, (uid) => {

            const localStream = AgoraRTC.createStream({
                audio: true,
                video: true,
            });

            localStream.init(() => {
                localStream.play("local-stream-container");
                client.publish(localStream, handleError);

            }, handleError);

            dispatch(setLocalStream(localStream));
            dispatch(setLoading(false));

        }, handleError);

        function addVideoStream(elementId) {
            let streamDiv = document.createElement("div");
            streamDiv.id = elementId;
            streamDiv.style.transform = "rotateY(180deg)";
            let remoteContainer = document.getElementById("remote-stream-container");
            remoteContainer.appendChild(streamDiv);
        };

        function removeVideoStream(elementId) {
            let remoteDiv = document.getElementById(elementId);
            if (remoteDiv) remoteDiv.parentNode.removeChild(remoteDiv);
        };

        client.on("stream-added", function(evt) {
            client.subscribe(evt.stream, handleError);
        });

        client.on("stream-subscribed", function(evt) {
            let stream = evt.stream;
            let streamId = String(stream.getId());
            addVideoStream(streamId);
            stream.play(streamId);
        });

        client.on("stream-removed", function(evt) {
            let stream = evt.stream;
            let streamId = String(stream.getId());
            stream.close();
            removeVideoStream(streamId);
        });
        client.on("peer-leave", function(evt) {
            let stream = evt.stream;
            let streamId = String(stream.getId());
            stream.close();
            removeVideoStream(streamId);

        });

    };

    const StartBtn = () => {
        return (
            <Button type="primary" shape="round" onClick={() =>startLocalStream()}><VideoCameraOutlined />Start Video Call</Button>
        );
    }

    const ToolBtn = () => {

        const client = useSelector(state => state.agoraClient);
        const localStream = useSelector(state => state.localStream);
        const leave = async () => {

            if (localStream) {
                localStream.close();
                client.unpublish(localStream);
            }

            await client.leave();

            removeLocalVideoStream("local-stream-container");
            dispatch(setJoinLeaveBtn(false));
        };

        const muteAudioLocalStream = async () => {
            await localStream.muteAudio();
            dispatch(setAudioMute(false));
        };

        const unmuteAudioLocalStream = async () => {
            await localStream.unmuteAudio();
            dispatch(setAudioMute(true));
        };

        const muteVideoLocalStream = async () => {
            await localStream.muteVideo();
            dispatch(setVideoMute(false));
        };

        const unmuteVideoLocalStream = async () => {
            await localStream.unmuteVideo();
            dispatch(setVideoMute(true));
        };

        function removeLocalVideoStream(elementId) {
            let remoteDiv = document.getElementById(elementId);
            if (remoteDiv) {
                remoteDiv.removeChild(remoteDiv.childNodes[0]);
            }
        };

        const MuteAudioBtn = () => {
            return (
                <Tooltip title="關閉麥克風" color="#00000050">
                    <Button type="primary" shape="circle" onClick={() => muteAudioLocalStream()}><AudioMutedOutlined /></Button>
                </Tooltip>
            );
        }

        const UnMuteAudioBtn = () => {
            return (
                <Tooltip title="開啟麥克風" color="#00000050">
                    <Button type="default" shape="circle" onClick={() => unmuteAudioLocalStream()}><AudioOutlined /></Button>
                </Tooltip>
            );
        }

        const MuteVideoBtn = () => {
            return (
                <Tooltip title="關閉鏡頭" color="#00000050">
                    <Button type="primary" shape="circle" onClick={() => muteVideoLocalStream()}><CloseSquareOutlined /></Button>
                </Tooltip>
            );
        }

        const UnMuteVideoBtn = () => {
            return (
                <Tooltip title="開啟鏡頭" color="#00000050">
                    <Button type="default" shape="circle" onClick={() => unmuteVideoLocalStream()}><VideoCameraOutlined /></Button>
                </Tooltip>
            );
        }

        return (
            <div className="video-toolbtns">
                {isAudioMute ? <UnMuteAudioBtn /> :<MuteAudioBtn />}
                {isVideoMute ? <UnMuteVideoBtn /> :<MuteVideoBtn />}
                <Tooltip title="結束通話" color="#00000050">
                    <Button type="danger" shape="circle" onClick={() => leave()}><PhoneOutlined rotate={225}/></Button>
                </Tooltip>
            </div>
        );
    }

    return (
        <Layout className="site-layout">
            <Header className="page-header">
                <Avatar size={40}>{userName}</Avatar>
                <WhatsAppOutlined style={{ fontSize: '30px', color: '#fff' }}/> Agora Demo
            </Header>
            <Content className="main-container">
                <div className="chat-container">
                    <Row>
                        <Col className="column" xs={{ span: 22, offset: 1 }} md={{ span: 12, offset: isStart ? "6" : "0" }}>
                            <div className={`chat-box ${isStart ? "padding" : "join"} `}>
                                <div id="local-stream-container">
                                </div>
                            </div>
                        </Col>
                        <Col className="column" xs={{ span: 22, offset: 1 }} md={{ span: 12, offset: isStart ? "6" : "0" }}>
                            <div className={`chat-box ${isStart ? "" : "waiting"} `}>
                                <div id="remote-stream-container">
                                </div>
                            </div>
                        </Col>
                        <Col className="column" span={24}>
                            {isStart ? <StartBtn /> : <ToolBtn />}
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
};