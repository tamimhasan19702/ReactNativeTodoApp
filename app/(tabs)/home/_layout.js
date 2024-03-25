/** @format */

import { Stack } from "expo-router";
import { ModalPortal } from "react-native-modals";

const Layout = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
      <ModalPortal />
    </>
  );
};

export default Layout;
