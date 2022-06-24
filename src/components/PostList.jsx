import React from 'react';
import {PostItem} from "./PostItem";

export const PostList = ({posts, title, remove}) => {

    if (!posts.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Posts not found!
            </h1>
        )
    }

    return (
        <div>
            <h1 style={{textAlign: "center"}}>
                {title}
            </h1>
            {posts.map((post, index) =>
                <PostItem
                    number={index + 1}
                    key={post.id}
                    post={post}
                    remove={remove}
                />
            )}
        </div>
    );
};
