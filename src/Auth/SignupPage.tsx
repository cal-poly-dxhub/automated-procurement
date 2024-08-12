import { useState } from "react";
import { theme } from "../assets/theme";
import Button from "../components/Button";
import Container from "../components/Container";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import Text from "../components/Text";

import { signUp } from "aws-amplify/auth";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            name,
          },
        },
      });

      if (!isSignUpComplete) {
        window.location.href = `/confirm/${userId}?next=${nextStep}`;
      }

      console.log("Signup successful");
    } catch (error) {
      alert("Signup failed: " + error);
      console.error("Signup failed:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <Container style={styles.container} className="column">
        <Text type="title" style={styles.title}>
          Sign Up for DxHub Procurement
        </Text>
        <Input
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
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
        <Button onClick={handleSignup} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Button>
        <Button
          style={styles.otherButton}
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Button>
      </Container>
    </div>
  );
};

export default SignupPage;

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