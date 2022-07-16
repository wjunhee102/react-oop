import React, { useEffect } from 'react';
import { A } from './decorators/decorators';
import { Test } from './test/testModule';
import Todo from './todo';
import "reflect-metadata";

const TestApp = Reflect.getMetadata("element", Test);

const App: React.FC = () => {

  useEffect(() => {
    new A().d("react");
  }, []);

  return (
    <div>
      <Todo key="1" title="todo 리스트입니다. 1" />
      <div className="flex items-center justify-center w-screen h-screen">
        <TestApp key="1" count={5} />
        <TestApp key="2" count={10} />
        <TestApp key="3" count={0} />
      </div>
      {/* <Todo key="2" title="todo 리스트입니다. 2" /> */}
    </div>
  );
}

export default App;
