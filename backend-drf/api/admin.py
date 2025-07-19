from django.contrib import admin
from .models import *
from accounts.models import User, Profile

class UserAdmin(admin.ModelAdmin):
    search_fields  = ['full_name', 'username', 'email']
    list_display  = ['username', 'email']

class ProfileAdmin(admin.ModelAdmin):
    search_fields  = ['user']
    list_display = ['thumbnail', 'user', 'full_name']

class CategoryAdmin(admin.ModelAdmin):
    list_display = ["title"]

class PostAdmin(admin.ModelAdmin):
    list_display = ["title","user","category","view"]

class CommentAdmin(admin.ModelAdmin):
    list_display = ["post","name","email","comment"]

class BookmarkAdmin(admin.ModelAdmin):
    list_display = ["user","post"]


admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Bookmark, BookmarkAdmin)
