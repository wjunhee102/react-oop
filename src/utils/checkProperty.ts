
export function checkProperty<T extends object>(object: any, keyList: string[]): T | null {
  
  if(!object) {
    return null;
  }

  const length = keyList.length;

  for(let i = 0; i < length; i++) {

    if(!object[keyList[i]]) {
      return null;
    }

  }

  return object as T;
}