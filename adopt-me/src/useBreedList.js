import { useState, useEffect } from "react";

// for maintaining a list of animals already requested
const localCache = {};

// Custom hook used to get a list of breeds available for a given animal type (e.g. dog)
// custom hooks are functions that work with state. Great for reusability in a project
export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded"); //enumerated list - represent the current state of the hook

  useEffect(() => {
    //   Avoid re-requesting API if animal's breedlist is already in cache
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      // reset state first
      setBreedList([]);
      setStatus("loading");

      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();

      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);
  return [breedList, status];
}
