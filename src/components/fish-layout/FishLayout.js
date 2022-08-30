import { React, useState, useEffect } from "react";
import axios from "axios";
import Fish from "./fish/Fish";

const FishLayout = () => {
  const [fishData, setFishData] = useState([]);
  const [searchValue, setSearchValue] = useState("");


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

  // search fish data
  const filterFish = fishData.filter((fish) => {
    return (
      fish["fish-name"]["name-USen"].toLowerCase().includes(searchValue.toLowerCase()) ||
      fish.availability.location.toLowerCase().includes(searchValue.toLowerCase()) 
    );
  });

  // handle search input
  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>
      <div className="">
        <input
          className=""
          placeholder="Search name or location"
          onChange={handleChange}
          value={searchValue}
        />
      </div>
      <Fish 
      filteredFish = {filterFish}
      />
    </div>
  );
};

export default FishLayout;
