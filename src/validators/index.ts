export const loginValidator = {
    email: 'email|required',
    password: "string|min:5|required"
}

export const RegisterValidator = {
    firstName: 'string|required',
    lastName: 'string|required',
    email: 'email|required',
    password: "string|min:5|required"
}


export const NewCompanyValidator = {
    name: 'string|required',
    numberOfUsers: "integer|required",
    numberOfProducts: "integer|required",
    Percentage: "integer|required",
}