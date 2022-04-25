import React, { createRef, useEffect } from "react";
import BadgeStyle from "../styles/BadgeStyle";

interface IGenre {
  genres: string[];
}

const Badge: React.FC<IGenre> = ({ genres }) => {
  const ref = createRef<HTMLDivElement>();

  useEffect(() => {
    ref.current?.addEventListener("wheel", (e) => {
      e.preventDefault();
      ref.current!.scrollLeft += (e.deltaY + e.deltaX);
    });

  }, [ref]);

  const handleScrollX = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    ref.current?.addEventListener("wheel", () => {});
    e.preventDefault();
    console.log(ref.current?.scrollWidth);
  };

  return (
    <>
      <BadgeStyle.BadgesContainer ref={ref} onScroll={(e) => handleScrollX(e)}>
        {genres.map((genre, index) => (
          <BadgeStyle.Badge change={false} key={index}>
            {genre}
          </BadgeStyle.Badge>
        ))}
      </BadgeStyle.BadgesContainer>
    </>
  );
};

export default Badge;
