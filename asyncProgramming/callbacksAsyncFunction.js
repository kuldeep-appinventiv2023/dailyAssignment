function findResult(success, callback) {
    setTimeout(() => {
      if (success) {
        callback(null, "Operation completed successfully");
      } else {
        callback(new Error("Operation failed"));
      }
    }, 2000);
  }
  
  function handleResult(error, result) {
    if (error) {
      console.error("Error:", error.message);
    } else {
      console.log("Result:", result);
    }
  }
  
  // Simulating a successful async operation
  findResult(true, handleResult);
  
  // Simulating a failed async operation
  findResult(false, handleResult);
