<?php

namespace App\controllers;

use App\services\AdminService;

class AdminControl
{
    public function adminData()
    {
        return AdminService::adminData();
    }
    public function getAllUsers()
    {
        return AdminService::getAllUsers();
    }
    public function deleteUser()
    {
        return AdminService::deleteUser();
    }
    public function deletePost()
    {
        return AdminService::deletePost();
    }
    public function deleteComment()
    {
        return AdminService::deleteComment();
    }
    public function countUserAndPosts()
    {
        return AdminService::countUserAndPosts();
    }
}
