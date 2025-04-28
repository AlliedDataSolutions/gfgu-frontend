import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "@/core/axiosInstance";
import { Button } from "@/components/ui/button";

export default function ConfirmEmailPage() {
  const [searchParams] = useSearchParams();
  const [confirmationStatus, setConfirmationStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      axios
        .post("/auth/confirm-email", { token })
        .then(() => {
          setConfirmationStatus("success");
        })
        .catch(() => {
          setConfirmationStatus("error");
        });
    } else {
      setConfirmationStatus("error");
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {confirmationStatus === "loading" && <div>Verifying email...</div>}
      {confirmationStatus === "success" && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Email Confirmed!</h2>
          <p className="mb-4">Your email has been successfully verified.</p>
          <Button onClick={() => navigate("/auth/login")}>Go to Login</Button>
        </div>
      )}
      {confirmationStatus === "error" && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Email Confirmation Failed</h2>
          <p className="mb-4">
            There was an error confirming your email. Please try again or
            contact support.
          </p>
        </div>
      )}
    </div>
  );
}
