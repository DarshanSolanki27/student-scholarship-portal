from django.contrib.auth import password_validation
from rest_framework.serializers import (ModelSerializer, ValidationError)

from .models import (Admin, Student, Scholarship, Application)
from rest_framework.validators import UniqueValidator


class AdminSignupSerializer(ModelSerializer):
    class Meta:
        model = Admin
        fields = ['id', 'email', 'password']

        extra_kwargs = {
            'email': {
                'required': True,
                'max_length': 30,
                'validators': [
                    UniqueValidator(queryset=Admin.objects.all()), ],
                'label': 'Email',
            },
            'password': {
                'max_length': 50,
                'style': {
                    'input_type': 'password'
                },
                'write_only': True,
                'label': 'Password',
            }
        }

    def validate_password(self, value):
        try:
            password_validation.validate_password(value)
        except ValidationError as err:
            raise ValidationError(err)
        return value

    def create(self, validated_data):
        user = Admin.objects.create_user(
            username=validated_data['email'], password=validated_data['password'])

        return user


class StudentSignupSerializer(ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'email', 'password']

        extra_kwargs = {
            'email': {
                'required': True,
                'max_length': 30,
                'validators': [
                    UniqueValidator(queryset=Student.objects.all()), ],
                'label': 'Email',
            },
            'password': {
                'max_length': 50,
                'style': {
                    'input_type': 'password'
                },
                'write_only': True,
                'label': 'Password',
            }
        }

    def validate_password(self, value):
        try:
            password_validation.validate_password(value)
        except ValidationError as err:
            raise ValidationError(err)
        return value

    def create(self, validated_data):
        user = Student.objects.create_user(
            username=validated_data['email'], password=validated_data['password'])

        return user


class ScholarshipSerializer(ModelSerializer):
    class Meta:
        model = Scholarship
        fields = ['id', 'instructions', 'opening_date', 'closing_date', 'caste',
                  'program', 'department', 'specialization', 'gender', 'cgpa', 'url']
        extra_kwargs = {
            'opening_date': {
                'format': "%d-%m-%Y %H:%M:%S"
            },
            'closing_date': {
                'format': "%d-%m-%Y %H:%M:%S"
            },
            'specialization': {
                'required': False,
            }
        }

    def create(self, validated_data):
        return Scholarship.objects.create(**validated_data)


class ApplicationSerializer(ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'student', 'scholarship', 'applied', 'status', 'caste',
                  'program', 'department', 'specialization', 'gender', 'cgpa']

        extra_kwargs = {
            'specialization': {
                'required': False,
            }
        }

    def create(self, validated_data):
        return Application.objects.create(**validated_data)
