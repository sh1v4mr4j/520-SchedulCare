from app.shared.status import Status
import json

class ResponseUtils:
    @staticmethod
    def ok(body):
        return Response(Status.OK, body)

    @staticmethod
    def created(body):
        return Response(Status.CREATED, body)

    @staticmethod
    def no_content():
        return Response(Status.NO_CONTENT, None)

    @staticmethod
    def bad_request(body):
        return Response(Status.BAD_REQUEST, body)

    @staticmethod
    def unauthorized(body):
        return Response(Status.UNAUTHORIZED, body)

    @staticmethod
    def forbidden(body):
        return Response(Status.FORBIDDEN, body)

    @staticmethod
    def not_found(body):
        return Response(Status.NOT_FOUND, body)

    @staticmethod
    def conflict(body):
        return Response(Status.CONFLICT, body)

    @staticmethod
    def unprocessable_entity(body):
        return Response(Status.UNPROCESSABLE_ENTITY, body)

    @staticmethod
    def internal_server_error(body):
        return Response(Status.INTERNAL_SERVER_ERROR, body)

class Response:
    def __init__(self, status_code: Status, content):
        self.status_code = status_code
        dict_op = getattr(content, "__dict__", None)
        if callable(dict_op):
            self.body = json.dumps(content.__dict__)
        else:
            self.body = json.dumps(content)