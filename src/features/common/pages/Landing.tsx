import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";

export const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center mx-auto">
      Landing Page
      <div className="border border-red-300">
        <Button onClick={() => navigate(paths.auth.login.path)}>
          To login page
        </Button>
      </div>
    </div>
  );
};
