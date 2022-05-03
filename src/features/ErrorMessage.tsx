import { ReactComponent as ErrorIcon } from '../assets/icon-error.svg';

type ErrorMessageProps = {
  error: Error;
};

const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  const { error } = props;
  return (
    <div className='error-message'>
      <ErrorIcon />
      <span className='ml-3'>{error.message}</span>
    </div>
  );
};

export default ErrorMessage;
