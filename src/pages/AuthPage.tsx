import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useMyCreateUser } from "@/api/MyUserApi"
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const { user } = useAuth0();
  const hasUserCreated = useRef(false);
  const { createUser } = useMyCreateUser();
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.sub && user?.email && !hasUserCreated.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasUserCreated.current = true;
    }
    navigate('/')
  }, [user, navigate, hasUserCreated.current]);
  
  return <>Loading...</>;
};
export default AuthPage;
