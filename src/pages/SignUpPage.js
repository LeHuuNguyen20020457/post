import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { Field } from '../components/field';
import { Input } from '../components/input';
import { Label } from '../components/Label';
import { Button } from '../components/button';
import { auth, db } from '../firebase/firebase-config';
import { addDoc, collection } from 'firebase/firestore';
import AuthenticationPage from './AuthenticationPage';
import InputPasswordToggle from '../components/input/inputPasswordToggle';

const schema = yup.object({
    fullname: yup.string().required('please enter your fullname'),
    email: yup.string().email('please enter valid email address').required('please enter your email'),
    password: yup
        .string()
        .min(5, 'your password must be at least 8 characters or greater')
        .required('please enter your password'),
});

const SignUpPage = () => {
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleSignUp = async (values) => {
        console.log(values);
        const user = await createUserWithEmailAndPassword(auth, values.email, values.password);
        await updateProfile(auth.currentUser, {
            displayName: values.fullname,
        });
        const colRef = collection(db, 'users');

        await addDoc(colRef, {
            fullname: values.fullname,
            email: values.email,
            password: values.password,
        });

        toast.success('registered successfully');
        navigate('/');
    };

    useEffect(() => {
        document.title = 'SignUp Page';
    }, []);

    useEffect(() => {
        const arrErrors = Object.values(errors);
        if (arrErrors.length > 0) {
            toast.error(arrErrors[0]?.message, {
                pauseOnHover: false,
                delay: 0,
            });
        }
    }, [errors]);

    return (
        <AuthenticationPage>
            <form className="form" onSubmit={handleSubmit(handleSignUp)} autoComplete="off">
                <Field>
                    <Label htmlFor="fullname" className="label">
                        Fullname
                    </Label>
                    <Input
                        type="text"
                        placeholder="Enter your fullname"
                        name="fullname"
                        control={control}
                        autoComplete="off"
                    ></Input>
                </Field>
                <Field>
                    <Label htmlFor="email" className="label">
                        email address
                    </Label>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        autoComplete="off"
                        control={control}
                    ></Input>
                </Field>
                <Field>
                    <Label htmlFor="password" className="label">
                        password
                    </Label>
                    <InputPasswordToggle control={control}></InputPasswordToggle>
                </Field>
                <div className="have-account">
                    You already have an account? <NavLink to={'/sign-in'}>login</NavLink>
                </div>
                <Button
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    style={{
                        width: '100%',
                        maxWitdth: 350,
                        margin: '0 auto',
                    }}
                >
                    Sing Up
                </Button>
            </form>
        </AuthenticationPage>
    );
};

export default SignUpPage;
