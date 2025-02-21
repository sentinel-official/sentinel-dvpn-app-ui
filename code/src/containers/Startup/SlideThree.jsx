import AnimatedLayout from "@navigation/AnimatedLayout";
import styles from "./slider.module.scss";
import SubscriptionImage from "@pngs/subscription.png";
import React from "react";
import { Image, Text } from "@components/index";
import { links } from "@root/constants";
import useOpenWindow from "@hooks/use-open-window";

const animationVariants = {
  hidden: { opacity: 0, x: 64, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
};
const SlideThree = () => {
  const { openWindow } = useOpenWindow();

  return (
    <AnimatedLayout variants={animationVariants} className={styles.slide}>
      <section className={`${styles.para} my-16`}>
        <Text text={"intro_slides_three_text_one"} className="text-9cabc9 fs-13 fw-4" />
        <Text text={"intro_slides_three_link_one"} className="text-link fs-13 fw-4 mx-4" onClick={() => openWindow({ url: links.SENTINEL_HOME })} />
        <Text text={"intro_slides_three_text_two"} className="text-9cabc9 fs-13 fw-4" />
      </section>

      <Image src={SubscriptionImage} className={`${styles["subscription-image"]} my-24`} />

      <section className={`${styles.para} my-16`}>
        <Text text={"intro_slides_three_text_three"} className="text-9cabc9 fs-13 fw-4" />
        <Text text={"intro_slides_three_link_two"} className="text-link fs-13 fw-4 mx-4" onClick={() => openWindow({ url: links.CONTRACTS })} />
        <Text text={"intro_slides_three_text_four"} className="text-9cabc9 fs-13 fw-4" />
      </section>
    </AnimatedLayout>
  );
};

export default SlideThree;
