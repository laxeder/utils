
from locust import HttpUser, TaskSet, task, between

class UserBehavior(TaskSet):

    @task
    def hello_world(self):
        self.client.get("/api/v1/hello")

class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
