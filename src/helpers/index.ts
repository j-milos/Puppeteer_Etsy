export function delay(timeInMilisecunds: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, timeInMilisecunds);
  });
}
