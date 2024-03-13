<?php

namespace App\Controllers;

use App\Services\PostService;

class PostController
{
    public function createPost()
    {
        return PostService::createPost();
    }
    public function allPost()
    {
        return PostService::allPost();
    }
    public function viewPost()
    {
        return PostService::viewPost();
    }
    public function postLikes()
    {
        return PostService::postLikes();
    }
    public function likeCount()
    {
        return PostService::likeCount();
    }
    public function unLikeCount()
    {
        return PostService::unLikeCount();
    }
    public function likes()
    {
        return PostService::likes();
    }

    public function createComments()
    {
        return PostService::createComments();
    }
    public function allComments()
    {
        return PostService::allComments();
    }
    public function postComments()
    {
        return PostService::postComments();
    }
}
