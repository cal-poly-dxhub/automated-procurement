import Item from "../components/Item";

const Document = ({ style }: { style?: any }) => {
  return (
    <Item style={{ ...style, ...styles.container }}>
      <h3>%title</h3>
      <p>%category</p>
      <p>%description</p>
    </Item>
  );
};

export default Document;

const styles = {
  container: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: "12.5rem",
    height: "12.5rem",
  },
};
