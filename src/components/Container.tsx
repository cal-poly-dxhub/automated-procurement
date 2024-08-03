import { ReactNode, useState } from "react";
import { theme } from "../assets/theme";

const Container = ({
  children,
  className,
  backgroundColors = [
    theme.colors.alternateBackground,
    theme.colors.background,
  ],
  style,
}: {
  children: ReactNode | ReactNode[];
  className?: string;
  backgroundColors?: string[];
  style?: any;
}) => {
  const [hover, setHover] = useState<boolean>(false);

  const hoverStyle = {
    backgroundColor: hover ? backgroundColors[0] : backgroundColors[1],
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...hoverStyle, ...style }}
      className={className}
    >
      {children}
    </div>
  );
};

export default Container;
