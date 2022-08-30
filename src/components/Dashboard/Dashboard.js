import React from "react";
import { Link } from "react-router-dom";
import {
  UserCircleIcon,
  Cog8ToothIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import fishIcon from "../../images/yellow-perch.png";
import bugIcon from "../../images/yellow-butterfly.webp";
import fossilIcon from "../../images/fossil.png";
import villagerIcon from "../../images/molly-villager.png";
import artIcon from "../../images/redd.png";
import creatureIcon from "../../images/seaanemone.webp";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth0 } from "@auth0/auth0-react";

// const user = {
//   name: "Bailey",
//   islandName: "Lyra",
//   fruit: "Cherry",
// };

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  console.log(user);

  return (
    isAuthenticated && (
      <div className="h-screen p-2">
        {/* account & settings */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col m-2">
            <p className="mr-1">{user["given_name"]}'s Island</p>
            <p>{user.hemisphere} Hemisphere</p>
            <p className="">{user.islandName}</p>
          </div>
          <Login />
          <Logout />
          <div className="flex justify-end m-2">
            <Link to="/account" className="h-10 w-10 flex">
              {user.picture === "" ? (
                <div>
                  <UserCircleIcon />
                </div>
              ) : (
                  <div >
                    <img
                      src={user.picture}
                      alt="user image"
                      className="rounded-full "
                    />
                    {/* <p><ChevronDownIcon /></p> */}
                  </div>
              )}
            </Link>
            {/* <Link to="/settings" className="h-8 w-8">
            
            <Cog8ToothIcon />
          </Link> */}
          </div>
        </div>

        {/* dashboard buttons */}
        <div className="flex justify-around flex-wrap">
          {[
            ["Fish", "/fish", fishIcon, "fish icon", 0],
            ["Bugs", "/bugs", bugIcon, "bug icon", 1],
            ["Fossils", "/fossil", fossilIcon, "fossil icon", 2],
            ["Villagers", "/villagers", villagerIcon, "villagers icon", 3],
            ["Art", "/art", artIcon, "art icon", 4],
            [
              "Sea Creatures",
              "/creatures",
              creatureIcon,
              "sea creature icon",
              5,
            ],
          ].map(([title, url, imageUrl, alt, index]) => (
            <div key={index} className="w-40 rounded-lg shadow-lg m-2 bg-white">
              <Link
                to={url}
                className="flex flex-col justify-center items-center w-40 h-40"
              >
                <img src={imageUrl} className="w-20" alt={alt}></img>
                <p className="text-xl">{title}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Dashboard;
