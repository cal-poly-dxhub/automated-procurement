import Navbar from "../components/Navbar";
import DocumentPanel from "../Document/DocumentPanel";
import MemberPanel from "../Member/MemberPanel";

const Dashboard = () => {
  return (
    <div style={styles.container} className="column">
      <Navbar />
      {/* <h1>dashboard</h1> */}
      <div className="row">
        {/* navbar on top */}
        {/* members on left panel */}
        {/* documents in main panel */}
        <MemberPanel style={styles.memberPanel} />
        <DocumentPanel style={styles.documentPanel} />
      </div>
    </div>
  );
};

export default Dashboard;

const styles = {
  container: {
    display: "flex",
    flex: 1,
    width: "100vw",
    height: "100vh",
  },
  memberPanel: {
    maxWidth: "30vw",
  },
  documentPanel: {
    maxWidth: "70vw",
  },
};
