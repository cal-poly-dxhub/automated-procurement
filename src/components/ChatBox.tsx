import { theme } from "../assets/theme";
import Container from "./Container";
import Text from "./Text";
import TextField from "./TextField";

const ChatBox = ({
  onSubmit,
  style,
}: {
  onSubmit: (s: string) => void;
  style?: any;
}) => {
  return (
    <Container style={{ ...styles.container, style }}>
      <Text type="subtitle">ChatBox</Text>
      <TextField onSubmit={onSubmit} />
    </Container>
  );
};

export default ChatBox;

const styles = {
  container: {
    width: "30vw",
    height: "10rem",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
    backgroundColor: theme.colors.background,
  },
};
