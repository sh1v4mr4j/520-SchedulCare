import unittest
from unittest.mock import AsyncMock, MagicMock, Mock, patch
from app.services.payment_service import PaymentService

class TestPaymentService(unittest.TestCase):

    def setUp(self):
        # Create an instance of the PaymentService class for testing
        self.payment_service = PaymentService()

    # Test to check if create order is successful
    @patch('app.services.payment_service.ApiHelper.json_serialize')  # Mock ApiHelper
    @patch('app.services.payment_service.OrdersController.orders_create')  # Mock orders_create
    async def test_create_order_success(self, mock_orders_create, mock_json_serialize):
        # Mock the PayPal order response
        mock_order_response = AsyncMock()
        mock_order_response.body = {
            "id": "ORDER123",
            "status": "CREATED",
            "purchase_units": [
                {
                    "amount": {
                        "currency_code": "USD",
                        "value": "1100"
                    }
                }
            ]
        }
        
        # Mock orders_create to return the mock order response
        mock_orders_create.return_value = mock_order_response
        
        # Mock json_serialize to return the mocked response body
        mock_json_serialize.return_value = {
            "id": "ORDER123",
            "status": "CREATED",
            "purchase_units": [
                {
                    "amount": {
                        "currency_code": "USD",
                        "value": "1100"
                    }
                }
            ]
        }
        
        # Call the create_order method
        cart = [{"item": "appointment", "price": 1100}]
        result = await self.payment_service.create_order(cart)

        # Assertions to verify the result
        self.assertEqual(result, {
            "id": "ORDER123",
            "status": "CREATED",
            "purchase_units": [
                {
                    "amount": {
                        "currency_code": "USD",
                        "value": "1100"
                    }
                }
            ]
        })
        mock_orders_create.assert_called_once()  # Ensure orders_create was called
        mock_json_serialize.assert_called_once()  # Ensure json_serialize was called

    # Test to check if create_order fails
    @patch('app.services.payment_service.ApiHelper.json_serialize')  # Mock ApiHelper
    @patch('app.services.payment_service.OrdersController.orders_create')  # Mock orders_create
    async def test_create_order_failure(self, mock_orders_create, mock_json_serialize):
        # Simulate an exception in orders_create
        mock_orders_create.side_effect = Exception("Error creating PayPal order")

        # Call the create_order method
        cart = [{"item": "appointment", "price": 1100}]
        result = await self.payment_service.create_order(cart)

        # Assert the error message is returned
        self.assertEqual(result, "Error creating order: Error creating PayPal order")
        mock_orders_create.assert_called_once()  # Ensure orders_create was called
        mock_json_serialize.assert_not_called()  # Ensure json_serialize was not called because of the exception

    # Test to check if capture order is successful
    @patch('app.services.payment_service.ApiHelper.json_serialize')  # Mock ApiHelper
    @patch('app.services.payment_service.OrdersController.orders_capture')  # Mock orders_capture
    async def test_capture_order_success(self, mock_orders_capture, mock_json_serialize):
        # Mock the PayPal capture response
        mock_capture_response = MagicMock()
        mock_capture_response.body = {
            "id": "ORDER123",
            "status": "CAPTURED",
            "amount": {
                "currency_code": "USD",
                "value": "1100"
            }
        }
        
        # Mock orders_capture to return the mock capture response
        mock_orders_capture.return_value = mock_capture_response
        
        # Mock json_serialize to return the mocked response body
        mock_json_serialize.return_value = {
            "id": "ORDER123",
            "status": "CAPTURED",
            "amount": {
                "currency_code": "USD",
                "value": "1100"
            }
        }
        
        # Call the capture_order method
        order_id = "ORDER123"
        result = await self.payment_service.capture_order(order_id)

        # Assertions to verify the result
        self.assertEqual(result, {
            "id": "ORDER123",
            "status": "CAPTURED",
            "amount": {
                "currency_code": "USD",
                "value": "1100"
            }
        })
        mock_orders_capture.assert_called_once()  # Ensure orders_capture was called
        mock_json_serialize.assert_called_once()  # Ensure json_serialize was called

    # Test to check if capture order is failing
    @patch('app.services.payment_service.ApiHelper.json_serialize')  # Mock ApiHelper
    @patch('app.services.payment_service.OrdersController.orders_capture')  # Mock orders_capture
    async def test_capture_order_failure(self, mock_orders_capture, mock_json_serialize):
        # Simulate an exception in orders_capture
        mock_orders_capture.side_effect = Exception("Error capturing PayPal order")

        # Call the capture_order method
        order_id = "ORDER123"
        result = await self.payment_service.capture_order(order_id)

        # Assert the error message is returned
        self.assertEqual(result, "Error capturing order: Error capturing PayPal order")
        mock_orders_capture.assert_called_once()  # Ensure orders_capture was called
        mock_json_serialize.assert_not_called()  # Ensure json_serialize was not called due to the exception