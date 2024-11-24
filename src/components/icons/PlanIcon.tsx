const FreePlanIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-green-400"
  >
    <path
      d="M8 1.33334C4.32 1.33334 1.33333 4.32001 1.33333 8.00001C1.33333 11.68 4.32 14.6667 8 14.6667C11.68 14.6667 14.6667 11.68 14.6667 8.00001C14.6667 4.32001 11.68 1.33334 8 1.33334ZM6.66667 11.3333L3.33333 8.00001L4.27333 7.06001L6.66667 9.44668L11.7267 4.38668L12.6667 5.33334L6.66667 11.3333Z"
      fill="currentColor"
    />
  </svg>
);

const AIPlanIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-purple-500"
  >
    <path
      d="M8 1.33334C4.32 1.33334 1.33333 4.32001 1.33333 8.00001C1.33333 11.68 4.32 14.6667 8 14.6667C11.68 14.6667 14.6667 11.68 14.6667 8.00001C14.6667 4.32001 11.68 1.33334 8 1.33334ZM8.66667 11.3333H7.33333V10H8.66667V11.3333ZM9.72 6.94001L9.06667 7.61334C8.54667 8.14001 8.16667 8.60001 8.16667 10H6.83333V9.66668C6.83333 8.60001 7.21333 7.62668 7.73333 7.10001L8.62667 6.19334C8.89333 5.93334 9.06667 5.57334 9.06667 5.16668C9.06667 4.34668 8.4 3.68001 7.58 3.68001C6.76 3.68001 6.09333 4.34668 6.09333 5.16668H4.76C4.76 3.60668 6.02 2.33334 7.58 2.33334C9.14 2.33334 10.4 3.60668 10.4 5.16668C10.4 5.82001 10.14 6.42001 9.72 6.94001Z"
      fill="currentColor"
    />
  </svg>
);

interface PlanIconProps {
  type: "free" | "ai";
}

const PlanIcon: React.FC<PlanIconProps> = ({ type }) => {
  return type === "free" ? <FreePlanIcon /> : <AIPlanIcon />;
};

export default PlanIcon;
