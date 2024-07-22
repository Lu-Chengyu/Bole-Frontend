// import './styles.css';
// import Footer from "../../components/Footer";
// import Navbar from "../../components/Navbar";
// import TalentsMidbox from "../../components/Midbox/TalentsMidbox";
// import TalentsSidebox from "../../components/Sidebox/TalentsSidebox";
// import RecommendSidebox from "../../components/Sidebox/RecommendSidebox";
//
// const Talents = () => {
//     return (
//         <div>
//             <Navbar/>
//             <TalentsSidebox/>
//             <RecommendSidebox/>
//             <TalentsMidbox/>
//             <Footer/>
//         </div>
//     );
// }
//
// export default Talents;

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const jobsList = [
  { title: 'SDE1', description: 'A software developer position' },
  { title: 'SDE2', description: 'Another software developer position' },
  { title: 'QA Engineer', description: 'A quality assurance engineer position' },
  { title: 'Technical Writer', description: 'A technical writing position' },
];

const Talents = () => {
  const [filter, setFilter] = useState('');
  const filteredJobs = jobsList.filter(job => job.title.toLowerCase().includes(filter.toLowerCase()));

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <Form>
            <Form.Group controlId="filter">
              <Form.Label>Filter:</Form.Label>
              <Form.Control type="text" placeholder="Enter job title" value={filter} onChange={e => setFilter(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Apply Filter
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <ul>
            {filteredJobs.map((job, index) => (
              <li key={index}>
                <h3>{job.title}</h3>
                <p>{job.description}</p>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Talents;


// import React from 'react';
// import GoogleLogin from 'react-google-login';
//
// const Talents = () => {
//
//   const responseGoogle = (response) => {
//     console.log(response);
//     // 在这里处理 Google 注册成功后的逻辑
//   };
//
//   const responseGoogleError = (error) => {
//     console.log(error);
//     // 在这里处理 Google 注册失败后的逻辑
//   };
//
//   return (
//     <div>
//       <h1>注册</h1>
//       <form>
//         {/* 在这里放置其他注册表单字段 */}
//         <GoogleLogin
//           clientId="<你的 Google 应用程序客户端 ID>"
//           buttonText="使用 Google 账号注册"
//           onSuccess={responseGoogle}
//           onFailure={responseGoogleError}
//           cookiePolicy={'single_host_origin'}
//         />
//         <button type="submit">注册</button>
//       </form>
//     </div>
//   );
// };
//
// export default Talents;

