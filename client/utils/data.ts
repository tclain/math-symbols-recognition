/** fetch data from the backend */

export function predictFromData(data: any): Promise<string> {
  console.log(data);
  console.log("about to predict smthing");
  return fetch("http://localhost:1245/predict", {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image: data })
  })
    .then(res => res.json())
    .then(res => res.result as string);
}
