

function classDecorator(constructor: typeof A) {
  const method = constructor.prototype.d

  constructor.prototype.d = function (e: string) {
    method(e)
    console.log(("d()를 호출하면 이것도 호출된다."));
  }

}

function LogError(target: any, key: string, desc: PropertyDescriptor): void {
  console.log(target);
  console.log(key);
  console.log(desc);
  console.log(target[key]("바보"));
}

@classDecorator
export class A {
  b: string = "Hello";

  get c(): string {
    return `${this.b} world`;
  }

  @LogError
  d(e: string): void {
    console.log(e);
  }

} 