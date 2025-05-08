import * as Yup from "yup"

const authSchema = Yup.object().shape({
    email:Yup.string()
    .required("Email is required")
    .email("Invalid emailId"),

    password:Yup.string()
        .required("Password is required")
        .min(6,"Password must be atleast 6 character long")
    
})

export  default authSchema;