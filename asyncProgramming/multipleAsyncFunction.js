function task1() {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        console.log("Task 1 completed");
        resolve();
      }, 2000);
    });
  }
function task2() {
  return new Promise(function (resolve, reject) {
      setTimeout(function () {
        console.log("Task 2 completed");
        resolve();
      }, 1000);
  });
}
  
task1().then(function () {
            return task2();
        })
        .then(function () {
            console.log("All tasks completed");
        })
       .catch(function (error) {
            console.error("An error occurred:", error);
        });
  