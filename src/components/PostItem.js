import React from 'react';
import {MyButton} from "./UI/button/MyButton";

export const PostItem = ({post, number, remove}) => {

    const deletePost = () => {
        const postId = post.id
        remove(postId)
    }

    return (
        <div className={'post'}>
            <div className={'post__content'}>
                <strong>{number}. {post.title}</strong>
                <div>
                    {post.body}
                </div>
            </div>
            <div className={"post__btn"}>
                <MyButton onClick={deletePost}>Delete</MyButton>
            </div>
        </div>
    );
};
