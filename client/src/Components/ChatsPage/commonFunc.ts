

function extractFileType(mimeType: string): string {

    switch (mimeType) {
        case "application/pdf":
            return "pdf";
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document" :
            return ("docx");
        case "application/msword":
            return ("doc");
        case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
            return ("pptx");
        case  "application/vnd.ms-powerpoint":
            return ("ppt");
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            return ("xlsx");
        case "application/vnd.ms-excel":
            return ("xls"); 
        default:
            if (mimeType.toLocaleLowerCase().includes("image")) {
                return "img"
            }
            return "unknown"
    }


}
function formatBytes(bytes:number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

export { extractFileType,formatBytes }