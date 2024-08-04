import { ReactNode, useState } from "react";
import { theme } from "../assets/theme";

const Container = ({
  children,
  className,
  clickable = false,
  regularBackgroundColor = theme.colors.background,
  hoverBackgroundColor = theme.colors.alternateBackground,
  clickBackgroundColor = theme.colors.click,
  transition = "0.2",
  style,
}: {
  children: ReactNode | ReactNode[];
  className?: string;
  clickable?: boolean;
  regularBackgroundColor?: string;
  hoverBackgroundColor?: string;
  clickBackgroundColor?: string;
  transition?: string;
  style?: any;
}) => {
  const [hover, setHover] = useState<boolean>(false);
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  const bgColor = {
    backgroundColor:
      mouseDown && clickable
        ? clickBackgroundColor
        : hover
        ? hoverBackgroundColor
        : regularBackgroundColor,
    transition: `background-color ${transition}s`,
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
      // onClick={() => setMouseDown(true)}
      style={{ ...bgColor, ...style }}
      className={className}
    >
      {children}
    </div>
  );
};

export default Container;
