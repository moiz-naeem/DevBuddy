

const Alert = ({ error }) => {
  if (!error) return null;

  return (

      <div className="alert bg-red-500 text-white shadow-lg p-4 rounded-lg">
        <span>{error}</span>
      </div>

  );
};

export default Alert;
