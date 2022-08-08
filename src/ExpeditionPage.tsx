import { observer } from "mobx-react";
import React from "react";
import Search from "./components/Search";

function ExpeditionsPage(props: any): any {
  return (
    <div className="App">
      <Search />
    </div>
  );
}

export default observer(() => <ExpeditionsPage />);
