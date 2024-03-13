<?php

//require("./connection.php");
namespace App\services;


class PostService
{


    public static function createPost()
    {
        SELF::cretePostValidation();
        if (!empty($_FILES)) {

            // Define allowed file extensions
            $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

            // Extract information
            $image = $_FILES['file']['name'];
            $postTitle = $_POST['postTitle'];
            $postCaption = $_POST['postCaption'];
             $UserId = Auth->user()['id'];

            // Generate a unique filename to prevent conflicts
            $fileName = uniqid('', true) . '.' . pathinfo($image, PATHINFO_EXTENSION);

            // Define a secure path using relative path and configuration
            $uploadDir = '../blogpost/src/assets/images/';
            $filePath = $uploadDir . $fileName;

            // Check if uploaded file has a valid extension
            $ext = strtolower(pathinfo($image, PATHINFO_EXTENSION));
            $ext;
            if (!in_array($ext, $allowedExtensions)) {

                response(['status' => "false", "ext" => $ext, "message" => 'Invalid file type. Only ' . implode(', ', $allowedExtensions) . ' allowed.']);
            }

            if (move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
                $sql = "INSERT INTO post (userid, title, postcontent, blogimage) VALUES (:UserId, :title, :postcontent, :image)";
                $result = DB->insert($sql, ['UserId' => $UserId, 'title' => $postTitle, 'postcontent' => $postCaption, 'image' => $fileName]);
                if ($result) {
//                    $UserID = Auth->user()['id'];
//                    $likeStatus = 'false';
//                    $PostID = $result;
//
//                    $query = "INSERT INTO Likes(likestatus,PostID,UserID) VALUES (:likestatus,:PostID,:UserId)";
//
//                    $likes = DB->insert($query, ["likestatus" => $likeStatus, "PostID" => $PostID, "UserId" => $UserID]);
//                    response(["status" => "true", "message" => "Success", "data" => ["likes" => $likes, "post" => $result]], 200);
                    response(["status" => "true", "message" => $result]);
                } else {
                    // Log or handle database errors
                    response(['status' => "false", "message" => 'Database error occurred.']);
                }
            } else {
                response(['status' => "false", "message" => 'File upload failed.']);
            }
        } else {
            response(["status" => "false", "message" => 'No file uploaded.']);
        }
    }


    public
    static function allPost()
    {
        $query = "SELECT DISTINCT p.postid, p.Title, p.postContent,TO_CHAR(p.postcreated_at, 'DD-MM-YYYY HH:MM:SS') AS postcreated_at,p.userid, p.blogImage, u.username FROM post p JOIN users u ON p.userid = u.id where p.is_post_deleted=false order by  postid DESC  ";
        $post = DB->getAllPost($query);
        response(["status" => "true", "message" => "Success", "data" => ["post" => $post]], 200);
    }
    public
    static function viewPost()
    {
        $postId=$_POST['postId'];
        $query = "SELECT  p.postid, p.Title, p.postContent,TO_CHAR(p.postcreated_at, 'DD-MM-YYYY HH:MM:SS') AS postcreated_at,p.userid, p.blogImage, u.username FROM post p JOIN users u ON p.userid = u.id where p.postid=:postId ";
        $post = DB->first($query,["postId"=>$postId]);
        response(["status" => "true", "message" => "Success", "data" => ["viewPost" => $post]], 200);
    }
    public
    static function postLikes()
    {


        $UserID = Auth->user()["id"];
        $query = "SELECT * from likes where userid=$UserID   ";
        $likes = DB->getAllPost($query);

        response(["status" => "true", "message" => "Success", "data" => ["likes" => $likes]], 200);
    }

