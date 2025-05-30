import React from "react";
import Dashboard from "./pages/Dashboard";
import { Theme } from "@radix-ui/themes";

const App: React.FC = () => {
  return (
    <Theme accentColor="iris" grayColor="olive" radius="small">
      <Dashboard />
    </Theme>
  );
};

export default App;
