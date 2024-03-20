/** @format */

import React from "react";
import { Redirect } from "expo-router";

const index = () => {
  return (
    // <Redirect href={"/(tabs)/home"} />
    <Redirect href={"/(auth)/login"} />
  );
};

export default index;
