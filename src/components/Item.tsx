import { ReactNode, useState } from "react";
import { theme } from "../assets/theme";

const Item = ({
  children,
  className,
  regularBackgroundColor = theme.colors.background,
  hoverBackgroundColor = theme.colors.alternate,
  clickBackgroundColor = theme.colors.click,
  transition = "0.1",
  style,
}: {
  children: ReactNode | ReactNode[];
  className?: string;
  regularBackgroundColor?: string;
  hoverBackgroundColor?: string;
  clickBackgroundColor?: string;
  transition?: string;
  style?: any;
}) => {
  const [hover, setHover] = useState<boolean>(false);
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  const bgColor = {
    backgroundColor: mouseDown
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
      style={{ ...bgColor, ...style }}
      className={className}
    >
      {children}
    </div>
  );
};

export default Item;
