import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store?.user);
  const location = useLocation();

  if (!user) {
    
    return (
      <Navigate 
        to="/login" 
        state={{ 
          error: "Please log in to access this page.",
          from: location.pathname 
        }} 
        replace 
      />
    );
  }

  return children;
};

export default ProtectedRoute;