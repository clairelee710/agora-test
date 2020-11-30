import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setLoading, setPage, setUser, setVideoState } from './actions'
import { MainContainer } from './components/Main';
import { Typography, Layout, Form, Input, Button } from 'antd';
import {
    WhatsAppOutlined,
    SendOutlined,
    IdcardOutlined,
    LockOutlined,
    AppstoreAddOutlined,
    Loading3QuartersOutlined,
    UserOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import "./App.css";

export default function App() {

    const isLoading = useSelector(state => state.isLoading);
    const currentPage = useSelector(state => state.currentPage);
    const dispatch = useDispatch();
    const { Content } = Layout;
    const { Title } = Typography;
    
    const onFormSubmit = (values) => {

        dispatch(setLoading(true));
        dispatch(setUser(values));

        //TODO: Remove test token
        // const testToken = "0068af2afe5c07c456d8b0dec3829c8d6c3IADvxxZ0/GqKvbYKNBOYv6EbFUnZCCoA7Qc1joGe3QbmadJjSIgAAAAAEABID2UquUbAXwEAAQC5RsBf";

        const data = {
            appId: values.appid,
            channel: values.channel,
            uid: "",
            token: values.token,
            cameraId: "",
            microphoneId: "",
            mode: "rtc",
            codec: "h264"
        };

        setTimeout(function() {
            dispatch(setPage(1));
            dispatch(setLoading(false));
        }, 1500);
        
        dispatch(setVideoState(data));

    };

    return (
        <div className="App">
            {currentPage === 0 &&
            <Layout>
                <Content className="login-container">
                    <p><WhatsAppOutlined style={{ fontSize: '130px', color: '#fff' }}/></p>
                    <Title level={2}>Agora Demo</Title>
                    <Form name="normal_login" className="login-form" onFinish={onFormSubmit}>
                        <Form.Item name="username" rules={[ { required: true, message: 'Please input your Username!' , }, ]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Your Name" />
                        </Form.Item>
                        <Form.Item name="appid" rules={[ { required: true, message: 'Please input your App ID!' , }, ]}>
                            <Input prefix={<IdcardOutlined className="site-form-item-icon" />} placeholder="App ID" />
                        </Form.Item>
                        <Form.Item name="token" rules={[ { required: true, message: 'Please input your token!' , }, ]}>
                            <Input prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Token"
                            />
                        </Form.Item>
                        <Form.Item name="channel" rules={[ { required: true, message: 'Please input channel' , }, ]}>
                            <Input prefix={<AppstoreAddOutlined className="site-form-item-icon" />}
                            type="text"
                            placeholder="Channel"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" shape="round"><SendOutlined />Enter</Button>
                        </Form.Item>
                    </Form>
                    <Title level={5}>By Claire Lee</Title>
                </Content>
            </Layout>
            }
            {currentPage === 1 &&
                <MainContainer />
            }
            {isLoading &&
                <div className="loader-container">
                    <Loading3QuartersOutlined className="loader" spin style={{ fontSize: '36px', color: '#fff' }} /> 
                    <div className="loader-bg"></div>
                </div>
            }
        </div>
    );

}