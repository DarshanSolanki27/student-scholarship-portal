from django.db import models
from django.contrib.auth.models import User


"""
Models

Admin
Student
Scholarship
Application
"""


CASTE_CHOICES = [('SCT', 'SC/ST'), ('OBC', 'OBC'), ('GEN', 'General')]
GENDER_CHOICES = [('M', 'Male'), ('F', 'Female'), ('O', 'Other')]
PROGRAM_CHOICES = [('B', 'BTech'), ('M', 'MTech'), ('P', 'PhD')]
DEPARMENT_CHOICES = [
    ('BIO', 'BioTech'),
    ('CHE', 'Chemical'),
    ('CIV', 'Civil'),
    ('CSE', 'CSE'),
    ('ECE', 'ECE'),
    ('EEE', 'EEE'),
    ('MEC', 'Mechanical')
]
SPECIALIZATION_CHOICES = [
    ('MET', 'Metallurgical'),
    ('POW', 'Power'),
    ('COM', 'Communications'),
    ('ENV', 'Environmental'),
]


class Admin(User):
    is_admin = models.BooleanField(default=True, blank=True)

    class Meta:
        verbose_name = 'Admin'


class Student(User):
    is_admin = models.BooleanField(default=False, blank=True)

    class Meta:
        verbose_name = 'Student'


"""
Scholarship model

Instructions
Opening date
Closing date
link if external scholarship
Eligibility :
    caste
    program(btech, mtech, phd)
    department
    specialization if mtech
    gender
    minimum cgpa

"""


class Scholarship(models.Model):
    instructions = models.TextField()
    opening_date = models.DateField(blank=True)
    closing_date = models.DateField(blank=True)
    caste = models.CharField(choices=CASTE_CHOICES, max_length=3)
    program = models.CharField(choices=PROGRAM_CHOICES, max_length=1)
    department = models.CharField(choices=DEPARMENT_CHOICES, max_length=3)
    specialization = models.CharField(
        choices=SPECIALIZATION_CHOICES, blank=True, max_length=3)
    gender = models.CharField(choices=GENDER_CHOICES, max_length=1)
    cgpa = models.DecimalField(default=0.0, decimal_places=2, max_digits=4)
    url = models.URLField(blank=True)


class Application(models.Model):
    student = models.ForeignKey(to=Student, on_delete=models.CASCADE)
    scholarship = models.ForeignKey(to=Scholarship, on_delete=models.CASCADE)
    applied = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=None)
    caste = models.CharField(choices=CASTE_CHOICES, max_length=3)
    program = models.CharField(choices=PROGRAM_CHOICES, max_length=1)
    department = models.CharField(choices=DEPARMENT_CHOICES, max_length=3)
    specialization = models.CharField(
        choices=SPECIALIZATION_CHOICES, blank=True, max_length=3)
    gender = models.CharField(choices=GENDER_CHOICES, max_length=1)
    cgpa = models.DecimalField(default=0.0, decimal_places=2, max_digits=4)
    rejection = models.CharField(default=None, max_length=100)

    class Meta:
        ordering = ['-applied']
