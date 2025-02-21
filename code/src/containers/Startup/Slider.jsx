import React from "react";
import styles from "./slider.module.scss";
import SlideOne from "./SlideOne";
import SlideTwo from "./SlideTwo";
import SlideThree from "./SlideThree";
import { Button, Text } from "@components/index";
import { useNavigate } from "react-router-dom";

const slides = [SlideOne, SlideTwo, SlideThree];

const Slider = () => {
  const navigate = useNavigate();
  const [active, setActive] = React.useState(0);
  const CurrentSlide = slides[active];
  return (
    <div className={styles.root}>
      <CurrentSlide />
      <Button
        onClick={() => {
          if (active === slides.length - 1) {
            navigate("/import", { replace: true });
            return;
          }
          setActive((prevActive) => prevActive + 1);
        }}
        className={`${styles.button} mt-24`}
      >
        <Text text={active === slides.length - 1 ? "continue" : "next"} className="fs-16 fw-4" />
      </Button>
    </div>
  );
};

export default Slider;
