import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Redirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentUrl = location.pathname;

useEffect(() => {
    if(currentUrl === '/') {
        navigate('/1')
    }
},[])

};

export default Redirect;
