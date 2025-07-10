const Alert = ({ error }) => {
  if (!error) return null;

  return (
    <div className="w-auto mb-4 pr-7 pl-2">
      <div className="alert alert-error bg-red-500 text-white shadow-md rounded-lg p-3">
        <span>{error}</span>
      </div>
    </div>
  );
};

export default Alert;
