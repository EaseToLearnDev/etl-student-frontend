import { useToastStore } from "../../../global/hooks/useToastStore";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { ToastType } from "../../shared/types";
import { removeFile } from "../api/removeFile.api";
import useTestStore from "../store/useTestStore";



export const handelFileRemove = async (fileName: string) => {

    const { studentData } = useStudentStore.getState();
    const { setToast }  = useToastStore.getState();
    const { clearCurrentResponse } = useTestStore.getState();

    if(!studentData) return;

    const { loginId, token } = studentData;
    const data = new FormData();
    data.append("fileName", fileName);

    const res: any = await removeFile({loginId ,token, data})
    
    if(res?.responseTxt === "success"){
        clearCurrentResponse();
    }
    else{
        setToast({title: "File Removed Failed" , type: ToastType.DANGER});
    }
}