const Member = () => {
  return (
    <div style={styles.container} className="row">
      <p>first name</p>
      <p>last name</p>
      <p>permission</p>
    </div>
  );
};

export default Member;

const styles = {
  container: {
    backgroundColor: "grey",
    padding: 20,
    borderRadius: 5,
    marginBottom: 5,
  },
};
