
const messages = {
    loginSuccess: "You've been logged in",
    loginFailure: "Wrong login / password",
    loginFailureEmail: "Please, confirm your email first",
    registerSuccess: "New user has been added! Check your email to activate your account.",
    registerFailure: "This username is already taken!",
    userRemoveSuccess: "User were deleted!",
    userRemoveFailure: "Wrong password",
    userIsGuest: "User is guest",
    userPasswordChangeSuccess: "Password were changed!",
    userPasswordChangeFailure: "Wrong current password!",
    tokenAcknowledgeSuccess: "Token accepted. You've been logged in",
    tokenAcknowledgeFailure: "Deprecated / Invalid token",
    emailConfirmationSuccess: "Email is successfully verified. You may now log in",
    emailConfirmationFailure: "Email is not verified. Verification link is broken",
}

export default (function() {
    var instance = null;
    if (!instance) {
        instance = {
            text: '',
            log() {
                console.log(`\n${this.text}\n\n`)
            }
        };
        for (var key in messages) {
            if (messages.hasOwnProperty(key)) {
                instance[key] = setMessage(messages[key]);
            }
        }
        function setMessage(text) {
            return function() {
                this.text = text;
                return this
            }
        }
    }
    return instance;
})();
