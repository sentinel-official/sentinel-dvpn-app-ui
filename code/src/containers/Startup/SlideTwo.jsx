import AnimatedLayout from "@navigation/AnimatedLayout";
import styles from "./slider.module.scss";
import MapImage from "@pngs/map.png";
import React from "react";
import { Image, Text } from "@components/index";
import { links } from "@root/constants";
import useOpenWindow from "@hooks/use-open-window";

const animationVariants = {
  hidden: { opacity: 0, x: 64, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
};
const SlideTwo = () => {
  const { openWindow } = useOpenWindow();

  return (
    <AnimatedLayout variants={animationVariants} className={styles.slide}>
      <Text text={"intro_slides_two_text_one"} className="text-9cabc9 fs-13 fw-4 my-16" />
      <Image src={MapImage} className={`${styles["map-image"]} my-24`} />

      <section className={`${styles.para} my-16`}>
        <Text text={"intro_slides_two_text_two"} className="text-9cabc9 fs-13 fw-4" />
        <Text text={"intro_slides_two_link_one"} className="text-link fs-13 fw-4 ml-4" onClick={() => openWindow({ url: links.NODE_MAP })} />
      </section>
      <Text text={"intro_slides_two_link_two"} className="text-link fs-13 fw-4 ml-4 my-16" onClick={() => openWindow({ url: links.WHITEPAPER })} />
    </AnimatedLayout>
  );
};

export default SlideTwo;
