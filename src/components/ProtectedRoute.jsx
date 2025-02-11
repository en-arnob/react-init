import { Navigate } from "react-router";
import { useData } from "../context/DataContext";

// eslint-disable-next-line react/prop-types
export default function ProtectedRoute({ children }) {
  const { currentUser } = useData();
  return currentUser ? children : <Navigate to="/login" replace />;
}
