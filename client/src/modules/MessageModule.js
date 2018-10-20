
export default (function() {
    var instance = null;
    if (!instance) {
        instance = {

            text: '',

            log() {
                console.log(`\n${this.text}\n\n`)
            },
            setMessage(text) {
                this.text = text
            },

            loginSuccess() {
                this.setMessage("You've been logged in");
                return this;
            },
            loginFailure() {
                this.setMessage("Wrong login / password");
                return this;
            },
            loginFailureEmail() {
                this.setMessage("Please, confirm your email first");
                return this;
            },

            registerSuccess() {
                this.setMessage("New user has been added! Check your email to activate your account.");
                return this;
            },
            registerFailure() {
                this.setMessage("This username is already taken!");
                return this;
            },

            userRemoveSuccess() {
                this.setMessage("User were deleted!");
                return this;
            },
            userRemoveFailure() {
                this.setMessage("Wrong password");
                return this;
            },

            userIsGuest() {
                this.setMessage("User is guest");
                return this;
            },

            userPasswordChangeSuccess() {
                this.setMessage("Password were changed!");
                return this;
            },
            userPasswordChangeFailure() {
                this.setMessage("Wrong current password!");
                return this;
            },

            tokenAcknowledgeSuccess() {
                this.setMessage("Token accepted. You've been logged in");
                return this;
            },
            tokenAcknowledgeFailure() {
                this.setMessage("Deprecated / Invalid token");
                return this;
            },

            emailConfirmationSuccess() {
                this.setMessage("Email is successfully verified. You may now log in");
                return this;
            },
            emailConfirmationFailure() {
                this.setMessage("Email is not verified. Verification link is broken");
                return this;
            },
        }
    }
    return instance;
})();
