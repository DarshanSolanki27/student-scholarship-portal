from django.urls import path
from .views import (AdminSignupView, ScholarshipListView, StudentSignupView)

urlpatterns = [
    path('signup', AdminSignupView.as_view()),
    path('student-signup', StudentSignupView.as_view()),
    path('scholarships', ScholarshipListView.as_view()),
]
