const emptyBlog = {
  title: "",
  author: "",
  url: "",
};

const displayMessage = (message, setMessage = null, setErrorMessage = null) => {
  if (setMessage) {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  } else if (setErrorMessage) {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  } else {
    console.log(
      "Wrong usage: you need provide 'setMessage' or 'setErrorMessage' to the function declaration",
    );
    return;
  }
};

export { emptyBlog, displayMessage };
