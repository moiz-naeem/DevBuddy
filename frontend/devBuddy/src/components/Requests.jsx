import UserCard from "./UserCard";

const mockUsers = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  data: {
    firstName: `Elon${i}`,
    lastName: "Musk",
    about: "Changing the world with tech and memes.",
    age: 20 + i,
  },
  caseSensitiveData: {
    skills: [
      { id: 1, label: "JavaScript", _id: "id1" },
      { id: 2, label: "TypeScript", _id: "id2" },
      { id: 3, label: "Python", _id: "id3" },
      { id: 4, label: "Java", _id: "id4" },
      { id: 5, label: "Java", _id: "id5" },
      
      { id: 6, label: "C++", _id: "id6" },
    ],
    photourl: "https://www.kindpng.com/picc/m/773-7733095_kisspng-monkey-hippopotamus-rhinoceros-clip-art-cute-clip.png",
    email: `elon${i}@gmail.com`,
  }
}));

const Requests = () => {
  const visibleUsers = mockUsers.slice(0, 10); // simulate 10 per API response

  return (
    <div className="w-full min-h-screen p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-fr">
        {visibleUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Requests;