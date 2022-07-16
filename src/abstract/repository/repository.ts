

export abstract class Repository {

  public abstract getFetch: (path: string, query?: object) => Promise<any>;

  public abstract postFetch: (path: string, data?: object | any[], query?: object) => Promise<any>;

  public abstract putFetch: (path: string, data?: object | any[], query?: object) => Promise<any>;

  public abstract deleteFetch: (path: string, data?: object | any[], query?: object) => Promise<any>;

}