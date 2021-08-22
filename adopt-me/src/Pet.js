import { Link } from "react-router-dom";

const Pet = ({ name, animal, breed, images, location, id }) => {
  let hero = `http://pets-images.dev-apis.com/pets/none.jpg`;
  if (images.length) {
    hero = images[0];
  }

  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;

/* Using Link with React Router 
  Switching from <a href="/details/:id"></a> 
  to <Link to="/details/:id"></Link>
  avoids a page reload, and so preserves React's state. 

  <Link> replaces <a>
  "to" replaces "href"
*/
