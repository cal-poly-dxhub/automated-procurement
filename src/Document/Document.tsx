import { useNavigate } from "react-router-dom";
import { _document, _style } from "../assets/types";
import Item from "../components/Item";
import Text from "../components/Text";

const Document = ({ d, style }: { d: _document; style?: _style }) => {
  const navigate = useNavigate();
  const { title, date, category, description } = d;

  const readableDate = new Date(date).toDateString();

  const handleNavigateToEdit = () => {
    navigate("/edit-document", {
      state: { document: d },
    });
  };

  return (
    <Item
      style={{ ...style, ...styles.container }}
      onClick={handleNavigateToEdit}
    >
      <Text type="title">{title}</Text>
      <Text>{category}</Text>
      <Text>{description}</Text>
      <Text type="background">{readableDate}</Text>
    </Item>
  );
};

export default Document;

const styles = {
  container: {
    padding: "1rem",
    marginBottom: 10,
    borderRadius: 5,
    maxWidth: "15rem",
    maxHeight: "12rem",
  },
};
