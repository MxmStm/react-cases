import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import {postsApi} from "../api/posts-api";
import {Loader} from "../components/UI/Loader/Loader";

export const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [fetchPostById, isLoading, error] = useFetching(async () => {
        const response = await postsApi.getById(params.id)
        setPost(response.data)
    })
    const [fetchComments, isComLoading, comError] = useFetching(
        async () => {
            const response = await postsApi.getCommentsByPostId(params.id)
            setComments(response.data)
        })

    useEffect(() => {
        fetchPostById()
        fetchComments()
    }, [])

    return (
        <div>
            <h1>Page of post #{params.id} opened</h1>
            {isLoading
                ? <Loader/>
                : <div>{post.id}. {post.title}</div>
            }
            <h2 style={{marginTop: 20}}>
                Comments
            </h2>
            {isComLoading
                ? <Loader/>
                : <div>
                    {comments.map(comm =>
                        <div key={comm.id} style={{marginTop: 10}}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};
