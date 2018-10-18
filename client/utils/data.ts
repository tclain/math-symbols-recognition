/** fetch data from the backend */

export function predictFromData(data: string): Promise<string> {
  //return fetch()
  return new Promise((resolve, reject) => {
    window.setInterval(() => {
      resolve("=");
    }, 1000);
  });
}