    public
    static function likeCount()
    {
        $postId = $_POST['postId'];
        $UserID = Auth->user()['id'];

        $query = "SELECT * from likes  where userid=:userId  AND postid=:postId ";
        $likes = DB->first($query, ["userId" => $UserID, "postId" => $postId]);
        if (!$likes) {
            $likeStatus = 'true';
            $UserId = Auth->user()['id'];
            $postId = $_POST['postId'];

            $query = "INSERT INTO likes(likestatus,postid,userid) values(:likestatus,:postid,:userid) ";

            $user = DB->insert($query, ["likestatus" => $likeStatus, "postid" => $postId, "userid" => $UserId]);
            return response(["status" => "true", "message" => "inserted", "data" => ["like" => $user, "likes" => $likes]], 200);


        } else {

            $likeStatus = 'true';
//        $LikeID=$_POST['likeid'];
            $UserId = Auth->user()['id'];

            $postId = $_POST['postId'];

//            $query="INSERT INTO likes(postid,userid) values(:postid,:userid) ";
            $query = "UPDATE Likes SET likestatus = :likeStatus WHERE userid = :userId AND postid=:postId";
            $likes = DB->update($query, ["likeStatus" => $likeStatus, "userId" => $UserId, "postId" => $postId]);

//            $likes = DB->insert($query, ["postid"=>$postId,"userid"=>$UserId]);
            return response(["status" => "true", "message" => "updated", "data" => ["likes" => $likes]], 200);


        }


    }

    public
    static function unLikeCount()
    {
        $UserID = Auth->user()["id"];
        $likeStatus = 'false';
        $LikeID = $_POST['likeId'];

        $query = "UPDATE Likes SET likestatus = :likeStatus WHERE likeid = :likeid";

        $likes = DB->update($query, ["likeStatus" => $likeStatus, "likeid" => $LikeID]);

        return response(["status" => "true", "message" => "liked", "data" => ["likes" => $likes]], 200);
    }

    public static function deletePost()
    {
        $postID = $_POST['postId'];
//        $postMedia = $_POST['postMedia'];
        $UserID = Auth->user()["id"];

        $query = "INSERT INTO post(PostID) VALUES (:PostID)";
        $user = DB->delete($query, ["PostID" => $postID]);
        response(["message" => "Post deleted successfully", "user_id" => Auth->user()["id"]], 201);
    }


    public static function likes()
    {
        $postId = $_POST['postId'];


        $query = "Select count(postid) as likecount from likes where postid=:postId AND likestatus='true'";

        $likes = DB->first($query, ["postId" => $postId]);
        return response(["status" => "true", "message" => "Success", "data" => ["allLikes" => $likes]], 200);
    }

    public static function createComments()
    {

        $postId = $_POST['postId'];
        $userId = Auth->user()['id'];
        $comment = $_POST['comment'];
//        if($comment=''){
//            return response(["status" => "true", "message" => "Comment created", "data" => ["comment" => $user]], 200);
//
//        }
        $query = "INSERT INTO comments(comment,postid,userid) values(:comment,:postid,:userid) ";

        $user = DB->insert($query, ["comment" => $comment, "postid" => $postId, "userid" => $userId]);
        return response(["status" => "true", "message" => "Comment created", "data" => ["comment" => $user]], 200);

    }

    public static function allComments()
    {
        $query = "SELECT c.comment,u.username,c.postid,TO_CHAR(commentdate, 'DD-MM-YYYY HH:MM:SS') AS commentdate,c.commentid from comments c join users u on c.userid=u.id where c.is_comment_deleted=false ";
        $likes = DB->getAllPost($query);

        response(["status" => "true", "message" => "Success", "data" => ["comments" => $likes]], 200);
    }
    public static function postComments()
    {
        $query = "SELECT c.comment,u.username,c.postid,TO_CHAR(c.commentdate, 'DD-MM-YYYY HH:MM:SS') AS commentdate,c.commentid from comments c join users u on c.userid=u.id where c.postid=:postId AND c.is_comment_deleted=false ";
        $likes = DB->getAll($query,["postId"=>$_POST['postId']]);

        response(["status" => "true", "message" => "Success", "data" => ["postComments" => $likes]], 200);
    }

//    public static function userPosts()
//    {
//        $query = "SELECT c.comment,u.username,c.postid,c.commentdate from comments c join users u on c.userid=u.id  ";
//        $likes = DB->getAllPost($query);
//
//        response(["status" => "true", "message" => "Success", "data" => ["comments" => $likes]], 200);
//    }


    public static function cretePostValidation()
    {
        $image = $_FILES['file']['name'];
        $postTitle = $_POST['postTitle'];
        $postCaption = $_POST['postCaption'];
        if(empty($image) && empty($postTitle) && empty($postCaption)){
            response(["status"=>"All","message" => "All fields are required"], 400);

        }

        if( empty($postTitle)){
            response(["status"=>"title","message" => "Title is required"], 400);

        }
        if(  empty($postCaption)){
            response(["status"=>"caption", "message" => "Captions is required"], 400);

        }

    }
}