import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { Button } from '../components/button';
import { Field } from '../components/field';
import { Input } from '../components/input';
import { Label } from '../components/Label';
import { useAuth } from '../contexts/auth-context';
import AuthenticationPage from './AuthenticationPage';
import { auth } from '../firebase/firebase-config';
import InputPasswordToggle from '../components/input/inputPasswordToggle';

const schema = yup.object({
    email: yup.string().email('please enter valid email address').required('please enter your email'),
    password: yup
        .string()
        .min(5, 'your password must be at least 8 characters or greater')
        .required('please enter your password'),
});

const SignInPage = () => {
    const { userInfo } = useAuth();

    const navigate = useNavigate();

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        document.title = 'login page';
        if (userInfo?.email) {
            navigate('/');
        }
    }, [userInfo]);

    useEffect(() => {
        const arrErrors = Object.values(errors);
        if (arrErrors.length > 0) {
            toast.error(arrErrors[0]?.message, {
                pauseOnHover: false,
                delay: 0,
            });
        }
    }, [errors]);

    const handleSignIn = async (values) => {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        navigate('/');
    };

    return (
        <AuthenticationPage>
            <form className="form" onSubmit={handleSubmit(handleSignIn)} autoComplete="off">
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
                    Ban co the dky tai khoan? <NavLink to={'/sign-up'}>resgister a account</NavLink>
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

export default SignInPage;
