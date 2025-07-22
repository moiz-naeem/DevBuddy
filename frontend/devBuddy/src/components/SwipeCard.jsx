import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";


const SwipeCards = ({ users, setPage }) => {
  const [cards, setCards] = useState(users);
  console.dir(cards);
  useEffect(() => {
    console.log("rendered")
    if (cards.length === 0 && users.length > 0) {
      setPage(prev => prev + 1);
    }
  }, [cards.length, users.length, setPage]);
  return (
    <div className="relative h-[500px] w-full flex justify-center items-center bg-gray-100">
      {cards.map((card) => {
        return (
          <Card key={card._id} cards={cards} setCards={setCards} {...card} />
        );
      })}
    </div>
  );
};

const Card = ({
  _id,
  firstName,
  lastName,
  about,
  age,
  photourl,
  skills,
  setCards,
  cards,
}) => {
  const x = useMotionValue(0);

  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  const isFront = _id === cards[cards.length - 1]._id;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : _id % 2 ? 6 : -6;
    return `${rotateRaw.get() + offset}deg`;
  });



 const handleDragEnd = () => {
    const threshold = 100;
    if (Math.abs(x.get()) > threshold) {
      setCards((pv) => pv.filter((v) => v._id !== _id));
    }
  };

  return (
    <motion.div
      className="card bg-black w-96 shadow-sm absolute"
      style={{
        x,
        rotate,
        zIndex: isFront
          ? 10
          : cards.length - cards.findIndex((c) => c._id === _id),
        opacity: isFront ? 1 : 0.8,
        boxShadow: isFront
          ? "0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
          : "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        cursor: isFront ? "grab" : "default",
        pointerEvents: isFront ? "auto" : "none",
      }}
      animate={{
        scale: isFront
          ? 1
          : 0.95 -
            (cards.length - cards.findIndex((c) => c._id === _id)) * 0.02,
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{
        left: -200,
        right: 200,
      }}
      dragElastic={0.2}
      whileDrag={{
        cursor: "grabbing",
        scale: 1.05,
      }}
      onDragEnd={handleDragEnd}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <img
        src={photourl}
        alt="Placeholder alt"
        className="h-96 w-full rounded-t-lg bg-white object-cover select-none pointer-events-none"
      />

      <div className="card-body">
        <div className="flex flex-grow gap-3 ">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <h1 className="card-title">{age}</h1>
        </div>
        <p>{about}</p>
        <div className="flex flex-wrap w-full">
          {skills?.map((skill, index) => (
            <div
              key={skill.id}
              className=" flex basis-1/6 bg-gray-800 p-2 m-1 text-center rounded justify-between items-center"
            >
              {skill.label}
            </div>
          ))}
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Add</button>
          <button className="btn btn-primary">Ignore</button>
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeCards;
