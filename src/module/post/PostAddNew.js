import { Button } from '../../components/button';
import { Radio } from '../../components/checkbox';
import { Dropdown } from '../../components/dropdown';
import { Field } from '../../components/field';
import { Input } from '../../components/input';
import { Label } from '../../components/Label';
import { postStatus } from '../../utils/constants';
import { ImageUpload } from '../../components/image';
import useFirebaseImage from '../../hooks/useFirebaseImage';
import Toggle from '../../components/toggle/Toggle';
import { db } from '../../firebase/firebase-config';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import slugify from 'slugify';
import { collection, query, getDocs, where } from 'firebase/firestore';

const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
    const { control, watch, setValue, handleSubmit, getValues } = useForm({
        mode: 'onChange',
        defaultValues: {
            title: '',
            slug: '',
            status: 2,
            category: '',
        },
    });

    const watchStatus = watch('status');
    const watchHot = watch('hot');
    console.log(watchHot);

    const addPostHandler = (values) => {
        const cloneValues = { ...values };
        cloneValues.slug = slugify(values.slug) || slugify(values.title);
        cloneValues.status = Number(values.status);
    };

    const { handleSelectImage, handleDeleteImage, progress, imageUrl } = useFirebaseImage(setValue, getValues);

    useEffect(() => {
        async function getData() {
            const colRef = collection(db, 'categories');
            const q = await query(colRef, where('status', '==', 1));
            const querySnapshot = await getDocs(q);
            let result = [];
            querySnapshot.forEach((doc) => {
                result.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
        }
        getData();
    }, []);

    return (
        <PostAddNewStyles>
            <h1 className="dashboard-heading">Add new post</h1>
            <form onSubmit={handleSubmit(addPostHandler)}>
                <div className="grid grid-cols-2 gap-x-10 mb-10">
                    <Field>
                        <Label>Title</Label>
                        <Input control={control} placeholder="Enter your title" name="title"></Input>
                    </Field>
                    <Field>
                        <Label>Slug</Label>
                        <Input control={control} placeholder="Enter your slug" name="slug"></Input>
                    </Field>
                </div>
                <div className="grid grid-cols-2 gap-x-10 mb-10">
                    <Field>
                        <Label>IMAGE</Label>
                        <ImageUpload
                            onChange={handleSelectImage}
                            progress={progress}
                            image={progress === 100 ? imageUrl : false}
                            handleDeleteImage={handleDeleteImage}
                        ></ImageUpload>
                    </Field>

                    <Field>
                        <Label>Author</Label>
                        <Input control={control} placeholder="Find the author"></Input>
                    </Field>
                </div>
                <div className="grid grid-cols-2 gap-x-10 mb-10">
                    <Field>
                        <Label>Category</Label>
                        <Dropdown>
                            <Dropdown.Option>Knowledge</Dropdown.Option>
                            <Dropdown.Option>Blockchain</Dropdown.Option>
                            <Dropdown.Option>Setup</Dropdown.Option>
                            <Dropdown.Option>Nature</Dropdown.Option>
                            <Dropdown.Option>Developer</Dropdown.Option>
                        </Dropdown>
                    </Field>
                    <Field></Field>
                </div>
                <div className="grid grid-cols-2 gap-x-10 mb-10">
                    <Field>
                        <Label>Fuature post</Label>
                        <Toggle
                            on={watchHot === true}
                            onClick={() => {
                                setValue('hot', !watchHot);
                            }}
                        ></Toggle>
                    </Field>
                    <Field>
                        <Label>Status</Label>
                        <div className="flex items-center gap-x-5">
                            <Radio
                                name="status"
                                control={control}
                                checked={+watchStatus === postStatus.APPROVED}
                                onClick={() => setValue('status', 'approved')}
                                value={postStatus.APPROVED}
                            >
                                Approved
                            </Radio>
                            <Radio
                                name="status"
                                control={control}
                                checked={+watchStatus === postStatus.PENDING}
                                onClick={() => setValue('status', 'pending')}
                                value={postStatus.PENDING}
                            >
                                Pending
                            </Radio>
                            <Radio
                                name="status"
                                control={control}
                                checked={+watchStatus === postStatus.REJECTED}
                                onClick={() => setValue('status', 'reject')}
                                value={postStatus.REJECTED}
                            >
                                Reject
                            </Radio>
                        </div>
                    </Field>
                </div>
                <Button type="submit" className="mx-auto">
                    Add new post
                </Button>
            </form>
        </PostAddNewStyles>
    );
};

export default PostAddNew;
