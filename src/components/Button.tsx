import { ReactNode } from "react";
import { theme } from "../assets/theme";
import { _style } from "../assets/types";
import Item from "./Item";

const Button = ({
  children,
  style,
}: {
  children: ReactNode | ReactNode[] | undefined;
  style: _style;
}) => {
  return <Item style={styles.container}>{children}</Item>;
};

export default Button;

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
};
