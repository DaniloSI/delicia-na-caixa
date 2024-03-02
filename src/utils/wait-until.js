export function waitForConditionAndExecute(condition, timeout, callback) {
  const checkInterval = 100; // check interval in milliseconds
  let elapsedTimeout = 0;

  const checkCondition = () => {
    if (condition()) {
      callback();
    } else if (elapsedTimeout < timeout) {
      elapsedTimeout += checkInterval;
      setTimeout(checkCondition, checkInterval);
    }
  };

  checkCondition();
}
