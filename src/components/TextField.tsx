import { useState } from "react";
import Text from "./Text";

const TextField = ({
  onSubmit,
  type = "regular",
  button,
  style,
}: {
  onSubmit: (s: string) => void;
  type?: "title" | "subtitle" | "big" | "bold" | "regular" | "background";
  button?: boolean;
  style?: any;
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(inputValue);
    setInputValue("");
  };

  const handleButtonSubmit = () => {
    onSubmit(inputValue);
    setInputValue("");
  };

  if (type === "title") {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          style={{ ...styles.title, ...styles.input, ...style }}
        />
        {button && <button onClick={handleButtonSubmit} />}
      </form>
    );
  } else if (type === "subtitle") {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          style={{ ...styles.subtitle, ...styles.input, ...style }}
        />
        {button && (
          <button onClick={handleButtonSubmit}>
            <Text type={type}>Submit</Text>
          </button>
        )}
      </form>
    );
  } else if (type === "big") {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          style={{ ...styles.big, ...styles.input, ...style }}
        />
        {button && (
          <button onClick={handleButtonSubmit}>
            <Text type={type}>Submit</Text>
          </button>
        )}
      </form>
    );
  } else if (type === "bold") {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          style={{ ...styles.bold, ...styles.input, ...style }}
        />
        {button && (
          <button onClick={handleButtonSubmit}>
            <Text type={type}>Submit</Text>
          </button>
        )}
      </form>
    );
  } else if (type === "background") {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          style={{ ...styles.background, ...styles.input, ...style }}
        />
        {button && (
          <button onClick={handleButtonSubmit}>
            <Text type={type}>Submit</Text>
          </button>
        )}
      </form>
    );
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          style={{ ...styles.regular, ...styles.input, ...style }}
        />
        {button && (
          <button onClick={handleButtonSubmit}>
            <Text type={type}>Submit</Text>
          </button>
        )}
      </form>
    );
  }
};

export default TextField;

const styles = {
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  big: {
    fontSize: 16,
  },
  bold: {
    fontSize: 14,
    fontWeight: "bold",
  },
  regular: {
    fontSize: 14,
  },
  background: {
    fontSize: 12,
    color: "#777",
  },
  input: {
    border: "1px solid #ccc",
    padding: "5px",
  },
};
