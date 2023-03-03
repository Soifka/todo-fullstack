import React from 'react';
import { Formik, Form, Field } from 'formik';
import { format } from 'date-fns';

const AddTaskForm = (props) => {
    const initialValues = {
        body: '',
        deadline: format(new Date(), "yyy-MM-dd")
    };

    const onSubmit = (values, actions) => {
        props.sendData(values);
    };

    return (
        <>
            <h2>Add new task</h2>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {
                    (props) => (
                        <Form>
                            <Field name="body" placeholder="I should do..." />
                            <Field name="deadline" type="date" />
                            <button type="submit">Add</button>
                        </Form>
                    )
                }
            </Formik>    
        </>
    );
}

export default AddTaskForm;
