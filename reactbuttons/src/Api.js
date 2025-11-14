export function fetchData(type) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: `${type} clicked` });
      }, 200);
    });
  }
  
  export function apiWithTimeout() {
    return new Promise((resolve) => {
      setTimeout(() => resolve("Timeout API Response"), 500);
    });
  }
  
  export function apiWithoutTimeout() {
    return "No Timeout API Response";
  }
  
  export function apiWithPromise() {
    return Promise.resolve("Promise API Response");
  }
  