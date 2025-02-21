import React from "react";
import styles from "./slider.module.scss";
import { Image, Text } from "@components/index";
import useOpenWindow from "@hooks/use-open-window";
import { links } from "@root/constants";
import AnimatedLayout from "@navigation/AnimatedLayout";
import BuiltOnCosmos from "@svgs/built-on-cosmos.svg";

const animationVariants = {
  hidden: { opacity: 0, x: 64, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
};

const SlideOne = () => {
  const { openWindow } = useOpenWindow();
  return (
    <AnimatedLayout variants={animationVariants} className={styles.slide}>
      <Text text={"intro_slides_one_text_one"} className="text-9cabc9 fs-13 fw-4 my-16" />
      <section className={`${styles.para} my-16`}>
        <Text text={"intro_slides_one_text_two"} className="text-9cabc9 fs-13 fw-4" />
        <Text text={"intro_slides_one_link_one"} className="text-link fs-13 fw-4 mx-4" onClick={() => openWindow({ url: links.MINTSCAN })} />
        <Text text={"intro_slides_one_text_three"} className="text-9cabc9 fs-13 fw-4" />
      </section>

      <section className={`${styles.para} my-16`}>
        <Text text={"intro_slides_one_text_four"} className="text-9cabc9 fs-13 fw-4" />
        <Text text={"intro_slides_one_link_two"} className="text-link fs-13 fw-4 ml-4" onClick={() => openWindow({ url: links.COSMOS_NETWORK })} />
      </section>
      <Image src={BuiltOnCosmos} className={`${styles["built-on-cosmos-image"]} my-32`} />

      <section className={`${styles.para} my-16`}>
        <Text text={"intro_slides_one_link_three"} className="text-link fs-13 fw-4 mr-4" />
        <Text text={"intro_slides_one_text_five"} className="text-9cabc9 fs-13 fw-4" onClick={() => openWindow({ url: links.GITHUB_SENTINEL })} />
      </section>
    </AnimatedLayout>
  );
};

export default SlideOne;
