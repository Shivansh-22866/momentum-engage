import { Suspense } from "react";
import GitHubAnalytics from "./GithubAnalytics";

export default function Discord() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GitHubAnalytics />
        </Suspense>
    );
}