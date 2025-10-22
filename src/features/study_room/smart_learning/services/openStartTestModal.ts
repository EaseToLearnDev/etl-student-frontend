import { useSLStore } from "../hooks/useSLStore";

export const openStartTestModal = () => {
  const {
    testOptions,
    selectedTestOption,
    setSelectedTestOption,
    setShowStartTestModal,
  } = useSLStore.getState();

  // Ensure selectedTestOption is replaced with a copy of the matching testOptions entry
  const item =
    testOptions.find(
      (option) => option.examType === selectedTestOption.examType
    ) ?? testOptions[0];

  setSelectedTestOption({ ...item });

  setShowStartTestModal(true);
};
