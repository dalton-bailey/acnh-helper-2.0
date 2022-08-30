import { React, useEffect, useState } from "react";
import axios from "axios";
import BellBag from "../../../images/bell-bag.png";
import CjImage from "../../../images/cj.webp";
import {
  MapPinIcon,
  ClockIcon,
  PuzzlePieceIcon,
  BuildingLibraryIcon,
  CheckCircleIcon,
  CalendarDaysIcon
} from "@heroicons/react/24/outline";

const Fish = (filteredFish) => {
  const [fishData, setFishData] = useState([]);

  console.log(fishData)

  // fetch fish data
  const fetchFishes = async () => {
    try {
      const fishes = await axios.get(
        `https://afternoon-temple-99772.herokuapp.com/fish`
      );
      // const villagers = await axios.get(`localhost:5050/villagers`);
      setFishData(fishes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFishes();
  }, []);

  //change caught fish data to opposite of caught fish
  const caughtFish = (fish) => {
    fish["caught-fish"] = !fish["caught-fish"];
  };

  //change donated fish data to opposite of donated fish
  const donatedFish = (fish) => {
    fish["donated-fish"] = !fish["donated-fish"];
  };

  // send update for caught & donated fish
  const handleUpdate = async (fish) => {
    try {
      const result = await axios.put(
        `https://afternoon-temple-99772.herokuapp.com/fish/update`,
        {
          data: {
            fishId: fish._id,
            "caught-fish": fish["caught-fish"],
            "donated-fish": fish["donated-fish"],
          },
        }
      );
      if (result.status === 200) {
        fetchFishes();
      }
    } catch (err) {
      console.error(err);
    }
  };

  let newFishNames = fishData.map(
    (fish) =>
      fish["fish-name"]["name-USen"].charAt(0).toUpperCase() +
      fish["fish-name"]["name-USen"].slice(1)
  );

  const showFish = filteredFish.filteredFish.map((fish) => {
    const index = filteredFish.filteredFish.findIndex((fishName) => {
      return fishName._id === fish._id;
    });

    function toMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);
      
        return date.toLocaleString('en-US', {
          month: 'long',
        });
      }

    return (
      <div
        key={fish._id}
        className="max-w-md w-full h-60 m-2 flex flex-col items-center justify-evenly rounded-lg shadow-md"
      >
        <div className="flex flex-row items-center justify-around w-full">
          <div className="flex flex-col items-center">
            <img alt="fish" src={fish.icon_uri} className="h-20 -mb-2" />
            <p className="text-lg">{fish["fish-name"]["name-USen"]}</p>
            {/* <p className="text-lg">{newFishNames[index]}</p> */}
            <div className="flex justify-around mt-2">
              <div className="flex items-center">
                <img src={BellBag} alt="bell bag icon" className="h-6 pr-1" />
                <p className="pr-2">{fish.price}</p>
              </div>
              <div className="flex items-center">
                <img src={CjImage} alt="bell bag icon" className="h-6 pr-1" />
                <p>{fish["price-cj"]}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-around h-full">
            <div className="flex items-center">
              <MapPinIcon className="h-6 pr-2" />
              <p>{fish.availability.location}</p>
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-6 pr-2" />
              <p>
                {fish.availability.time === ""
                  ? "All Day"
                  : fish.availability.time}
              </p>
            </div>
            <div className="flex items-center">
              <CalendarDaysIcon className="h-6 pr-2" />
              <p>
                {fish.availability["month-northern"] === ""
                  ? "All Year"
                  : toMonthName(Object.values(fish.availability["month-array-northern"])[0]) + "-" + toMonthName(Object.values(fish.availability["month-array-northern"])[fish.availability["month-array-northern"].length - 1])}
              </p>
            </div>
            <div className="flex items-center">
              <PuzzlePieceIcon className="h-6 pr-2" />
              <p>{fish.shadow}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-around w-full">
          <div
            className={
              fish["caught-fish"] ? "isCaught w-2/4" : "isNotCaught w-2/4"
            }
            onClick={() => {
              caughtFish(fish);
              handleUpdate(fish);
            }}
          >
            {fish["caught-fish"] ? (
              <div className="flex items-center justify-center">
                <CheckCircleIcon className="h-6 pr-2 bg-green text-green-600" />
                <p className="cursor-pointer">Caught</p>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <CheckCircleIcon className="h-6 pr-2" />
                <p className="cursor-pointer">Not Caught</p>
              </div>
            )}
          </div>
          <div
            className={
              fish["donated-fish"] ? "isDonated w-2/4" : "isNotDonated w-2/4"
            }
            onClick={() => {
              donatedFish(fish);
              handleUpdate(fish);
            }}
          >
            {fish["donated-fish"] ? (
              <div className="flex items-center justify-center">
                <BuildingLibraryIcon className="h-6 pr-2 text-green-600" />
                <p className="cursor-pointer">Donated</p>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <BuildingLibraryIcon className="h-6 pr-2" />

                <p className="cursor-pointer">Not Donated</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="flex flex-wrap justify-around">{showFish}</div>
    </div>
  );
};

export default Fish;
