"use client";
import * as React from "react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  React.useEffect(()=>{
	router.push('/login')
  },[])

  // return (
  // 	<ErrorBoundary errorComponent={undefined}>
  // 		<h1>aaa</h1>
  // 	</ErrorBoundary>
  // );
}
