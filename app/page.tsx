import Alerts from "./components/ui/Aterts";
import { CopyDocumentIcon } from "./components/ui/svg/CopyDocumentIcon";

export default function Home() {
  return (
    <div>
      <div> Mobile Credit Sales Management System </div>
      <Alerts alertName="info" alertMessage="this is info message" />
      <CopyDocumentIcon />
    </div>
  );
}
