import Navbar from "../components/Navbar";
import CategoryDocumentPanel from "../Document/CategoryDocumentPanel";
import RecentDocumentPanel from "../Document/RecentDocumentPanel";
import MemberPanel from "../Member/MemberPanel";

const Dashboard = () => {
  return (
    <div style={styles.container} className="column">
      <Navbar style={{ height: "7vh" }} />
      <div className="row" style={{ height: "93vh" }}>
        <MemberPanel style={styles.memberPanel} />
        <div className="column" style={{ height: "93vh", width: "78vw" }}>
          <RecentDocumentPanel style={styles.recentDocumentPanel} />
          <CategoryDocumentPanel style={styles.customDocumentPanel} />
        </div>
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
    overflow: "hidden",
  },
  memberPanel: {
    width: "22vw",
  },
  recentDocumentPanel: {
    width: "78vw",
    height: "32vh",
  },
  customDocumentPanel: {
    width: "78vw",
    height: "50vh",
  },
};
