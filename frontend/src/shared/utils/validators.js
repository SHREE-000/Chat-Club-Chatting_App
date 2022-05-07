export const validateLoginForm = ({mail,password}) => {
    const isMailValid = validateMail(mail);
    const isPasswordValid = validatePassword(password);
    return isMailValid && isPasswordValid;
} 

export const validateRegisterForm = ({mail, username, password}) => {
    const isMailValid = validateMail(mail);
    const isUsernameValid = validateUsername(username);
    const isPasswordValid = validatePassword(password);
    return isMailValid && isUsernameValid && isPasswordValid;
}

export const validateContact = ( { email, message}) => {
    const isMailValid = validateMail(email);
    const isMessageValid = validateMessage(message);
    return isMailValid && isMessageValid;
}


const validatePassword = (password) => {
    return password.length > 5 && password.length < 12;
}

export const  validateMail = (mail) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return emailPattern.test(mail);
}

const validateUsername = (username) => {
    return username.length > 2 && username.length < 13;
}

const validateMessage = (message) => {
    return message.length > 4 && message.length < 1000;
}
