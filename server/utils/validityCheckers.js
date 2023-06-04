
// Checks if email is valid 
const checkValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

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