import { useEffect, useState, useContext } from "react";
import Pet from "./Pet";
import useBreedList from "./useBreedList";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

// you could add an object.freeze() to the constant if you want to, but the map method doesn't modify things here
const ANIMALS = ["bird", "cat", "dog", "duck", "penguin", "giraffe"];

const SearchParams = () => {
  // Hooks expect you to return the same types as the defaultValue, but doesn't enforce it. TypeScript will enforce that.
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breedList] = useBreedList(animal);

  // Retrieving our theme from the ThemeContext.Provider, in function components
  const [theme, setTheme] = useContext(ThemeContext);

  // useEffect: if no dependency array, re-runs on every render. Empty array, runs once. else, runs when dependency updates.
  useEffect(() => {
    // our async code
    requestPets();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();

    console.log(json.pets);
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        // Lets results populate when the enter key, OR the button are hit.
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
            // onBlur added for a11y, improves screenreader exp
            onBlur={(e) => setAnimal(e.target.value)}
          >
            <option /> {/* empty initial option */}
            {
              // Avoid putting index as the key, in case positions are switched.
              ANIMALS.map((animal) => (
                <option value={animal} key={animal}>
                  {animal}
                </option>
              ))
            }
          </select>
        </label>
        {/* breed */}
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            // onBlur added for a11y, improves screenreader exp
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option /> {/* empty initial option */}
            {
              // Avoid putting index as the key, in case positions are switched.
              breedList.map((breed) => (
                <option value={breed} key={breed}>
                  {breed}
                </option>
              ))
            }
          </select>
        </label>

        <label htmlFor="theme">
          Theme
          <select
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            // onBlur added for a11y, improves screenreader exp
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option />
            {["pink", "darkblue", "lavender", "darkred"].map((color) => {
              return (
                <option value={color} key={color}>
                  {color}
                </option>
              );
            })}
          </select>
        </label>

        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      {/* Rendering Pet components */}
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;

/* If seeing errors about regenerator.runtime, it has to do with the browserslist not being correct. Needs to be browsers that don't require the regenerator runtime. Can then re-run by deleting cache and dist folders, then restarting your server. */

/* useEffect notes
  cleanup functions occur when components unmount, for example if the user nabigates to another page. examples of when cleanups are needed: setTimeout timers, api subscriptions
*/

/* User expectations in forms

Defining onClick on a button does not allow the "enter" key to submit a specific form
  Better to define an "onSubmit" event on the form itself. 
*/
