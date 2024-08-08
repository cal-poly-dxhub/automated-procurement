import { useState } from "react";
import { useLocation } from "react-router-dom";
import { _document } from "../assets/types";
import ChatBox from "../components/ChatBox";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import DocumentEditor from "./DocumentEditor";

const EditPage = () => {
  const { document } = useLocation().state;
  const [d, setD] = useState<_document>(document);
  const [selectedText, setSelectedText] = useState<string>("");

  const handleSelectedText = (s: string) => {
    setSelectedText(s);
  };

  const handleSubmit = (s: string) => {
    console.log("selected text:", selectedText);
    console.log("input text:", s);
    setSelectedText("");
  };

  return (
    <Container className="column">
      <Navbar />
      <div style={styles.container}>
        <div style={styles.width}>
          <DocumentEditor document={d} onSelection={handleSelectedText} />
          <div style={{ height: "15rem" }} />
          {selectedText && (
            <div
              style={{
                position: "fixed",
                bottom: "2rem",
                left: "35vw",
                right: "35vw",
              }}
            >
              <ChatBox onSubmit={handleSubmit} style={styles.chatBox} />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default EditPage;

const styles = {
  container: {
    width: "100vw",
  },
  width: {
    width: "40vw",
    paddingLeft: "30vw",
    paddingRight: "30vw",
  },
  boxContainer: {
    display: "block",
  },
  chatBox: {
    marginTop: 10,
  },
};
