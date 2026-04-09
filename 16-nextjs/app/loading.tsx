export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-base-100">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-infinity loading-xl"></span>
        <p className="text-sm text-base-content/70">Loading section...</p>
      </div>
    </div>
  );
}

