import React, {useState} from 'react';
import './styles.css'
import api from '../../../../../../API/BaseURL/BaseURL'
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {
    Button,
    DatePicker,
    Form,
    Input,
    Modal,
    Select, Space,
    Upload,
} from 'antd';
import {Option} from "antd/es/mentions";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import avatar1 from '../../../../../../assets/user1.jpg';
import avatar2 from '../../../../../../assets/user2.jpg';
import avatar3 from '../../../../../../assets/user3.jpg';
import avatar4 from '../../../../../../assets/user4.jpg';

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 4},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 20},
    },
};




const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 20, offset: 4},
    },
};
const {RangePicker} = DatePicker;
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });


const ProfileFormModal = ({isOpen, closeModal}) => {
    const [form] = Form.useForm();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    // const [selectedAvatar, setSelectedAvatar] = useState(null);

    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({fileList: newFileList}) => {
        setFileList(newFileList);
    };

    // const handleChange = ({ fileList }) => {
    //     setFileList([fileList[fileList.length - 1]]);
    // };

    const uploadButton = (
        <div>
            <PlusOutlined/>
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );

    // const handleAvatarSelect = (avatar) => {
    //     setSelectedAvatar(avatar);
    // };
    //
    // const renderAvatarList = () => {
    //     const avatars = [avatar1, avatar2, avatar3, avatar4];
    //
    //     return avatars.map((avatar, index) => (
    //         <img
    //             key={index}
    //             src={avatar}
    //             alt={`Avatar ${index + 1}`}
    //             onClick={() => handleAvatarSelect(avatar)}
    //             style={{
    //                 width: "100px",
    //                 height: "100px",
    //                 objectFit: "cover",
    //                 cursor: "pointer",
    //                 border: selectedAvatar === avatar ? "2px solid blue" : "none",
    //             }}
    //         />
    //     ));
    // };

    const handleSubmit = (values) => {
        console.log("Form values:", values);
        // let userID = localStorage.getItem("userId");
        // let userData_education = {
        //     school: education[0].school,
        //     degree: education[0].degree,
        //     magor: education[0].major,
        //     startDate: education[0].duration[0].$d.toLocaleDateString('en-US',{
        //         month: '2-digit',
        //         day: '2-digit',
        //         year: 'numeric'
        //     }),
        //     endData: education[0].duration[1].$d.toLocaleDateString('en-US',{
        //         month: '2-digit',
        //         day: '2-digit',
        //         year: 'numeric'
        //     }),
        // }
        // let userData_experience = {
        //     company: experience[0].Company,
        //     title: experience[0].title,
        //     type: experience[0].type,
        //     startDate: experience[0].Duration[0].$d.toLocaleDateString('en-US',{
        //         month: '2-digit',
        //         day: '2-digit',
        //         year: 'numeric'
        //     }),
        //     endData: experience[0].Duration[1].$d.toLocaleDateString('en-US',{
        //         month: '2-digit',
        //         day: '2-digit',
        //         year: 'numeric'
        //     }),
        // }
        const education = values["education"];
        let userData_education = [];
        if(education != null){
            for(let i = 0; i< education.length; i++){
                let educationObj  = {
                    school: education[i].school,
                    degree: education[i].degree,
                    major: education[i].major,
                    startDate: education[i].duration[0].$d.toLocaleDateString('en-US',{
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric'
                    }),
                    endDate: education[i].duration[1].$d.toLocaleDateString('en-US',{
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric'
                    }),
                }
                userData_education.push(educationObj);
            }
        }
        const experience = values["experience"];
        let userData_experience = [];
        if(experience != null){
            for(let i = 0; i < experience.length; i++){
                let experienceObj = {
                    company: experience[i].company,
                    title: experience[i].title,
                    type: experience[i].type,
                    startDate: experience[i].Duration[0].$d.toLocaleDateString('en-US',{
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric'
                    }),
                    endDate: experience[i].Duration[1].$d.toLocaleDateString('en-US',{
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric'
                    }),
                }
                userData_experience.push(experienceObj);
            }
        }
        let user = {
            id : localStorage.getItem("userId")
        }
        let userData = {
            // userID: localStorage.getItem("userId"),
            user: user,
            avatar: values["avatar"],
            firstName: values["firstname"],
            lastName: values["lastname"],
            pronouns: values["pronouns"],
            headline: values["headline"],
            location: values["location"],
            userProfileEducation: userData_education,
            userProfileExperience:userData_experience,
            // userProfileEducation: values["education"],
            // userProfileExperience: values["experience"],


            // education: values["education"],
        }

        console.log("userData: ", userData);
        console.log("userData_education: ", userData_education);
        api.post('/user/create/profile/Save/', userData)
            .then((res) => {
                console.log("profile res: ", res.data,userData_education);
                if(res.status === 200){
                    localStorage.setItem('userProfileId', res.data.userProfileId);
                    console.log("profile saved!")
                    closeModal();
                }
                // TODO: 这里可以增加其他http状态，如果需要的话
                // TODO: 比如Login中，密码错误返回什么
                // TODO： 比如Register中，用户已经存在返回什么
            })
            .catch((err) => {
                console.log(err.response.status);
                console.log(err.response);
            })
    }

    return (
        <Modal className="profile-modal" open={isOpen} onCancel={closeModal} okText="Submit" onOk={form.submit}>
            <PerfectScrollbar style={{maxHeight: 600}}>
                <Form
                    form={form}
                    {...formItemLayoutWithOutLabel}
                    initialValues={{remember: true}}
                    onFinish={handleSubmit}
                    labelCol={{span: 4}}
                    wrapperCol={{span: 14}}
                    layout="horizontal"
                    style={{maxWidth: 600, width: '600px', marginTop: '10px'}}
                >
                    {/*<Form.Item name="avatar" label="Avatar">*/}
                    {/*    <h2>请选择您的头像：</h2>*/}
                    {/*    <div>{renderAvatarList()}</div>*/}
                    {/*    {selectedAvatar && (*/}
                    {/*        <img*/}
                    {/*        src={selectedAvatar}*/}
                    {/*        alt="Selected Avatar"*/}
                    {/*        style={{ width: "200px", height: "200px", objectFit: "cover" }}*/}
                    {/*        />*/}
                    {/*        )}*/}
                    {/*</Form.Item>*/}
                    <Form.Item
                        name="avatar"
                        label="Avatar">
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            // disabled={fileList.length >= 1}
                        >
                            {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                            <img alt="example" style={{width: '100%'}} src={previewImage}/>
                        </Modal>
                    </Form.Item>
                    <Form.Item
                        name="firstname"
                        label="First name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your first name!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="lastname"
                        label="Last name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    {/*<Form.Item*/}
                    {/*    name="nickname"*/}
                    {/*    label="Nickname"*/}
                    {/*    tooltip="What do you want others to call you?"*/}
                    {/*    rules={[{message: 'Please input your nickname!', whitespace: true }]}*/}
                    {/*>*/}
                    {/*    <Input />*/}
                    {/*</Form.Item>*/}

                    <Form.Item
                        name="pronouns"
                        label="Pronouns"
                        rules={[
                            {
                                message: 'Please select your pronouns!',
                            },
                        ]}
                    >
                        <Select placeholder="select your pronouns">
                            <Option value="She/Her">She/Her</Option>
                            <Option value="He/Him">He/Him</Option>
                            <Option value="They/Them">They/Them</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="headline"
                        label="Head line"
                        tooltip="Let others know more about you!"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your head line!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="location"
                        label="Location"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your location!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.List name="education">
                        {(fields, {add, remove}) => (
                            <>
                                {fields.map(({key, name, ...restField}, index) => (
                                    <Form.Item
                                        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                        label={index === 0 ? 'Education' : ''}
                                        required={false}
                                        key={key}
                                    >
                                        <Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline"
                                               size="small">
                                            <Form.Item
                                                wrapperCol={{span: null}}
                                                {...restField}
                                                name={[name, 'school']}
                                                rules={[{required: true, message: 'Missing school'}]}
                                            >
                                                <Input placeholder="School"/>
                                            </Form.Item>
                                            <Form.Item
                                                wrapperCol={{span: null}}
                                                {...restField}
                                                name={[name, 'degree']}
                                                rules={[{message: 'Missing degree'}]}
                                            >
                                                <Select placeholder="Degree">
                                                    <Option value="Bachelor">Bachelor</Option>
                                                    <Option value="Master">Master</Option>
                                                    <Option value="MBA">MBA</Option>
                                                    <Option value="PhD">PhD</Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                wrapperCol={{span: null}}
                                                {...restField}
                                                name={[name, 'major']}
                                                rules={[{message: 'Missing major'}]}
                                            >
                                                <Input placeholder="Major"/>
                                            </Form.Item>
                                            <Form.Item
                                                wrapperCol={{span: null}}
                                                name={[name, 'duration']}
                                            >
                                                <RangePicker/>
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)}/>
                                        </Space>
                                    </Form.Item>
                                ))}
                                <Form.Item style={{marginTop: '10px', marginLeft: '100px'}}>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                        Add new education
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.List name="experience">
                        {(fields, {add, remove}) => (
                            <>
                                {fields.map(({key, name, ...restField}, index) => (
                                    <Form.Item
                                        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                        label={index === 0 ? 'Experience' : ''}
                                        required={false}
                                        key={key}
                                    >
                                        <Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline"
                                               size="small">
                                            <Form.Item
                                                wrapperCol={{span: null}}
                                                {...restField}
                                                name={[name, 'company']}
                                                rules={[{required: true, message: 'Missing company'}]}
                                            >
                                                <Input placeholder="Company"/>
                                            </Form.Item>
                                            <Form.Item
                                                wrapperCol={{span: null}}
                                                {...restField}
                                                name={[name, 'title']}
                                                rules={[{message: 'Missing title'}]}
                                            >
                                                <Input placeholder="Title"/>
                                            </Form.Item>
                                            <Form.Item
                                                wrapperCol={{span: null}}
                                                {...restField}
                                                name={[name, 'type']}
                                                rules={[{message: 'Missing type'}]}
                                            >
                                                <Select placeholder="Type">
                                                    <Option value="Self-employed">Self-employed</Option>
                                                    <Option value="Full-time">Full-time</Option>
                                                    <Option value="Part-time">Part-time</Option>
                                                    <Option value="Contract">Contract</Option>
                                                    <Option value="Internship">Internship</Option>
                                                    <Option value="Volunteer">Volunteer</Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                wrapperCol={{span: null}}
                                                name={[name, 'Duration']}
                                            >
                                                <RangePicker/>
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)}/>
                                        </Space>
                                    </Form.Item>
                                ))}
                                <Form.Item style={{marginTop: '10px', marginLeft: '100px'}}>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                        Add new experience
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form>
            </PerfectScrollbar>
        </Modal>
    );
};

export default ProfileFormModal;

// import React, {useState} from 'react';
// import './styles.css'
// import api from '../../../../../../API/BaseURL/BaseURL'
// import {
//     DatePicker,
//     Form,
//     Input,
//     Modal,
// } from 'antd';
// import PerfectScrollbar from 'react-perfect-scrollbar';
// import 'react-perfect-scrollbar/dist/css/styles.css';
//
// const formItemLayoutWithOutLabel = {
//     wrapperCol: {
//         xs: {span: 24, offset: 0},
//         sm: {span: 20, offset: 4},
//     },
// };
//
// const ProfileFormModal = ({isOpen, closeModal}) => {
//     const [form] = Form.useForm();
//
//     const handleSubmit = (values) => {
//         let userData = {
//             // userId: localStorage.getItem("userId"),
//             // date: new Date().toISOString().substring(0, 10),
//             // jobIds: parseInt(values["jobId"])
//             userId: parseInt(localStorage.getItem("userId")),
//             date: new Date().toISOString().substring(0, 10),
//             jobId: parseInt(values["jobId"])
//         }
//         console.log("applyRecord: ", userData)
//
//         api.post('/user/apply/jobs/', userData)
//             .then((res) => {
//                 if(res.status === 200){
//                     console.log("record saved!")
//                     closeModal();
//                 }
//                 // TODO: 这里可以增加其他http状态，如果需要的话
//                 // TODO: 比如Login中，密码错误返回什么
//                 // TODO： 比如Register中，用户已经存在返回什么
//             })
//             .catch((err) => {
//                 console.log(err.response.status);
//                 console.log(err.response);
//             })
//     }
//
//     return (
//         <Modal className="profile-modal" open={isOpen} onCancel={closeModal} okText="Submit" onOk={form.submit}>
//             <PerfectScrollbar style={{maxHeight: 600}}>
//                 <Form
//                     form={form}
//                     {...formItemLayoutWithOutLabel}
//                     initialValues={{remember: true}}
//                     onFinish={handleSubmit}
//                     labelCol={{span: 4}}
//                     wrapperCol={{span: 14}}
//                     layout="horizontal"
//                     style={{maxWidth: 600, width: '600px', marginTop: '10px', marginRight: '18px'}}
//                 >
//                     <Form.Item
//                         name="jobId"
//                         label="Job Id"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: 'Please input your last name!',
//                             },
//                         ]}
//                     >
//                         <Input/>
//                     </Form.Item>
//                 </Form>
//             </PerfectScrollbar>
//         </Modal>
//     );
// };
//
// export default ProfileFormModal;