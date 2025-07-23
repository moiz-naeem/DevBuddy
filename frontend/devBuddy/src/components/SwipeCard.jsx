import { motion, useMotionValue, useTransform } from "framer-motion";

const SwipeCard = ({
  _id,
  firstName,
  lastName,
  about,
  age,
  photourl,
  skills,
  setCards,
  cards,
  onCardRemoved,
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
      setCards((pv) => {
        const newCards = pv.filter((v) => v._id !== _id);
        // Check if this was the last card
        if (newCards.length === 0) {
          onCardRemoved();
        }
        return newCards;
      });
    }
  };

  const handleButtonClick = (action) => {
    setCards((pv) => {
      const newCards = pv.filter((v) => v._id !== _id);
      // Check if this was the last card
      if (newCards.length === 0) {
        onCardRemoved();
      }
      return newCards;
    });
  };

  return (
    <motion.div
      className="card bg-black w-96 shadow-sm absolute text-white"
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
        alt={`${firstName} ${lastName}`}
        className="h-96 w-full rounded-t-lg bg-white object-cover select-none pointer-events-none"
      />

      <div className="card-body p-4">
        <div className="flex flex-grow gap-3 items-center">
          <h2 className="card-title text-xl font-bold">{firstName + " " + lastName}</h2>
          <h1 className="card-title text-lg">{age}</h1>
        </div>
        <p className="text-gray-300 my-2">{about}</p>
        <div className="flex flex-wrap w-full gap-1 mb-4">
          {skills?.map((skill) => (
            <div
              key={skill.id}
              className="bg-gray-800 px-3 py-1 text-sm rounded-full text-center"
            >
              {skill.label}
            </div>
          ))}
        </div>
        <div className="card-actions justify-end gap-2">
          <button 
            className="btn btn-success text-white px-6"
            onClick={() => handleButtonClick('add')}
          >
            Add
          </button>
          <button 
            className="btn btn-error text-white px-6"
            onClick={() => handleButtonClick('ignore')}
          >
            Ignore
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeCard