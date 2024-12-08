import classNames from "classnames";

import HeroImage from "./mouse.png";

import "./Hero.css";

interface HeroProps {
  direction: string;
  isGameWon: boolean;
}

const Hero = ({ direction, isGameWon }: HeroProps) => (
  <img
    className={classNames("hero", `direction-${direction}`, {
      "game-won": isGameWon,
    })}
    src={HeroImage}
    alt="Hero"
  />
);

export default Hero;
