import Navbar from "../components/Navbar";
import DocumentPanel from "../Document/DocumentPanel";
import MemberPanel from "../Member/MemberPanel";

const Dashboard = () => {
  return (
    <div style={styles.container} className="column">
      <Navbar style={{ height: "7vh" }} />
      {/* <h1>dashboard</h1> */}
      <div className="row" style={{ height: "93vh" }}>
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
    // width: "100vw",
    // height: "100vh",
  },
  memberPanel: {
    minWidth: "20vw",
    maxWidth: "25vw",
  },
  documentPanel: {
    maxWidth: "80vw",
    minWidth: "75vw",
  },
};
