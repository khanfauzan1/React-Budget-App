//react-router dom
import { Outlet, useLoaderData } from "react-router-dom";
//helper functions
import { fetchData } from "../helpers";
//assests
import wave from "../assets/wave.svg"
//components
import Nav from "../components/Nav";
// loader
export function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

const Main = () => {
  const { userName } = useLoaderData();
  return (
    <div className="layout ">
      <Nav userName={userName}/>
      <main>
      <Outlet />
      </main>
     
      <img src={wave} alt=""></img>
    </div>
  );
};

export default Main;
