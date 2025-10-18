import { MdClose } from "react-icons/md";
import { Modal } from "../../../components/Modal"
import cn from "../../../utils/classNames";
import useTestStore from "../store/useTestStore";

const SubjectiveMediaModal = () => {
    const currentResponse = useTestStore(s => s.getCurrentResponse());

    const isSubjectiveMediaModalOpen = useTestStore(s => s.isSubjectiveMediaModalOpen);
    const setIsSubjectiveMediaModalOpen = useTestStore(s => s.setIsSubjectiveMediaModalOpen);
    return (
        <Modal isOpen={isSubjectiveMediaModalOpen} onClose={() => setIsSubjectiveMediaModalOpen(false)} size="xl" className="p-4">
            <div className="relative p-2 max-h-[70vh] w-full h-full overflow-y-auto">
                <img src={currentResponse?.url ?? ""} className="w-full h-full rounded-xl" />
            </div>
            {/* <div
                onClick={() => setIsSubjectiveMediaModalOpen(false)}
                className={cn(
                    "fixed top-5 right-5 w-[40px] h-[40px] aspect-square flex justify-center items-center cursor-pointer",
                    " text-[var(--text-secondary)] bg-[var(--surface-bg-primary)] border-1 border-[var(--border-primary)] rounded-full"
                )}
            >
                <MdClose size={20} />
            </div> */}
        </Modal>
    )
}

export default SubjectiveMediaModal