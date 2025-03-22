from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import get_user_profile_data, CustomTokenObtainPairView, CustomTokenRefreshView, register, authenticated, toggle_like, get_username, get_set_comments, toggle_save, post_legoset_comment, update_user_details, logout



urlpatterns = [
    path('user_data/<str:pk>/', get_user_profile_data),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('register/', register),
    path('authenticated/', authenticated),
    path('toggle_like/', toggle_like),
    path('toggle_save/', toggle_save),
    path('get_username/', get_username),
    path('get_set_comments/<str:set_num>', get_set_comments),
    path('post_legoset_comment/', post_legoset_comment),
    path('update_user/', update_user_details),
    path('logout/', logout),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)