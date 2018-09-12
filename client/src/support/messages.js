
module.exports = {

    loginSuccess: () => "\nYou've been logged in\n\n",
    loginFailure: () => "\nWrong login / password\n\n",
    loginFailureEmail: () => "\nPlease, confirm your email first\n\n",

    registerSuccess: () => "\nNew user has been added! Check your email to activate your account.\n\n",
    registerFailure: () => "\nThis username is already taken!\n\n",

    userRemoveSuccess: () => "\nUser were deleted!\n\n",
    userRemoveFailure: () => "\nWrong password\n\n",

    userIsGuest: () => "\nUser is guest\n\n",

    userPasswordChangeSuccess: () => "\nPassword were changed!\n\n",
    userPasswordChangeFailure: () => "\nWrong current password!\n\n",

    tokenAcknowledgeSuccess: () => "\nToken accepted. You've been logged in\n\n",
    tokenAcknowledgeFailure: () => "\nDeprecated / Invalid token\n\n",

    emailConfirmationSuccess: () => "\nEmail is successfully verified. You may now log in\n\n",
    emailConfirmationFailure: () => "\nEmail is not verified. Verification link is broken\n\n",

}