import { useToastStore } from "../../../global/hooks/useToastStore";
import { useStudentStore } from "../../shared/hooks/useStudentStore";
import { ToastType } from "../../shared/types";
import { uploadFile } from "../api/fileUpload.api"
import useTestStore from "../store/useTestStore";



export const handelFileUpload = async (file: File) => {

    const { studentData } = useStudentStore.getState();
    const { setCurrentFileUrl } = useTestStore.getState();
     const { setToast }  = useToastStore.getState();

    if(!studentData) return;

    const { loginId, token } = studentData;
    const data = new FormData();
    data.append("uploadedFiles", file);

    const res: any = await uploadFile({ loginId, token, data })
    
    if(res?.responseTxt === "success"){
        setCurrentFileUrl(res?.obj?.fileName, res?.obj?.virtualUrlFile);
    }
    else{
        setToast({title: "File Upload Failed" , type: ToastType.DANGER});
    }
}