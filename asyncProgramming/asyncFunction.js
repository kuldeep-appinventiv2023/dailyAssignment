function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function multipleTasks() {
  console.log("Execution of task 1 start");

  await delay(1000); // 1s asynchronous task
  console.log("Execution of task 2 start");

  await delay(2000); // 2s asynchronous task
  console.log("Execution of task 3 start");
  
  await delay(3000); // 3s asynchronous task
  console.log("Execution of task 4 start");
}

multipleTasks();
