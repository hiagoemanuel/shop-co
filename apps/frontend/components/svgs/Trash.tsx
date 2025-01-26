export const Trash = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="100%"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FF3333"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" fill="#FF3333" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" stroke="#FFFFFF" />
    <line x1="14" x2="14" y1="11" y2="17" stroke="#FFFFFF" />
  </svg>
)
