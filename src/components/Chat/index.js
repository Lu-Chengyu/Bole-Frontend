import styled from "styled-components";
import "./styles.css"
import ContactListComponent from "./ContactListComponent";
import ConversationComponent from "./ConversationComponent";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Container = styled.div`
display : flex;
flex-direction: row;
height: 100vh;
width: 100%;
background: #f8f9fb;
`;

function Chat() {
    return (
        <>
            <Navbar/>
            <Container>
                <ContactListComponent/>
                <ConversationComponent/>
            </Container>
            <Footer/>
        </>
    );
}

export default Chat;