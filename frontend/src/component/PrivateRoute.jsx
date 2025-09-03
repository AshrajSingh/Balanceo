import { useRecoilValue } from "recoil";
import { authAtom } from "../store/userAtom";
import { Navigate, useNavigate } from "react-router-dom";

//is user is logged in navigate to dashboard
export function PublicRoute({ children }) {
  const auth = useRecoilValue(authAtom)

  return auth.isLoggedIn ? <Navigate to={"/dashboard"} replace /> : children
}

//if user is not logged in navigate to login
export default function PrivateRoute({ children }) {
  const auth = useRecoilValue(authAtom)

  return auth.isLoggedIn ? children : <Navigate to={"/login"} replace />
}

