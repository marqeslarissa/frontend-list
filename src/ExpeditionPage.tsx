import { observer } from "mobx-react";
import React from "react";
import Search from "./components/Search";
import Table from "./components/Table";

function ExpeditionsPage(props: any): any {
  return (
    <div className="App">
      <Search />
      <Table />
    </div>
  );
}

export default observer(() => <ExpeditionsPage />);
