import { useRecoilValue } from "recoil";
import { authAtom } from "../store/userAtom";
import { Navigate } from "react-router-dom";

//if user is logged in navigate to dashboard
export function PublicRoute({ children, allowWhenLoggedIn = false }) {
  const auth = useRecoilValue(authAtom)

  if (!auth.isChecked) {
    return (
      <div style={{
        height: '100vh',
        backgroundColor: '#000',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem'
      }}>
        Loading BALANCEO...
      </div>
    );
  }

  // If allowWhenLoggedIn is true (for HomePage), don't redirect
  if (allowWhenLoggedIn) {
    return children;
  }

  // For other public routes (like login), redirect to dashboard if logged in
  return auth.isLoggedIn ? <Navigate to={"/dashboard"} replace /> : children
}

//if user is not logged in navigate to login
export default function PrivateRoute({ children }) {
  const auth = useRecoilValue(authAtom)
  console.log("isChecked from private Route: ", auth)
  if (!auth.isChecked) {
    return (
      <div style={{
        height: '100vh',
        backgroundColor: '#000',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem',
        width: '100vw'
      }}>
        Loading BALANCEO...
      </div>
    );
  }

  return auth.isLoggedIn ? children : <Navigate to={"/"} replace />
}

