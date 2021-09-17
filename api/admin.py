from django.contrib import admin

from .models import (
    Admin,
    Student,
    Scholarship,
    Application
)

admin.site.register(Admin)
admin.site.register(Student)
admin.site.register(Scholarship)
admin.site.register(Application)
