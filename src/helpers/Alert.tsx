import Swal from "sweetalert2";
//Alert for Delete Task
export const showAlertDelete = async () => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: true,
  });
  try {
    const result = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      await swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "Task has been deleted.",
        icon: "success",
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      await swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your  task is saved :)",
        icon: "error",
      });
    }
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("SweetAlert Error:", error.message);
    }
    return null;
  }
};
