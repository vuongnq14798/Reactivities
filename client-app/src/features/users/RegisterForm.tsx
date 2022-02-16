import { ErrorMessage, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Form, Header } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';
import ValidationError from "../errors/ValidationError";

export default observer(function RegisterForm() {
    const { userStore } = useStore();

    return (
        <Formik
            initialValues={{ displayName: '', username: '', email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.register(values).catch(e => setErrors({ error: e }))}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required()

            })}
        >
            {({handleSubmit, isSubmitting, isValid, dirty, errors}) => (
                <Form className="ui form error" autoComplete="off" onSubmit={handleSubmit}>
                    <Header as='h2' content="Sign up to Reactivities" color="teal" textAlign="center" />
                    <MyTextInput name="displayName" placeholder="Display Name" />
                    <MyTextInput name="username" placeholder="Username" />
                    <MyTextInput name="email" placeholder="Email" />
                    <MyTextInput name="password" placeholder="Password" type="password"/>
                    <ErrorMessage name="error" render={() => <ValidationError errors={errors.error}/>}/>
                    <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive fluid content="Register" type="submit"/>
                </Form>
            )}
        </Formik>
    );
})