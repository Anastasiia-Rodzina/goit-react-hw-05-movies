import { Outlet } from "react-router-dom";
import MainMenu from "./MainMenu/MainMenu";
import { Suspense } from "react";

export const SharedLayout = () => {
    return (
      <>
        <MainMenu />
        <Suspense fallback={<div>Loading...</div>}> 
        <Outlet />
        </Suspense>
      </>
    );
  };
  
  export default SharedLayout;