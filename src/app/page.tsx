import { ErrorBoundary } from "next/dist/client/components/error-boundary";

export default function Home() {
	return (
		<ErrorBoundary errorComponent={undefined}>
			<h1>aaa</h1>
		</ErrorBoundary>
	);
}
