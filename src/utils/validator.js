import Joi from "joi";
let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const username = Joi.string().max(100).min(3).required().messages({
    'string.base': 'Username must be a string.',
    'string.empty': 'Username cannot be empty.',
    'string.min': 'Username must be at least 3 characters long.',
    'string.max': 'Username must be no longer than 100 characters.',
    'any.required': 'Username is required.'
})
const email = Joi.string().email().pattern(emailRegex).required().messages({
    'string.base': 'Email must be a string.',
    'string.empty': 'Email cannot be empty.',
    'string.email': 'Please enter a valid email address.',
    'string.pattern.base': 'Email does not match the required pattern.',
    'any.required': 'Email is required.'
});

const password = Joi.string().min(3).max(50).required().messages({
    'string.base': 'Password must be a string.',
    'string.empty': 'Password cannot be empty.',
    'string.min': 'Password must be at least 3 characters long.',
    'string.max': 'Password must be no longer than 50 characters.',
    'any.required': 'Password is required.'

})

const orderId = Joi.number().required().messages({
    'number.base': 'Id must be a string.',
    'number.empty': 'Id cannot be empty.',
    'any.required': 'Id is required.',
})

export const userValidator = Joi.object({username, email, password});
export const userLoginValidator = Joi.object({email, password});
export const orderIdValidator = Joi.object({orderId});