from functools import partial
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import LegoSet, MyUser, Comment
from .serializers import LegoSetSerializer, MyUserProfileSerializer, UserRegisterSerializer, CommentSerializer, UserSerializer

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def authenticated(request):
    return Response('authenticated')

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens['access']
            refresh_token = tokens['refresh']
            username = request.data['username']

            try:
                 user = MyUser.objects.get(username=username)
            except  MyUser.DoesNotExist:
                return Response({'error': 'user doesnt exist'})

            res = Response()

            res.data = {'success': True,
                        'user': {
                            'username': user.username,
                            'bio': user.bio,
                            'email': user.email,
                            'first_name': user.first_name,
                            'last_name': user.last_name
                        }
                    }

            res.set_cookie( 
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

            res.set_cookie( 
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

            return res
        except:
            return Response({'success':False})

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            request.data['refresh'] = refresh_token

            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens['access']

            res = Response()

            res.data = {'success': True}

            res.set_cookie( 
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

            return res
        except:
            return Response({'success':False})

# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile_data(request, pk):
    try:
        try:
            user = MyUser.objects.get(username=pk)
        except MyUser.DoesNotExist:
            return Response({'error': 'User does not exist'})
        serializer = MyUserProfileSerializer(user, many=False)

        return Response({**serializer.data, 'is_our_profile': request.user.username == user.username})
    except:
        return Response({'error': 'error getting user'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_username(request):
    username = request.user.username
    print(username)
    return Response({'username': username})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_like(request):
    user = request.user

    set_num = request.data.get("set_num", "")
    name = request.data.get("name", "")
    pieces = request.data.get("pieces", 0)
    img_url = request.data.get("img_url", "")

    # Get or create the LegoSet
    lego_set, created = LegoSet.objects.get_or_create(
        set_num = set_num,
        defaults={"name": name, "pieces": pieces, "img_url": img_url},
    )

    # Toggle like
    if lego_set in user.likes.all():
        user.likes.remove(lego_set)
        return Response({"liked": False, "set_num":set_num})
    else:
        user.likes.add(lego_set)
        return Response({"liked": True, "set_num":set_num})
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_save(request):
    user = request.user

    set_num = request.data.get("set_num", "")
    name = request.data.get("name", "")
    pieces = request.data.get("pieces", 0)
    img_url = request.data.get("img_url", "")

    # Get or create the LegoSet
    lego_set, created = LegoSet.objects.get_or_create(
        set_num = set_num,
        defaults={"name": name, "pieces": pieces, "img_url": img_url},
    )

    # Toggle like
    if lego_set in user.saves.all():
        user.saves.remove(lego_set)
        return Response({"saved": False, "set_num":set_num})
    else:
        user.saves.add(lego_set)
        return Response({"saved": True, "set_num":set_num})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_set_comments(request, set_num):
    try:
        lego_set = LegoSet.objects.filter(set_num=set_num).first()
    except LegoSet.DoesNotExist:
        return Response({"error": "LegoSet not found"}, status=404)

    comments = lego_set.comments.all().order_by('-created_at')
    serializer = CommentSerializer(comments, many=True)

    return Response(serializer.data)


#make comment view
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_legoset_comment(request):
    try:
        data = request.data

        try:
            user = MyUser.objects.get(username=request.user.username)
        except  MyUser.DoesNotExist:
            return Response({'error': 'user doesnt exist'})
        
        set_num = request.data.get("set_num", "")
        name = request.data.get("name", "")
        pieces = request.data.get("pieces", 0)
        img_url = request.data.get("img_url", "")

        # Get or create the LegoSet
        lego_set, created = LegoSet.objects.get_or_create(
            set_num = set_num,
            defaults={"name": name, "pieces": pieces, "img_url": img_url},
        )

        comment = Comment.objects.create(
            user = user,
            lego_set = lego_set,
            content = data['content']
        )

        serializer = CommentSerializer(comment, many=False)

        return Response(serializer.data)
    except:
        return Response({'error': 'error making comment'})

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_user_details(request):
    data = request.data

    try:
        user = MyUser.objects.get(username=request.user.username)
    except  MyUser.DoesNotExist:
        return Response({'error': 'user doesnt exist'})
    
    serializer = UserSerializer(user, data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response({**serializer.data, 'success': True})
    
    return Response({**serializer.errors, 'success': False})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        res = Response()
        res.data = {'success':True}
        res.delete_cookie('access_token', path='/', samesite='None')
        res.delete_cookie('refresh_token', path='/', samesite='None')
        return res
    except:
        return Response({'success': False})


    

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def toggle_like(request, set_num):
#     try:
#         try:
#             lego_set = LegoSet.objects.get(set_num=set_num)
#             user = request.user
#         except LegoSet.DoesNotExist:
#             return Response({'error': 'Lego set does not exist'})
        
#         #option 2
#         if lego_set in user.likes.all():
#             user.likes.remove(lego_set)
#             return Response({'liked': False})
#         else:
#             user.likes.add(lego_set)
#             return Response({'liked': True})
#     except:
#         return Response({'error': 'error liking set'})