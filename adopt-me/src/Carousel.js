import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  // fallback props. These need to be static.
  // typeScript will pick up on these static types automatically
  static defaultProps = {
    images: [`http://pets-images.dev-apis.com/pets/none.jpg`],
  };

  handleIndexClick = (e) => {
    let currentIndex = e.target.dataset.index;
    this.setState({ active: currentIndex });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {/* Here ESlint is calling out the fact that imgs should not be used as carousel buttons. Screenreaders cannot access an img disguised as a btn */}
          {images.map((photo, index) => {
            //eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
              data-index={index}
              onClick={this.handleIndexClick}
            />;
          })}
        </div>
      </div>
    );
  }
}

export default Carousel;
