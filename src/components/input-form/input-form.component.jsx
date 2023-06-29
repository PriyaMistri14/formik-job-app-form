
import './input-form.styles.css'

import { Formik, Form, Field, ErrorMessage } from 'formik'

import * as Yup from "yup"

import React from 'react'
import { useFormikContext, useField } from 'formik'

const getCity = (state)=>{
    console.log("called with state", state);
    var cities = []
    switch(state){
        case "gujrat":
            cities = ['ahmedabad', 'surat', 
            "rajkot"]
            break


        case "punjab":
            cities = ["amritsar","abc"]
            break
        default:
            cities=[]        
    }

    return cities

}











const InputForm = () => {
    return (
        <div>
            <Formik initialValues={{
                fname: "abc",
                lname: "",
                surname: "",
                designation: "",
                email: "",
                phone: "",
                gender: "",
                state: "",
                cities: [],
                city:"",
                relationshipStatus:"",
                dob:"",
                zipcode:"",

                nameOfBoardUniversity:"",
                passingYear:"",
                percentage:"",

            }}

                // onSubmit={values => console.log(values)}
                onSubmit={(values) => alert(values.dob)
                }

                validationSchema={Yup.object().shape({
                    fname: Yup.string().required("this field is required!!")
                        .max(10, "Maximum characters allowed for this field is 10!!"),

                    lname: Yup.string().required("this field is required!!")
                        .max(10, "Maximum characters allowed for this field is 10!!"),

                    surname: Yup.string().required("this field is required!!")
                        .max(10, "Maximum characters allowed for this field is 10!!"),

                    designation: Yup.string().required("this field is required!!"),


                    email: Yup.string().email("Please enter a valid email address!!")
                        .required("this field is required!!"),


                    phone: Yup.number().required("this field is required!!")
                        .integer("phone no does not containes decimals!!")
                        .positive("phone no can not be negative!!")
                        .max(10000000000, "phone no should be of 10 digit!!")
                        .min(1000000000, "phone no should be of 10 digit!!"),

                    gender: Yup.string().required("this field is required!!!"),

                    state: Yup.string().required("this field is required!!!"),

                    city: Yup.string().required("this field is required!!!"),

                    relationshipStatus: Yup.string().required("this field is required!!!"),

                    dob: Yup.date().required("this field is required!!!")
                    .max('2005-01-01', "your age must be 18 or greater!!"),

                    zipcode:Yup.number().required("this field is required!!")
                    .integer("Please enter integer values!!")
                    .positive("zip code should be positive!!")
                    .min(100000,"zip code is of 6 digits!!")
                    .max(999999,"zip code is of 6 digits!!"),

                    nameOfBoardUniversity:Yup.string().required("this field is required!!"),


                    passingYear:Yup.number().required("this field is required!!")
                    .max(new Date().getFullYear(), "you can not pass in future!!!")

                    .test('passingYear', 'passing year is greater then dob!!', (value, ctx )=> {
                        const pYear = value                       
                        const dob= new Date(ctx.parent.dob).getFullYear()                     
                       
                        return pYear > dob 
                      }),

            

                    percentage:Yup.number().required("this field is required!!")
                    .min(0,"Minimum percentage is 0")
                    .max(100, "maximum percentage is 100")









                })

                }

            >
                { (props)=>{
                   const {values, setFieldValue} = props

               return( <Form ><br /><br />

                    First Name:   <Field type="text" name="fname" id="fname" /><br /><br />
                    <ErrorMessage name="fname" /><br /><br />

                    Last Name:   <Field type="text" name="lname" id="lname" /><br /><br />
                    <ErrorMessage name="lname" className='error'/><br /><br />

                    Surname:   <Field type="text" name="surname" id="surname" /><br /><br />
                    <ErrorMessage name="surname" /><br /><br />

                    Desination :   <Field type="text" name="designation" id="designation" /><br /><br />
                    <ErrorMessage name="designation" /><br /><br />

                    Email :   <Field type="text" name="email" id="email" /><br /><br />
                    <ErrorMessage name="email" /><br /><br />

                    Phone:   <Field type="text" name="phone" id="phone" /><br /><br />
                    <ErrorMessage name="phone" /><br /><br />

                    Gender : <Field type="radio" name="gender" value="male" /> Male
                    <Field type="radio" name="gender" value="female" />  Female
                    <Field type="radio" name="gender" value="other" /> Other
                    <br /><br />
                    <ErrorMessage name="gender" /><br /><br />

                    State : <Field as="select" name="state" onClick={(e)=>{
                        console.log("called");
                        const state = e.target.value
                        const cities = getCity(state)
                        console.log("state value", state, "city value", cities);
                        setFieldValue("cities", cities)

                    }}>
                        <option  selected hidden >Select State</option>
                        <option value="gujrat">Gujrat</option>
                        <option value="punjab">Punjab</option>
                    </Field><br /><br />
                    <ErrorMessage name="state" /><br /><br />



                    City : <Field as="select" name="city">
                        <option  selected hidden>Select city</option>
                        {
                            values.cities.length != 0 ? values.cities.map((city)=><option value={city}>{city}</option>) : null
                        }


                    </Field><br /><br />
                    <ErrorMessage name="city" /><br /><br />



                    Relationship Status : <Field as="select" name="relationshipStatus" id="relationshipStatus" >
                        <option selected hidden> Select Realtionship Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="wido">Wido</option>                        
                        
                        </Field><br /><br />
                    <ErrorMessage name="relationshipStatus" /><br /><br />


                    Date of Birth : <Field type="date" name="dob" /><br /><br />
                    <ErrorMessage  name="dob"/><br /><br />


                    Zip Code : <Field type="text" name="zipcode" id="zipcode" /><br /><br />
                    <ErrorMessage  name="zipcode"/><br /><br />



                    Name of board or university : <Field type="text" name="nameOfBoardUniversity"  id="nameOfBoardUniversity" /><br /><br />
                    <ErrorMessage  name="nameOfBoardUniversity"/><br /><br />


                    Passing Year : <Field type="text" name="passingYear" id="passingYear" /><br /><br />
                    <ErrorMessage name="passingYear" /><br /><br />


                    Percentage : <Field  type="text" name="percentage" id="percentage" /><br /><br />
                    <ErrorMessage name="percentage" /><br /><br />





                    <button type='submit'>Submit</button>

                </Form>)
                }}
            </Formik>

        </div>
    )
}

export default InputForm

