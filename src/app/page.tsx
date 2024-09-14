import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Image from "next/image";

export default function Home() {
	return (
		<ErrorBoundary errorComponent={undefined}>
			<h1>aaa</h1>
		</ErrorBoundary>
	);
}
