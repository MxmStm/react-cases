import React from 'react';
import {MyButton} from "./UI/button/MyButton";
import {useNavigate} from 'react-router-dom'

export const PostItem = ({post, remove}) => {
    const router = useNavigate()

    return (
        <div className={'post'}>
            <div className={'post__content'}>
                <strong>{post.id}. {post.title}</strong>
                <div>
                    {post.body}
                </div>
            </div>
            <div className={"post__btn"}>
                <MyButton onClick={() => router(`${post.id}`)}>
                    Open
                </MyButton>
                <MyButton onClick={() => remove(post.id)}>
                    Delete
                </MyButton>
            </div>
        </div>
    );
};
