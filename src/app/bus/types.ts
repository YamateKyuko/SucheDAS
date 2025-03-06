export type paramProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{param?: string | string[] | undefined }>
}
