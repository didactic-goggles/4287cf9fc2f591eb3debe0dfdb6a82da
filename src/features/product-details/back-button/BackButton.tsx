import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../../../assets/icon-arrow-left.svg';
import styles from './BackButton.module.scss';

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <button className={styles.btn} onClick={() => navigate(-1)}>
      <ArrowLeft />
      <span className="ml-3">Back</span>
    </button>
  );
};

export default BackButton;
