import { getTypes } from "./services/getData";
import ClientComponent from "./components/ClientComponent";

const Home = async () => {
  const types = await getTypes();

  return (
    <div className="flex flex-col gap-4 px-10">
      <h1 className="text-center">欢迎来到宝可梦世界</h1>
      <ClientComponent types={types} />
    </div>
  );
};

export default Home;
