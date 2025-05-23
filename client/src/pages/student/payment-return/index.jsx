import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { captureAndFinalizePaymentService } from "@/services";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


function PaypalPaymentReturnPage() {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const paymentId = params.get("paymentId");
    //PayerID get from url in payment processing of paypal
    const payerId = params.get("PayerID");

    useEffect(() => {
        if (paymentId && payerId) {
            async function capturePayment() {
                //currrentOrderId is a val that returned from paypal
                const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
                const response = await captureAndFinalizePaymentService(
                    paymentId,
                    payerId,
                    orderId,
                );

                if (response?.success) {
                    sessionStorage.removeItem("currentOrderId");
                    window.location.href = "/student-courses";
                }
            }

            capturePayment();
        }
    }, [payerId, paymentId]);
    console.log(params);


    return (<Card>
        <CardHeader>
            <CardTitle>
                Processing payment ... Please wait
            </CardTitle>
        </CardHeader>
    </Card>)
}

export default PaypalPaymentReturnPage;