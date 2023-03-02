import React from 'react';
import { Formik, Form, Field } from 'formik';
import { loginUser } from '../../api/index';

const SignIn = (props) => {

    const initialValues = {
        email: '',
        password: ''
    };

    const onSubmit = (values, actions) => {
        props.sendData({callback: loginUser, values});
        //console.log(values)
    }; 

    return (
        <>
            <h2>SignIn</h2>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {
                    (props) => (
                        <Form>
                            <Field name="email" placeholder="Type your email" />
                            <Field name="password" placeholder="Type your password" />
                            <button type="submit">Submit</button>
                        </Form>
                    )
                }
            </Formik>
        </>
    );
}

export default SignIn;
