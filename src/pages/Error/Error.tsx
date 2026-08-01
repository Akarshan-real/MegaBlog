import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { usePageMeta } from "../../Helper/Function";

const Error = () => {
    const error = useRouteError();

    usePageMeta("Error | MegaBlog", "Something went wrong on MegaBlog.");

    if (isRouteErrorResponse(error)) {
        return (
            <div className="min-h-screen bg-(--bg) text-(--text) flex flex-col justify-center items-center">
                <h1 className="text-5xl font-bold">
                    {error.status} - {error.statusText}
                </h1>
                <p className="mt-4 text-(--text-muted)">
                    {error.data || "Something went wrong"}
                </p>
            </div>
        );
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <h1 className="text-5xl font-bold text-(--primary)">
                Unexpected Error Occurred
            </h1>
        </div>
    );
};

export default Error;