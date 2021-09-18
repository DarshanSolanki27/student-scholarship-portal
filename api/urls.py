from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

from .views import (
    AdminRetrieveView,
    AdminSignupView,
    ScholarshipListCreateView,
    ScholarshipRetrieveView,
    StudentApplicationListView,
    ScholarshipApplicationListCreateView,
    StudentRetrieveView,
    StudentSignupView,
    UpdateApplicationStatusView
)

urlpatterns = [
    path('signup', AdminSignupView.as_view()),
    path('student-signup', StudentSignupView.as_view()),

    path('token/obtain', TokenObtainPairView.as_view()),
    path('token/refresh', TokenRefreshView.as_view()),

    path('admin/<str:username>', AdminRetrieveView.as_view()),
    path('student/<str:username>', StudentRetrieveView.as_view()),
    path('student/<int:id>/application', StudentApplicationListView.as_view()),

    path('scholarship', ScholarshipListCreateView.as_view()),
    path('scholarship/<int:id>', ScholarshipRetrieveView.as_view()),

    path('scholarship/<int:id>',
         ScholarshipApplicationListCreateView.as_view()),

    path('application/<int:id>/update', UpdateApplicationStatusView.as_view()),
]
