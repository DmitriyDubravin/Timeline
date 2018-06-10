
module.exports = {
    loginSuccess: () => "You've been logged in",
    loginFailure: () => "Wrong login / password",
    loginFailureEmail: () => "Please, confirm your email first",

    registerSuccess: () => "New user has been added! Check your email to activate your account.",
    registerFailure: () => "This username is already taken!",

    userRemoveSuccess: () => "User were deleted!",
    userRemoveFailure: () => "Wrong password",

    userPasswordChangeSuccess: () => "Password were changed!",
    userPasswordChangeFailure: () => "Wrong current password!",

    tokenAcknowledgeSuccess: () => "Token accepted. You've been logged in",
    tokenAcknowledgeFailure: () => "Deprecated / Invalid token",

}