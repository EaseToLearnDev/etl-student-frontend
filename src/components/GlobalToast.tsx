import { useToastStore } from "../global/hooks/useToastStore";
import { Toast } from "./Toast";

export default function GlobalToast() {
  const { showToast, toastData } = useToastStore();

  if (!showToast || !toastData) return null;

  return <Toast {...toastData} />;
}
