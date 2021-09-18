from django.urls import path
from .views import (
    AdminSignupView,
    StudentApplicationListView,
    ScholarshipApplicationListCreateView,
    ScholarshipListView,
    StudentSignupView,
    UpdateApplicationStatusView
)

urlpatterns = [
    path('signup', AdminSignupView.as_view()),
    path('student-signup', StudentSignupView.as_view()),

    path('student/<int:id>', StudentApplicationListView.as_view()),

    path('scholarship', ScholarshipListView.as_view()),
    path('scholarship/<int:id>',
         ScholarshipApplicationListCreateView.as_view()),

    path('application/<int:id>/update', UpdateApplicationStatusView.as_view()),
]
