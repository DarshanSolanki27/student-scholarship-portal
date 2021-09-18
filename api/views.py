from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import (
    ListAPIView, ListCreateAPIView, UpdateAPIView)
from rest_framework.status import (
    HTTP_201_CREATED, HTTP_400_BAD_REQUEST)

from .serializers import (AdminSignupSerializer, ApplicationSerializer, ApplicationUpdateSerializer,
                          StudentSignupSerializer, ScholarshipSerializer)
from .models import (Application, Scholarship)


"""
Signup views
"""


class AdminSignupView(APIView):
    serializer_class = AdminSignupSerializer

    def post(self, request, format=None):
        email = request.data.get('email')
        if email is None:
            return Response({'email': ['Email Required']}, status=HTTP_400_BAD_REQUEST)

        password = request.data.get('password')
        if password is None:
            return Response({'password': ['Password Required']}, status=HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.create(validated_data=serializer.validated_data)
            user.save()

            return Response(status=HTTP_201_CREATED)

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class StudentSignupView(APIView):
    serializer_class = StudentSignupSerializer

    def post(self, request, format=None):
        email = request.data.get('email')
        if email is None:
            return Response({'email': ['Email Required']}, status=HTTP_400_BAD_REQUEST)

        password = request.data.get('password')
        if password is None:
            return Response({'password': ['Password Required']}, status=HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.create(validated_data=serializer.validated_data)
            user.save()

            return Response(status=HTTP_201_CREATED)

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


"""
Scholarship views
"""


class ScholarshipListView(ListCreateAPIView):
    queryset = Scholarship.objects.all()
    serializer_class = ScholarshipSerializer


"""
Application views
"""


class StudentApplicationListView(ListAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        return self.queryset.filter(student=self.kwargs['id'])


class ScholarshipApplicationListCreateView(ListCreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        return self.queryset.filter(scholarship=self.kwargs['id'])


class UpdateApplicationStatusView(UpdateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationUpdateSerializer

    def get_queryset(self):
        return self.queryset.filter(id=self.kwargs['id'])
