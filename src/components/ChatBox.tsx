import { _style } from "../assets/types";
import Container from "./Container";
import Text from "./Text";
import TextField from "./TextField";

const ChatBox = ({
  onSubmit,
  style,
}: {
  onSubmit: (s: string) => void;
  style?: _style;
}) => {
  return (
    <Container style={{ ...styles.container, ...style }}>
      <Text type="subtitle">Enter requirements for selected text</Text>
      <TextField onSubmit={onSubmit} button autoFocus />
    </Container>
  );
};

export default ChatBox;

const styles = {
  container: {
    width: "30vw",
    height: "10rem",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
};
