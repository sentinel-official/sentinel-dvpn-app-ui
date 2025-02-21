import React, { forwardRef } from "react";

const Image = forwardRef(
  ({ src, base64 = false, altImage = null, ...rest }, ref) => {
    const path = React.useMemo(() => {
      if (base64) {
        return src;
      }
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
        onError={() => {
          if (altImage) {
            ref.current.src = altImage;
          }
        }}
        {...rest}
      />
    );
  }
);

export default Image;
