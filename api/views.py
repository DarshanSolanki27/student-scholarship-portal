from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import (
    ListAPIView, ListCreateAPIView, RetrieveAPIView, UpdateAPIView)
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
)

from rest_framework.status import (
    HTTP_201_CREATED, HTTP_400_BAD_REQUEST)

from .serializers import (AdminSignupSerializer,
                          ApplicationSerializer,
                          AdminSerializer,
                          StudentSerializer,
                          ApplicationUpdateSerializer,
                          StudentSignupSerializer,
                          ScholarshipSerializer)
from .models import (Admin, Student, Application, Scholarship)


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
User views
"""


class AdminRetrieveView(RetrieveAPIView):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
    lookup_field = 'username'

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny(), ]

        return [IsAuthenticated(), ]


class StudentRetrieveView(RetrieveAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    lookup_field = 'username'

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny(), ]

        return [IsAuthenticated(), ]


"""
Scholarship views
"""


class ScholarshipListCreateView(ListCreateAPIView):
    queryset = Scholarship.objects.all()
    serializer_class = ScholarshipSerializer
    lookup_field = 'id'

    def get_permissions(self):
        return [IsAuthenticated(), ]


class ScholarshipRetrieveView(RetrieveAPIView):
    queryset = Scholarship.objects.all()
    serializer_class = ScholarshipSerializer
    lookup_field = 'id'


"""
Application views
"""


class ApplicationListView(ListAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer


class StudentApplicationListView(ListAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    lookup_field = 'id'

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
