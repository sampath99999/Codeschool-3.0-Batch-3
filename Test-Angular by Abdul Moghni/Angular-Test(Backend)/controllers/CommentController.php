<?php

namespace App\controllers;
use App\Services\CommentService;

class CommentController
{
    public function create()
    {
        return CommentService::createComment();
    }
}