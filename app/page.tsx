import Alerts from "./components/ui/Aterts";
import DangerAlert from "./components/ui/DangerAlert";

export default function Home() {
  return (
    <div>
      <div> Mobile Credit Sales Management System </div>
      <Alerts alertName="info" alertMessage="this is info message" />
    </div>
  );
}
