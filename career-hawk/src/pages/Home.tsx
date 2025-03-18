import { Box } from "@chakra-ui/react";
import logo from "@/assets/eagle.jpg";

const Home = () => {
  return (
    <div>
      <Box
        bgImage={`url(${logo})`}
        minH="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgSize="cover"
        backgroundPosition="center"
        bgRepeat="no-repeat"
        backgroundSize="30%"
      ></Box>
    </div>
  );
};

export default Home;
