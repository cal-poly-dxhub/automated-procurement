import { useState } from "react";
import { theme } from "../assets/theme";
import Button from "../components/Button";
import Container from "../components/Container";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import Text from "../components/Text";

const ConfirmPage = () => {
  const [confirmationCode, setConfirmationCode] = useState("");

  const handleConfirmation = async () => {
    try {
      console.log("Signup confirmation successful");
      // Additional logic to verify the code and complete the signup process
    } catch (error) {
      console.error("Signup confirmation failed:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <Container style={styles.container} className="column">
        <Text type="title" style={styles.title}>
          Confirm Your Signup
        </Text>
        <Text style={styles.description}>
          Please enter the confirmation code sent to your email address.
        </Text>
        <Input
          placeholder="Confirmation Code"
          value={confirmationCode}
          onChangeText={setConfirmationCode}
          style={styles.input}
        />
        <Button onClick={handleConfirmation} style={styles.button}>
          <Text style={styles.buttonText}>Confirm</Text>
        </Button>
      </Container>
    </div>
  );
};

export default ConfirmPage;

const styles = {
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    padding: 20,
    marginTop: "5rem",
  },
  title: {
    marginBottom: 10,
  },
  description: {
    marginBottom: 20,
    // textAlign: "center",
  },
  input: {
    width: "80%",
    marginBottom: 10,
  },
  button: {
    width: "80%",
    marginTop: 20,
  },
  otherButton: {
    width: "40%",
    marginTop: 10,
  },
  buttonText: {
    color: theme.colors.text,
    fontWeight: "bold",
  },
};
