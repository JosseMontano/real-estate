type ParamsType = { size: string };
export const DashboardIcon = ({ size }: ParamsType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      className="bi bi-border-all mr-2"
      viewBox="0 0 16 16"
    >
      <path d="M0 0h16v16H0zm1 1v6.5h6.5V1zm7.5 0v6.5H15V1zM15 8.5H8.5V15H15zM7.5 15V8.5H1V15z" />
    </svg>
  );
};