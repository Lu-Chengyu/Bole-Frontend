import React, { useState } from "react";
import '../styles.css';
import api from '../../../../API/BaseURL/BaseURL'
import { useHistory } from "react-router-dom";
import defaultPropfPic from "../../../../assets/defaultProfilePic.png";
import { UploadOutlined } from '@ant-design/icons';
import { Modal, Form, Input, Upload, Button, Row, Col } from 'antd';

const ApplyFormModal = (info) => {
    const history = useHistory();
    const [form] = Form.useForm();
    const userId = localStorage.getItem('userId');
    const jobId = info.info.id;
    const [fileListR, setFileListR] = useState([]);
    const [fileListC, setFileListC] = useState([]);

    const handleClose = () => {
        localStorage.removeItem('jobId');
        localStorage.removeItem('jobTitle');
        localStorage.removeItem('jobCompany');
        history.push('/jobs', { back: true });
    };
    const handleChangeR = ({fileListR: newFileList}) => {
        setFileListR(newFileList);
    };
    const handleChangeC = ({fileListC: newFileList}) => {
        setFileListC(newFileList);
    };
    const handleSubmit = async (values) => {
        // console.log(values)
        let jobData = {
            userId: userId,
            jobId: jobId,
        }
        let userData = {
            userId: userId,
            email: values["email"],
            phone: values["phone"],
            resume: values["resume"],
            cv: values["cv"],
        }
        // console.log("jobData: ", userData);
        // console.log("userData: ", userData);
        api.post('application', userData)
            .then((res) => {
                console.log("apply res: ", res.data);
                if(res.status === 200){
                    console.log("application submitted!")
                    history.push('/jobs', { back: true });
                }
            })
            .catch((err) => {
                console.log(err.response.status);
                console.log(err.response);
            })
    };

    let applyInfo={
        title: info.info.title,
        company: info.info.company,
        userPic: defaultPropfPic,
        userName: "Li Hua",
        tagline: "Creating the technology of today and tomorrow",
        location: "Los Angeles, CA"
    }
    let title = `Apply to ${applyInfo.title} in ${applyInfo.company}`;

    // api.get('user/profile',
    //         {
    //         params: {
    //             userID: localStorage.getItem("userId")
    //         }
    //     }
    // )
    //     .then(function (response) {
    //         console.log(response);
    //     })
    //     .catch((err) => {
    //         console.log(err.response.status);
    //         console.log(err.response);
    //     })

    return (
        <Modal
            as="div"
            className='apply-form'
            okText="Submit"
            onOk={form.submit}
            open='true'
            footer={null}
            width={640}
            onCancel={handleClose}
            bodyStyle={{ overflowY: 'hidden', maxHeight: 'calc(100vh - 280px)' }}
            // bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 300px)' }}
        >
            <h2 className="apply-title">{title}</h2>
            <hr></hr>
            <br></br>
            {/*<div className='personal-info'>*/}
            {/*    <h2>Contact info</h2>*/}
            {/*</div>*/}
            <Row className="contact-info">
                <Col span={4}>
                    <img src={applyInfo.userPic} alt="userPic"
                         width="60" height="60"/>
                </Col>
                <Col as="div" className='personal-info'>
                    <h2>{applyInfo.userName}</h2>
                    <h3>{applyInfo.tagline}</h3>
                    <h4>{applyInfo.location}</h4>
                </Col>
            </Row>
            <Form
                form={form}
                initialValues={{remember: true}}
                layout="vertical"
                className="form-item"
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="email"
                    label={<h3>Email address</h3>}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input placeholder="Enter email"/>
                </Form.Item>
                <Form.Item
                    name="phone"
                    label={<h3>Phone</h3>}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                    ]}
                >
                    <Input placeholder="Enter phone number"/>
                </Form.Item>
                <Form.Item
                    name="resume"
                    label={<h3>Resume</h3>}
                    help="Please include an updated resume (PDF. DOC. DOCX.)"
                    rules={[
                        {
                            required: true,
                            message: 'Please upload your resume!',
                        },
                    ]}
                >
                    <Upload
                        name="file"
                        fileListR={fileListR}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        onChange={handleChangeR}
                    >
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>
                <br></br>
                <Form.Item
                    name="cv"
                    label={<h3>Cover Letter</h3>}
                    help="Please include an updated cover letter (PDF. DOC. DOCX.)"
                >
                    <Upload
                        name="file"
                        fileListC={fileListC}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        onChange={handleChangeC}
                    >
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>
                <br></br>
                <Form.Item>
                    <div style={{display: 'flex',  justifyContent:'center'}}>
                        <button className='submit' type='submit'>
                            Submit
                        </button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ApplyFormModal;

