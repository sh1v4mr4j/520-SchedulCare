from app.shared.response import Response

resp = Response(status_code=200, body="I'm alive")
print(resp)