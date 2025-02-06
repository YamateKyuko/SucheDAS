export type pageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params?: Promise<{param?: string | string[] | undefined }>
}
