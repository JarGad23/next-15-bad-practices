export const DevToolbar = ({
  loadTime,
  requestCount,
}: {
  loadTime: number;
  requestCount: number;
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-red-500 text-white p-2 text-sm z-50 flex justify-between">
      <span>Render: Client Side Rendering (CSR)</span>
      <span>
        Load Time: {loadTime.toFixed(0)} ms | Requests: {requestCount}
      </span>
      <span className="text-yellow-300">Cache: no-store (disabled)</span>
    </div>
  );
};
