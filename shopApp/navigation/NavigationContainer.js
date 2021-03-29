import React, { useEffect, useRef } from "react";
import ShopNavigator from "./ShopNavigator";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";

const NavigationContainer = (props) => {
  const navRef = useRef();
  const isAuth = useSelector((state) => !!state.auth.token);
  useEffect(() => {
    !isAuth
      ? navRef.current.dispatch(
          NavigationActions.navigate({ routeName: "Auth" })
        )
      : null;
  }, [isAuth]);
  return <ShopNavigator ref={navRef} />;
};

export default NavigationContainer;
