
import Swal from "sweetalert2";


export const responseMessage = (icons: any, messageTitle: string, showConfirmStatus: boolean) => {

    Swal.fire({
        icon: icons,
        title: messageTitle,
        showConfirmButton: showConfirmStatus,
    });
};

export const tasks: any = [];
interface TableItems {
    label: string;
}
export const tableColumnNames: TableItems[] = [
    {
        label: 'S.no'
    }, {
        label: 'Task name'
    },
    {
        label: "Description"
    },
    {
        label: 'Deadline'
    },
    {
        label: 'Status'
    }
];
