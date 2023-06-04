
// Checks if email is valid 
const checkValidEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

//check if password is valid (at least 6 characters)
const checkValidPassword = (password) => {
    return password.length >= 6;
}

//check if name is valid (at least 3 characters)
const checkValidName = (name) => {
    return name.length >= 3;
}


module.exports = {
    checkValidEmail,
    checkValidPassword,
    checkValidName
}