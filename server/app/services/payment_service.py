# import logging
# import os
# import requests
# from requests.auth import HTTPBasicAuth
# from paypalserversdk.http.auth.o_auth_2 import ClientCredentialsAuthCredentials
# from paypalserversdk.logging.configuration.api_logging_configuration import (
#     LoggingConfiguration,
#     RequestLoggingConfiguration,
#     ResponseLoggingConfiguration,
# )
# from paypalserversdk.paypalserversdk_client import PaypalserversdkClient
# from paypalserversdk.api_helper import ApiHelper
# from paypalserversdk.models.amount_with_breakdown import AmountWithBreakdown
# from paypalserversdk.models.checkout_payment_intent import CheckoutPaymentIntent
# from paypalserversdk.models.order_request import OrderRequest
# from paypalserversdk.models.purchase_unit_request import PurchaseUnitRequest

# class PaymentService:
#     def __init__(self):
#         # PayPal client configuration
#         self.paypal_client = PaypalserversdkClient(
#             client_credentials_auth_credentials=ClientCredentialsAuthCredentials(
#                 o_auth_client_id=os.getenv("PAYPAL_CLIENT_ID"),
#                 o_auth_client_secret=os.getenv("PAYPAL_CLIENT_SECRET")
#             ),
#             logging_configuration=LoggingConfiguration(
#                 log_level=logging.INFO,
#                 mask_sensitive_headers=False,
#                 request_logging_config=RequestLoggingConfiguration(
#                     log_headers=True, log_body=True
#                 ),
#                 response_logging_config=ResponseLoggingConfiguration(
#                     log_headers=True, log_body=True
#                 ),
#             ),
#         )
#         # Controllers
#         self.orders_controller = self.paypal_client.orders

#     async def ping_paypal():
#         url = "https://api.sandbox.paypal.com/v1/oauth2/token"  # Using sandbox URL for testing, production for live
#         auth = HTTPBasicAuth(os.getenv("PAYPAL_CLIENT_ID"), os.getenv("PAYPAL_CLIENT_SECRET"))
#         headers = {"Content-Type": "application/x-www-form-urlencoded"}
#         data = {"grant_type": "client_credentials"}

#         try:
#             response = requests.post(url, auth=auth, headers=headers, data=data)
#             if response.status_code == 200:
#                 return "Ping successful: Connected to PayPal API!"
#             else:
#                 return f"Ping failed: {response.status_code} - {response.json()}"
#         except Exception as e:
#             return f"Error pinging PayPal: {str(e)}"

#     async def create_order(self, cart):
#         """
#         Create an order with PayPal using the cart details.
#         :param cart: List of items in the cart
#         :return: Serialized order response from PayPal
#         """
#         try:
#             # Adding `value="1100"` by default for each appointment
#             order = self.orders_controller.orders_create(
#                 {
#                     "body": OrderRequest(
#                         intent=CheckoutPaymentIntent.CAPTURE,
#                         purchase_units=[
#                             PurchaseUnitRequest(
#                                 amount=AmountWithBreakdown(
#                                     currency_code="USD",
#                                     value="1100",
#                                 ),
#                             )
#                         ],
#                     )
#                 }
#             )
#             return ApiHelper.json_serialize(order.body)
#         except Exception as e:
#             return f"Error creating order: {str(e)}"

#     async def capture_order(self, order_id):
#         """
#         Capture a payment for a created order.
#         :param order_id: The ID of the order to capture
#         :return: Serialized capture response from PayPal
#         """
#         try:
#             order = self.orders_controller.orders_capture(
#                 {"id": order_id, "prefer": "return=representation"}
#             )
#             return ApiHelper.json_serialize(order.body)
#         except Exception as e:
#             return f"Error capturing order: {str(e)}"
