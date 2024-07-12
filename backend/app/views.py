from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework import mixins, filters, serializers
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings
from app.serializers import (
    UserSerializer,
    UserCreateSerializer,
    UserLoginSerializer,
    UserPasswordChangeSerializer,
    PasswordResetSerializer,
    PostSerializer,
    CommentSerializer,
    FollowerSerializer,
    SubCommentSerializer,
    TokenVerifySerializer,
)
from django.core.exceptions import ValidationError
from drf_spectacular.utils import extend_schema
from app.models import User, Follower, Post, Comment
from app.serializers import UserSerializer
from app.tasks import send_activation_email, send_reset_password_email

User = get_user_model()


class UserViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    GenericViewSet,
):
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.action == "login":
            return UserLoginSerializer
        elif self.action == "change_password":
            return UserPasswordChangeSerializer
        elif self.action in ["register", "create"]:
            return UserCreateSerializer
        elif self.action in ["reset_password"]:
            return PasswordResetSerializer
        elif self.action == "check_token":
            return TokenVerifySerializer
        return UserSerializer

    def get_queryset(self):
        return User.objects.filter(pk=self.request.user.pk)

    @action(methods=["post"], detail=False, permission_classes=(AllowAny,))
    def login(self, request):
        """Login user and return user data and token"""
        serializer = self.get_serializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=["post"], detail=False, permission_classes=(AllowAny,))
    def register(self, request):
        """Register user and return user data and token"""
        serializer = self.get_serializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        if (not user.is_google_user or not user.is_linkedin_user or not user.is_facebook_user):
            send_activation_email(user.id)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        # return self.create(request)

    @action(methods=["post"], detail=False, permission_classes=(IsAuthenticated,))
    def change_password(self, request):
        """Change user password"""
        serializer = self.get_serializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(
        methods=["get", "put", "patch"],
        detail=False,
        permission_classes=(IsAuthenticated,),
    )
    def me(self, request):
        """Get & Update user data"""
        if request.method in ["PUT", "PATCH"]:
            return self.update(
                request, pk=request.user.pk, partial=request.method == "PATCH"
            )
        return self.retrieve(request, pk=request.user.pk)
        # return Response(status=status.HTTP_204_NO_CONTENT)

    def get_object(self):
        """Return user object"""
        return self.request.user

    @action(["post"], detail=False)
    def reset_password(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.get_user()
        if user and not settings.TEST_MODE:
            send_reset_password_email(user.pk)
            # send_reset_password_email(user.pk)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(["post"], detail=False, url_path="check-token", url_name="check-token", permission_classes=(AllowAny,))
    @extend_schema(description="Check the validity of the provided token.")
    def check_token(self, request, *args, **kwargs):
        """
        This method checks the validity of the provided token.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)


class PostViewset(ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    pagination_class = None
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = [
        "id",
    ]
    search_fields = filterset_fields

    def list(self, request, *args, **kwargs):
        category = request.query_params.get(
            "category", None
        )  # Get category from query param
        queryset = self.get_queryset()  # Use your existing queryset logic

        if category:
            queryset = queryset.filter(category=category)  # Filter by category slug

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    # def get_queryset(self):
    #    return Post.objects.filter(user=self.request.user)

    # def get_serializer_class(self):
    #    return PostSerializer


class CommentViewset(ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer
    pagination_class = None
    queryset = Comment.objects.all()
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = [
        "id",
    ]
    search_fields = filterset_fields

    def list(self, request, *args, **kwargs):
        post = request.query_params.get("post", None)  # Get category from query param
        queryset = self.get_queryset()  # Use your existing queryset logic

        if post:
            queryset = queryset.filter(post=post)  # Filter by category slug

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    # def get_queryset(self):
    #    return Comment.objects.filter(user=self.request.user)

    # def get_serializer_class(self):
    #    return CommentSerializer


class SubCommentViewset(ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = SubCommentSerializer
    pagination_class = None
    queryset = Comment.objects.all()
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = [
        "id",
    ]
    search_fields = filterset_fields

    def list(self, request, *args, **kwargs):
        post = request.query_params.get("post", None)  # Get category from query param
        queryset = self.get_queryset()  # Use your existing queryset logic

        if post:
            queryset = queryset.filter(post=post)  # Filter by category slug

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class FollowerViewset(ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = FollowerSerializer
    pagination_class = None
    queryset = Follower.objects.all()
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = [
        "id",
    ]
    search_fields = filterset_fields

    def get_queryset(self):
        user = self.request.user
        return user.followers.all()


class FollowingViewset(ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = FollowerSerializer

    def perform_create(self, serializer):
        # Override the default create method to handle follow logic
        following_id = self.request.data.get("user")
        following = User.objects.get(pk=following_id)
        # import pdb; pdb.set_trace()

        # Check if the user is already following
        if following.followings.filter(user=self.request.user.pk).exists():
            raise serializers.ValidationError("You are already following this user")

        following = serializer.save(user=following)
        following.followers.add(self.request.user)

    def destroy(self, request, pk=None, *args, **kwargs):
        # Handle unfollow logic
        try:
            follower = Follower.objects.get(pk=pk, user=request.user)
            follower.delete()
            return Response({"message": "Unfollowed successfully"}, status=200)
        except Follower.DoesNotExist:
            return Response({"error": "Follower object not found"}, status=404)

    def get_queryset(self):
        user = self.request.user
        return user.user_followed


class PostLikeSaveViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        post = self.get_object()
        action = self.request.data.get("action")

        if action == "like":
            like = self.request.data.get("like", True)
            if like:
                post.like_post(self.request.user)
            else:
                post.unlike_post(self.request.user)
        elif action == "save":
            save = self.request.data.get("save", True)
            if save:
                post.save_post(self.request.user)
            else:
                post.unsave_post(self.request.user)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        post.save()
        serializer.save()


class CommentLikeSaveViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        comment = self.get_object()
        action = self.request.data.get("action")

        if action == "like":
            like = self.request.data.get("like", True)
            if like:
                comment.like_comment(self.request.user)
            else:
                comment.unlike_comment(self.request.user)
        elif action == "save":
            save = self.request.data.get("save", True)
            if save:
                comment.save_comment(self.request.user)
            else:
                comment.unsave_comment(self.request.user)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        comment.save()
        serializer.save()

    # def get_queryset(self):
    #    return Post.objects.filter(user=self.request.user)

    # def get_serializer_class(self):
    #    return PostSerializer
