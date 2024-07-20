export const ErrorMessage = ({ error }) => {
  return error && <p className="danger-error">{error}</p>;
};
