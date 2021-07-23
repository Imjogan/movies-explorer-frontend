import './BurgerButton.css';

function BurgerButton({ openSideMenu }) {
  const handleClick = () => {
    openSideMenu();
  };

  return (
    <nav className="burger">
      <figure onClick={handleClick} className="burger__button">
        <span className="burger__line" />
        <span className="burger__line" />
        <span className="burger__line" />
      </figure>
    </nav>
  );
}

export default BurgerButton;
