import './PageNotFound.css';
import { useHistory, Link } from 'react-router-dom';

const PageNotFound = () => {
  const history = useHistory();
  const handleComeBack = () => {
    history.goBack();
  };

  return (
    <div className="page-not-found">
      <p className="page-not-found__error-code">404</p>
      <p className="page-not-found__text">Страница не найдена</p>
      <Link
        to="/"
        className="page-not-found__back-link"
        onClick={handleComeBack}
      >
        Назад
      </Link>
    </div>
  );
};

export default PageNotFound;
