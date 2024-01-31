export default function catchError(error) {
    const { response } = error;

    // console.log({
    //     success: false,
    //     status: response?.status || null,
    //     statusText: response?.statusText || null,
    // });

    return {
        success: false,
        status: response?.status || null,
        statusText: response?.statusText || null,
    }
}
