from django.contrib.auth import password_validation
from rest_framework import serializers
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
            username=validated_data['email'], email=validated_data['email'], password=validated_data['password'])

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
        if validated_data.get('is_admin') is not None:
            validated_data.pop('is_admin')
        user = Student.objects.create_user(
            username=validated_data['email'], email=validated_data['email'], password=validated_data['password'])

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
        if validated_data.get('program') != 'M':
            validated_data.pop('specialization')

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
        cutoffs = validated_data.get('scholarship')

        if Student.objects.filter(id=validated_data.get('student').id) is None:
            raise ValidationError({'unauthorized': 'You are not registered'})
        if validated_data.get('caste') != cutoffs.caste:
            raise ValidationError({'caste': 'Invalid caste'})
        if validated_data.get('program') != cutoffs.program:
            raise ValidationError({'program': 'Invalid program'})
        if validated_data.get('department') != cutoffs.department:
            raise ValidationError({'department': 'Invalid department'})
        if validated_data.get('gender') != cutoffs.gender:
            raise ValidationError({'gender': 'Invalid gender'})
        if validated_data.get('program') == 'M' and validated_data.get('specialization') != cutoffs.specialization:
            raise ValidationError({'specialization': 'Invalid Specialization'})

        if validated_data.get('cgpa') < cutoffs.cgpa:
            raise ValidationError({'cgpa': 'CGPA too low'})
        if validated_data.get('status') is not None:
            validated_data.pop('status')

        return Application.objects.create(**validated_data)


class ApplicationUpdateSerializer(ModelSerializer):
    admin = serializers.IntegerField()

    class Meta:
        model = Application
        fields = ['id', 'admin', 'status']

    def validate_admin(self, admin):
        is_admin = Admin.objects.filter(id=admin)

        if not is_admin:
            raise ValidationError({'Permission denied': 'Admin only feature'})

        return admin

    def update(self, instance, validated_data):
        instance.status = validated_data.get('status', instance.status)
        instance.save()

        return instance
