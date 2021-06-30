import { ErrorMessage, Form, Formik } from "formik"
import { observer } from "mobx-react-lite";
import React from "react"
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../../app/layout/MyTextInput"
import { useStore } from "../../app/stores/store";
import * as Yup from 'yup';

export default observer(function RegisterForm(){
    const {userStore}=useStore();
  return (
     <div style={{marginTop: 70}}>
         <Formik initialValues={{email: '', password:'', displayName: '', username:'', error: null}} onSubmit={(values, {setErrors})=>userStore.register(values).catch(error=>setErrors({error:'Invalid email or password'}))}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}
         >
        {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
            <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                <Header as='h2' content='Sign up to Reactivities' color='teal' textAlign='center'/>
                <MyTextInput name='email' placeholder='Email'/>
                <MyTextInput name='password' placeholder='Password' type='password'/>
                <MyTextInput name='username' placeholder='Username' type='password'/>
                <MyTextInput name='displayName' placeholder='Display Name' type='password'/>
                <ErrorMessage name='error' render={()=><Label style={{marginBottom: 15}} basic color='red' content={errors.error}/>}/>
                <Button positive content='Register' type='submit' fluid loading={isSubmitting} disabled={!isValid || !dirty || isSubmitting}/>
            </Form>
        )}
    </Formik>
     </div> 
    
  )
});
