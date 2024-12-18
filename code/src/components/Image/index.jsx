import React, { forwardRef } from "react";

const Image = forwardRef(({ src, ...rest }, ref) => {
  const path = React.useMemo(() => {
    if (src.startsWith("http://") || src.startsWith("https://")) {
      return src;
    }
    return `${window.origin}${src}`;
  }, [src]);
  return (
    <img
      ref={ref}
      src={path}
      alt=""
      {...rest}
    />
  );
});

export default Image;
