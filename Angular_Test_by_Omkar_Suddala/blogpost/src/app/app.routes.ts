import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersListComponent } from './admin/users-list/users-list.component';
import { PostListComponent } from './admin/post-list/post-list.component';
import { ViewPostComponent } from './admin/view-post/view-post.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { AllPostsComponent } from './posts/all-posts/all-posts.component';
import { PostsComponent } from './posts/posts.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full'
    }
    ,
    {
        path: "signUp",
        component: SignUpComponent,
    },
    {
        path: "profile",
        component: ProfileComponent,
    },
    {
        path: "signIn",
        component: SignInComponent,
    },

    {
        path: "posts",
        component: PostsComponent,
        children:
            [{
                path: "",
                component: AllPostsComponent
            },

            {
                path: 'createPost',
                component: CreatePostComponent
            },

            {
                path: "viewPost/:postId",
                component: ViewPostComponent
            },


            ]
    },
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'usersList',
                component: UsersListComponent
            },
            {
                path: 'postList',
                component: PostListComponent
            },
            {
                path: "viewPost/:postId",
                component: ViewPostComponent
            },

        ]
    },
    {
        path: "**",
        component: PageNotFoundComponent
    }
];
