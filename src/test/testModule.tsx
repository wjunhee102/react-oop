import { useCallback, useEffect, useMemo, useState } from "react";
import "reflect-metadata";

export function Injectable(): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata("__injectable__", true, target);
  };
}

export class TestRepository {
  
  public count: number;
  public setCount: (count: number) => void;

  constructor() {
    // eslint-disable-next-line
    const [ count, setCount ] = useState<number>(0);

    this.count = count;
    this.setCount = setCount;
  }

}

@Injectable()
export class TestService {

  constructor(private props: any, private testRepository: TestRepository) {}

  get count() {
    return this.testRepository.count + this.props.count;
  }

  public getProps = () => {
    return this.props;
  }

  public testEffect = () => {
    console.log(this.count);
  }

  public addTwoCount = () => {
    return this.count + 2;
  }

  public addCount = () => {
    
    const count = this.testRepository.count;

    this.testRepository.setCount(count + 1);
  }

  public deleteCount = () => {

    const count = this.testRepository.count;

    this.testRepository.setCount(count - 1);
  }
 
}

/* eslint-disable */
export class TestController {

  constructor(private testService: TestService) {
    this.effect();
  }

  private effect = () => {
    useEffect(this.testService.testEffect, [this.count]);
  }

  public count = this.testService.count;

  public countPlusTwo = useMemo(this.testService.addTwoCount, [this.count]);

  public getProps = this.testService.getProps;

  public addCount = useCallback(this.testService.addCount, [this.count]);

  public deleteCount = useCallback(this.testService.deleteCount, [this.count]);

}

interface TestViewHeaderProps {
  count: number;
}

const TestViewHeader: React.FC<TestViewHeaderProps> = ({ count }) => {
  return (
    <div className="w-full leading-5 text-center">{ count }</div>
  );
}

interface TestViewProps {
  count: number;
  addCount: () => void;
  deleteCount: () => void;
}

export const TestView: React.FC<TestViewProps> = ({
  count,
  addCount,
  deleteCount
}) => (
  <div className="w-[200px] rounded shadow border border-solid border-gray-400">
    <TestViewHeader count={count} />
    <div className="flex justify-center">
      <button onClick={addCount}>
        더하기
      </button>
      <button onClick={deleteCount}>
        빼기
      </button>
    </div>
  </div>
);

export class TestComponent {

  constructor(private testController: TestController) {
    this.header = this.header.bind(this);
  }

  public header() {
    return (
      <div className="w-full leading-5 text-center">
        {this.testController.count}/
        {this.testController.countPlusTwo}
      </div>
    );
  }

  public body = () => (
    <div className="flex justify-center">
      <button onClick={this.testController.addCount}>
        더하기
      </button>
      <button onClick={this.testController.deleteCount}>
        빼기
      </button>
    </div>
  );
  
  public render = () => {

    const Header = this.header;
    const Body = this.body;

    return (
      <div className="w-[200px] rounded shadow border border-solid border-gray-400">
        <Header />
        <Body />
      </div>
    );
  }

}

interface ModuleProps {
  repository: any,
  provider: any,
  controller: any
  component: any
}

function Module<T extends ModuleProps>(props: T) {
  return function(constructor: any) {

    const {
      repository,
      provider,
      controller,
      component
    } = props

    function element(props: any) {

      const Repository = new repository();
      const Provider = new provider(props, Repository);
      const Contoroller = new controller(Provider);
      const Component = new component(Contoroller).render;

      return <Component />;
    }

    Reflect.defineMetadata("element", element, constructor);
  }
}

@Module({
  repository: TestRepository,
  provider: TestService,
  controller: TestController,
  component: TestComponent
})
export class Test {}

console.log("Test", Reflect.getMetadata("design:type", Test));
console.log("Test", Reflect.getMetadataKeys(Test));
console.log("TestService", Reflect.getMetadata("design:type", TestService));
console.log("TestController", Reflect.getMetadataKeys(TestController.prototype, "testService"));
console.log("TestController", Reflect.getMetadata("design:type", TestController.prototype, "testService"));