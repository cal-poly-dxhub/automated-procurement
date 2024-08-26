import { useState } from "react";
import { theme } from "../assets/theme";
import Button from "../Components/Button";
import Container from "../Components/Container";
import Input from "../Components/Input";
import Navbar from "../Components/Navbar";
import Text from "../Components/Text";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // login logic here
  };

  return (
    <div>
      <Navbar />
      <Container style={styles.container} className="column">
        <Text type="title" style={styles.title}>
          Login to DxHub Procurement
        </Text>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button onClick={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Log In</Text>
        </Button>
        <Button
          style={styles.otherButton}
          onClick={() => {
            window.location.href = "/signup";
          }}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </Button>
      </Container>
    </div>
  );
};

export default LoginPage;

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
