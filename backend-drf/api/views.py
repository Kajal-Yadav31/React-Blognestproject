from django.shortcuts import render
from django.db.models import Sum
# Restframework
from rest_framework import status
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.models import Count


# Custom Imports
from .serializers import *
from .models import *



######################## Post APIs ########################
        

class CategoryListAPIView(generics.ListAPIView):
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Category.objects.all()


class PostCategoryListAPIView(generics.ListAPIView):
    serializer_class =  PostSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        category_slug = self.kwargs['category_slug'] 
        category = Category.objects.get(slug=category_slug)
        return Post.objects.filter(category=category, status="Active")


class PostListAPIView(generics.ListAPIView):
    serializer_class =  PostSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Post.objects.all()


class PostDetailAPIView(generics.RetrieveAPIView):
    serializer_class =  PostSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        slug = self.kwargs['slug']
        post = Post.objects.get(slug=slug, status="Active")
        post.view += 1
        post.save()
        return post


class PublicProfileAPIView(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = PublicProfileSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return Profile.objects.select_related('user').prefetch_related('user__post_set')


class PostDelete(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'


class LikePostAPIView(APIView):
    permission_classes = [IsAuthenticated] 
    
    def post(self, request):
        user = request.user
        post_id = request.data['post_id']
        post = Post.objects.get(id=post_id)


        # Check if post has already been liked by this user
        if user in post.likes.all():
            # If liked, unlike post
            post.likes.remove(user)
            return Response({"message": "Post Disliked"}, status=status.HTTP_200_OK)
        else:
            # If post hasn't been liked, like the post by adding user to set of poeple who have liked the post
            post.likes.add(user)
            
            return Response({"message": "Post Liked"}, status=status.HTTP_201_CREATED)
        

class PostCommentAPIView(APIView):
    def post(self, request):
        # Get data from request.data (frontend)
        post_id = request.data['post_id']
        name = request.data['name']
        email = request.data['email']
        comment = request.data['comment']

        post = Post.objects.get(id=post_id)

        # Create Comment
        Comment.objects.create(
            post=post,
            name=name,
            email=email,
            comment=comment,
        )

        # Return response back to the frontend
        return Response({"message": "Commented Sent"}, status=status.HTTP_201_CREATED)
 

class BookmarkPostAPIView(APIView):
    permission_classes = [IsAuthenticated] 
    
    def post(self, request):
        user = request.user
        post_id = request.data['post_id']
        post = Post.objects.get(id=post_id)

        bookmark = Bookmark.objects.filter(post=post, user=user).first()
        if bookmark:
            # Remove post from bookmark
            bookmark.delete()
            return Response({"message": "Post Un-Bookmarked"}, status=status.HTTP_200_OK)
        else:
            Bookmark.objects.create(
                user=user,
                post=post
            )

            return Response({"message": "Post Bookmarked"}, status=status.HTTP_201_CREATED)

    

######################## Author Dashboard APIs ########################
class DashboardStats(generics.ListAPIView):
    serializer_class = AuthorStats
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = User.objects.get(id=user_id)

        views = Post.objects.filter(user=user).aggregate(view=Sum("view"))['view']
        posts = Post.objects.filter(user=user).count()
        likes = Post.objects.filter(user=user).annotate(likes_count=Count('likes')).aggregate(total_likes=Sum('likes_count'))['total_likes'] or 0
        bookmarks = Bookmark.objects.filter(user=user).count()

        return [{
            "views": views,
            "posts": posts,
            "likes": likes,
            "bookmarks": bookmarks,
        }]
    
    def list(self, request, *args, **kwargs):
        querset = self.get_queryset()
        serializer = self.get_serializer(querset, many=True)
        return Response(serializer.data)


class DashboardPostLists(generics.ListAPIView):
    serializer_class =  PostSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        user = User.objects.get(id=user_id)

        return Post.objects.filter(user=user).order_by("-id")


class DashboardCommentLists(generics.ListAPIView):
    serializer_class =  CommentSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user_id = self.request.query_params.get("user_id")
        return Comment.objects.filter(post__user__id=user_id).order_by('-id')



class DashboardBookmarkLists(generics.ListAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Bookmark.objects.filter(user=self.request.user)


class DashboardPostCommentAPIView(APIView):
    
    def post(self, request):
        comment_id = request.data['comment_id']
        reply = request.data['reply']

        print("comment_id =======", comment_id)
        print("reply ===========", reply)

        comment = Comment.objects.get(id=comment_id)
        comment.reply = reply
        comment.save()

        return Response({"message": "Comment Response Sent"}, status=status.HTTP_201_CREATED)
    

class DashboardPostCreateAPIView(generics.CreateAPIView):
    serializer_class =  PostSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        print(request.data)
        user_id = request.data.get('user_id')
        title = request.data.get('title')
        image = request.data.get('image')
        description = request.data.get('description')
        tags = request.data.get('tags')
        category_id = request.data.get('category')
        post_status = request.data.get('post_status')

        print(user_id)
        print(title)
        print(image)
        print(description)
        print(tags)
        print(category_id)
        print(post_status)

        user = User.objects.get(id=user_id)
        category = Category.objects.get(id=category_id)

        post = Post.objects.create(
            user=user,
            title=title,
            image=image,
            description=description,
            tags=tags,
            category=category,
            status=post_status
        )

        return Response({"message": "Post Created Successfully"}, status=status.HTTP_201_CREATED)


class DashboardPostEditAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class =  PostSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        user_id = self.kwargs['user_id']
        post_id = self.kwargs['post_id']
        user = User.objects.get(id=user_id)
        return Post.objects.get(user=user, id=post_id)

    def update(self, request, *args, **kwargs):
        post_instance = self.get_object()

        title = request.data.get('title')
        image = request.data.get('image')
        description = request.data.get('description')
        tags = request.data.get('tags')
        category_id = request.data.get('category')
        post_status = request.data.get('post_status')

        print(title)
        print(image)
        print(description)
        print(tags)
        print(category_id)
        print(post_status)

        category = Category.objects.get(id=category_id)

        post_instance.title = title
        if image != "undefined":
            post_instance.image = image
        post_instance.description = description
        post_instance.tags = tags
        post_instance.category = category
        post_instance.status = post_status
        post_instance.save()

        return Response({"message": "Post Updated Successfully"}, status=status.HTTP_200_OK)
    

