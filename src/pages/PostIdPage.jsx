import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import {postsApi} from "../api/posts-api";
import {Loader} from "../components/UI/Loader/Loader";

export const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [fetchPostById, isLoading, error] = useFetching(async () => {
        const response = await postsApi.getById(params.id)
        setPost(response.data)
    })

    useEffect(() => {
        fetchPostById()
    }, [])

    return (
        <div>
            <h1>Page of post #{params.id} opened</h1>
            {isLoading
                ? <Loader/>
                : <div>{post.id}. {post.title}</div>
            }
        </div>
    );
};
