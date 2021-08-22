import { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from './Modal';

class Details extends Component {
  state = { loading: true, showModal: false };

  // constructor(props) {
  //     super(props)

  //     this.state = { loading: true }
  // }

  // Called once when component first renders, causing a re-render
  async componentDidMount() {
    // React Router: match is the matched route
    // params are the params on the route
    // id is the specific param we want
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = await res.json();

    // state is merged in class components.
    // Object.assign wil assign properties from source objects to target objects. Great for avoiding retyping obj properties!!!
    this.setState(
      Object.assign(
        {
          loading: false,
        },
        json.pets[0]
      )
    );
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adoptPet = () => (window.location = 'http://bit.ly/pet-adopt')

  render() {
    if (this.state.loading) {
      return <h2>loading... </h2>;
    }

    const {
      animal,
      breed,
      city,
      state,
      description,
      name,
      images,
      showModal,
    } = this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${city} - ${state}`}</h2>

          {/* Using ThemeContext in our class component */}
          <ThemeContext.Consumer>
            {([theme]) => (
              <button style={{ backgroundColor: theme }} onClick={this.toggleModal}>
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>

          <p>{description}</p>
          {/* if show modal is true, open it up */}
          {
              showModal && 
                (
                  <Modal>
                    <div>
                        <h1>Are you sure you'd like to adopt {name}</h1>
                        <div className='buttons'>
                            <button onClick={this.adoptPet}>Yes</button>
                            <button onClick={this.toggleModal}>No</button>
                        </div>
                    </div>    
                  </Modal>
                )              
          }
        </div>
      </div>
    );
  }
}

// withRouter passes React Router props into the class component. Must remember to use this with class components
const DetailsWithRouter = withRouter(Details);

// ErrorBoundary needs to be a higher order component. JS errors go up when encountered.
export default function DetailsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}
