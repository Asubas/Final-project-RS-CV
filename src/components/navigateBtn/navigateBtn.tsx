import './navigateBtn.scss';
import { useNavigate } from 'react-router-dom';

function NavigateBack() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <div onClick={goBack} className="navigateBtn goBack">
      <div className="goBack_line"></div>
      <div className="goBack_line"></div>
      <div className="goBack_line"></div>
    </div>
  );
}

function NavigateForward() {
  const navigate = useNavigate();
  const goForward = () => navigate(1);

  return (
    <div onClick={goForward} className="navigateBtn goForward">
      <div className="goForward_line"></div>
      <div className="goForward_line"></div>
      <div className="goForward_line"></div>
    </div>
  );
}

export { NavigateBack, NavigateForward };
